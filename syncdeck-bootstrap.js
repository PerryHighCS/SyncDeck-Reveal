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
    var sources = [
      { plugins: Array.isArray(customPlugins) ? customPlugins : [], required: false },
      { plugins: Array.isArray(requiredPlugins) ? requiredPlugins : [], required: true },
    ];

    for (var sourceIndex = 0; sourceIndex < sources.length; sourceIndex += 1) {
      var source = sources[sourceIndex];
      var allPlugins = source.plugins;
      for (var i = 0; i < allPlugins.length; i += 1) {
        var plugin = allPlugins[i];
        if (!plugin) continue;
        if (plugin.id) {
          if (Object.prototype.hasOwnProperty.call(seenIds, plugin.id)) {
            if (source.required) {
              merged[seenIds[plugin.id]] = plugin;
            }
            continue;
          }
          seenIds[plugin.id] = merged.length;
        } else if (merged.indexOf(plugin) !== -1) {
          continue;
        }
        merged.push(plugin);
      }
    }

    return merged;
  }

  function runAfterInit(callback, revealGlobal) {
    try {
      return Promise.resolve(callback(revealGlobal)).catch(function (error) {
        if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
          global.console.error('[syncdeck-bootstrap] afterInit callback failed:', error);
        }
      });
    } catch (error) {
      if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
        global.console.error('[syncdeck-bootstrap] afterInit callback failed:', error);
      }
      return Promise.resolve();
    }
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
            runAfterInit(cfg.afterInit, global.Reveal);
          },
          function (error) {
            if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
              global.console.error('[syncdeck-bootstrap] Reveal.initialize failed before afterInit:', error);
            }
          }
        );
      } else {
        runAfterInit(cfg.afterInit, global.Reveal);
      }
    }

    return initResult;
  }

  global.initSyncDeckReveal = initSyncDeckReveal;
}(window));
