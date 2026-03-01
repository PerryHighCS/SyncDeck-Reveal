/*
 * RevealIframeSync
 * Lightweight Reveal.js plugin for iframe-hosted instructor/student synchronization via postMessage.
 *
 * Usage:
 * <script src="https://unpkg.com/reveal.js@5/dist/reveal.js"></script>
 * <script src="../js/chalkboard/chalkboard.js"></script>
 * <script src="js/reveal-iframe-sync.js"></script>
 * <script>
 * Reveal.initialize({
 *   plugins: [ RevealChalkboard, RevealIframeSync ].filter(Boolean),
 *   iframeSync: {
 *     role: 'student',              // 'student' | 'instructor'
 *     deckId: '2d-arrays',          // optional logical deck id
 *     hostOrigin: '*',              // recommended: exact host origin in production
 *     allowedOrigins: ['*'],        // origins accepted for inbound commands
 *   }
 * });
 * </script>
 */

(function () {
  const IFRAME_SYNC_VERSION = '1.1.0';
  const NAV_LOCK_STYLE_ID = 'reveal-iframe-sync-nav-lock-styles';

  const DEFAULTS = {
    role: 'student',
    deckId: null,
    hostOrigin: '*',
    allowedOrigins: ['*'],
    messageType: 'reveal-sync',
    autoAnnounceReady: true,
    studentCanNavigateBack: true,
    studentCanNavigateForward: false,
  };

  function normalizeOrigin(origin) {
    return origin || '*';
  }

  function isAllowedOrigin(origin, allowedOrigins) {
    if (!Array.isArray(allowedOrigins) || allowedOrigins.length === 0) return false;
    if (allowedOrigins.includes('*')) return true;
    return allowedOrigins.includes(origin);
  }

  function buildMessage(ctx, action, payload) {
    return {
      type: ctx.config.messageType,
      version: IFRAME_SYNC_VERSION,
      action,
      deckId: ctx.config.deckId,
      role: ctx.state.role,
      source: 'reveal-iframe-sync',
      ts: Date.now(),
      payload: payload || {},
    };
  }

  function safePostToParent(ctx, action, payload) {
    if (!window.parent || window.parent === window) return;
    const message = buildMessage(ctx, action, payload);
    window.parent.postMessage(message, normalizeOrigin(ctx.config.hostOrigin));
  }

  function debugLog(...args) {
    void args;
  }

  function describeElement(element) {
    if (!(element instanceof Element)) return null;
    return {
      tag: element.tagName,
      id: element.id || null,
      className: typeof element.className === 'string' ? element.className : null,
      ariaLabel: element.getAttribute?.('aria-label') || null,
    };
  }

  function ensureNavLockStyles() {
    if (document.getElementById(NAV_LOCK_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = NAV_LOCK_STYLE_ID;
    style.textContent = `
      .reveal .controls .navigate-left.disabled,
      .reveal .controls .navigate-right.disabled,
      .reveal .controls .navigate-up.disabled,
      .reveal .controls .navigate-down.disabled,
      .reveal .controls .navigate-left[aria-disabled="true"],
      .reveal .controls .navigate-right[aria-disabled="true"],
      .reveal .controls .navigate-up[aria-disabled="true"],
      .reveal .controls .navigate-down[aria-disabled="true"] {
        animation: none !important;
      }

      .reveal .controls .navigate-left.disabled.highlight,
      .reveal .controls .navigate-right.disabled.highlight,
      .reveal .controls .navigate-up.disabled.highlight,
      .reveal .controls .navigate-down.disabled.highlight,
      .reveal .controls .navigate-left[aria-disabled="true"].highlight,
      .reveal .controls .navigate-right[aria-disabled="true"].highlight,
      .reveal .controls .navigate-up[aria-disabled="true"].highlight,
      .reveal .controls .navigate-down[aria-disabled="true"].highlight {
        animation: none !important;
      }

      .reveal .controls [data-syncdeck-blocked="true"] {
        opacity: 0.18 !important;
        filter: saturate(0) !important;
        transform: none !important;
      }

      .reveal .controls [data-syncdeck-blocked="true"].highlight,
      .reveal .controls [data-syncdeck-blocked="true"].fragmented,
      .reveal .controls [data-syncdeck-blocked="true"].enabled {
        animation: none !important;
        opacity: 0.18 !important;
      }

      .reveal .controls [data-syncdeck-visible="false"] {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      .reveal .fragment.syncdeck-suppressed-future {
        opacity: 0 !important;
        visibility: hidden !important;
      }
    `;

    document.head.appendChild(style);
  }

  function currentDeckState(deck) {
    return {
      revealState: deck.getState(),
      indices: deck.getIndices(),
      paused: !!deck.isPaused?.(),
      // Reflect the custom storyboard strip state rather than Reveal's native
      // grid overview (which is always suppressed in this setup).
      overview: document.body.classList.contains('storyboard-open'),
    };
  }

  function normalizeIndices(indices) {
    return {
      h: Number(indices?.h ?? 0),
      v: Number(indices?.v ?? 0),
      f: Number(indices?.f ?? -1),
    };
  }

  function normalizeBoundaryIndices(indices) {
    const next = normalizeIndices(indices);
    return {
      h: next.h,
      v: 0,
      f: -1,
    };
  }

  function compareIndices(a, b) {
    const left = normalizeIndices(a);
    const right = normalizeIndices(b);

    if (left.h !== right.h) return left.h - right.h;
    if (left.v !== right.v) return left.v - right.v;
    return left.f - right.f;
  }

  function getRoleCapabilities(ctx) {
    const isInstructor = ctx.state.role === 'instructor';
    const isStandalone = ctx.state.role === 'standalone';
    return {
      canNavigateBack: (isInstructor || isStandalone) ? true : !!ctx.config.studentCanNavigateBack,
      canNavigateForward: (isInstructor || isStandalone) ? true : !!ctx.config.studentCanNavigateForward,
    };
  }

  function getStudentBoundary(ctx) {
    if (!ctx.state.studentMaxIndices) return null;
    if (ctx.state.role !== 'student' && !ctx.state.hasExplicitBoundary) return null;
    return normalizeBoundaryIndices(ctx.state.studentMaxIndices);
  }

  function getDirectionalRoutes(deck) {
    const routes = (typeof deck.availableRoutes === 'function')
      ? (deck.availableRoutes() || {})
      : {};
    return {
      hasLeft: !!routes.left,
      hasRight: !!routes.right,
      hasUp: !!routes.up,
      hasDown: !!routes.down,
    };
  }

  function topLevelSlideHasVerticalChildren(h) {
    const topLevelSlides = document.querySelectorAll('.reveal .slides > section');
    const topLevelSlide = topLevelSlides[Number(h)];
    if (!topLevelSlide) return false;
    return !!topLevelSlide.querySelector(':scope > section');
  }

  function rememberTopSlideFragment(ctx, indices) {
    const current = normalizeIndices(indices ?? ctx.deck.getIndices());
    if (current.v !== 0) return;
    if (!topLevelSlideHasVerticalChildren(current.h)) return;
    ctx.state.topSlideFragmentsByH[current.h] = current.f;
  }

  function resolveTopSlideReturnFragment(ctx, h) {
    const exactBoundary = exactTopSlideBoundary(ctx);
    if (exactBoundary && exactBoundary.h === Number(h)) {
      return exactBoundary.f;
    }

    const remembered = ctx.state.topSlideFragmentsByH?.[Number(h)];
    return Number.isFinite(Number(remembered)) ? Number(remembered) : -1;
  }

  function suppressFutureFragmentsOnSlide(slide, currentFragmentIndex) {
    if (!slide) return;
    const fragments = Array.from(slide.querySelectorAll('.fragment'));
    fragments.forEach((fragment, index) => {
      const shouldSuppress = index > Number(currentFragmentIndex) && !fragment.classList.contains('visible');
      fragment.classList.toggle('syncdeck-suppressed-future', shouldSuppress);
    });
  }

  function clearSuppressedFutureFragments(scope) {
    const root = scope || document;
    root.querySelectorAll('.syncdeck-suppressed-future').forEach((fragment) => {
      fragment.classList.remove('syncdeck-suppressed-future');
    });
  }

  function hasForwardFragmentStep(deck) {
    const currentSlide = deck.getCurrentSlide?.();
    if (!currentSlide) return false;
    return !!currentSlide.querySelector('.fragment:not(.visible)');
  }

  function hasBackwardFragmentStep(deck) {
    const current = normalizeIndices(deck.getIndices());
    return current.f > -1;
  }

  function exactTopSlideBoundary(ctx) {
    const exactBoundary = ctx.state.exactStudentMaxIndices
      ? normalizeIndices(ctx.state.exactStudentMaxIndices)
      : null;
    if (!exactBoundary) return null;
    return exactBoundary.v === 0 ? exactBoundary : null;
  }

  function canAdvanceRightWithinHF(ctx, nav) {
    if (!hasForwardFragmentStep(ctx.deck)) return false;
    if (nav.current.v !== 0) return false;

    const exactBoundary = exactTopSlideBoundary(ctx);
    if (!exactBoundary) return true;
    if (nav.current.h !== exactBoundary.h) return true;

    return nav.current.f < exactBoundary.f;
  }

  function canRewindLeftWithinHF(ctx, nav) {
    if (!hasBackwardFragmentStep(ctx.deck)) return false;
    if (!nav.canGoBack) return false;
    return nav.current.v === 0;
  }

  function moveVertical(ctx, direction) {
    const current = normalizeIndices(ctx.deck.getIndices());
    const routes = getDirectionalRoutes(ctx.deck);
    const canMoveVertically = direction === 'up' ? routes.hasUp : routes.hasDown;

    debugLog('verticalMethod:start', {
      methodName: direction,
      role: ctx.state.role,
      current,
      routes,
      canMoveVertically,
      activeElement: describeElement(document.activeElement),
    });
    if (ctx.state.role === 'student') {
      const nav = buildNavigationStatus(ctx);
      if (!(direction === 'up' ? nav.canGoUp : nav.canGoDown)) {
        debugLog('verticalMethod:block', { methodName: direction, nav });
        return undefined;
      }
    }

    if (!canMoveVertically) {
      debugLog('verticalMethod:noRoute', { methodName: direction, current, routes });
      return undefined;
    }

    if (direction === 'down' && current.v === 0) {
      rememberTopSlideFragment(ctx, current);
      suppressFutureFragmentsOnSlide(ctx.deck.getCurrentSlide?.(), current.f);
    }

    const targetV = direction === 'up' ? current.v - 1 : current.v + 1;
    const targetF = targetV === 0
      ? resolveTopSlideReturnFragment(ctx, current.h)
      : -1;

    if (targetV === 0) {
      clearSuppressedFutureFragments();
    }

    debugLog('verticalMethod:slide', {
      methodName: direction,
      from: current,
      to: { h: current.h, v: targetV, f: targetF },
    });
    return ctx.deck.slide?.(current.h, targetV, targetF);
  }

  function moveHorizontal(ctx, direction) {
    const current = normalizeIndices(ctx.deck.getIndices());
    const routes = getDirectionalRoutes(ctx.deck);
    const hasHorizontalRoute = direction === 'left' ? routes.hasLeft : routes.hasRight;
    const hasFragmentStep = direction === 'left'
      ? hasBackwardFragmentStep(ctx.deck)
      : hasForwardFragmentStep(ctx.deck);

    debugLog('horizontalMethod:start', {
      methodName: direction,
      role: ctx.state.role,
      current,
      routes,
      hasHorizontalRoute,
      hasFragmentStep,
      activeElement: describeElement(document.activeElement),
    });

    if (ctx.state.role === 'student') {
      const nav = buildNavigationStatus(ctx);
      if (direction === 'left') {
        if (canRewindLeftWithinHF(ctx, nav)) {
          const target = { h: current.h, v: current.v, f: current.f - 1 };
          debugLog('horizontalMethod:studentPrevFragment', { from: current, to: target, nav });
          return ctx.deck.slide?.(target.h, target.v, target.f);
        }
        if (nav.canGoLeft && hasHorizontalRoute) {
          const target = { h: current.h - 1, v: 0, f: -1 };
          debugLog('horizontalMethod:studentSlideHorizontal', { from: current, to: target, nav });
          return ctx.deck.slide?.(target.h, target.v, target.f);
        }
        debugLog('horizontalMethod:studentBlocked', { methodName: direction, nav, current });
        return undefined;
      }

      if (canAdvanceRightWithinHF(ctx, nav)) {
        const target = { h: current.h, v: current.v, f: current.f + 1 };
        debugLog('horizontalMethod:studentNextFragment', { from: current, to: target, nav });
        return ctx.deck.slide?.(target.h, target.v, target.f);
      }
      if (nav.canGoRight && hasHorizontalRoute) {
        const target = { h: current.h + 1, v: 0, f: -1 };
        debugLog('horizontalMethod:studentSlideHorizontal', { from: current, to: target, nav });
        return ctx.deck.slide?.(target.h, target.v, target.f);
      }
      debugLog('horizontalMethod:studentBlocked', { methodName: direction, nav, current });
      return undefined;
    }

    if (direction === 'left' && hasFragmentStep) {
      const target = { h: current.h, v: current.v, f: current.f - 1 };
      debugLog('horizontalMethod:prevFragment', { from: current, to: target });
      return ctx.deck.slide?.(target.h, target.v, target.f);
    }

    if (direction === 'right' && hasFragmentStep) {
      const target = { h: current.h, v: current.v, f: current.f + 1 };
      debugLog('horizontalMethod:nextFragment', { from: current, to: target });
      return ctx.deck.slide?.(target.h, target.v, target.f);
    }

    if (hasHorizontalRoute) {
      const target = { h: direction === 'left' ? current.h - 1 : current.h + 1, v: 0, f: -1 };
      debugLog('horizontalMethod:slideHorizontal', { from: current, to: target });
      return ctx.deck.slide?.(target.h, target.v, target.f);
    }

    debugLog('horizontalMethod:blocked', { methodName: direction, current, routes });
    return undefined;
  }

  function isPastForwardBoundary(ctx, indices) {
    const current = normalizeIndices(indices);
    const boundary = getStudentBoundary(ctx);
    if (!boundary) return false;
    if (current.h > boundary.h) return true;
    if (current.h < boundary.h) return false;
    if (current.v > 0) return false;

    const exactBoundary = exactTopSlideBoundary(ctx);
    if (exactBoundary && current.v === 0 && current.f > exactBoundary.f) {
      return true;
    }

    return false;
  }

  function isPastRequestedBoundary(indices, requestedBoundary) {
    const current = normalizeIndices(indices);
    const requested = normalizeIndices(requestedBoundary);

    if (current.h > requested.h) return true;
    if (current.h < requested.h) return false;
    if (current.v > 0) return false;

    return requested.v === 0 && current.v === 0 && current.f > requested.f;
  }

  function buildReleasedRegion(ctx) {
    // releaseStartH/releaseEndH stay null until a boundary is captured or
    // explicitly applied. Only emit a released region when the iframe is
    // actively tracking a student boundary (student follow mode or an explicit
    // boundary).
    const hasActiveReleasedRegion = ctx.state.role === 'student' || ctx.state.hasExplicitBoundary;
    if (!hasActiveReleasedRegion) {
      return null;
    }

    if (!Number.isFinite(ctx.state.releaseStartH) || !Number.isFinite(ctx.state.releaseEndH)) {
      return null;
    }

    return {
      startH: ctx.state.releaseStartH,
      endH: ctx.state.releaseEndH,
    };
  }

  function buildNavigationStatus(ctx) {
    const current = normalizeIndices(ctx.deck.getIndices());
    const roleCaps = getRoleCapabilities(ctx);
    const studentBoundary = getStudentBoundary(ctx);
    const exactStudentBoundary = exactTopSlideBoundary(ctx);
    const routes = getDirectionalRoutes(ctx.deck);

    let minIndices = null;
    let maxIndices = null;

    // For students, the boundary acts as a hard max. If back nav is disabled,
    // that same boundary also acts as an effective min (cannot move away from it).
    if (ctx.state.role === 'student' && studentBoundary) {
      if (!roleCaps.canNavigateForward || ctx.state.hasExplicitBoundary) {
        maxIndices = studentBoundary;
      }
      if (!roleCaps.canNavigateBack) {
        minIndices = studentBoundary;
      }
    }

    const inFollowInstructorMode = !ctx.state.hasExplicitBoundary;
    const allowBackward = roleCaps.canNavigateBack;
    const canAdvanceToExactBoundary = !!(
      exactStudentBoundary
      && current.h === exactStudentBoundary.h
      && current.v === 0
      && current.f < exactStudentBoundary.f
    );
    const canMoveForwardWithinReleasedRegion = !!(
      studentBoundary
      && current.h < studentBoundary.h
    );
    const canProgressForwardHF = ctx.state.role === 'student'
      ? (
        canAdvanceToExactBoundary
        || canMoveForwardWithinReleasedRegion
      )
      : false;
    const allowForwardTraversal = ctx.state.role === 'student'
      ? (
        ctx.state.hasExplicitBoundary
        || roleCaps.canNavigateForward
        || canAdvanceToExactBoundary
        || canMoveForwardWithinReleasedRegion
      )
      : roleCaps.canNavigateForward;
    const hasBackwardFragment = hasBackwardFragmentStep(ctx.deck);
    const hasForwardFragment = hasForwardFragmentStep(ctx.deck);

    // Treat back as generic previous progression. Forward is split:
    // `canGoForward` is semantic h.f progress toward the released instructor
    // position, while `canGoDown` remains the local vertical-stack signal.
    let canGoBack = allowBackward && (routes.hasLeft || routes.hasUp || hasBackwardFragment);
    let canGoForward = ctx.state.role === 'student'
      ? canProgressForwardHF
      : (allowForwardTraversal && (routes.hasRight || routes.hasDown || hasForwardFragment));
    let canGoLeft = allowBackward && routes.hasLeft;
    let canGoRight = allowForwardTraversal && routes.hasRight;
    let canGoUp = allowBackward && routes.hasUp;
    let canGoDown = ctx.state.role === 'student'
      ? routes.hasDown
      : (allowForwardTraversal && routes.hasDown);

    if (ctx.state.role === 'student' && studentBoundary) {
      const boundaryH = studentBoundary.h;

      if (minIndices) {
        if (current.h < boundaryH) {
          canGoBack = false;
          canGoLeft = false;
          canGoUp = false;
        } else if (current.h === boundaryH) {
          canGoBack = canGoBack && (routes.hasUp || hasBackwardFragment);
          canGoLeft = false;
          canGoUp = canGoUp && routes.hasUp;
        }
      }

      if (maxIndices) {
        if (current.h > boundaryH) {
          canGoForward = false;
          canGoRight = false;
          canGoDown = false;
        } else if (current.h === boundaryH) {
          canGoForward = false;
          canGoRight = false;
          canGoDown = routes.hasDown;

          if (current.v === 0) {
            const canAdvanceTopFragments = hasForwardFragment
              && (!exactStudentBoundary || current.f < exactStudentBoundary.f);
            canGoForward = canAdvanceTopFragments;
          }
        }
      }

      if (inFollowInstructorMode && maxIndices && current.h >= boundaryH && !exactStudentBoundary) {
        canGoRight = false;
        if (current.h > boundaryH) {
          canGoForward = false;
          canGoDown = false;
        }
      }

      if (exactStudentBoundary && current.h === exactStudentBoundary.h && current.v === 0) {
        if (current.f >= exactStudentBoundary.f) {
          canGoForward = false;
        }
      }
    }

    return {
      current,
      minIndices,
      maxIndices,
      canGoBack,
      canGoForward,
      canGoLeft,
      canGoRight,
      canGoUp,
      canGoDown,
    };
  }

  function updateNavigationControls(ctx) {
    ensureNavLockStyles();

    const nav = buildNavigationStatus(ctx);
    const isUnrestricted = ctx.state.role === 'instructor' || ctx.state.role === 'standalone';
    debugLog('updateNavigationControls', {
      role: ctx.state.role,
      current: nav.current,
      canGoLeft: nav.canGoLeft,
      canGoRight: nav.canGoRight,
      canGoUp: nav.canGoUp,
      canGoDown: nav.canGoDown,
      canGoBack: nav.canGoBack,
      canGoForward: nav.canGoForward,
      isUnrestricted,
    });

    const applyArrowLocks = () => {
      const controls = document.querySelector('.reveal .controls');
      if (!controls) return;

      const isStudent = ctx.state.role === 'student';
      const allowRightShortcut = nav.canGoRight || (isStudent
        ? canAdvanceRightWithinHF(ctx, nav)
        : (nav.canGoForward && hasForwardFragmentStep(ctx.deck)));
      const allowLeftShortcut = nav.canGoLeft || (isStudent
        ? canRewindLeftWithinHF(ctx, nav)
        : (nav.canGoBack && hasBackwardFragmentStep(ctx.deck)));
      const blockForward = isStudent && !allowRightShortcut;
      const blockBack = isStudent && !allowLeftShortcut;
      const blockUp = isStudent && !nav.canGoUp;
      const blockDown = isStudent && !nav.canGoDown;
      const showRight = allowRightShortcut;
      const showLeft = allowLeftShortcut;
      const showUp = nav.canGoUp;
      const showDown = nav.canGoDown;

      const rightButton = controls.querySelector('.navigate-right');
      const leftButton = controls.querySelector('.navigate-left');
      const upButton = controls.querySelector('.navigate-up');
      const downButton = controls.querySelector('.navigate-down');

      if (rightButton) {
        rightButton.setAttribute('aria-disabled', blockForward ? 'true' : 'false');
        rightButton.setAttribute('data-syncdeck-blocked', blockForward ? 'true' : 'false');
        rightButton.setAttribute('data-syncdeck-visible', showRight ? 'true' : 'false');
        rightButton.style.pointerEvents = blockForward || !showRight ? 'none' : '';
        rightButton.style.opacity = blockForward ? '0.18' : '';
        rightButton.classList.toggle('disabled', blockForward);
        rightButton.classList.toggle('enabled', !blockForward);
        if (blockForward) {
          rightButton.classList.remove('highlight');
          rightButton.classList.remove('fragmented');
        }
      }

      if (leftButton) {
        leftButton.setAttribute('aria-disabled', blockBack ? 'true' : 'false');
        leftButton.setAttribute('data-syncdeck-blocked', blockBack ? 'true' : 'false');
        leftButton.setAttribute('data-syncdeck-visible', showLeft ? 'true' : 'false');
        leftButton.style.pointerEvents = blockBack || !showLeft ? 'none' : '';
        leftButton.style.opacity = blockBack ? '0.18' : '';
        leftButton.classList.toggle('disabled', blockBack);
        leftButton.classList.toggle('enabled', !blockBack);
        if (blockBack) {
          leftButton.classList.remove('highlight');
          leftButton.classList.remove('fragmented');
        }
      }

      if (upButton) {
        upButton.setAttribute('aria-disabled', blockUp ? 'true' : 'false');
        upButton.setAttribute('data-syncdeck-blocked', blockUp ? 'true' : 'false');
        upButton.setAttribute('data-syncdeck-visible', showUp ? 'true' : 'false');
        upButton.style.pointerEvents = blockUp || !showUp ? 'none' : '';
        upButton.style.opacity = blockUp ? '0.18' : '';
        upButton.classList.toggle('disabled', blockUp);
        upButton.classList.toggle('enabled', !blockUp);
        if (blockUp) {
          upButton.classList.remove('highlight');
          upButton.classList.remove('fragmented');
        }
      }

      if (downButton) {
        downButton.setAttribute('aria-disabled', blockDown ? 'true' : 'false');
        downButton.setAttribute('data-syncdeck-blocked', blockDown ? 'true' : 'false');
        downButton.setAttribute('data-syncdeck-visible', showDown ? 'true' : 'false');
        downButton.style.pointerEvents = blockDown || !showDown ? 'none' : '';
        downButton.style.opacity = blockDown ? '0.18' : '';
        downButton.classList.toggle('disabled', blockDown);
        downButton.classList.toggle('enabled', !blockDown);
        if (blockDown) {
          downButton.classList.remove('highlight');
          downButton.classList.remove('fragmented');
        }
      }
    };

    // For instructors and standalone mode, enable all navigation.
    if (isUnrestricted) {
      ctx.deck.configure({
        // Keep Reveal's built-in keyboard shortcuts for unrestricted roles.
        // Arrow keys are still intercepted by the runtime in capture phase.
        keyboard: true,
        touch: true,
      });
      applyArrowLocks();
      requestAnimationFrame(applyArrowLocks);
      return;
    }

    // For students, enable navigation methods only for allowed directions.
    ctx.deck.configure({
      // Directional keys are owned by the runtime's capture-phase interceptors,
      // not Reveal's built-in keyboard map.
      keyboard: false,

      // Enable touch if any horizontal or vertical navigation is permitted.
      touch: nav.canGoBack || nav.canGoForward || nav.canGoUp || nav.canGoDown,

      // Disable built-in grid overview for students to prevent viewing all slides
      // at once (bypasses boundary controls). Students use custom storyboard instead.
      overview: false,
    });

    applyArrowLocks();
    requestAnimationFrame(applyArrowLocks);
  }

  function buildSyncStatusPayload(ctx, reason) {
    return {
      reason: reason || 'status',
      role: ctx.state.role,
      capabilities: getRoleCapabilities(ctx),
      studentBoundary: getStudentBoundary(ctx),
      releasedRegion: buildReleasedRegion(ctx),
      navigation: buildNavigationStatus(ctx),
      // True when this iframe set the boundary locally (via the storyboard
      // boundary button) rather than receiving it from the host. Lets the
      // storyboard skip forward-navigation restrictions for the acting instructor.
      boundaryIsLocal: !!ctx.state.boundaryIsLocal,
      ...currentDeckState(ctx.deck),
    };
  }

  function emitLocalStatusEvent(ctx, reason) {
    window.dispatchEvent(new CustomEvent('reveal-iframesync-status', {
      detail: buildSyncStatusPayload(ctx, reason || 'localUpdate'),
    }));
  }

  function announceReady(ctx, reason) {
    const status = buildSyncStatusPayload(ctx, reason || 'init');
    safePostToParent(ctx, 'ready', status);
    emitLocalStatusEvent(ctx, reason || 'init');
  }

  function ensurePauseOverlay(ctx) {
    if (ctx.state.pauseOverlayEl) return ctx.state.pauseOverlayEl;

    const overlay = document.createElement('div');
    overlay.setAttribute('data-reveal-sync-pause-overlay', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:2147483647',
      'display:none',
      'align-items:center',
      'justify-content:center',
      'background:rgba(0,0,0,0.92)',
      'backdrop-filter:blur(1px)',
      'color:#ffffff',
      'font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
      'font-size:22px',
      'letter-spacing:0.02em',
      'pointer-events:auto',
      'user-select:none',
      'cursor:not-allowed',
    ].join(';');

    document.body.appendChild(overlay);
    ctx.state.pauseOverlayEl = overlay;
    return overlay;
  }

  function createPauseInputBlocker(ctx) {
    return (event) => {
      if (!ctx.state.pauseLockedByHost) return;
      if (ctx.state.role !== 'student') return;
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
      }
    };
  }

  function stopGestureEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') {
      event.stopImmediatePropagation();
    }
  }

  function createTouchGestureBlocker(ctx) {
    const SWIPE_THRESHOLD_PX = 12;

    return {
      onTouchStart(event) {
        if (ctx.state.role !== 'student') return;
        if (ctx.state.pauseLockedByHost) return;
        if (event.touches.length !== 1) {
          ctx.state.touchGesture = null;
          return;
        }
        const touch = event.touches[0];
        ctx.state.touchGesture = {
          id: touch.identifier,
          startX: touch.clientX,
          startY: touch.clientY,
          handled: false,
        };
      },

      onTouchMove(event) {
        const gesture = ctx.state.touchGesture;
        if (!gesture || gesture.handled) return;
        if (ctx.state.role !== 'student' || ctx.state.pauseLockedByHost) return;

        const touch = Array.from(event.touches).find((entry) => entry.identifier === gesture.id);
        if (!touch) return;

        const deltaX = touch.clientX - gesture.startX;
        const deltaY = touch.clientY - gesture.startY;
        if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
          return;
        }

        const nav = buildNavigationStatus(ctx);
        const isForwardSwipe = deltaX < 0;
        const canUseHorizontalRoute = isForwardSwipe ? nav.canGoRight : nav.canGoLeft;
        const canUseFragmentStep = isForwardSwipe
          ? (nav.canGoForward && hasForwardFragmentStep(ctx.deck))
          : (nav.canGoBack && hasBackwardFragmentStep(ctx.deck));

        if (canUseHorizontalRoute) {
          return;
        }

        stopGestureEvent(event);
        gesture.handled = true;

        if (!canUseFragmentStep) {
          return;
        }

        if (isForwardSwipe) {
          ctx.deck.next?.();
        } else {
          ctx.deck.prev?.();
        }
      },

      onTouchEnd() {
        ctx.state.touchGesture = null;
      },
    };
  }

  function applyPauseLockUi(ctx) {
    const shouldLock = ctx.state.role === 'student' && !!ctx.state.pauseLockedByHost;
    const overlay = ensurePauseOverlay(ctx);
    overlay.style.display = shouldLock ? 'flex' : 'none';
    overlay.setAttribute('aria-hidden', shouldLock ? 'false' : 'true');

    if (shouldLock) {
      // Ensure Reveal's own pause state also mirrors lock state.
      if (!ctx.deck.isPaused?.()) {
        ctx.deck.togglePause?.(true);
      }
      // Keep storyboard hidden while hard-paused.
      window.dispatchEvent(new CustomEvent('reveal-storyboard-set', { detail: { open: false } }));
    }
  }

  function wrapStudentNavigationMethods(ctx) {
    const guardedMethods = [
      ['prev', (nav) => nav.canGoBack],
      ['next', (nav) => nav.canGoForward || nav.canGoDown],
      ['left', (nav) => nav.canGoLeft],
      ['right', (nav) => nav.canGoRight],
      ['up', (nav) => nav.canGoUp],
      ['down', (nav) => nav.canGoDown],
    ];

    guardedMethods.forEach(([methodName, predicate]) => {
      const original = ctx.deck?.[methodName];
      if (typeof original !== 'function') return;

      ctx.deck[methodName] = function wrappedStudentNavigationMethod(...args) {
        if (!ctx.state.applyingRemote && (methodName === 'up' || methodName === 'down')) {
          return moveVertical(ctx, methodName);
        }

        if (!ctx.state.applyingRemote && (methodName === 'left' || methodName === 'right')) {
          return moveHorizontal(ctx, methodName);
        }

        if (!ctx.state.applyingRemote && ctx.state.role === 'student') {
          const nav = buildNavigationStatus(ctx);
          if (!predicate(nav)) {
            return undefined;
          }
          if (
            methodName === 'next'
            && nav.canGoDown
            && nav.current.v === 0
          ) {
            const exactBoundary = exactTopSlideBoundary(ctx);
            if (
              exactBoundary
              && nav.current.h === exactBoundary.h
              && nav.current.f >= exactBoundary.f
            ) {
              if (typeof ctx.deck.down === 'function') {
                return ctx.deck.down();
              }
              return ctx.deck.slide?.(nav.current.h, nav.current.v + 1, -1);
            }
          }
        }
        return original.apply(this, args);
      };

      ctx.cleanup.push(() => {
        ctx.deck[methodName] = original;
      });
    });
  }

  function captureStudentBoundary(ctx) {
    const current = normalizeIndices(ctx.deck.getIndices());
    const boundary = normalizeBoundaryIndices(current);
    ctx.state.studentMaxIndices = boundary;
    // In follow-instructor mode with forward navigation disabled, the captured
    // instructor position acts as an exact safety-net max. UI controls already
    // suppress same-h down/fragment advance, but keeping the precise synced
    // indices here lets enforceStudentNavigationBoundary snap back if touch or
    // direct API calls move the student deeper within the current stack.
    ctx.state.exactStudentMaxIndices = (!ctx.config.studentCanNavigateForward && current.v === 0)
      ? current
      : null;
    ctx.state.lastAllowedStudentIndices = current;
    ctx.state.releaseStartH = boundary.h;
    ctx.state.releaseEndH = boundary.h;
  }

  function shouldEnforceExactBoundaryLock(ctx) {
    if (ctx.state.role !== 'student') return false;
    return ctx.state.hasExplicitBoundary || !ctx.config.studentCanNavigateForward;
  }

  function syncExactBoundaryFragmentLock(ctx) {
    if (ctx.state.role !== 'student') return false;
    if (!ctx.state.studentMaxIndices) return false;

    if (!shouldEnforceExactBoundaryLock(ctx)) {
      const hadExactBoundary = !!ctx.state.exactStudentMaxIndices;
      ctx.state.exactStudentMaxIndices = null;
      return hadExactBoundary;
    }

    const boundary = normalizeBoundaryIndices(ctx.state.studentMaxIndices);
    const current = normalizeIndices(ctx.deck.getIndices());
    if (current.h !== boundary.h || current.v !== 0) return false;

    const nextExactBoundary = current;
    const previousExactBoundary = ctx.state.exactStudentMaxIndices
      ? normalizeIndices(ctx.state.exactStudentMaxIndices)
      : null;

    if (previousExactBoundary && compareIndices(previousExactBoundary, nextExactBoundary) === 0) {
      return false;
    }

    ctx.state.exactStudentMaxIndices = nextExactBoundary;
    return true;
  }

  function syncExactBoundaryFromIndices(ctx, indices) {
    if (ctx.state.role !== 'student') return false;
    if (!ctx.state.studentMaxIndices) return false;

    if (!shouldEnforceExactBoundaryLock(ctx)) {
      const hadExactBoundary = !!ctx.state.exactStudentMaxIndices;
      ctx.state.exactStudentMaxIndices = null;
      return hadExactBoundary;
    }

    const boundary = normalizeBoundaryIndices(ctx.state.studentMaxIndices);
    const nextExactBoundary = normalizeIndices(indices);
    if (nextExactBoundary.h !== boundary.h || nextExactBoundary.v !== 0) return false;

    const previousExactBoundary = ctx.state.exactStudentMaxIndices
      ? normalizeIndices(ctx.state.exactStudentMaxIndices)
      : null;

    if (previousExactBoundary && compareIndices(previousExactBoundary, nextExactBoundary) === 0) {
      return false;
    }

    ctx.state.exactStudentMaxIndices = nextExactBoundary;
    return true;
  }

  function stateIndicesFromPayload(state) {
    return normalizeIndices({
      h: state?.indexh ?? state?.indices?.h ?? 0,
      v: state?.indexv ?? state?.indices?.v ?? 0,
      f: state?.indexf ?? state?.indices?.f ?? -1,
    });
  }

  function resolveStudentSyncedState(ctx, state) {
    const incoming = stateIndicesFromPayload(state);

    if (ctx.state.role !== 'student') {
      return { applied: incoming, syncedBoundary: incoming };
    }

    const current = normalizeIndices(ctx.deck.getIndices());
    const preserveLocalStackPosition = current.h === incoming.h
      && topLevelSlideHasVerticalChildren(incoming.h)
      && (current.v > 0 || incoming.v > 0);
    if (incoming.v === 0) {
      clearSuppressedFutureFragments();
      rememberTopSlideFragment(ctx, incoming);
    }
    const applied = preserveLocalStackPosition
      ? { h: incoming.h, v: current.v, f: current.f }
      : incoming;

    return {
      applied,
      syncedBoundary: incoming,
    };
  }

  /** Default boundary for a student before the instructor has progressed. */
  function titleSlideBoundary() {
    return { h: 0, v: 0, f: -1 };
  }

  function setStudentBoundary(ctx, indices, options = {}) {
    if (!indices) return false;

    const requestedBoundary = normalizeIndices(indices);
    const nextBoundary = normalizeBoundaryIndices(requestedBoundary);
    const current = normalizeIndices(ctx.deck.getIndices());
    ctx.state.studentMaxIndices = nextBoundary;
    ctx.state.hasExplicitBoundary = true;
    const releaseStartH = Number.isFinite(Number(options.releaseStartH))
      ? Number(options.releaseStartH)
      : normalizeIndices(ctx.deck.getIndices()).h;
    ctx.state.releaseStartH = Math.min(releaseStartH, nextBoundary.h);
    ctx.state.releaseEndH = Math.max(releaseStartH, nextBoundary.h);

    // Track whether this boundary originated locally (storyboard button) so the
    // storyboard can skip forward-restriction for the acting instructor.
    ctx.state.boundaryIsLocal = !!options.localBoundary;

    // Compare against the full requested position here rather than the
    // canonicalized horizontal boundary. This is the one place where a
    // same-h pullback should count as "past" so the student can be snapped
    // back to the instructor's exact current location (including the canonical
    // root position { h, v: 0, f: -1 } when the instructor is at the top of a
    // stack / fragment sequence). Normal boundary storage and steady-state
    // navigation enforcement remain horizontal-only via nextBoundary.
    const isPastBoundary = isPastRequestedBoundary(current, requestedBoundary);
    const shouldHoldTopSlideExactly = !options.localBoundary
      && ctx.state.role === 'student'
      && requestedBoundary.v === 0;
    const shouldExactLock = !options.localBoundary
      && ctx.state.role === 'student'
      && (isPastBoundary || shouldHoldTopSlideExactly);
    ctx.state.exactStudentMaxIndices = shouldExactLock && requestedBoundary.v === 0
      ? requestedBoundary
      : null;
    const snapTarget = shouldExactLock ? requestedBoundary : nextBoundary;
    let lastAllowedTarget = current;

    // Notify the storyboard so it can display the boundary marker for all roles.
    window.dispatchEvent(new CustomEvent('reveal-storyboard-boundary-update', {
      detail: { indices: nextBoundary },
    }));

    if (ctx.state.role === 'student') {
      if (options.syncToBoundary) {
        // Jump student to the boundary slide.
        ctx.deck.slide(snapTarget.h, snapTarget.v, snapTarget.f);
        lastAllowedTarget = snapTarget;
      } else {
        // Rubber band: if student is already past the new boundary, snap back.
        if (isPastBoundary) {
          ctx.deck.slide(snapTarget.h, snapTarget.v, snapTarget.f);
          lastAllowedTarget = snapTarget;
        }
      }
    }

    // Reset the allowed-position cache for each explicit boundary session so a
    // later snap-back cannot reuse a stale v/f location from an older boundary
    // on the same horizontal slide.
    ctx.state.lastAllowedStudentIndices = normalizeIndices(lastAllowedTarget);

    // Update navigation controls to reflect new boundary.
    updateNavigationControls(ctx);

    safePostToParent(ctx, 'studentBoundaryChanged', {
      reason: options.reason || 'setStudentBoundary',
      studentBoundary: getStudentBoundary(ctx),
    });
    emitLocalStatusEvent(ctx, options.reason || 'setStudentBoundary');

    return true;
  }

  function clearStudentBoundary(ctx, reason) {
    ctx.state.studentMaxIndices = null;
    ctx.state.hasExplicitBoundary = false;
    ctx.state.boundaryIsLocal = false;
    ctx.state.exactStudentMaxIndices = null;
    ctx.state.lastAllowedStudentIndices = null;
    ctx.state.releaseStartH = null;
    ctx.state.releaseEndH = null;
    window.dispatchEvent(new CustomEvent('reveal-storyboard-boundary-update', {
      detail: { indices: null },
    }));

    // Update navigation controls to reflect cleared boundary.
    updateNavigationControls(ctx);

    safePostToParent(ctx, 'studentBoundaryChanged', {
      reason: reason || 'clearBoundary',
      studentBoundary: null,
    });
    emitLocalStatusEvent(ctx, reason || 'clearBoundary');
  }

  function enforceStudentNavigationBoundary(ctx) {
    // This now acts as a safety net. The preventive control system (updateNavigationControls)
    // should block navigation before it happens, but we keep this as a fallback for any
    // edge cases where navigation might slip through (e.g., direct API calls, browser bugs).
    if (ctx.state.applyingRemote) return;
    if (ctx.state.role !== 'student') return;
    if (!ctx.state.studentMaxIndices) return;

    const current = normalizeIndices(ctx.deck.getIndices());
    const max = normalizeBoundaryIndices(ctx.state.studentMaxIndices);
    const lastAllowed = ctx.state.lastAllowedStudentIndices
      ? normalizeIndices(ctx.state.lastAllowedStudentIndices)
      : null;
    const exactMax = exactTopSlideBoundary(ctx);

    const canGoBack = !!ctx.config.studentCanNavigateBack;
    // An explicit boundary (allowStudentForwardTo / setStudentBoundary) always
    // enforces the forward limit regardless of the studentCanNavigateForward
    // config flag.  Config flags only govern "follow instructor" mode.
    const canGoForward = ctx.state.hasExplicitBoundary
      ? false
      : !!ctx.config.studentCanNavigateForward;

    let shouldReset = false;
    if (!canGoForward && current.h > max.h) shouldReset = true;
    if (!canGoBack && current.h < max.h) shouldReset = true;
    if (!canGoBack && lastAllowed && compareIndices(current, lastAllowed) < 0) shouldReset = true;
    if (isPastForwardBoundary(ctx, current)) shouldReset = true;

    if (!shouldReset) {
      ctx.state.lastAllowedStudentIndices = current;
      return;
    }

    const target = (lastAllowed && lastAllowed.h === max.h)
      ? lastAllowed
      : (exactMax || max);

    ctx.state.applyingRemote = true;
    try {
      ctx.deck.slide(target.h, target.v, target.f);
    } finally {
      queueMicrotask(() => {
        ctx.state.applyingRemote = false;
      });
    }
  }

  function chalkboardApi() {
    return window.RevealChalkboard || null;
  }

  function callChalkboard(ctx, method, args = []) {
    const api = chalkboardApi();
    if (!api) {
      safePostToParent(ctx, 'warn', { message: 'RevealChalkboard not loaded' });
      return false;
    }
    if (typeof api[method] !== 'function') {
      safePostToParent(ctx, 'warn', { message: `RevealChalkboard.${method} not available` });
      return false;
    }
    try {
      api[method](...(Array.isArray(args) ? args : []));
      return true;
    } catch (error) {
      safePostToParent(ctx, 'warn', { message: `RevealChalkboard.${method} failed`, error: String(error) });
      return false;
    }
  }

  function applyCommand(ctx, command) {
    const deck = ctx.deck;
    const payload = command.payload || {};
    let shouldCaptureStudentBoundary = false;

    if (!deck) return;

    ctx.state.applyingRemote = true;
    try {
      switch (command.name) {
        case 'next':
          deck.next();
          shouldCaptureStudentBoundary = true;
          break;
        case 'prev':
          deck.prev();
          shouldCaptureStudentBoundary = true;
          break;
        case 'slide':
          deck.slide(payload.h ?? 0, payload.v ?? 0, payload.f);
          shouldCaptureStudentBoundary = true;
          break;
        case 'setState':
          if (payload.state) {
            // Strip `overview` before applying — Reveal's built-in grid overview
            // should never be activated on the receiving end. Instead, route the
            // overview flag to the custom bottom-of-screen storyboard strip.
            const { overview, ...safeState } = payload.state;
            const resolvedState = resolveStudentSyncedState(ctx, safeState);
            deck.setState({
              ...safeState,
              indexh: resolvedState.applied.h,
              indexv: resolvedState.applied.v,
              indexf: resolvedState.applied.f,
            });
            payload.__resolvedSyncBoundary = resolvedState.syncedBoundary;
            if (overview !== undefined) {
              window.dispatchEvent(new CustomEvent('reveal-storyboard-set', { detail: { open: !!overview } }));
            }
          }
          shouldCaptureStudentBoundary = true;
          break;

        // overview commands → custom storyboard strip (not Reveal's built-in grid).
        // The container site can send these directly from a button or toolbar.
        case 'toggleOverview':
          window.dispatchEvent(new CustomEvent('reveal-storyboard-toggle'));
          break;

        case 'showOverview':
          window.dispatchEvent(new CustomEvent('reveal-storyboard-set', { detail: { open: true } }));
          break;

        case 'hideOverview':
          window.dispatchEvent(new CustomEvent('reveal-storyboard-set', { detail: { open: false } }));
          break;
        case 'togglePause':
          if (ctx.state.role === 'student') {
            const requestedPause = (payload.override === undefined)
              ? !deck.isPaused?.()
              : !!payload.override;
            ctx.state.pauseLockedByHost = requestedPause;
            applyPauseLockUi(ctx);
          }
          deck.togglePause?.(payload.override);
          break;
        case 'pause':
          if (ctx.state.role === 'student') {
            ctx.state.pauseLockedByHost = true;
            applyPauseLockUi(ctx);
          }
          if (!deck.isPaused?.()) deck.togglePause?.(true);
          break;
        case 'resume':
          if (ctx.state.role === 'student') {
            ctx.state.pauseLockedByHost = false;
            applyPauseLockUi(ctx);
          }
          if (deck.isPaused?.()) deck.togglePause?.(false);
          break;
        case 'setRole':
          if (payload.role === 'instructor' || payload.role === 'student') {
            ctx.state.role = payload.role;
            ctx.state.pauseLockedByHost = false;
            applyPauseLockUi(ctx);
            if (ctx.state.role === 'student') {
              // Reset boundary to title slide when demoting to student.
              ctx.state.studentMaxIndices = titleSlideBoundary();
              ctx.state.hasExplicitBoundary = false;
              ctx.state.boundaryIsLocal = false;
              ctx.state.exactStudentMaxIndices = null;
              ctx.state.lastAllowedStudentIndices = titleSlideBoundary();
              ctx.state.topSlideFragmentsByH = {};
              ctx.state.releaseStartH = null;
              ctx.state.releaseEndH = null;
              // Prevent student from drawing on the chalkboard canvas.
              callChalkboard(ctx, 'configure', [{ readOnly: true }]);
            }
            // Update navigation controls to reflect new role.
            updateNavigationControls(ctx);
            safePostToParent(ctx, 'roleChanged', { role: ctx.state.role });
            announceReady(ctx, 'roleChanged');
            if (ctx.state.role === 'instructor') {
              // Broadcast the current drawing state immediately so the host can
              // relay it to all students. Covers both first load and reloads —
              // when sessionStorage is configured the plugin restores its drawings
              // before setRole arrives, so students get re-synced automatically.
              const cbApi = chalkboardApi();
              if (cbApi) {
                safePostToParent(ctx, 'chalkboardState', { storage: cbApi.getData() });
              }
            }
          }
          break;
        case 'allowStudentForwardTo': {
          const target = payload.indices || payload;
          setStudentBoundary(ctx, target, {
            syncToBoundary: !!payload.syncToBoundary,
            reason: 'allowStudentForwardTo',
            releaseStartH: payload.releaseStartH,
          });
          break;
        }
        case 'setStudentBoundary': {
          const target = payload.indices || payload;
          setStudentBoundary(ctx, target, {
            syncToBoundary: !!payload.syncToBoundary,
            reason: 'setStudentBoundary',
            releaseStartH: payload.releaseStartH,
          });
          break;
        }
        case 'clearBoundary':
          clearStudentBoundary(ctx, 'clearBoundary');
          break;
        case 'chalkboardCall':
          if (payload.method) {
            callChalkboard(ctx, payload.method, payload.args || []);
          }
          break;
        case 'toggleChalkboard':
          callChalkboard(ctx, 'toggleChalkboard');
          break;
        case 'toggleNotesCanvas':
          callChalkboard(ctx, 'toggleNotesCanvas');
          break;
        case 'clearChalkboard':
          callChalkboard(ctx, 'clear');
          break;
        case 'resetChalkboard':
          callChalkboard(ctx, 'reset');
          break;
        case 'chalkboardStroke': {
          // Relay a single draw/erase event from the instructor onto student canvas.
          const { mode: strokeMode, slide: strokeSlide, event: strokeEvent } = payload;
          if (strokeMode != null && strokeSlide && strokeEvent) {
            callChalkboard(ctx, 'replayStroke', [strokeMode, strokeSlide, strokeEvent]);
          }
          break;
        }
        case 'chalkboardState':
          // Full state sync — replace storage and redraw current slide.
          if (payload.storage) {
            callChalkboard(ctx, 'loadState', [payload.storage]);
          }
          break;
        case 'requestChalkboardState': {
          // Host asks the instructor iframe for a full state snapshot.
          const cbApi = chalkboardApi();
          if (cbApi) {
            safePostToParent(ctx, 'chalkboardState', { storage: cbApi.getData() });
          }
          break;
        }
        case 'ping':
          safePostToParent(ctx, 'pong', { ok: true });
          break;
        default:
          safePostToParent(ctx, 'warn', { message: `Unknown command: ${command.name}` });
      }

      // Auto-advance boundary when instructor syncs a position — but only if no
      // explicit boundary (allowStudentForwardTo / setStudentBoundary) is in
      // effect.  An explicit grant should not be silently overwritten by a sync.
      if (shouldCaptureStudentBoundary && ctx.state.role === 'student' && !ctx.state.hasExplicitBoundary) {
        captureStudentBoundary(ctx);
        updateNavigationControls(ctx);
        emitLocalStatusEvent(ctx, 'captureStudentBoundary');
      }

      const syncedBoundaryIndices = command.name === 'setState'
        ? payload.__resolvedSyncBoundary
        : null;
      const exactBoundaryChanged = syncedBoundaryIndices
        ? syncExactBoundaryFromIndices(ctx, syncedBoundaryIndices)
        : syncExactBoundaryFragmentLock(ctx);

      if (ctx.state.role === 'student' && ctx.state.studentMaxIndices && exactBoundaryChanged) {
        updateNavigationControls(ctx);
        emitLocalStatusEvent(ctx, 'syncExactBoundaryFragmentLock');
      }

      // If a synced state explicitly carries paused=true/false, mirror lock state
      // for students so local unpause cannot override a host pause.
      if (command.name === 'setState' && ctx.state.role === 'student') {
        const statePaused = payload?.state?.paused;
        if (typeof statePaused === 'boolean') {
          ctx.state.pauseLockedByHost = statePaused;
          applyPauseLockUi(ctx);
        }
      }
    } finally {
      queueMicrotask(() => {
        ctx.state.applyingRemote = false;
      });
    }
  }

  function wireDeckEvents(ctx) {
    const deck = ctx.deck;
    const controls = document.querySelector('.reveal .controls');

    const enforceStudentBounds = () => {
      enforceStudentNavigationBoundary(ctx);
      // Update controls after each navigation event to reflect current capabilities
      // (e.g., when reaching the last slide, forward navigation should be disabled).
      updateNavigationControls(ctx);
    };

    deck.on('slidechanged', enforceStudentBounds);
    deck.on('fragmentshown', enforceStudentBounds);
    deck.on('fragmenthidden', enforceStudentBounds);

    const emitState = () => {
      if (ctx.state.applyingRemote) return;
      safePostToParent(ctx, 'state', buildSyncStatusPayload(ctx, 'stateChanged'));
    };

    const enforcePauseLock = () => {
      if (ctx.state.applyingRemote) return;
      if (ctx.state.role !== 'student') return;
      if (!ctx.state.pauseLockedByHost) return;

      // Student tried to unpause locally while host lock is active.
      ctx.state.applyingRemote = true;
      try {
        if (!deck.isPaused?.()) {
          deck.togglePause?.(true);
        }
        applyPauseLockUi(ctx);
      } finally {
        queueMicrotask(() => {
          ctx.state.applyingRemote = false;
        });
      }
    };

    // When the instructor changes slides, send a full chalkboard snapshot so
    // the host can replace its delta buffer with a clean checkpoint.
    // Using slidechanged only (not fragmentshown/hidden) — fragment moves
    // don't change the active drawing layer, so there is nothing to flush.
    const flushChalkboardState = () => {
      if (ctx.state.applyingRemote) return;
      if (ctx.state.role !== 'instructor') return;
      const cbApi = chalkboardApi();
      if (cbApi) {
        safePostToParent(ctx, 'chalkboardState', { storage: cbApi.getData() });
      }
    };

    deck.on('slidechanged', emitState);
    deck.on('slidechanged', flushChalkboardState);
    deck.on('fragmentshown', emitState);
    deck.on('fragmenthidden', emitState);

    if (controls) {
      ['.navigate-left', '.navigate-right', '.navigate-up', '.navigate-down'].forEach((selector) => {
        const button = controls.querySelector(selector);
        if (!button) return;
        const replacement = button.cloneNode(true);
        button.replaceWith(replacement);
      });

      const currentControls = document.querySelector('.reveal .controls');
      if (!currentControls) return;

      const handleDirectionalControl = (button) => {
        debugLog('control:activate', {
          role: ctx.state.role,
          button: button.className,
          current: normalizeIndices(ctx.deck.getIndices()),
          activeElement: describeElement(document.activeElement),
        });
        if (button.matches('.navigate-left')) {
          ctx.deck.left?.();
        } else if (button.matches('.navigate-right')) {
          ctx.deck.right?.();
        } else if (button.matches('.navigate-up')) {
          ctx.deck.up?.();
        } else if (button.matches('.navigate-down')) {
          ctx.deck.down?.();
        }
      };

      const interceptControlPress = (event) => {
        const button = event.target?.closest?.('.navigate-left, .navigate-right, .navigate-up, .navigate-down');
        if (!button) return;

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }
      };

      const interceptControlClick = (event) => {
        const button = event.target?.closest?.('.navigate-left, .navigate-right, .navigate-up, .navigate-down');
        if (!button) return;
        interceptControlPress(event);
        handleDirectionalControl(button);
      };

      currentControls.addEventListener('pointerdown', interceptControlPress, true);
      currentControls.addEventListener('mousedown', interceptControlPress, true);
      currentControls.addEventListener('touchstart', interceptControlPress, true);
      currentControls.addEventListener('click', interceptControlClick, true);
      ctx.cleanup.push(() => {
        currentControls.removeEventListener('pointerdown', interceptControlPress, true);
        currentControls.removeEventListener('mousedown', interceptControlPress, true);
        currentControls.removeEventListener('touchstart', interceptControlPress, true);
        currentControls.removeEventListener('click', interceptControlClick, true);
      });
    }

    const interceptDirectionalKeyboard = (event) => {
      debugLog('raw-keydown', {
        key: event.key,
        defaultPrevented: event.defaultPrevented,
        target: describeElement(event.target),
        activeElement: describeElement(document.activeElement),
      });
        if (event.defaultPrevented) return;
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        const isVerticalKey = event.key === 'ArrowUp' || event.key === 'ArrowDown';
        const isHorizontalKey = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
      if (!isVerticalKey && !isHorizontalKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement
        && (target.isContentEditable
          || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }

        debugLog('keyboard:intercept', {
          role: ctx.state.role,
          key: event.key,
          current: normalizeIndices(ctx.deck.getIndices()),
          activeElement: describeElement(document.activeElement),
        });

        if (event.key === 'ArrowUp') {
          ctx.deck.up?.();
      } else if (event.key === 'ArrowDown') {
        ctx.deck.down?.();
      } else if (event.key === 'ArrowLeft') {
        ctx.deck.left?.();
      } else if (event.key === 'ArrowRight') {
        ctx.deck.right?.();
      }
    };

    window.addEventListener('keydown', interceptDirectionalKeyboard, true);
    document.addEventListener('keydown', interceptDirectionalKeyboard, true);
    ctx.cleanup.push(() => {
      window.removeEventListener('keydown', interceptDirectionalKeyboard, true);
      document.removeEventListener('keydown', interceptDirectionalKeyboard, true);
    });
    deck.on('paused', emitState);
    deck.on('resumed', emitState);
    deck.on('resumed', enforcePauseLock);
    deck.on('overviewshown', emitState);
    deck.on('overviewhidden', emitState);

    // Emit state to the host whenever the storyboard strip opens or closes so
    // the host can reflect the storyboard state in its own UI (overview field).
    // Bypasses applyingRemote so the host receives confirmation even when the
    // toggle was triggered by a remote command.
    const onStoryboardChanged = () => {
      safePostToParent(ctx, 'state', buildSyncStatusPayload(ctx, 'storyboardChanged'));
    };
    window.addEventListener('reveal-storyboard-changed', onStoryboardChanged);

    // When the instructor clicks a boundary button in the storyboard, relay the
    // new boundary to the host so it can propagate to the student iframe.
    // localBoundary:true lets the storyboard skip forward-restriction so the
    // acting instructor's own view is never blanked.
    const onBoundaryMoved = (event) => {
      if (ctx.state.role !== 'instructor') return;
      const indices = event.detail?.indices;
      if (!indices) {
        clearStudentBoundary(ctx, 'instructorCleared');
        return;
      }
      setStudentBoundary(ctx, indices, {
        reason: 'instructorSet',
        localBoundary: true,
        releaseStartH: normalizeIndices(ctx.deck.getIndices()).h,
      });
    };
    window.addEventListener('reveal-storyboard-boundary-moved', onBoundaryMoved);

    // Relay chalkboard draw/erase events to the host so it can forward them
    // to student iframes. Only relayed when this frame is the instructor.
    // The plugin fires 'broadcast' CustomEvents on document; event.content
    // carries {sender, type:'draw'|'erase', mode, board, fromX/Y, toX/Y, color,
    // x, y, timestamp} — all coordinates are already in logical space
    // (divided by canvas scale) so students can replay them at any viewport size.
    const onChalkboardBroadcast = (event) => {
      if (ctx.state.role !== 'instructor') return;
      const c = event.content;
      if (!c || c.sender !== 'chalkboard-plugin') return;
      // Normalize f:-1 so strokes are stored under the same key that
      // getSlideData uses — fragments share one drawing layer per slide.
      const { h, v } = deck.getIndices();
      const slide = { h, v, f: -1 };
      if (c.type === 'draw') {
        safePostToParent(ctx, 'chalkboardStroke', {
          mode: c.mode,
          slide,
          event: { type: 'draw', x1: c.fromX, y1: c.fromY, x2: c.toX, y2: c.toY, color: c.color, board: c.board, time: c.timestamp },
        });
      } else if (c.type === 'erase') {
        safePostToParent(ctx, 'chalkboardStroke', {
          mode: c.mode,
          slide,
          event: { type: 'erase', x: c.x, y: c.y, board: c.board, time: c.timestamp },
        });
      }
    };
    document.addEventListener('broadcast', onChalkboardBroadcast);

    const pauseBlocker = createPauseInputBlocker(ctx);
    const touchGestureBlocker = createTouchGestureBlocker(ctx);
    const blockedEvents = ['keydown', 'keyup', 'keypress', 'wheel', 'mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'pointerdown', 'pointerup'];
    blockedEvents.forEach((eventName) => {
      window.addEventListener(eventName, pauseBlocker, true);
    });
    window.addEventListener('touchstart', touchGestureBlocker.onTouchStart, { capture: true, passive: true });
    window.addEventListener('touchmove', touchGestureBlocker.onTouchMove, { capture: true, passive: false });
    window.addEventListener('touchend', touchGestureBlocker.onTouchEnd, true);
    window.addEventListener('touchcancel', touchGestureBlocker.onTouchEnd, true);

    ctx.cleanup.push(() => {
      deck.off('slidechanged', enforceStudentBounds);
      deck.off('fragmentshown', enforceStudentBounds);
      deck.off('fragmenthidden', enforceStudentBounds);
      deck.off('slidechanged', emitState);
      deck.off('slidechanged', flushChalkboardState);
      deck.off('fragmentshown', emitState);
      deck.off('fragmenthidden', emitState);
      deck.off('paused', emitState);
      deck.off('resumed', emitState);
      deck.off('resumed', enforcePauseLock);
      deck.off('overviewshown', emitState);
      deck.off('overviewhidden', emitState);
      window.removeEventListener('reveal-storyboard-changed', onStoryboardChanged);
      window.removeEventListener('reveal-storyboard-boundary-moved', onBoundaryMoved);
      document.removeEventListener('broadcast', onChalkboardBroadcast);
      blockedEvents.forEach((eventName) => {
        window.removeEventListener(eventName, pauseBlocker, true);
      });
      window.removeEventListener('touchstart', touchGestureBlocker.onTouchStart, true);
      window.removeEventListener('touchmove', touchGestureBlocker.onTouchMove, true);
      window.removeEventListener('touchend', touchGestureBlocker.onTouchEnd, true);
      window.removeEventListener('touchcancel', touchGestureBlocker.onTouchEnd, true);
    });
  }

  function wireWindowMessageListener(ctx) {
    const onMessage = (event) => {
      if (!isAllowedOrigin(event.origin, ctx.config.allowedOrigins)) return;
      const data = event.data;
      if (!data || data.type !== ctx.config.messageType) return;

      if (ctx.config.deckId && data.deckId && data.deckId !== ctx.config.deckId) return;

      if (data.action === 'command' && data.payload) {
        applyCommand(ctx, data.payload);
      }

      if (data.action === 'requestState') {
        safePostToParent(ctx, 'state', buildSyncStatusPayload(ctx, 'requestState'));
      }
    };

    window.addEventListener('message', onMessage);
    ctx.cleanup.push(() => window.removeEventListener('message', onMessage));
  }

  function initPlugin(deck) {
    const config = {
      ...DEFAULTS,
      ...(deck.getConfig().iframeSync || {}),
    };

    const ctx = {
      deck,
      config,
      cleanup: [],
      state: {
        // Always start as 'standalone' until the host explicitly promotes the
        // role via setRole. This prevents boundary controls from appearing in
        // any unmanaged context (direct browser, VS Code preview, etc.).
        role: 'standalone',
        applyingRemote: false,
        pauseLockedByHost: false,
        pauseOverlayEl: null,
        studentMaxIndices: titleSlideBoundary(),  // default: title slide until instructor progresses
        hasExplicitBoundary: false,  // true once allowStudentForwardTo/setStudentBoundary received
        boundaryIsLocal: false,      // true when boundary was set by storyboard button (acting instructor)
        exactStudentMaxIndices: null,
        lastAllowedStudentIndices: titleSlideBoundary(),
        topSlideFragmentsByH: {},
        touchGesture: null,
        releaseStartH: null,
        releaseEndH: null,
      },
    };

    debugLog('init', {
      role: ctx.state.role,
      deckId: config.deckId || null,
      hostOrigin: config.hostOrigin,
    });

    wireDeckEvents(ctx);
    wireWindowMessageListener(ctx);
    wrapStudentNavigationMethods(ctx);
    applyPauseLockUi(ctx);

    // Initialize navigation controls based on starting role and capabilities.
    updateNavigationControls(ctx);

    const api = {
      version: IFRAME_SYNC_VERSION,
      getRole: () => ctx.state.role,
      getStudentBoundary: () => getStudentBoundary(ctx),
      getCapabilities: () => getRoleCapabilities(ctx),
      getStatus: () => buildSyncStatusPayload(ctx, 'apiGetStatus'),
      setRole: (role) => {
        if (role === 'instructor' || role === 'student') {
          ctx.state.role = role;
          ctx.state.pauseLockedByHost = false;
          applyPauseLockUi(ctx);
          if (ctx.state.role === 'student') {
            ctx.state.studentMaxIndices = titleSlideBoundary();
            ctx.state.hasExplicitBoundary = false;
            ctx.state.boundaryIsLocal = false;
            ctx.state.exactStudentMaxIndices = null;
            ctx.state.lastAllowedStudentIndices = titleSlideBoundary();
            ctx.state.topSlideFragmentsByH = {};
            ctx.state.releaseStartH = null;
            ctx.state.releaseEndH = null;
          }
          // Update navigation controls to reflect new role.
          updateNavigationControls(ctx);
          safePostToParent(ctx, 'roleChanged', { role: ctx.state.role });
          announceReady(ctx, 'apiSetRole');
        }
      },
      sendState: () => safePostToParent(ctx, 'state', currentDeckState(deck)),
      sendCustom: (eventName, payload) => safePostToParent(ctx, eventName, payload || {}),
      chalkboard: {
        call: (method, ...args) => callChalkboard(ctx, method, args),
        toggleBoard: () => callChalkboard(ctx, 'toggleChalkboard'),
        toggleNotes: () => callChalkboard(ctx, 'toggleNotesCanvas'),
        clear: () => callChalkboard(ctx, 'clear'),
        reset: () => callChalkboard(ctx, 'reset'),
      },
      destroy: () => {
        if (ctx.state.pauseOverlayEl) {
          ctx.state.pauseOverlayEl.remove();
          ctx.state.pauseOverlayEl = null;
        }
        ctx.cleanup.forEach((fn) => fn());
        ctx.cleanup = [];
      },
    };

    // Assign to window before announceReady so the storyboard can read the
    // API immediately when it receives the reveal-iframesync-status event.
    window.RevealIframeSyncAPI = api;

    if (config.autoAnnounceReady) {
      announceReady(ctx, 'init');
    }

    return api;
  }

  window.RevealIframeSync = window.RevealIframeSync || {
    id: 'RevealIframeSync',
    version: IFRAME_SYNC_VERSION,
    init: initPlugin,
  };
})();
