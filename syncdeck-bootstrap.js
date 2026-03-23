(function (global) {
  'use strict';

  var HOSTING_STYLE_ID = 'syncdeck-standalone-hosting-styles';
  var HOSTING_UI_ID = 'syncdeck-standalone-hosting';
  var HOSTING_CONTROLLER_GLOBAL_KEY = '__syncdeckStandaloneHostingController';
  var DEFAULT_HOSTING_CTA_LABEL = 'Host in SyncDeck';
  var DEFAULT_HOSTING_ROUTE = '/util/syncdeck/launch-presentation';

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

  var STANDALONE_HOSTING_DEFAULTS = {
    enabled: true,
    activeBitsOrigin: null,
    launchPath: DEFAULT_HOSTING_ROUTE,
    presentationUrl: null,
    ctaLabel: DEFAULT_HOSTING_CTA_LABEL,
    ctaTimeoutMs: 9000,
    logoUrl: null,
    navigate: null,
  };

  function merge(target, source) {
    return Object.assign({}, target || {}, source || {});
  }

  function trimToNull(value) {
    if (typeof value !== 'string') return null;
    var trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  function readRequiredString(value, fieldName) {
    var normalized = trimToNull(value);
    if (!normalized) {
      throw new Error('Missing ' + fieldName);
    }
    return normalized;
  }

  function parseAbsoluteHttpUrl(value, fieldName) {
    var normalized = readRequiredString(value, fieldName);
    var parsed;
    if (!/^https?:\/\//i.test(normalized)) {
      throw new Error('Invalid ' + fieldName);
    }
    try {
      parsed = new URL(normalized);
    } catch {
      throw new Error('Invalid ' + fieldName);
    }

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error('Invalid ' + fieldName);
    }

    return parsed;
  }

  function normalizeActiveBitsOrigin(value) {
    var parsed = parseAbsoluteHttpUrl(value, 'ActiveBits origin');
    if (
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash ||
      parsed.pathname !== '/'
    ) {
      throw new Error('Invalid ActiveBits origin');
    }
    return parsed.origin;
  }

  function normalizeLaunchPath(value) {
    var normalized = trimToNull(value) || DEFAULT_HOSTING_ROUTE;
    if (/[\\\r\n]/.test(normalized) || /^\/\//.test(normalized) || /^[a-z][a-z0-9+.-]*:/i.test(normalized)) {
      throw new Error('Invalid launch path');
    }
    if (normalized.charAt(0) !== '/') {
      normalized = '/' + normalized;
    }
    if (/^\/\//.test(normalized)) {
      throw new Error('Invalid launch path');
    }
    return normalized;
  }

  function getRuntimeBaseUrl() {
    if (global.__syncdeckRuntimeBaseUrl) return global.__syncdeckRuntimeBaseUrl;

    if (typeof document === 'undefined') return '';

    var currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
      global.__syncdeckRuntimeBaseUrl = new URL('.', currentScript.src).toString();
      return global.__syncdeckRuntimeBaseUrl;
    }

    var scripts = document.getElementsByTagName('script');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      var script = scripts[index];
      var src = script && script.src;
      if (!src) continue;
      if (/syncdeck-reveal\.js(?:[?#].*)?$/.test(src)) {
        global.__syncdeckRuntimeBaseUrl = new URL('.', src).toString();
        return global.__syncdeckRuntimeBaseUrl;
      }
    }

    var href = global.location && global.location.href ? global.location.href : 'http://localhost/';
    global.__syncdeckRuntimeBaseUrl = new URL('./', href).toString();
    return global.__syncdeckRuntimeBaseUrl;
  }

  function buildDefaultLogoUrl() {
    return new URL('assets/syncdeck.png', getRuntimeBaseUrl()).toString();
  }

  function buildCanonicalPresentationUrl(explicitUrl) {
    var currentUrl;
    if (explicitUrl != null) {
      currentUrl = parseAbsoluteHttpUrl(explicitUrl, 'presentation URL');
    } else {
      if (!global.location || !global.location.href) {
        throw new Error('Missing presentation URL');
      }

      currentUrl = new URL(global.location.href);
      if (currentUrl.protocol !== 'http:' && currentUrl.protocol !== 'https:') {
        throw new Error('Invalid presentation URL');
      }
    }
    currentUrl.hash = '';
    return currentUrl.toString();
  }

  function getNavigateImplementation(config) {
    if (config && typeof config.navigate === 'function') return config.navigate;
    return function (url) {
      global.location.assign(url);
    };
  }

  function buildSyncDeckLaunchUrl(params) {
    var options = params || {};
    var activeBitsOrigin = normalizeActiveBitsOrigin(options.activeBitsOrigin);
    var launchPath = normalizeLaunchPath(options.launchPath);
    var presentationUrl = buildCanonicalPresentationUrl(options.presentationUrl);
    var launchUrl = new URL(launchPath, activeBitsOrigin);
    launchUrl.searchParams.set('presentationUrl', presentationUrl);
    return launchUrl.toString();
  }

  function launchPresentationInSyncDeck(params) {
    var options = params || {};
    var navigate = getNavigateImplementation(options);
    var launchUrl = buildSyncDeckLaunchUrl(options);
    navigate(launchUrl);
    return launchUrl;
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

  function normalizeStandaloneHostingConfig(config) {
    if (config === false || config == null) return null;

    var normalized = merge(STANDALONE_HOSTING_DEFAULTS, config);
    if (normalized.enabled === false) return null;

    if (!trimToNull(normalized.activeBitsOrigin)) {
      return null;
    }

    normalized.activeBitsOrigin = normalizeActiveBitsOrigin(normalized.activeBitsOrigin);
    normalized.launchPath = normalizeLaunchPath(normalized.launchPath);
    normalized.ctaLabel = trimToNull(normalized.ctaLabel) || DEFAULT_HOSTING_CTA_LABEL;
    normalized.logoUrl = trimToNull(normalized.logoUrl) || buildDefaultLogoUrl();
    normalized.ctaTimeoutMs = Number(normalized.ctaTimeoutMs);
    if (!Number.isFinite(normalized.ctaTimeoutMs) || normalized.ctaTimeoutMs < 0) {
      normalized.ctaTimeoutMs = STANDALONE_HOSTING_DEFAULTS.ctaTimeoutMs;
    }

    if (normalized.presentationUrl != null) {
      normalized.presentationUrl = buildCanonicalPresentationUrl(normalized.presentationUrl);
    }

    return normalized;
  }

  function ensureStandaloneHostingStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(HOSTING_STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = HOSTING_STYLE_ID;
    style.textContent = ''
      + '#' + HOSTING_UI_ID + ' {'
      + ' position: fixed;'
      + ' top: 20px;'
      + ' right: 20px;'
      + ' z-index: 32;'
      + ' max-width: min(420px, calc(100vw - 32px));'
      + ' font-family: "Avenir Next", "Segoe UI", sans-serif;'
      + ' color: #f8fafc;'
      + ' opacity: 0;'
      + ' transform: translateY(-10px);'
      + ' pointer-events: none;'
      + ' transition: opacity 180ms ease, transform 180ms ease;'
      + '}'
      + '#' + HOSTING_UI_ID + '[data-visible="true"] {'
      + ' opacity: 1;'
      + ' transform: translateY(0);'
      + ' pointer-events: auto;'
      + '}'
      + '#' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__panel {'
      + ' display: flex;'
      + ' align-items: center;'
      + ' gap: 12px;'
      + ' padding: 12px 14px;'
      + ' border-radius: 18px;'
      + ' background: rgba(15, 23, 42, 0.94);'
      + ' border: 1px solid rgba(148, 163, 184, 0.28);'
      + ' box-shadow: 0 18px 48px rgba(15, 23, 42, 0.35);'
      + ' backdrop-filter: blur(12px);'
      + '}'
      + '#' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__logo {'
      + ' width: 42px;'
      + ' height: 42px;'
      + ' flex: 0 0 auto;'
      + ' object-fit: contain;'
      + ' border-radius: 12px;'
      + ' background: rgba(255, 255, 255, 0.08);'
      + ' padding: 6px;'
      + '}'
      + '#' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__actions {'
      + ' display: flex;'
      + ' align-items: center;'
      + ' gap: 10px;'
      + '}'
      + '#' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__button {'
      + ' appearance: none;'
      + ' border: none;'
      + ' border-radius: 999px;'
      + ' padding: 10px 16px;'
      + ' font: inherit;'
      + ' font-size: 13px;'
      + ' font-weight: 700;'
      + ' cursor: pointer;'
      + ' color: #082f49;'
      + ' background: linear-gradient(135deg, #f8fafc 0%, #7dd3fc 100%);'
      + ' white-space: nowrap;'
      + '}'
      + '@media (max-width: 720px) {'
      + ' #' + HOSTING_UI_ID + ' {'
      + '  top: 12px;'
      + '  right: 12px;'
      + '  left: 12px;'
      + '  max-width: none;'
      + ' }'
      + ' #' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__panel {'
      + '  align-items: flex-start;'
      + ' }'
      + ' #' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__actions {'
      + '  width: 100%;'
      + '  margin-left: 0;'
      + ' }'
      + ' #' + HOSTING_UI_ID + ' .syncdeck-standalone-hosting__button {'
      + '  width: 100%;'
      + ' }'
      + '}';
    document.head.appendChild(style);
  }

  function createStandaloneHostingUi(config) {
    if (typeof document === 'undefined' || !config) return null;

    ensureStandaloneHostingStyles();

    var existing = document.getElementById(HOSTING_UI_ID);
    if (existing) {
      existing.remove();
    }

    var root = document.createElement('div');
    root.id = HOSTING_UI_ID;
    root.setAttribute('data-visible', 'false');
    root.setAttribute('data-state', 'idle');

    var panel = document.createElement('div');
    panel.className = 'syncdeck-standalone-hosting__panel';

    var logo = document.createElement('img');
    logo.className = 'syncdeck-standalone-hosting__logo';
    logo.alt = 'SyncDeck';
    logo.src = config.logoUrl;
    panel.appendChild(logo);

    var actions = document.createElement('div');
    actions.className = 'syncdeck-standalone-hosting__actions';

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'syncdeck-standalone-hosting__button';
    button.textContent = config.ctaLabel;
    button.setAttribute('aria-label', config.ctaLabel);
    actions.appendChild(button);

    panel.appendChild(actions);
    root.appendChild(panel);
    document.body.appendChild(root);

    var hideTimer = null;
    var active = true;

    function applyVisibilityState(visible) {
      root.setAttribute('data-visible', visible ? 'true' : 'false');
      root.setAttribute('aria-hidden', visible ? 'false' : 'true');
      if (visible) {
        root.removeAttribute('inert');
        button.disabled = false;
        button.tabIndex = 0;
      } else {
        root.setAttribute('inert', '');
        button.disabled = true;
        button.tabIndex = -1;
      }
    }

    function clearHideTimer() {
      if (!hideTimer) return;
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    function scheduleHide() {
      clearHideTimer();
      if (config.ctaTimeoutMs <= 0) return;
      hideTimer = global.setTimeout(function () {
        if (!active) return;
        applyVisibilityState(false);
      }, config.ctaTimeoutMs);
    }

    function onClick() {
      launchPresentationInSyncDeck(config);
    }

    button.addEventListener('click', onClick);
    applyVisibilityState(false);

    return {
      show: function () {
        if (!active) return;
        applyVisibilityState(true);
        scheduleHide();
      },
      hide: function () {
        if (!active) return;
        clearHideTimer();
        applyVisibilityState(false);
      },
      syncRole: function (role) {
        if (role === 'standalone') {
          this.show();
        } else {
          this.hide();
        }
      },
      destroy: function () {
        active = false;
        clearHideTimer();
        button.removeEventListener('click', onClick);
        root.remove();
      },
      getElement: function () {
        return root;
      },
    };
  }

  function installStandaloneHostingController(config) {
    if (global[HOSTING_CONTROLLER_GLOBAL_KEY] && typeof global[HOSTING_CONTROLLER_GLOBAL_KEY].destroy === 'function') {
      global[HOSTING_CONTROLLER_GLOBAL_KEY].destroy();
      global[HOSTING_CONTROLLER_GLOBAL_KEY] = null;
    }

    var normalizedConfig;
    try {
      normalizedConfig = normalizeStandaloneHostingConfig(config);
    } catch (error) {
      if (typeof global.console !== 'undefined' && typeof global.console.warn === 'function') {
        global.console.warn('[syncdeck-bootstrap] Unable to enable standalone hosting CTA:', error);
      }
      return null;
    }

    if (!normalizedConfig) return null;

    var ui = createStandaloneHostingUi(normalizedConfig);
    if (!ui) return null;

    function syncFromApi() {
      var role = null;
      if (global.RevealIframeSyncAPI && typeof global.RevealIframeSyncAPI.getRole === 'function') {
        role = global.RevealIframeSyncAPI.getRole();
      }
      ui.syncRole(role || 'standalone');
    }

    function onStatus(event) {
      var role = event && event.detail ? event.detail.role : null;
      ui.syncRole(role || 'standalone');
    }

    global.addEventListener('reveal-iframesync-status', onStatus);

    var controller = {
      destroy: function () {
        global.removeEventListener('reveal-iframesync-status', onStatus);
        ui.destroy();
        if (global[HOSTING_CONTROLLER_GLOBAL_KEY] === controller) {
          global[HOSTING_CONTROLLER_GLOBAL_KEY] = null;
        }
      },
      ui: ui,
      config: normalizedConfig,
      syncFromApi: syncFromApi,
    };

    global[HOSTING_CONTROLLER_GLOBAL_KEY] = controller;
    return controller;
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

    var standaloneHostingController = installStandaloneHostingController(cfg.standaloneHosting);
    var afterInit = cfg.afterInit;
    if (standaloneHostingController) {
      afterInit = function (revealGlobal) {
        standaloneHostingController.syncFromApi();
        if (typeof cfg.afterInit === 'function') {
          return cfg.afterInit(revealGlobal);
        }
        return undefined;
      };
    }

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

    if (typeof afterInit === 'function') {
      if (initResult && typeof initResult.then === 'function') {
        initResult.then(
          function () {
            runAfterInit(afterInit, global.Reveal);
          },
          function (error) {
            if (typeof global.console !== 'undefined' && typeof global.console.error === 'function') {
              global.console.error('[syncdeck-bootstrap] Reveal.initialize failed before afterInit:', error);
            }
          }
        );
      } else {
        runAfterInit(afterInit, global.Reveal);
      }
    }

    return initResult;
  }

  global.buildSyncDeckLaunchUrl = buildSyncDeckLaunchUrl;
  global.launchPresentationInSyncDeck = launchPresentationInSyncDeck;
  global.initSyncDeckReveal = initSyncDeckReveal;
}(window));
