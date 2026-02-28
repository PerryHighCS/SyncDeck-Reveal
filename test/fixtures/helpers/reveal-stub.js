(function () {
  function normalizeIndex(value) {
    return Number.isFinite(Number(value)) ? Number(value) : 0;
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
    const config = {
      iframeSync: {
        deckId: 'fixture-deck',
        hostOrigin: '*',
        allowedOrigins: ['*'],
        autoAnnounceReady: false,
      },
      ...options,
    };

    const eventBus = createEventBus();
    const slides = Array.from(document.querySelectorAll('.reveal .slides > section'));
    const state = {
      indices: { h: 0, v: 0, f: 0 },
      paused: false,
      configured: [],
    };

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
      state.indices = {
        h: Math.max(0, Math.min(slides.length - 1, normalizeIndex(nextIndices.h))),
        v: Math.max(0, normalizeIndex(nextIndices.v)),
        f: Math.max(0, normalizeIndex(nextIndices.f)),
      };
      emitSlideChanged(previous);
    }

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
        updateIndices({ h: state.indices.h - 1, v: 0, f: 0 });
      },
      next() {
        updateIndices({ h: state.indices.h + 1, v: 0, f: 0 });
      },
      setState(nextState) {
        updateIndices({
          h: nextState?.indexh ?? nextState?.indices?.h ?? 0,
          v: nextState?.indexv ?? nextState?.indices?.v ?? 0,
          f: nextState?.indexf ?? nextState?.indices?.f ?? 0,
        });
      },
      togglePause() {
        state.paused = !state.paused;
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
