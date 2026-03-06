(function (global) {
  'use strict';

  var REVEAL_DEFAULTS = {
    hash: true,
    hashOneBasedIndex: true,
    transition: 'fade',
    transitionSpeed: 'fast',
    backgroundTransition: 'none',
    center: false,
    controls: true,
    controlsLayout: 'edges',
    progress: true,
    slideNumber: 'c/t',
    keyboard: true,
    touch: true,
    fragments: true,
    width: 1600,
    height: 900,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.5,
  };

  var IFRAME_SYNC_DEFAULTS = {
    hostOrigin: '*',
    allowedOrigins: ['*'],
    studentCanNavigateBack: true,
    studentCanNavigateForward: false,
  };

  var CHALKBOARD_DEFAULTS = {
    boardmarkerWidth: 4,
    chalkWidth: 7,
  };

  var STORYBOARD_DEFAULTS = {
    storyboardId: 'storyboard',
    trackId: 'storyboard-track',
    toggleKey: 'm',
  };

  function merge(target, source) {
    return Object.assign({}, target || {}, source || {});
  }

  function buildPlugins() {
    return [global.RevealNotes, global.RevealChalkboard, global.RevealIframeSync].filter(Boolean);
  }

  function sanitizeChalkboardConfig(chalkboardConfig) {
    if (chalkboardConfig && Object.prototype.hasOwnProperty.call(chalkboardConfig, 'storage')) {
      var sanitized = merge(chalkboardConfig);
      delete sanitized.storage;
      return sanitized;
    }
    return chalkboardConfig;
  }

  function initSyncDeckReveal(config) {
    var cfg = config || {};
    if (!cfg.deckId) {
      throw new Error('initSyncDeckReveal requires config.deckId');
    }
    if (!global.Reveal || typeof global.Reveal.initialize !== 'function') {
      throw new Error('Reveal.js must be loaded before initSyncDeckReveal');
    }

    var revealConfig = merge(REVEAL_DEFAULTS, cfg.revealOverrides);
    revealConfig.iframeSync = merge(
      merge(IFRAME_SYNC_DEFAULTS, { deckId: cfg.deckId }),
      cfg.iframeSyncOverrides
    );

    revealConfig.chalkboard = sanitizeChalkboardConfig(
      merge(CHALKBOARD_DEFAULTS, cfg.chalkboardOverrides)
    );
    revealConfig.plugins = buildPlugins();

    var initResult = global.Reveal.initialize(revealConfig);

    if (typeof global.initRevealStoryboard === 'function') {
      var storyboard = merge(STORYBOARD_DEFAULTS, cfg.storyboard);
      global.initRevealStoryboard({
        reveal: global.Reveal,
        storyboardId: storyboard.storyboardId,
        trackId: storyboard.trackId,
        toggleKey: storyboard.toggleKey,
      });
    }

    if (typeof cfg.afterInit === 'function') {
      cfg.afterInit(global.Reveal);
    }

    return initResult;
  }

  global.initSyncDeckReveal = initSyncDeckReveal;
}(window));
