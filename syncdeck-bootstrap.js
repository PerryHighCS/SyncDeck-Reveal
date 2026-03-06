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

  function mergePlugins(customPlugins, requiredPlugins) {
    var merged = [];
    var seenIds = Object.create(null);
    var allPlugins = []
      .concat(Array.isArray(customPlugins) ? customPlugins : [])
      .concat(Array.isArray(requiredPlugins) ? requiredPlugins : []);

    for (var i = 0; i < allPlugins.length; i += 1) {
      var plugin = allPlugins[i];
      if (!plugin) continue;
      if (plugin.id) {
        if (Object.prototype.hasOwnProperty.call(seenIds, plugin.id)) continue;
        seenIds[plugin.id] = true;
      } else if (merged.indexOf(plugin) !== -1) {
        continue;
      }
      merged.push(plugin);
    }

    return merged;
  }

  function sanitizeChalkboardConfig(chalkboardConfig) {
    if (chalkboardConfig && Object.prototype.hasOwnProperty.call(chalkboardConfig, 'storage')) {
      var sanitized = merge(chalkboardConfig);
      delete sanitized.storage;
      if (typeof global.console !== 'undefined' && typeof global.console.warn === 'function') {
        global.console.warn(
          '[syncdeck-bootstrap] Ignoring chalkboard.storage: host-managed state is required.'
        );
      }
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
    revealConfig.plugins = mergePlugins(revealConfig.plugins, buildPlugins());

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
      if (initResult && typeof initResult.then === 'function') {
        initResult.then(
          function () {
            try {
              cfg.afterInit(global.Reveal);
            } catch (error) {
              if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
                global.console.error('[syncdeck-bootstrap] afterInit callback failed:', error);
              }
            }
          },
          function (error) {
            if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
              global.console.error('[syncdeck-bootstrap] Reveal.initialize failed before afterInit:', error);
            }
          }
        );
      } else {
        try {
          cfg.afterInit(global.Reveal);
        } catch (error) {
          if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
            global.console.error('[syncdeck-bootstrap] afterInit callback failed:', error);
          }
        }
      }
    }

    return initResult;
  }

  global.initSyncDeckReveal = initSyncDeckReveal;
}(window));
