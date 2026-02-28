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

  function ensureNavLockStyles() {
    if (document.getElementById(NAV_LOCK_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = NAV_LOCK_STYLE_ID;
    style.textContent = `
      .reveal .controls .navigate-left.disabled,
      .reveal .controls .navigate-right.disabled,
      .reveal .controls .navigate-left[aria-disabled="true"],
      .reveal .controls .navigate-right[aria-disabled="true"] {
        animation: none !important;
      }

      .reveal .controls .navigate-left.disabled.highlight,
      .reveal .controls .navigate-right.disabled.highlight,
      .reveal .controls .navigate-left[aria-disabled="true"].highlight,
      .reveal .controls .navigate-right[aria-disabled="true"].highlight {
        animation: none !important;
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
    return normalizeBoundaryIndices(ctx.state.studentMaxIndices);
  }

  function getDirectionalRoutes(deck) {
    const routes = (typeof deck.availableRoutes === 'function')
      ? (deck.availableRoutes() || {})
      : {};
    const hasPrev = (typeof deck.hasPrevious === 'function')
      ? !!deck.hasPrevious()
      : !!(routes.left || routes.up);
    const hasNext = (typeof deck.hasNext === 'function')
      ? !!deck.hasNext()
      : !!(routes.right || routes.down);
    return {
      hasPrev,
      hasNext,
      hasLeft: !!routes.left,
      hasRight: !!routes.right,
      hasUp: !!routes.up,
      hasDown: !!routes.down,
    };
  }

  function hasForwardStepWithinCurrentHorizontal(deck) {
    const routes = getDirectionalRoutes(deck);
    if (routes.hasDown) return true;

    const currentSlide = deck.getCurrentSlide?.();
    if (!currentSlide) return false;
    return !!currentSlide.querySelector('.fragment:not(.visible)');
  }

  function hasBackwardStepWithinCurrentHorizontal(deck) {
    const routes = getDirectionalRoutes(deck);
    if (routes.hasUp) return true;

    const current = normalizeIndices(deck.getIndices());
    return current.f > -1;
  }

  function buildReleasedRegion(ctx) {
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
    const exactStudentBoundary = ctx.state.exactStudentMaxIndices
      ? normalizeIndices(ctx.state.exactStudentMaxIndices)
      : null;
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
    const allowForward = ctx.state.role === 'student'
      ? (ctx.state.hasExplicitBoundary || roleCaps.canNavigateForward)
      : roleCaps.canNavigateForward;

    let canGoBack = allowBackward && routes.hasPrev;
    let canGoForward = allowForward && routes.hasNext;
    let canGoUp = routes.hasUp;
    let canGoDown = routes.hasDown;

    if (ctx.state.role === 'student' && studentBoundary) {
      const boundaryH = studentBoundary.h;

      if (minIndices) {
        if (current.h < boundaryH) {
          canGoBack = false;
          canGoUp = false;
        } else if (current.h === boundaryH) {
          canGoBack = canGoBack && hasBackwardStepWithinCurrentHorizontal(ctx.deck);
          canGoUp = canGoUp && hasBackwardStepWithinCurrentHorizontal(ctx.deck);
        }
      }

      if (maxIndices) {
        if (current.h > boundaryH) {
          canGoForward = false;
          canGoDown = false;
        } else if (current.h === boundaryH) {
          const canAdvanceWithinCurrentHorizontal = hasForwardStepWithinCurrentHorizontal(ctx.deck);
          canGoForward = canGoForward && canAdvanceWithinCurrentHorizontal;
          canGoDown = canGoDown && canAdvanceWithinCurrentHorizontal;
        }
      }

      if (inFollowInstructorMode && maxIndices && current.h >= boundaryH) {
        canGoForward = false;
        canGoDown = false;
      }

      if (exactStudentBoundary && current.h === exactStudentBoundary.h) {
        if (compareIndices(current, exactStudentBoundary) >= 0) {
          canGoForward = false;
          canGoDown = false;
        }
      }
    }

    return {
      current,
      minIndices,
      maxIndices,
      canGoBack,
      canGoForward,
      canGoUp,
      canGoDown,
    };
  }

  function updateNavigationControls(ctx) {
    ensureNavLockStyles();

    const nav = buildNavigationStatus(ctx);
    const isUnrestricted = ctx.state.role === 'instructor' || ctx.state.role === 'standalone';

    const applyArrowLocks = () => {
      const controls = document.querySelector('.reveal .controls');
      if (!controls) return;

      const isStudent = ctx.state.role === 'student';
      const blockForward = isStudent && !nav.canGoForward;
      const blockBack = isStudent && !nav.canGoBack;

      // Only lock left/right (horizontal navigation tied to boundaries).
      // Up/down (vertical nested slides) are independent and RevealJS handles visibility.
      const rightButton = controls.querySelector('.navigate-right');
      const leftButton = controls.querySelector('.navigate-left');

      if (rightButton) {
        rightButton.setAttribute('aria-disabled', blockForward ? 'true' : 'false');
        rightButton.style.pointerEvents = blockForward ? 'none' : '';
        rightButton.style.opacity = blockForward ? '0.18' : '';
        if (blockForward) {
          rightButton.classList.remove('highlight');
        }
      }

      if (leftButton) {
        leftButton.setAttribute('aria-disabled', blockBack ? 'true' : 'false');
        leftButton.style.pointerEvents = blockBack ? 'none' : '';
        leftButton.style.opacity = blockBack ? '0.18' : '';
        if (blockBack) {
          leftButton.classList.remove('highlight');
        }
      }
    };

    // For instructors and standalone mode, enable all navigation.
    if (isUnrestricted) {
      ctx.deck.configure({
        keyboard: true,
        touch: true,
      });
      applyArrowLocks();
      requestAnimationFrame(applyArrowLocks);
      return;
    }

    // For students, enable navigation methods only for allowed directions.
    // Use a keyboard map to selectively enable only permitted navigation keys.
    const keyboardMap = {};

    if (nav.canGoBack) {
      keyboardMap[37] = 'left';   // left arrow
      keyboardMap[72] = 'left';   // h
      keyboardMap[33] = 'prev';   // page up
    }

    if (nav.canGoForward) {
      keyboardMap[39] = 'right';  // right arrow
      keyboardMap[76] = 'right';  // l
      keyboardMap[34] = 'next';   // page down
      keyboardMap[32] = 'next';   // space
    }

    if (nav.canGoUp) {
      keyboardMap[38] = 'up';     // up arrow (for vertical slides)
    }

    if (nav.canGoDown) {
      keyboardMap[40] = 'down';   // down arrow (for vertical slides)
    }

    // Allow ESC but not for overview (map to 'null' to disable default ESC behavior).
    // Students should not see the built-in grid overview as it bypasses boundaries.
    keyboardMap[27] = 'null';     // escape (disable overview)
    keyboardMap[79] = 'null';     // o (disable overview)
    keyboardMap[70] = 'null';     // f (fullscreen)

    ctx.deck.configure({
      // Enable keyboard only with the specific keys we've mapped.
      keyboard: Object.keys(keyboardMap).length > 0 ? keyboardMap : false,

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

  function captureStudentBoundary(ctx) {
    const current = normalizeIndices(ctx.deck.getIndices());
    const boundary = normalizeBoundaryIndices(current);
    ctx.state.studentMaxIndices = boundary;
    ctx.state.lastAllowedStudentIndices = current;
    ctx.state.releaseStartH = boundary.h;
    ctx.state.releaseEndH = boundary.h;
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

    const shouldExactLock = !options.localBoundary
      && ctx.state.role === 'student'
      && current.h > nextBoundary.h;
    ctx.state.exactStudentMaxIndices = shouldExactLock ? requestedBoundary : null;
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
        if (current.h > nextBoundary.h) {
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
    const exactMax = ctx.state.exactStudentMaxIndices
      ? normalizeIndices(ctx.state.exactStudentMaxIndices)
      : null;

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
    if (exactMax && compareIndices(current, exactMax) > 0) shouldReset = true;

    if (!shouldReset) {
      ctx.state.lastAllowedStudentIndices = current;
      return;
    }

    const lastAllowed = ctx.state.lastAllowedStudentIndices
      ? normalizeIndices(ctx.state.lastAllowedStudentIndices)
      : null;
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
            deck.setState(safeState);
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
              ctx.state.releaseStartH = 0;
              ctx.state.releaseEndH = 0;
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
        emitLocalStatusEvent(ctx, 'captureStudentBoundary');
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
    const blockedEvents = ['keydown', 'keyup', 'keypress', 'wheel', 'mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'pointerdown', 'pointerup'];
    blockedEvents.forEach((eventName) => {
      window.addEventListener(eventName, pauseBlocker, true);
    });

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
        releaseStartH: 0,
        releaseEndH: 0,
      },
    };

    wireDeckEvents(ctx);
    wireWindowMessageListener(ctx);
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
            ctx.state.releaseStartH = 0;
            ctx.state.releaseEndH = 0;
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
