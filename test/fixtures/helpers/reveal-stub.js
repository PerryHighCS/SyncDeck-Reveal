(function () {
  function normalizeIndex(value, fallback) {
    return Number.isFinite(Number(value)) ? Number(value) : fallback;
  }

  function createEventBus() {
    const listeners = new Map();

    return {
      on(name, handler) {
        const bucket = listeners.get(name) || new Set();
        bucket.add(handler);
        listeners.set(name, bucket);
      },
      off(name, handler) {
        const bucket = listeners.get(name);
        if (!bucket) return;
        bucket.delete(handler);
        if (bucket.size === 0) listeners.delete(name);
      },
      emit(name, payload) {
        const bucket = listeners.get(name);
        if (!bucket) return;
        bucket.forEach((handler) => handler(payload));
      },
    };
  }

  function createRevealStub(options) {
    const iframeSyncConfig = {
      deckId: 'fixture-deck',
      hostOrigin: '*',
      allowedOrigins: ['*'],
      autoAnnounceReady: false,
      ...(options?.iframeSync || {}),
    };

    const config = {
      ...options,
      iframeSync: iframeSyncConfig,
    };

    const eventBus = createEventBus();
    const slides = Array.from(document.querySelectorAll('.reveal .slides > section'));
    const state = {
      indices: { h: 0, v: 0, f: -1 },
      paused: false,
      configured: [],
    };

    function getChildSlides(section) {
      return Array.from(section?.querySelectorAll(':scope > section') || []);
    }

    function getSlideAt(h, v) {
      const topLevelSlide = slides[Math.max(0, Math.min(slides.length - 1, normalizeIndex(h, 0)))];
      if (!topLevelSlide) return null;

      const childSlides = getChildSlides(topLevelSlide);
      if (!childSlides.length) return topLevelSlide;

      return childSlides[Math.max(0, Math.min(childSlides.length - 1, normalizeIndex(v, 0)))] || childSlides[0];
    }

    function getFragments(slide) {
      return Array.from(slide?.querySelectorAll('.fragment') || []);
    }

    function getClampedIndices(nextIndices) {
      const h = Math.max(0, Math.min(slides.length - 1, normalizeIndex(nextIndices.h, 0)));
      const topLevelSlide = slides[h];
      const childSlides = getChildSlides(topLevelSlide);
      const v = childSlides.length
        ? Math.max(0, Math.min(childSlides.length - 1, normalizeIndex(nextIndices.v, 0)))
        : 0;
      const currentSlide = getSlideAt(h, v);
      const fragments = getFragments(currentSlide);
      const f = fragments.length
        ? Math.max(-1, Math.min(fragments.length - 1, normalizeIndex(nextIndices.f, -1)))
        : -1;

      return { h, v, f };
    }

    function syncDomState() {
      slides.forEach((topLevelSlide, h) => {
        const childSlides = getChildSlides(topLevelSlide);
        const isCurrentTopLevel = h === state.indices.h;
        topLevelSlide.classList.toggle('present', isCurrentTopLevel);
        topLevelSlide.classList.toggle('past', h < state.indices.h);
        topLevelSlide.classList.toggle('future', h > state.indices.h);

        const targetSlides = childSlides.length ? childSlides : [topLevelSlide];
        targetSlides.forEach((slide, v) => {
          const isCurrentSlide = isCurrentTopLevel && v === state.indices.v;
          slide.classList.toggle('present', isCurrentSlide);
          slide.classList.toggle('past', isCurrentTopLevel && v < state.indices.v);
          slide.classList.toggle('future', isCurrentTopLevel && v > state.indices.v);

          const fragments = getFragments(slide);
          fragments.forEach((fragment, index) => {
            const isVisible = isCurrentSlide && index <= state.indices.f;
            fragment.classList.toggle('visible', isVisible);
            fragment.classList.toggle('current-fragment', isVisible && index === state.indices.f);
          });
        });
      });
    }

    function emitSlideChanged(previousIndices) {
      eventBus.emit('slidechanged', {
        previousSlide: slides[previousIndices.h] || null,
        currentSlide: slides[state.indices.h] || null,
        indexh: state.indices.h,
        indexv: state.indices.v,
      });
    }

    function updateIndices(nextIndices) {
      const previous = { ...state.indices };
      state.indices = getClampedIndices(nextIndices);
      syncDomState();

      if (previous.h !== state.indices.h || previous.v !== state.indices.v) {
        emitSlideChanged(previous);
        return;
      }

      if (previous.f < state.indices.f) {
        eventBus.emit('fragmentshown', {
          fragment: getFragments(getSlideAt(state.indices.h, state.indices.v))[state.indices.f] || null,
        });
      } else if (previous.f > state.indices.f) {
        eventBus.emit('fragmenthidden', {
          fragment: getFragments(getSlideAt(state.indices.h, state.indices.v))[previous.f] || null,
        });
      }
    }

    function stepNext() {
      const currentSlide = getSlideAt(state.indices.h, state.indices.v);
      const fragments = getFragments(currentSlide);
      if (state.indices.f < fragments.length - 1) {
        updateIndices({ h: state.indices.h, v: state.indices.v, f: state.indices.f + 1 });
        return;
      }

      const currentTopLevelSlide = slides[state.indices.h];
      const childSlides = getChildSlides(currentTopLevelSlide);
      if (childSlides.length && state.indices.v < childSlides.length - 1) {
        updateIndices({ h: state.indices.h, v: state.indices.v + 1, f: -1 });
        return;
      }

      updateIndices({ h: state.indices.h + 1, v: 0, f: -1 });
    }

    function stepPrev() {
      if (state.indices.f > -1) {
        updateIndices({ h: state.indices.h, v: state.indices.v, f: state.indices.f - 1 });
        return;
      }

      const currentTopLevelSlide = slides[state.indices.h];
      const childSlides = getChildSlides(currentTopLevelSlide);
      if (childSlides.length && state.indices.v > 0) {
        const prevV = state.indices.v - 1;
        const previousSlide = getSlideAt(state.indices.h, prevV);
        updateIndices({
          h: state.indices.h,
          v: prevV,
          f: getFragments(previousSlide).length - 1,
        });
        return;
      }

      const previousTopLevelSlide = slides[state.indices.h - 1];
      if (!previousTopLevelSlide) return;

      const previousChildSlides = getChildSlides(previousTopLevelSlide);
      const prevV = previousChildSlides.length ? previousChildSlides.length - 1 : 0;
      const previousSlide = getSlideAt(state.indices.h - 1, prevV);
      updateIndices({
        h: state.indices.h - 1,
        v: prevV,
        f: getFragments(previousSlide).length - 1,
      });
    }

    syncDomState();

    return {
      getConfig() {
        return config;
      },
      getIndices() {
        return { ...state.indices };
      },
      getState() {
        return {
          indexh: state.indices.h,
          indexv: state.indices.v,
          indexf: state.indices.f,
        };
      },
      getCurrentSlide() {
        return getSlideAt(state.indices.h, state.indices.v);
      },
      availableRoutes() {
        const currentTopLevelSlide = slides[state.indices.h];
        const childSlides = getChildSlides(currentTopLevelSlide);
        return {
          left: state.indices.h > 0,
          right: state.indices.h < slides.length - 1,
          up: childSlides.length > 0 && state.indices.v > 0,
          down: childSlides.length > 0 && state.indices.v < childSlides.length - 1,
        };
      },
      hasPrevious() {
        return state.indices.h > 0;
      },
      hasNext() {
        return state.indices.h < slides.length - 1;
      },
      isPaused() {
        return state.paused;
      },
      configure(nextConfig) {
        state.configured.push(nextConfig);
      },
      slide(h, v, f) {
        updateIndices({ h, v, f });
      },
      prev() {
        stepPrev();
      },
      next() {
        stepNext();
      },
      setState(nextState) {
        updateIndices({
          h: nextState?.indexh ?? nextState?.indices?.h ?? 0,
          v: nextState?.indexv ?? nextState?.indices?.v ?? 0,
          f: nextState?.indexf ?? nextState?.indices?.f ?? -1,
        });
      },
      togglePause(override) {
        state.paused = typeof override === 'boolean' ? override : !state.paused;
        eventBus.emit(state.paused ? 'paused' : 'resumed', {});
      },
      layout() {},
      on(name, handler) {
        eventBus.on(name, handler);
      },
      off(name, handler) {
        eventBus.off(name, handler);
      },
      __debug: state,
    };
  }

  window.createRevealStub = createRevealStub;
})();
