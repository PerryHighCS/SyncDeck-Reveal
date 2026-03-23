(function () {
  'use strict';

  var pi = Object.defineProperty, vi = Object.defineProperties;
  var mi = Object.getOwnPropertyDescriptors;
  var xt$1 = Object.getOwnPropertySymbols;
  var yi = Object.prototype.hasOwnProperty, bi = Object.prototype.propertyIsEnumerable;
  var qe = (c, e, i) => e in c ? pi(c, e, { enumerable: true, configurable: true, writable: true, value: i }) : c[e] = i, Q$1 = (c, e) => {
    for (var i in e || (e = {}))
      yi.call(e, i) && qe(c, i, e[i]);
    if (xt$1)
      for (var i of xt$1(e))
        bi.call(e, i) && qe(c, i, e[i]);
    return c;
  }, We = (c, e) => vi(c, mi(e));
  var je = (c, e, i) => qe(c, typeof e != "symbol" ? e + "" : e, i);
  var It$1 = (c, e, i) => new Promise((t, s) => {
    var a = (h) => {
      try {
        o(i.next(h));
      } catch (u) {
        s(u);
      }
    }, r = (h) => {
      try {
        o(i.throw(h));
      } catch (u) {
        s(u);
      }
    }, o = (h) => h.done ? t(h.value) : Promise.resolve(h.value).then(a, r);
    o((i = i.apply(c, e)).next());
  });
  const ge = (c, e) => {
    for (let i in e)
      c[i] = e[i];
    return c;
  }, E$1 = (c, e) => Array.from(c.querySelectorAll(e)), Ke = (c, e, i) => {
    i ? c.classList.add(e) : c.classList.remove(e);
  }, fe = (c) => {
    if (typeof c == "string") {
      if (c === "null") return null;
      if (c === "true") return true;
      if (c === "false") return false;
      if (c.match(/^-?[\d\.]+$/)) return parseFloat(c);
    }
    return c;
  }, ae$1 = (c, e) => {
    c.style.transform = e;
  }, xe = (c, e) => {
    let i = c.matches || c.matchesSelector || c.msMatchesSelector;
    return !!(i && i.call(c, e));
  }, V = (c, e) => {
    if (c && typeof c.closest == "function")
      return c.closest(e);
    for (; c; ) {
      if (xe(c, e))
        return c;
      c = c.parentElement;
    }
    return null;
  }, Dt$1 = (c) => {
    c = c || document.documentElement;
    let e = c.requestFullscreen || c.webkitRequestFullscreen || c.webkitRequestFullScreen || c.mozRequestFullScreen || c.msRequestFullscreen;
    e && e.apply(c);
  }, wi = (c, e, i, t = "") => {
    let s = c.querySelectorAll("." + i);
    for (let r = 0; r < s.length; r++) {
      let o = s[r];
      if (o.parentNode === c)
        return o;
    }
    let a = document.createElement(e);
    return a.className = i, a.innerHTML = t, c.appendChild(a), a;
  }, Xe = (c) => {
    let e = document.createElement("style");
    return c && c.length > 0 && e.appendChild(document.createTextNode(c)), document.head.appendChild(e), e;
  }, Mt$1 = () => {
    let c = {};
    location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, (e) => {
      const i = e.split("=").shift(), t = e.split("=").pop();
      return i && t !== void 0 && (c[i] = t), e;
    });
    for (let e in c) {
      let i = c[e];
      c[e] = fe(unescape(i));
    }
    return typeof c.dependencies != "undefined" && delete c.dependencies, c;
  }, Ei = (c, e = 0) => {
    var i;
    if (c) {
      let t, s = c.style.height;
      return c.style.height = "0px", c.parentElement && (c.parentElement.style.height = "auto"), t = e - (((i = c.parentElement) == null ? void 0 : i.offsetHeight) || 0), c.style.height = s + "px", c.parentElement && c.parentElement.style.removeProperty("height"), t;
    }
    return e;
  }, Si = {
    mp4: "video/mp4",
    m4a: "video/mp4",
    ogv: "video/ogg",
    mpeg: "video/mpeg",
    webm: "video/webm"
  }, Ai = (c = "") => {
    const e = c.split(".").pop();
    return e ? Si[e] : void 0;
  }, Ri = (c = "") => encodeURI(c).replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), Vt$1 = navigator.userAgent, le$1 = /(iphone|ipod|ipad|android)/gi.test(Vt$1) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, Ft$1 = /android/gi.test(Vt$1);
  var ki = (function(c) {
    if (c) {
      var e = function(f) {
        return [].slice.call(f);
      }, i = 0, t = 1, s = 2, a = 3, r = [], o = null, h = "requestAnimationFrame" in c ? function() {
        var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { sync: false };
        c.cancelAnimationFrame(o);
        var S = function() {
          return g(r.filter((function(T) {
            return T.dirty && T.active;
          })));
        };
        if (f.sync) return S();
        o = c.requestAnimationFrame(S);
      } : function() {
      }, u = function(f) {
        return function(S) {
          r.forEach((function(T) {
            return T.dirty = f;
          })), h(S);
        };
      }, g = function(f) {
        f.filter((function(T) {
          return !T.styleComputed;
        })).forEach((function(T) {
          T.styleComputed = l(T);
        })), f.filter(A).forEach(M);
        var S = f.filter(b);
        S.forEach(p), S.forEach((function(T) {
          M(T), y(T);
        })), S.forEach(O);
      }, y = function(f) {
        return f.dirty = i;
      }, p = function(f) {
        f.availableWidth = f.element.parentNode.clientWidth, f.currentWidth = f.element.scrollWidth, f.previousFontSize = f.currentFontSize, f.currentFontSize = Math.min(Math.max(f.minSize, f.availableWidth / f.currentWidth * f.previousFontSize), f.maxSize), f.whiteSpace = f.multiLine && f.currentFontSize === f.minSize ? "normal" : "nowrap";
      }, b = function(f) {
        return f.dirty !== s || f.dirty === s && f.element.parentNode.clientWidth !== f.availableWidth;
      }, l = function(f) {
        var S = c.getComputedStyle(f.element, null);
        return f.currentFontSize = parseFloat(S.getPropertyValue("font-size")), f.display = S.getPropertyValue("display"), f.whiteSpace = S.getPropertyValue("white-space"), true;
      }, A = function(f) {
        var S = false;
        return !f.preStyleTestCompleted && (/inline-/.test(f.display) || (S = true, f.display = "inline-block"), f.whiteSpace !== "nowrap" && (S = true, f.whiteSpace = "nowrap"), f.preStyleTestCompleted = true, S);
      }, M = function(f) {
        f.element.style.whiteSpace = f.whiteSpace, f.element.style.display = f.display, f.element.style.fontSize = f.currentFontSize + "px";
      }, O = function(f) {
        f.element.dispatchEvent(new CustomEvent("fit", { detail: { oldValue: f.previousFontSize, newValue: f.currentFontSize, scaleFactor: f.currentFontSize / f.previousFontSize } }));
      }, U = function(f, S) {
        return function(T) {
          f.dirty = S, f.active && h(T);
        };
      }, re = function(f) {
        return function() {
          r = r.filter((function(S) {
            return S.element !== f.element;
          })), f.observeMutations && f.observer.disconnect(), f.element.style.whiteSpace = f.originalStyle.whiteSpace, f.element.style.display = f.originalStyle.display, f.element.style.fontSize = f.originalStyle.fontSize;
        };
      }, z = function(f) {
        return function() {
          f.active || (f.active = true, h());
        };
      }, R = function(f) {
        return function() {
          return f.active = false;
        };
      }, B = function(f) {
        f.observeMutations && (f.observer = new MutationObserver(U(f, t)), f.observer.observe(f.element, f.observeMutations));
      }, q = { minSize: 16, maxSize: 512, multiLine: true, observeMutations: "MutationObserver" in c && { subtree: true, childList: true, characterData: true } }, W = null, L = function() {
        c.clearTimeout(W), W = c.setTimeout(u(s), C.observeWindowDelay);
      }, k = ["resize", "orientationchange"];
      return Object.defineProperty(C, "observeWindow", { set: function(f) {
        var S = "".concat(f ? "add" : "remove", "EventListener");
        k.forEach((function(T) {
          c[S](T, L);
        }));
      } }), C.observeWindow = true, C.observeWindowDelay = 100, C.fitAll = u(a), C;
    }
    function F(f, S) {
      var T = Object.assign({}, q, S), X = f.map((function(K) {
        var ie = Object.assign({}, T, { element: K, active: true });
        return (function(D) {
          D.originalStyle = { whiteSpace: D.element.style.whiteSpace, display: D.element.style.display, fontSize: D.element.style.fontSize }, B(D), D.newbie = true, D.dirty = true, r.push(D);
        })(ie), { element: K, fit: U(ie, a), unfreeze: z(ie), freeze: R(ie), unsubscribe: re(ie) };
      }));
      return h(), X;
    }
    function C(f) {
      var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return typeof f == "string" ? F(e(document.querySelectorAll(f)), S) : F([f], S)[0];
    }
  })(typeof window == "undefined" ? null : window);
  class Ci {
    constructor(e) {
      je(this, "allowedToPlayAudio", null);
      this.Reveal = e, this.startEmbeddedMedia = this.startEmbeddedMedia.bind(this), this.startEmbeddedIframe = this.startEmbeddedIframe.bind(this), this.preventIframeAutoFocus = this.preventIframeAutoFocus.bind(this), this.ensureMobileMediaPlaying = this.ensureMobileMediaPlaying.bind(this), this.failedAudioPlaybackTargets = /* @__PURE__ */ new Set(), this.failedVideoPlaybackTargets = /* @__PURE__ */ new Set(), this.failedMutedVideoPlaybackTargets = /* @__PURE__ */ new Set(), this.renderMediaPlayButton();
    }
    renderMediaPlayButton() {
      this.mediaPlayButton = document.createElement("button"), this.mediaPlayButton.className = "r-overlay-button r-media-play-button", this.mediaPlayButton.addEventListener("click", () => {
        this.resetTemporarilyMutedMedia(), (/* @__PURE__ */ new Set([
          ...this.failedAudioPlaybackTargets,
          ...this.failedVideoPlaybackTargets,
          ...this.failedMutedVideoPlaybackTargets
        ])).forEach((i) => {
          this.startEmbeddedMedia({ target: i });
        }), this.clearMediaPlaybackErrors();
      });
    }
    /**
     * Should the given element be preloaded?
     * Decides based on local element attributes and global config.
     *
     * @param {HTMLElement} element
     */
    shouldPreload(e) {
      if (this.Reveal.isScrollView())
        return true;
      let i = this.Reveal.getConfig().preloadIframes;
      return typeof i != "boolean" && (i = e.hasAttribute("data-preload")), i;
    }
    /**
     * Called when the given slide is within the configured view
     * distance. Shows the slide element and loads any content
     * that is set to load lazily (data-src).
     *
     * @param {HTMLElement} slide Slide to show
     */
    load(e, i = {}) {
      const t = this.Reveal.getConfig().display;
      if (t.includes("!important")) {
        const a = t.replace(/\s*!important\s*$/, "").trim();
        e.style.setProperty("display", a, "important");
      } else
        e.style.display = t;
      E$1(e, "img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach((a) => {
        const r = a.tagName === "IFRAME";
        (!r || this.shouldPreload(a)) && (a.setAttribute("src", a.getAttribute("data-src")), a.setAttribute("data-lazy-loaded", ""), a.removeAttribute("data-src"), r && a.addEventListener("load", this.preventIframeAutoFocus));
      }), E$1(e, "video, audio").forEach((a) => {
        let r = 0;
        E$1(a, "source[data-src]").forEach((o) => {
          o.setAttribute("src", o.getAttribute("data-src")), o.removeAttribute("data-src"), o.setAttribute("data-lazy-loaded", ""), r += 1;
        }), le$1 && a.tagName === "VIDEO" && a.setAttribute("playsinline", ""), r > 0 && a.load();
      });
      let s = e.slideBackgroundElement;
      if (s) {
        s.style.display = "block";
        let a = e.slideBackgroundContentElement, r = e.getAttribute("data-background-iframe");
        if (s.hasAttribute("data-loaded") === false) {
          s.setAttribute("data-loaded", "true");
          let h = e.getAttribute("data-background-image"), u = e.getAttribute("data-background-video"), g = e.hasAttribute("data-background-video-loop"), y = e.hasAttribute("data-background-video-muted");
          if (h)
            /^data:/.test(h.trim()) ? a.style.backgroundImage = `url(${h.trim()})` : a.style.backgroundImage = h.split(",").map((p) => {
              let b = decodeURI(p.trim());
              return `url(${Ri(b)})`;
            }).join(",");
          else if (u) {
            let p = document.createElement("video");
            g && p.setAttribute("loop", ""), (y || this.Reveal.isSpeakerNotes()) && (p.muted = true), le$1 && p.setAttribute("playsinline", ""), u.split(",").forEach((b) => {
              const l = document.createElement("source");
              l.setAttribute("src", b);
              let A = Ai(b);
              A && l.setAttribute("type", A), p.appendChild(l);
            }), a.appendChild(p);
          } else if (r && i.excludeIframes !== true) {
            let p = document.createElement("iframe");
            p.setAttribute("allowfullscreen", ""), p.setAttribute("mozallowfullscreen", ""), p.setAttribute("webkitallowfullscreen", ""), p.setAttribute("allow", "autoplay"), p.setAttribute("data-src", r), p.style.width = "100%", p.style.height = "100%", p.style.maxHeight = "100%", p.style.maxWidth = "100%", a.appendChild(p);
          }
        }
        let o = a.querySelector("iframe[data-src]");
        o && this.shouldPreload(s) && !/autoplay=(1|true|yes)/gi.test(r) && o.getAttribute("src") !== r && o.setAttribute("src", r);
      }
      this.layout(e);
    }
    /**
     * Applies JS-dependent layout helpers for the scope.
     */
    layout(e) {
      Array.from(e.querySelectorAll(".r-fit-text")).forEach((i) => {
        ki(i, {
          minSize: 24,
          maxSize: this.Reveal.getConfig().height * 0.8,
          observeMutations: false,
          observeWindow: false
        });
      });
    }
    /**
     * Unloads and hides the given slide. This is called when the
     * slide is moved outside of the configured view distance.
     *
     * @param {HTMLElement} slide
     */
    unload(e) {
      e.style.display = "none";
      let i = this.Reveal.getSlideBackground(e);
      i && (i.style.display = "none", E$1(i, "iframe[src]").forEach((t) => {
        t.removeAttribute("src");
      })), E$1(e, "video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach((t) => {
        t.setAttribute("data-src", t.getAttribute("src")), t.removeAttribute("src");
      }), E$1(e, "video[data-lazy-loaded] source[src], audio source[src]").forEach((t) => {
        t.setAttribute("data-src", t.getAttribute("src")), t.removeAttribute("src");
      });
    }
    /**
     * Enforces origin-specific format rules for embedded media.
     */
    formatEmbeddedContent() {
      let e = (i, t, s) => {
        E$1(this.Reveal.getSlidesElement(), "iframe[" + i + '*="' + t + '"]').forEach((a) => {
          let r = a.getAttribute(i);
          r && r.indexOf(s) === -1 && a.setAttribute(i, r + (/\?/.test(r) ? "&" : "?") + s);
        });
      };
      e("src", "youtube.com/embed/", "enablejsapi=1"), e("data-src", "youtube.com/embed/", "enablejsapi=1"), e("src", "player.vimeo.com/", "api=1"), e("data-src", "player.vimeo.com/", "api=1");
    }
    /**
     * Start playback of any embedded content inside of
     * the given element.
     *
     * @param {HTMLElement} element
     */
    startEmbeddedContent(e) {
      if (e) {
        const i = this.Reveal.isSpeakerNotes();
        E$1(e, 'img[src$=".gif"]').forEach((t) => {
          t.setAttribute("src", t.getAttribute("src"));
        }), E$1(e, "video, audio").forEach((t) => {
          if (V(t, ".fragment") && !V(t, ".fragment.visible"))
            return;
          let s = this.Reveal.getConfig().autoPlayMedia;
          if (typeof s != "boolean" && (s = t.hasAttribute("data-autoplay") || !!V(t, ".slide-background")), s && typeof t.play == "function") {
            if (i && !t.muted) return;
            t.readyState > 1 ? this.startEmbeddedMedia({ target: t }) : le$1 ? (t.addEventListener("canplay", this.ensureMobileMediaPlaying), this.playMediaElement(t)) : (t.removeEventListener("loadeddata", this.startEmbeddedMedia), t.addEventListener("loadeddata", this.startEmbeddedMedia));
          }
        }), i || (E$1(e, "iframe[src]").forEach((t) => {
          V(t, ".fragment") && !V(t, ".fragment.visible") || this.startEmbeddedIframe({ target: t });
        }), E$1(e, "iframe[data-src]").forEach((t) => {
          V(t, ".fragment") && !V(t, ".fragment.visible") || t.getAttribute("src") !== t.getAttribute("data-src") && (t.removeEventListener("load", this.startEmbeddedIframe), t.addEventListener("load", this.startEmbeddedIframe), t.setAttribute("src", t.getAttribute("data-src")));
        }));
      }
    }
    /**
     * Ensure that an HTMLMediaElement is playing on mobile devices.
     *
     * This is a workaround for a bug in mobile Safari where
     * the media fails to display if many videos are started
     * at the same moment. When this happens, Mobile Safari
     * reports the video is playing, and the current time
     * advances, but nothing is visible.
     *
     * @param {Event} event
     */
    ensureMobileMediaPlaying(e) {
      const i = e.target;
      typeof i.getVideoPlaybackQuality == "function" && setTimeout(() => {
        const t = i.paused === false, s = i.getVideoPlaybackQuality().totalVideoFrames;
        t && s === 0 && (i.load(), i.play());
      }, 1e3);
    }
    /**
     * Starts playing an embedded video/audio element after
     * it has finished loading.
     *
     * @param {object} event
     */
    startEmbeddedMedia(e) {
      let i = !!V(e.target, "html"), t = !!V(e.target, ".present");
      i && t && (e.target.paused || e.target.ended) && (e.target.currentTime = 0, this.playMediaElement(e.target)), e.target.removeEventListener("loadeddata", this.startEmbeddedMedia);
    }
    /**
     * Plays the given HTMLMediaElement and handles any playback
     * errors, such as the browser not allowing audio to play without
     * user action.
     *
     * @param {HTMLElement} mediaElement
     */
    playMediaElement(e) {
      const i = e.play();
      i && typeof i.catch == "function" && i.then(() => {
        e.muted || (this.allowedToPlayAudio = true);
      }).catch((t) => {
        if (t.name === "NotAllowedError")
          if (this.allowedToPlayAudio = false, e.tagName === "VIDEO") {
            this.onVideoPlaybackNotAllowed(e);
            let s = !!V(e, "html"), a = !!V(e, ".present"), r = e.muted;
            s && a && !r && (e.setAttribute("data-muted-by-reveal", "true"), e.muted = true, e.play().catch(() => {
              this.onMutedVideoPlaybackNotAllowed(e);
            }));
          } else e.tagName === "AUDIO" && this.onAudioPlaybackNotAllowed(e);
      });
    }
    /**
     * "Starts" the content of an embedded iframe using the
     * postMessage API.
     *
     * @param {object} event
     */
    startEmbeddedIframe(e) {
      let i = e.target;
      if (this.preventIframeAutoFocus(e), i && i.contentWindow) {
        let t = !!V(e.target, "html"), s = !!V(e.target, ".present");
        if (t && s) {
          let a = this.Reveal.getConfig().autoPlayMedia;
          typeof a != "boolean" && (a = i.hasAttribute("data-autoplay") || !!V(i, ".slide-background")), /youtube\.com\/embed\//.test(i.getAttribute("src")) && a ? i.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*") : /player\.vimeo\.com\//.test(i.getAttribute("src")) && a ? i.contentWindow.postMessage('{"method":"play"}', "*") : i.contentWindow.postMessage("slide:start", "*");
        }
      }
    }
    /**
     * Stop playback of any embedded content inside of
     * the targeted slide.
     *
     * @param {HTMLElement} element
     */
    stopEmbeddedContent(e, i = {}) {
      i = ge({
        // Defaults
        unloadIframes: true
      }, i), e && e.parentNode && (E$1(e, "video, audio").forEach((t) => {
        !t.hasAttribute("data-ignore") && typeof t.pause == "function" && (t.setAttribute("data-paused-by-reveal", ""), t.pause(), le$1 && t.removeEventListener("canplay", this.ensureMobileMediaPlaying));
      }), E$1(e, "iframe").forEach((t) => {
        t.contentWindow && t.contentWindow.postMessage("slide:stop", "*"), t.removeEventListener("load", this.preventIframeAutoFocus), t.removeEventListener("load", this.startEmbeddedIframe);
      }), E$1(e, 'iframe[src*="youtube.com/embed/"]').forEach((t) => {
        !t.hasAttribute("data-ignore") && t.contentWindow && typeof t.contentWindow.postMessage == "function" && t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
      }), E$1(e, 'iframe[src*="player.vimeo.com/"]').forEach((t) => {
        !t.hasAttribute("data-ignore") && t.contentWindow && typeof t.contentWindow.postMessage == "function" && t.contentWindow.postMessage('{"method":"pause"}', "*");
      }), i.unloadIframes === true && E$1(e, "iframe[data-src]").forEach((t) => {
        t.setAttribute("src", "about:blank"), t.removeAttribute("src");
      }));
    }
    /**
     * Checks whether media playback is blocked by the browser. This
     * typically happens when media playback is initiated without a
     * direct user interaction.
     */
    isAllowedToPlayAudio() {
      return this.allowedToPlayAudio;
    }
    /**
     * Shows a manual button in situations where autoamtic media playback
     * is not allowed by the browser.
     */
    showPlayOrUnmuteButton() {
      const e = this.failedAudioPlaybackTargets.size, i = this.failedVideoPlaybackTargets.size, t = this.failedMutedVideoPlaybackTargets.size;
      let s = "Play media";
      t > 0 ? s = "Play video" : i > 0 ? s = "Unmute video" : e > 0 && (s = "Play audio"), this.mediaPlayButton.textContent = s, this.Reveal.getRevealElement().appendChild(this.mediaPlayButton);
    }
    onAudioPlaybackNotAllowed(e) {
      this.failedAudioPlaybackTargets.add(e), this.showPlayOrUnmuteButton(e);
    }
    onVideoPlaybackNotAllowed(e) {
      this.failedVideoPlaybackTargets.add(e), this.showPlayOrUnmuteButton();
    }
    onMutedVideoPlaybackNotAllowed(e) {
      this.failedMutedVideoPlaybackTargets.add(e), this.showPlayOrUnmuteButton();
    }
    /**
     * Videos may be temporarily muted by us to get around browser
     * restrictions on automatic playback. This method rolls back
     * all such temporary audio changes.
     */
    resetTemporarilyMutedMedia() {
      (/* @__PURE__ */ new Set([
        ...this.failedAudioPlaybackTargets,
        ...this.failedVideoPlaybackTargets,
        ...this.failedMutedVideoPlaybackTargets
      ])).forEach((i) => {
        i.hasAttribute("data-muted-by-reveal") && (i.muted = false, i.removeAttribute("data-muted-by-reveal"));
      });
    }
    clearMediaPlaybackErrors() {
      this.resetTemporarilyMutedMedia(), this.failedAudioPlaybackTargets.clear(), this.failedVideoPlaybackTargets.clear(), this.failedMutedVideoPlaybackTargets.clear(), this.mediaPlayButton.remove();
    }
    /**
     * Prevents iframes from automatically focusing themselves.
     *
     * @param {Event} event
     */
    preventIframeAutoFocus(e) {
      const i = e.target;
      if (i && this.Reveal.getConfig().preventIframeAutoFocus) {
        let t = 0;
        const s = 100, a = 1e3, r = () => {
          document.activeElement === i ? document.activeElement.blur() : t < a && (t += s, setTimeout(r, s));
        };
        setTimeout(r, s);
      }
    }
    afterSlideChanged() {
      this.clearMediaPlaybackErrors();
    }
  }
  const de = ".slides section", te$1 = ".slides>section", _e = ".slides>section.present>section", Pi = ".backgrounds>.slide-background", Li = /registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview/, Ti = "h.v", xi = "h/v", Ye = "c", zt$1 = "c/t";
  class Ii {
    constructor(e) {
      this.Reveal = e;
    }
    render() {
      this.element = document.createElement("div"), this.element.className = "slide-number", this.Reveal.getRevealElement().appendChild(this.element);
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      let t = "none";
      e.slideNumber && !this.Reveal.isPrintView() && (e.showSlideNumber === "all" || e.showSlideNumber === "speaker" && this.Reveal.isSpeakerNotes()) && (t = "block"), this.element.style.display = t;
    }
    /**
     * Updates the slide number to match the current slide.
     */
    update() {
      this.Reveal.getConfig().slideNumber && this.element && (this.element.innerHTML = this.getSlideNumber());
    }
    /**
     * Returns the HTML string corresponding to the current slide
     * number, including formatting.
     */
    getSlideNumber(e = this.Reveal.getCurrentSlide()) {
      let i = this.Reveal.getConfig(), t, s = Ti;
      if (typeof i.slideNumber == "function")
        t = i.slideNumber(e);
      else {
        typeof i.slideNumber == "string" && (s = i.slideNumber), !/c/.test(s) && this.Reveal.getHorizontalSlides().length === 1 && (s = Ye);
        let r = e && e.dataset.visibility === "uncounted" ? 0 : 1;
        switch (t = [], s) {
          case Ye:
            t.push(this.Reveal.getSlidePastCount(e) + r);
            break;
          case zt$1:
            t.push(this.Reveal.getSlidePastCount(e) + r, "/", this.Reveal.getTotalSlides());
            break;
          default:
            let o = this.Reveal.getIndices(e);
            t.push(o.h + r);
            let h = s === xi ? "/" : ".";
            this.Reveal.isVerticalSlide(e) && t.push(h, o.v + 1);
        }
      }
      let a = "#" + this.Reveal.location.getHash(e);
      return this.formatNumber(t[0], t[1], t[2], a);
    }
    /**
     * Applies HTML formatting to a slide number before it's
     * written to the DOM.
     *
     * @param {number} a Current slide
     * @param {string} delimiter Character to separate slide numbers
     * @param {(number|*)} b Total slides
     * @param {HTMLElement} [url='#'+locationHash()] The url to link to
     * @return {string} HTML string fragment
     */
    formatNumber(e, i, t, s = "#" + this.Reveal.location.getHash()) {
      return typeof t == "number" && !isNaN(t) ? `<a href="${s}">
					<span class="slide-number-a">${e}</span>
					<span class="slide-number-delimiter">${i}</span>
					<span class="slide-number-b">${t}</span>
					</a>` : `<a href="${s}">
					<span class="slide-number-a">${e}</span>
					</a>`;
    }
    destroy() {
      this.element.remove();
    }
  }
  class Mi {
    constructor(e) {
      this.Reveal = e, this.onInput = this.onInput.bind(this), this.onBlur = this.onBlur.bind(this), this.onKeyDown = this.onKeyDown.bind(this);
    }
    render() {
      this.element = document.createElement("div"), this.element.className = "jump-to-slide", this.jumpInput = document.createElement("input"), this.jumpInput.type = "text", this.jumpInput.className = "jump-to-slide-input", this.jumpInput.placeholder = "Jump to slide", this.jumpInput.addEventListener("input", this.onInput), this.jumpInput.addEventListener("keydown", this.onKeyDown), this.jumpInput.addEventListener("blur", this.onBlur), this.element.appendChild(this.jumpInput);
    }
    show() {
      this.indicesOnShow = this.Reveal.getIndices(), this.Reveal.getRevealElement().appendChild(this.element), this.jumpInput.focus();
    }
    hide() {
      this.isVisible() && (this.element.remove(), this.jumpInput.value = "", clearTimeout(this.jumpTimeout), delete this.jumpTimeout);
    }
    isVisible() {
      return !!this.element.parentNode;
    }
    /**
     * Parses the current input and jumps to the given slide.
     */
    jump() {
      clearTimeout(this.jumpTimeout), delete this.jumpTimeout;
      let e = this.jumpInput.value.trim(""), i;
      if (/^\d+$/.test(e)) {
        const t = this.Reveal.getConfig().slideNumber;
        if (t === Ye || t === zt$1) {
          const s = this.Reveal.getSlides()[parseInt(e, 10) - 1];
          s && (i = this.Reveal.getIndices(s));
        }
      }
      return i || (/^\d+\.\d+$/.test(e) && (e = e.replace(".", "/")), i = this.Reveal.location.getIndicesFromHash(e, { oneBasedIndex: true })), !i && /\S+/i.test(e) && e.length > 1 && (i = this.search(e)), i && e !== "" ? (this.Reveal.slide(i.h, i.v, i.f), true) : (this.Reveal.slide(this.indicesOnShow.h, this.indicesOnShow.v, this.indicesOnShow.f), false);
    }
    jumpAfter(e) {
      clearTimeout(this.jumpTimeout), this.jumpTimeout = setTimeout(() => this.jump(), e);
    }
    /**
     * A lofi search that looks for the given query in all
     * of our slides and returns the first match.
     */
    search(e) {
      const i = new RegExp("\\b" + e.trim() + "\\b", "i"), t = this.Reveal.getSlides().find((s) => i.test(s.innerText));
      return t ? this.Reveal.getIndices(t) : null;
    }
    /**
     * Reverts back to the slide we were on when jump to slide was
     * invoked.
     */
    cancel() {
      this.Reveal.slide(this.indicesOnShow.h, this.indicesOnShow.v, this.indicesOnShow.f), this.hide();
    }
    confirm() {
      this.jump(), this.hide();
    }
    destroy() {
      this.jumpInput.removeEventListener("input", this.onInput), this.jumpInput.removeEventListener("keydown", this.onKeyDown), this.jumpInput.removeEventListener("blur", this.onBlur), this.element.remove();
    }
    onKeyDown(e) {
      e.keyCode === 13 ? this.confirm() : e.keyCode === 27 && (this.cancel(), e.stopImmediatePropagation());
    }
    onInput(e) {
      this.jumpAfter(200);
    }
    onBlur() {
      setTimeout(() => this.hide(), 1);
    }
  }
  const Ge = (c) => {
    let e = c.match(/^#([0-9a-f]{3})$/i);
    if (e && e[1]) {
      const a = e[1];
      return {
        r: parseInt(a.charAt(0), 16) * 17,
        g: parseInt(a.charAt(1), 16) * 17,
        b: parseInt(a.charAt(2), 16) * 17
      };
    }
    let i = c.match(/^#([0-9a-f]{6})$/i);
    if (i && i[1]) {
      const a = i[1];
      return {
        r: parseInt(a.slice(0, 2), 16),
        g: parseInt(a.slice(2, 4), 16),
        b: parseInt(a.slice(4, 6), 16)
      };
    }
    let t = c.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (t)
      return {
        r: parseInt(t[1], 10),
        g: parseInt(t[2], 10),
        b: parseInt(t[3], 10)
      };
    let s = c.match(
      /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i
    );
    return s ? {
      r: parseInt(s[1], 10),
      g: parseInt(s[2], 10),
      b: parseInt(s[3], 10),
      a: parseFloat(s[4])
    } : null;
  }, Ni = (c) => (typeof c == "string" && (c = Ge(c)), c ? (c.r * 299 + c.g * 587 + c.b * 114) / 1e3 : null);
  class Bi {
    constructor(e) {
      this.Reveal = e;
    }
    render() {
      this.element = document.createElement("div"), this.element.className = "backgrounds", this.Reveal.getRevealElement().appendChild(this.element);
    }
    /**
     * Creates the slide background elements and appends them
     * to the background container. One element is created per
     * slide no matter if the given slide has visible background.
     */
    create() {
      this.element.innerHTML = "", this.element.classList.add("no-transition"), this.Reveal.getHorizontalSlides().forEach((e) => {
        let i = this.createBackground(e, this.element);
        E$1(e, "section").forEach((t) => {
          this.createBackground(t, i), i.classList.add("stack");
        });
      }), this.Reveal.getConfig().parallaxBackgroundImage ? (this.element.style.backgroundImage = 'url("' + this.Reveal.getConfig().parallaxBackgroundImage + '")', this.element.style.backgroundSize = this.Reveal.getConfig().parallaxBackgroundSize, this.element.style.backgroundRepeat = this.Reveal.getConfig().parallaxBackgroundRepeat, this.element.style.backgroundPosition = this.Reveal.getConfig().parallaxBackgroundPosition, setTimeout(() => {
        this.Reveal.getRevealElement().classList.add("has-parallax-background");
      }, 1)) : (this.element.style.backgroundImage = "", this.Reveal.getRevealElement().classList.remove("has-parallax-background"));
    }
    /**
     * Creates a background for the given slide.
     *
     * @param {HTMLElement} slide
     * @param {HTMLElement} container The element that the background
     * should be appended to
     * @return {HTMLElement} New background div
     */
    createBackground(e, i) {
      let t = document.createElement("div");
      t.className = "slide-background " + e.className.replace(/present|past|future/, "");
      let s = document.createElement("div");
      return s.className = "slide-background-content", t.appendChild(s), i.appendChild(t), e.slideBackgroundElement = t, e.slideBackgroundContentElement = s, this.sync(e), t;
    }
    /**
     * Renders all of the visual properties of a slide background
     * based on the various background attributes.
     *
     * @param {HTMLElement} slide
     */
    sync(e) {
      const i = e.slideBackgroundElement, t = e.slideBackgroundContentElement, s = {
        background: e.getAttribute("data-background"),
        backgroundSize: e.getAttribute("data-background-size"),
        backgroundImage: e.getAttribute("data-background-image"),
        backgroundVideo: e.getAttribute("data-background-video"),
        backgroundIframe: e.getAttribute("data-background-iframe"),
        backgroundColor: e.getAttribute("data-background-color"),
        backgroundGradient: e.getAttribute("data-background-gradient"),
        backgroundRepeat: e.getAttribute("data-background-repeat"),
        backgroundPosition: e.getAttribute("data-background-position"),
        backgroundTransition: e.getAttribute("data-background-transition"),
        backgroundOpacity: e.getAttribute("data-background-opacity")
      }, a = e.hasAttribute("data-preload");
      e.classList.remove("has-dark-background"), e.classList.remove("has-light-background"), i.removeAttribute("data-loaded"), i.removeAttribute("data-background-hash"), i.removeAttribute("data-background-size"), i.removeAttribute("data-background-transition"), i.style.backgroundColor = "", t.style.backgroundSize = "", t.style.backgroundRepeat = "", t.style.backgroundPosition = "", t.style.backgroundImage = "", t.style.opacity = "", t.innerHTML = "", s.background && (/^(http|file|\/\/)/gi.test(s.background) || /\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(s.background) ? e.setAttribute("data-background-image", s.background) : i.style.background = s.background), (s.background || s.backgroundColor || s.backgroundGradient || s.backgroundImage || s.backgroundVideo || s.backgroundIframe) && i.setAttribute("data-background-hash", s.background + s.backgroundSize + s.backgroundImage + s.backgroundVideo + s.backgroundIframe + s.backgroundColor + s.backgroundGradient + s.backgroundRepeat + s.backgroundPosition + s.backgroundTransition + s.backgroundOpacity), s.backgroundSize && i.setAttribute("data-background-size", s.backgroundSize), s.backgroundColor && (i.style.backgroundColor = s.backgroundColor), s.backgroundGradient && (i.style.backgroundImage = s.backgroundGradient), s.backgroundTransition && i.setAttribute("data-background-transition", s.backgroundTransition), a && i.setAttribute("data-preload", ""), s.backgroundSize && (t.style.backgroundSize = s.backgroundSize), s.backgroundRepeat && (t.style.backgroundRepeat = s.backgroundRepeat), s.backgroundPosition && (t.style.backgroundPosition = s.backgroundPosition), s.backgroundOpacity && (t.style.opacity = s.backgroundOpacity);
      const r = this.getContrastClass(e);
      typeof r == "string" && e.classList.add(r);
    }
    /**
     * Returns a class name that can be applied to a slide to indicate
     * if it has a light or dark background.
     *
     * @param {*} slide
     *
     * @returns {string|null}
     */
    getContrastClass(e) {
      const i = e.slideBackgroundElement;
      let t = e.getAttribute("data-background-color");
      if (!t || !Ge(t)) {
        let s = window.getComputedStyle(i);
        s && s.backgroundColor && (t = s.backgroundColor);
      }
      if (t) {
        const s = Ge(t);
        if (s && s.a !== 0)
          return Ni(t) < 128 ? "has-dark-background" : "has-light-background";
      }
      return null;
    }
    /**
     * Bubble the 'has-light-background'/'has-dark-background' classes.
     */
    bubbleSlideContrastClassToElement(e, i) {
      ["has-light-background", "has-dark-background"].forEach((t) => {
        e.classList.contains(t) ? i.classList.add(t) : i.classList.remove(t);
      }, this);
    }
    /**
     * Updates the background elements to reflect the current
     * slide.
     *
     * @param {boolean} includeAll If true, the backgrounds of
     * all vertical slides (not just the present) will be updated.
     */
    update(e = false) {
      let i = this.Reveal.getConfig(), t = this.Reveal.getCurrentSlide(), s = this.Reveal.getIndices(), a = null, r = i.rtl ? "future" : "past", o = i.rtl ? "past" : "future";
      if (Array.from(this.element.childNodes).forEach((u, g) => {
        u.classList.remove("past", "present", "future"), g < s.h ? u.classList.add(r) : g > s.h ? u.classList.add(o) : (u.classList.add("present"), a = u), (e || g === s.h) && E$1(u, ".slide-background").forEach((y, p) => {
          y.classList.remove("past", "present", "future");
          const b = typeof s.v == "number" ? s.v : 0;
          p < b ? y.classList.add("past") : p > b ? y.classList.add("future") : (y.classList.add("present"), g === s.h && (a = y));
        });
      }), this.previousBackground && !this.previousBackground.closest("body") && (this.previousBackground = null), a && this.previousBackground) {
        let u = this.previousBackground.getAttribute("data-background-hash"), g = a.getAttribute("data-background-hash");
        if (g && g === u && a !== this.previousBackground) {
          this.element.classList.add("no-transition");
          const y = a.querySelector("video"), p = this.previousBackground.querySelector("video");
          if (y && p) {
            const b = y.parentNode;
            p.parentNode.appendChild(y), b.appendChild(p);
          }
        }
      }
      const h = a !== this.previousBackground;
      if (h && this.previousBackground && this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground, { unloadIframes: !this.Reveal.slideContent.shouldPreload(this.previousBackground) }), h && a) {
        this.Reveal.slideContent.startEmbeddedContent(a);
        let u = a.querySelector(".slide-background-content");
        if (u) {
          let g = u.style.backgroundImage || "";
          /\.gif/i.test(g) && (u.style.backgroundImage = "", window.getComputedStyle(u).opacity, u.style.backgroundImage = g);
        }
        this.previousBackground = a;
      }
      t && this.bubbleSlideContrastClassToElement(t, this.Reveal.getRevealElement()), setTimeout(() => {
        this.element.classList.remove("no-transition");
      }, 10);
    }
    /**
     * Updates the position of the parallax background based
     * on the current slide index.
     */
    updateParallax() {
      let e = this.Reveal.getIndices();
      if (this.Reveal.getConfig().parallaxBackgroundImage) {
        let i = this.Reveal.getHorizontalSlides(), t = this.Reveal.getVerticalSlides(), s = this.element.style.backgroundSize.split(" "), a, r;
        s.length === 1 ? a = r = parseInt(s[0], 10) : (a = parseInt(s[0], 10), r = parseInt(s[1], 10));
        let o = this.element.offsetWidth, h = i.length, u, g;
        typeof this.Reveal.getConfig().parallaxBackgroundHorizontal == "number" ? u = this.Reveal.getConfig().parallaxBackgroundHorizontal : u = h > 1 ? (a - o) / (h - 1) : 0, g = u * e.h * -1;
        let y = this.element.offsetHeight, p = t.length, b, l;
        typeof this.Reveal.getConfig().parallaxBackgroundVertical == "number" ? b = this.Reveal.getConfig().parallaxBackgroundVertical : b = (r - y) / (p - 1), l = p > 0 ? b * e.v : 0, this.element.style.backgroundPosition = g + "px " + -l + "px";
      }
    }
    destroy() {
      this.element.remove();
    }
  }
  let Nt$1 = 0;
  class Hi {
    constructor(e) {
      this.Reveal = e;
    }
    /**
     * Runs an auto-animation between the given slides.
     *
     * @param  {HTMLElement} fromSlide
     * @param  {HTMLElement} toSlide
     */
    run(e, i) {
      this.reset();
      let t = this.Reveal.getSlides(), s = t.indexOf(i), a = t.indexOf(e);
      if (e && i && e.hasAttribute("data-auto-animate") && i.hasAttribute("data-auto-animate") && e.getAttribute("data-auto-animate-id") === i.getAttribute("data-auto-animate-id") && !(s > a ? i : e).hasAttribute("data-auto-animate-restart")) {
        this.autoAnimateStyleSheet = this.autoAnimateStyleSheet || Xe();
        let r = this.getAutoAnimateOptions(i);
        e.dataset.autoAnimate = "pending", i.dataset.autoAnimate = "pending", r.slideDirection = s > a ? "forward" : "backward";
        let o = e.style.display === "none";
        o && (e.style.display = this.Reveal.getConfig().display);
        let h = this.getAutoAnimatableElements(e, i).map((u) => this.autoAnimateElements(u.from, u.to, u.options || {}, r, Nt$1++));
        if (o && (e.style.display = "none"), i.dataset.autoAnimateUnmatched !== "false" && this.Reveal.getConfig().autoAnimateUnmatched === true) {
          let u = r.duration * 0.8, g = r.duration * 0.2;
          this.getUnmatchedAutoAnimateElements(i).forEach((y) => {
            let p = this.getAutoAnimateOptions(y, r), b = "unmatched";
            (p.duration !== r.duration || p.delay !== r.delay) && (b = "unmatched-" + Nt$1++, h.push(`[data-auto-animate="running"] [data-auto-animate-target="${b}"] { transition: opacity ${p.duration}s ease ${p.delay}s; }`)), y.dataset.autoAnimateTarget = b;
          }, this), h.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${u}s ease ${g}s; }`);
        }
        this.autoAnimateStyleSheet.innerHTML = h.join(""), requestAnimationFrame(() => {
          this.autoAnimateStyleSheet && (getComputedStyle(this.autoAnimateStyleSheet).fontWeight, i.dataset.autoAnimate = "running");
        }), this.Reveal.dispatchEvent({
          type: "autoanimate",
          data: {
            fromSlide: e,
            toSlide: i,
            sheet: this.autoAnimateStyleSheet
          }
        });
      }
    }
    /**
     * Rolls back all changes that we've made to the DOM so
     * that as part of animating.
     */
    reset() {
      E$1(this.Reveal.getRevealElement(), '[data-auto-animate]:not([data-auto-animate=""])').forEach((e) => {
        e.dataset.autoAnimate = "";
      }), E$1(this.Reveal.getRevealElement(), "[data-auto-animate-target]").forEach((e) => {
        delete e.dataset.autoAnimateTarget;
      }), this.autoAnimateStyleSheet && this.autoAnimateStyleSheet.parentNode && (this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet), this.autoAnimateStyleSheet = null);
    }
    /**
     * Creates a FLIP animation where the `to` element starts out
     * in the `from` element position and animates to its original
     * state.
     *
     * @param {HTMLElement} from
     * @param {HTMLElement} to
     * @param {Object} elementOptions Options for this element pair
     * @param {Object} animationOptions Options set at the slide level
     * @param {String} id Unique ID that we can use to identify this
     * auto-animate element in the DOM
     */
    autoAnimateElements(e, i, t, s, a) {
      e.dataset.autoAnimateTarget = "", i.dataset.autoAnimateTarget = a;
      let r = this.getAutoAnimateOptions(i, s);
      typeof t.delay != "undefined" && (r.delay = t.delay), typeof t.duration != "undefined" && (r.duration = t.duration), typeof t.easing != "undefined" && (r.easing = t.easing);
      let o = this.getAutoAnimatableProperties("from", e, t), h = this.getAutoAnimatableProperties("to", i, t);
      if (i.classList.contains("fragment") && delete h.styles.opacity, t.translate !== false || t.scale !== false) {
        let y = this.Reveal.getScale(), p = {
          x: (o.x - h.x) / y,
          y: (o.y - h.y) / y,
          scaleX: o.width / h.width,
          scaleY: o.height / h.height
        };
        p.x = Math.round(p.x * 1e3) / 1e3, p.y = Math.round(p.y * 1e3) / 1e3, p.scaleX = Math.round(p.scaleX * 1e3) / 1e3, p.scaleX = Math.round(p.scaleX * 1e3) / 1e3;
        let b = t.translate !== false && (p.x !== 0 || p.y !== 0), l = t.scale !== false && (p.scaleX !== 0 || p.scaleY !== 0);
        if (b || l) {
          let A = [];
          b && A.push(`translate(${p.x}px, ${p.y}px)`), l && A.push(`scale(${p.scaleX}, ${p.scaleY})`), o.styles.transform = A.join(" "), o.styles["transform-origin"] = "top left", h.styles.transform = "none";
        }
      }
      for (let y in h.styles) {
        const p = h.styles[y], b = o.styles[y];
        p === b ? delete h.styles[y] : (p.explicitValue === true && (h.styles[y] = p.value), b.explicitValue === true && (o.styles[y] = b.value));
      }
      let u = "", g = Object.keys(h.styles);
      if (g.length > 0) {
        o.styles.transition = "none", h.styles.transition = `all ${r.duration}s ${r.easing} ${r.delay}s`, h.styles["transition-property"] = g.join(", "), h.styles["will-change"] = g.join(", ");
        let y = Object.keys(o.styles).map((b) => b + ": " + o.styles[b] + " !important;").join(""), p = Object.keys(h.styles).map((b) => b + ": " + h.styles[b] + " !important;").join("");
        u = '[data-auto-animate-target="' + a + '"] {' + y + '}[data-auto-animate="running"] [data-auto-animate-target="' + a + '"] {' + p + "}";
      }
      return u;
    }
    /**
     * Returns the auto-animate options for the given element.
     *
     * @param {HTMLElement} element Element to pick up options
     * from, either a slide or an animation target
     * @param {Object} [inheritedOptions] Optional set of existing
     * options
     */
    getAutoAnimateOptions(e, i) {
      let t = {
        easing: this.Reveal.getConfig().autoAnimateEasing,
        duration: this.Reveal.getConfig().autoAnimateDuration,
        delay: 0
      };
      if (t = ge(t, i), e.parentNode) {
        let s = V(e.parentNode, "[data-auto-animate-target]");
        s && (t = this.getAutoAnimateOptions(s, t));
      }
      return e.dataset.autoAnimateEasing && (t.easing = e.dataset.autoAnimateEasing), e.dataset.autoAnimateDuration && (t.duration = parseFloat(e.dataset.autoAnimateDuration)), e.dataset.autoAnimateDelay && (t.delay = parseFloat(e.dataset.autoAnimateDelay)), t;
    }
    /**
     * Returns an object containing all of the properties
     * that can be auto-animated for the given element and
     * their current computed values.
     *
     * @param {String} direction 'from' or 'to'
     */
    getAutoAnimatableProperties(e, i, t) {
      let s = this.Reveal.getConfig(), a = { styles: [] };
      if (t.translate !== false || t.scale !== false) {
        let o;
        if (typeof t.measure == "function")
          o = t.measure(i);
        else if (s.center)
          o = i.getBoundingClientRect();
        else {
          let h = this.Reveal.getScale();
          o = {
            x: i.offsetLeft * h,
            y: i.offsetTop * h,
            width: i.offsetWidth * h,
            height: i.offsetHeight * h
          };
        }
        a.x = o.x, a.y = o.y, a.width = o.width, a.height = o.height;
      }
      const r = getComputedStyle(i);
      return (t.styles || s.autoAnimateStyles).forEach((o) => {
        let h;
        typeof o == "string" && (o = { property: o }), typeof o.from != "undefined" && e === "from" ? h = { value: o.from, explicitValue: true } : typeof o.to != "undefined" && e === "to" ? h = { value: o.to, explicitValue: true } : (o.property === "line-height" && (h = parseFloat(r["line-height"]) / parseFloat(r["font-size"])), isNaN(h) && (h = r[o.property])), h !== "" && (a.styles[o.property] = h);
      }), a;
    }
    /**
     * Get a list of all element pairs that we can animate
     * between the given slides.
     *
     * @param {HTMLElement} fromSlide
     * @param {HTMLElement} toSlide
     *
     * @return {Array} Each value is an array where [0] is
     * the element we're animating from and [1] is the
     * element we're animating to
     */
    getAutoAnimatableElements(e, i) {
      let s = (typeof this.Reveal.getConfig().autoAnimateMatcher == "function" ? this.Reveal.getConfig().autoAnimateMatcher : this.getAutoAnimatePairs).call(this, e, i), a = [];
      return s.filter((r, o) => {
        if (a.indexOf(r.to) === -1)
          return a.push(r.to), true;
      });
    }
    /**
     * Identifies matching elements between slides.
     *
     * You can specify a custom matcher function by using
     * the `autoAnimateMatcher` config option.
     */
    getAutoAnimatePairs(e, i) {
      let t = [];
      const a = "h1, h2, h3, h4, h5, h6, p, li", r = "img, video, iframe";
      return this.findAutoAnimateMatches(t, e, i, "[data-id]", (o) => o.nodeName + ":::" + o.getAttribute("data-id")), this.findAutoAnimateMatches(t, e, i, a, (o) => o.nodeName + ":::" + o.textContent.trim()), this.findAutoAnimateMatches(t, e, i, r, (o) => o.nodeName + ":::" + (o.getAttribute("src") || o.getAttribute("data-src"))), this.findAutoAnimateMatches(t, e, i, "pre", (o) => o.nodeName + ":::" + o.textContent.trim()), t.forEach((o) => {
        xe(o.from, a) ? o.options = { scale: false } : xe(o.from, "pre") && (o.options = { scale: false, styles: ["width", "height"] }, this.findAutoAnimateMatches(t, o.from, o.to, ".hljs .hljs-ln-code", (h) => h.textContent, {
          scale: false,
          styles: [],
          measure: this.getLocalBoundingBox.bind(this)
        }), this.findAutoAnimateMatches(t, o.from, o.to, ".hljs .hljs-ln-numbers[data-line-number]", (h) => h.getAttribute("data-line-number"), {
          scale: false,
          styles: ["width"],
          measure: this.getLocalBoundingBox.bind(this)
        }));
      }, this), t;
    }
    /**
     * Helper method which returns a bounding box based on
     * the given elements offset coordinates.
     *
     * @param {HTMLElement} element
     * @return {Object} x, y, width, height
     */
    getLocalBoundingBox(e) {
      const i = this.Reveal.getScale();
      return {
        x: Math.round(e.offsetLeft * i * 100) / 100,
        y: Math.round(e.offsetTop * i * 100) / 100,
        width: Math.round(e.offsetWidth * i * 100) / 100,
        height: Math.round(e.offsetHeight * i * 100) / 100
      };
    }
    /**
     * Finds matching elements between two slides.
     *
     * @param {Array} pairs            	List of pairs to push matches to
     * @param {HTMLElement} fromScope   Scope within the from element exists
     * @param {HTMLElement} toScope     Scope within the to element exists
     * @param {String} selector         CSS selector of the element to match
     * @param {Function} serializer     A function that accepts an element and returns
     *                                  a stringified ID based on its contents
     * @param {Object} animationOptions Optional config options for this pair
     */
    findAutoAnimateMatches(e, i, t, s, a, r) {
      let o = {}, h = {};
      [].slice.call(i.querySelectorAll(s)).forEach((u, g) => {
        const y = a(u);
        typeof y == "string" && y.length && (o[y] = o[y] || [], o[y].push(u));
      }), [].slice.call(t.querySelectorAll(s)).forEach((u, g) => {
        const y = a(u);
        h[y] = h[y] || [], h[y].push(u);
        let p;
        if (o[y]) {
          const b = h[y].length - 1, l = o[y].length - 1;
          o[y][b] ? (p = o[y][b], o[y][b] = null) : o[y][l] && (p = o[y][l], o[y][l] = null);
        }
        p && e.push({
          from: p,
          to: u,
          options: r
        });
      });
    }
    /**
     * Returns a all elements within the given scope that should
     * be considered unmatched in an auto-animate transition. If
     * fading of unmatched elements is turned on, these elements
     * will fade when going between auto-animate slides.
     *
     * Note that parents of auto-animate targets are NOT considered
     * unmatched since fading them would break the auto-animation.
     *
     * @param {HTMLElement} rootElement
     * @return {Array}
     */
    getUnmatchedAutoAnimateElements(e) {
      return [].slice.call(e.children).reduce((i, t) => {
        const s = t.querySelector("[data-auto-animate-target]");
        return !t.hasAttribute("data-auto-animate-target") && !s && i.push(t), t.querySelector("[data-auto-animate-target]") && (i = i.concat(this.getUnmatchedAutoAnimateElements(t))), i;
      }, []);
    }
  }
  const Di = 500, Vi = 4, Fi = 6, zi = 8;
  class Oi {
    constructor(e) {
      this.Reveal = e, this.active = false, this.activatedCallbacks = [], this.onScroll = this.onScroll.bind(this);
    }
    /**
     * Activates the scroll view. This rearranges the presentation DOM
     * by—among other things—wrapping each slide in a page element.
     */
    activate() {
      if (this.active) return;
      const e = this.Reveal.getState();
      this.active = true, this.slideHTMLBeforeActivation = this.Reveal.getSlidesElement().innerHTML;
      const i = E$1(this.Reveal.getRevealElement(), te$1), t = E$1(this.Reveal.getRevealElement(), Pi);
      this.viewportElement.classList.add("loading-scroll-mode", "reveal-scroll");
      let s;
      const a = window.getComputedStyle(this.viewportElement);
      a && a.background && (s = a.background);
      const r = [], o = i[0].parentNode;
      let h;
      const u = (g, y, p, b) => {
        let l;
        if (h && this.Reveal.shouldAutoAnimateBetween(h, g))
          l = document.createElement("div"), l.className = "scroll-page-content scroll-auto-animate-page", l.style.display = "none", h.closest(".scroll-page-content").parentNode.appendChild(l);
        else {
          const A = document.createElement("div");
          if (A.className = "scroll-page", r.push(A), b && t.length > y) {
            const O = t[y], U = window.getComputedStyle(O);
            U && U.background ? A.style.background = U.background : s && (A.style.background = s);
          } else s && (A.style.background = s);
          const M = document.createElement("div");
          M.className = "scroll-page-sticky", A.appendChild(M), l = document.createElement("div"), l.className = "scroll-page-content", M.appendChild(l);
        }
        l.appendChild(g), g.classList.remove("past", "future"), g.setAttribute("data-index-h", y), g.setAttribute("data-index-v", p), g.slideBackgroundElement && (g.slideBackgroundElement.remove("past", "future"), l.insertBefore(g.slideBackgroundElement, g)), h = g;
      };
      i.forEach((g, y) => {
        this.Reveal.isVerticalStack(g) ? g.querySelectorAll("section").forEach((p, b) => {
          u(p, y, b, true);
        }) : u(g, y, 0);
      }, this), this.createProgressBar(), E$1(this.Reveal.getRevealElement(), ".stack").forEach((g) => g.remove()), r.forEach((g) => o.appendChild(g)), this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()), this.Reveal.layout(), this.Reveal.setState(e), this.activatedCallbacks.forEach((g) => g()), this.activatedCallbacks = [], this.restoreScrollPosition(), this.viewportElement.classList.remove("loading-scroll-mode"), this.viewportElement.addEventListener("scroll", this.onScroll, { passive: true });
    }
    /**
     * Deactivates the scroll view and restores the standard slide-based
     * presentation.
     */
    deactivate() {
      if (!this.active) return;
      const e = this.Reveal.getState();
      this.active = false, this.viewportElement.removeEventListener("scroll", this.onScroll), this.viewportElement.classList.remove("reveal-scroll"), this.removeProgressBar(), this.Reveal.getSlidesElement().innerHTML = this.slideHTMLBeforeActivation, this.Reveal.sync(), this.Reveal.setState(e), this.slideHTMLBeforeActivation = null;
    }
    toggle(e) {
      typeof e == "boolean" ? e ? this.activate() : this.deactivate() : this.isActive() ? this.deactivate() : this.activate();
    }
    /**
     * Checks if the scroll view is currently active.
     */
    isActive() {
      return this.active;
    }
    /**
     * Renders the progress bar component.
     */
    createProgressBar() {
      this.progressBar = document.createElement("div"), this.progressBar.className = "scrollbar", this.progressBarInner = document.createElement("div"), this.progressBarInner.className = "scrollbar-inner", this.progressBar.appendChild(this.progressBarInner), this.progressBarPlayhead = document.createElement("div"), this.progressBarPlayhead.className = "scrollbar-playhead", this.progressBarInner.appendChild(this.progressBarPlayhead), this.viewportElement.insertBefore(this.progressBar, this.viewportElement.firstChild);
      const e = (s) => {
        let a = (s.clientY - this.progressBarInner.getBoundingClientRect().top) / this.progressBarHeight;
        a = Math.max(Math.min(a, 1), 0), this.viewportElement.scrollTop = a * (this.viewportElement.scrollHeight - this.viewportElement.offsetHeight);
      }, i = (s) => {
        this.draggingProgressBar = false, this.showProgressBar(), document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", i);
      }, t = (s) => {
        s.preventDefault(), this.draggingProgressBar = true, document.addEventListener("mousemove", e), document.addEventListener("mouseup", i), e(s);
      };
      this.progressBarInner.addEventListener("mousedown", t);
    }
    removeProgressBar() {
      this.progressBar && (this.progressBar.remove(), this.progressBar = null);
    }
    layout() {
      this.isActive() && (this.syncPages(), this.syncScrollPosition());
    }
    /**
     * Updates our pages to match the latest configuration and
     * presentation size.
     */
    syncPages() {
      const e = this.Reveal.getConfig(), i = this.Reveal.getComputedSlideSize(window.innerWidth, window.innerHeight), t = this.Reveal.getScale(), s = e.scrollLayout === "compact", a = this.viewportElement.offsetHeight, r = i.height * t, o = s ? r : a;
      this.scrollTriggerHeight = s ? r : a, this.viewportElement.style.setProperty("--page-height", o + "px"), this.viewportElement.style.scrollSnapType = typeof e.scrollSnap == "string" ? `y ${e.scrollSnap}` : "", this.slideTriggers = [];
      const h = Array.from(this.Reveal.getRevealElement().querySelectorAll(".scroll-page"));
      this.pages = h.map((u) => {
        const g = this.createPage({
          pageElement: u,
          slideElement: u.querySelector("section"),
          stickyElement: u.querySelector(".scroll-page-sticky"),
          contentElement: u.querySelector(".scroll-page-content"),
          backgroundElement: u.querySelector(".slide-background"),
          autoAnimateElements: u.querySelectorAll(".scroll-auto-animate-page"),
          autoAnimatePages: []
        });
        g.pageElement.style.setProperty("--slide-height", e.center === true ? "auto" : i.height + "px"), this.slideTriggers.push({
          page: g,
          activate: () => this.activatePage(g),
          deactivate: () => this.deactivatePage(g)
        }), this.createFragmentTriggersForPage(g), g.autoAnimateElements.length > 0 && this.createAutoAnimateTriggersForPage(g);
        let y = Math.max(g.scrollTriggers.length - 1, 0);
        y += g.autoAnimatePages.reduce((p, b) => p + Math.max(b.scrollTriggers.length - 1, 0), g.autoAnimatePages.length), g.pageElement.querySelectorAll(".scroll-snap-point").forEach((p) => p.remove());
        for (let p = 0; p < y + 1; p++) {
          const b = document.createElement("div");
          b.className = "scroll-snap-point", b.style.height = this.scrollTriggerHeight + "px", b.style.scrollSnapAlign = s ? "center" : "start", g.pageElement.appendChild(b), p === 0 && (b.style.marginTop = -this.scrollTriggerHeight + "px");
        }
        return s && g.scrollTriggers.length > 0 ? (g.pageHeight = a, g.pageElement.style.setProperty("--page-height", a + "px")) : (g.pageHeight = o, g.pageElement.style.removeProperty("--page-height")), g.scrollPadding = this.scrollTriggerHeight * y, g.totalHeight = g.pageHeight + g.scrollPadding, g.pageElement.style.setProperty("--page-scroll-padding", g.scrollPadding + "px"), y > 0 ? (g.stickyElement.style.position = "sticky", g.stickyElement.style.top = Math.max((a - g.pageHeight) / 2, 0) + "px") : (g.stickyElement.style.position = "relative", g.pageElement.style.scrollSnapAlign = g.pageHeight < a ? "center" : "start"), g;
      }), this.setTriggerRanges(), this.viewportElement.setAttribute("data-scrollbar", e.scrollProgress), e.scrollProgress && this.totalScrollTriggerCount > 1 ? (this.progressBar || this.createProgressBar(), this.syncProgressBar()) : this.removeProgressBar();
    }
    /**
     * Calculates and sets the scroll range for all of our scroll
     * triggers.
     */
    setTriggerRanges() {
      this.totalScrollTriggerCount = this.slideTriggers.reduce((i, t) => i + Math.max(t.page.scrollTriggers.length, 1), 0);
      let e = 0;
      this.slideTriggers.forEach((i, t) => {
        i.range = [
          e,
          e + Math.max(i.page.scrollTriggers.length, 1) / this.totalScrollTriggerCount
        ];
        const s = (i.range[1] - i.range[0]) / i.page.scrollTriggers.length;
        i.page.scrollTriggers.forEach((a, r) => {
          a.range = [
            e + r * s,
            e + (r + 1) * s
          ];
        }), e = i.range[1];
      }), this.slideTriggers[this.slideTriggers.length - 1].range[1] = 1;
    }
    /**
     * Creates one scroll trigger for each fragments in the given page.
     *
     * @param {*} page
     */
    createFragmentTriggersForPage(e, i) {
      i = i || e.slideElement;
      const t = this.Reveal.fragments.sort(i.querySelectorAll(".fragment"), true);
      return t.length && (e.fragments = this.Reveal.fragments.sort(i.querySelectorAll(".fragment:not(.disabled)")), e.scrollTriggers.push(
        // Trigger for the initial state with no fragments visible
        {
          activate: () => {
            this.Reveal.fragments.update(-1, e.fragments, i);
          }
        }
      ), t.forEach((s, a) => {
        e.scrollTriggers.push({
          activate: () => {
            this.Reveal.fragments.update(a, e.fragments, i);
          }
        });
      })), e.scrollTriggers.length;
    }
    /**
     * Creates scroll triggers for the auto-animate steps in the
     * given page.
     *
     * @param {*} page
     */
    createAutoAnimateTriggersForPage(e) {
      e.autoAnimateElements.length > 0 && this.slideTriggers.push(...Array.from(e.autoAnimateElements).map((i, t) => {
        let s = this.createPage({
          slideElement: i.querySelector("section"),
          contentElement: i,
          backgroundElement: i.querySelector(".slide-background")
        });
        return this.createFragmentTriggersForPage(s, s.slideElement), e.autoAnimatePages.push(s), {
          page: s,
          activate: () => this.activatePage(s),
          deactivate: () => this.deactivatePage(s)
        };
      }));
    }
    /**
     * Helper method for creating a page definition and adding
     * required fields. A "page" is a slide or auto-animate step.
     */
    createPage(e) {
      return e.scrollTriggers = [], e.indexh = parseInt(e.slideElement.getAttribute("data-index-h"), 10), e.indexv = parseInt(e.slideElement.getAttribute("data-index-v"), 10), e;
    }
    /**
     * Rerenders progress bar segments so that they match the current
     * reveal.js config and size.
     */
    syncProgressBar() {
      this.progressBarInner.querySelectorAll(".scrollbar-slide").forEach((r) => r.remove());
      const e = this.viewportElement.scrollHeight, i = this.viewportElement.offsetHeight, t = i / e;
      this.progressBarHeight = this.progressBarInner.offsetHeight, this.playheadHeight = Math.max(t * this.progressBarHeight, zi), this.progressBarScrollableHeight = this.progressBarHeight - this.playheadHeight;
      const s = i / e * this.progressBarHeight, a = Math.min(s / 8, Vi);
      this.progressBarPlayhead.style.height = this.playheadHeight - a + "px", s > Fi ? this.slideTriggers.forEach((r) => {
        const { page: o } = r;
        o.progressBarSlide = document.createElement("div"), o.progressBarSlide.className = "scrollbar-slide", o.progressBarSlide.style.top = r.range[0] * this.progressBarHeight + "px", o.progressBarSlide.style.height = (r.range[1] - r.range[0]) * this.progressBarHeight - a + "px", o.progressBarSlide.classList.toggle("has-triggers", o.scrollTriggers.length > 0), this.progressBarInner.appendChild(o.progressBarSlide), o.scrollTriggerElements = o.scrollTriggers.map((h, u) => {
          const g = document.createElement("div");
          return g.className = "scrollbar-trigger", g.style.top = (h.range[0] - r.range[0]) * this.progressBarHeight + "px", g.style.height = (h.range[1] - h.range[0]) * this.progressBarHeight - a + "px", o.progressBarSlide.appendChild(g), u === 0 && (g.style.display = "none"), g;
        });
      }) : this.pages.forEach((r) => r.progressBarSlide = null);
    }
    /**
     * Reads the current scroll position and updates our active
     * trigger states accordingly.
     */
    syncScrollPosition() {
      const e = this.viewportElement.offsetHeight, i = e / this.viewportElement.scrollHeight, t = this.viewportElement.scrollTop, s = this.viewportElement.scrollHeight - e, a = Math.max(Math.min(t / s, 1), 0), r = Math.max(Math.min((t + e / 2) / this.viewportElement.scrollHeight, 1), 0);
      let o;
      this.slideTriggers.forEach((h) => {
        const { page: u } = h;
        a >= h.range[0] - i * 2 && a <= h.range[1] + i * 2 && !u.loaded ? (u.loaded = true, this.Reveal.slideContent.load(u.slideElement)) : u.loaded && (u.loaded = false, this.Reveal.slideContent.unload(u.slideElement)), a >= h.range[0] && a <= h.range[1] ? (this.activateTrigger(h), o = h.page) : h.active && this.deactivateTrigger(h);
      }), o && o.scrollTriggers.forEach((h) => {
        r >= h.range[0] && r <= h.range[1] ? this.activateTrigger(h) : h.active && this.deactivateTrigger(h);
      }), this.setProgressBarValue(t / (this.viewportElement.scrollHeight - e));
    }
    /**
     * Moves the progress bar playhead to the specified position.
     *
     * @param {number} progress 0-1
     */
    setProgressBarValue(e) {
      this.progressBar && (this.progressBarPlayhead.style.transform = `translateY(${e * this.progressBarScrollableHeight}px)`, this.getAllPages().filter((i) => i.progressBarSlide).forEach((i) => {
        i.progressBarSlide.classList.toggle("active", i.active === true), i.scrollTriggers.forEach((t, s) => {
          i.scrollTriggerElements[s].classList.toggle("active", i.active === true && t.active === true);
        });
      }), this.showProgressBar());
    }
    /**
     * Show the progress bar and, if configured, automatically hide
     * it after a delay.
     */
    showProgressBar() {
      this.progressBar.classList.add("visible"), clearTimeout(this.hideProgressBarTimeout), this.Reveal.getConfig().scrollProgress === "auto" && !this.draggingProgressBar && (this.hideProgressBarTimeout = setTimeout(() => {
        this.progressBar && this.progressBar.classList.remove("visible");
      }, Di));
    }
    /**
     * Scroll to the previous page.
     */
    prev() {
      this.viewportElement.scrollTop -= this.scrollTriggerHeight;
    }
    /**
     * Scroll to the next page.
     */
    next() {
      this.viewportElement.scrollTop += this.scrollTriggerHeight;
    }
    /**
     * Scrolls the given slide element into view.
     *
     * @param {HTMLElement} slideElement
     */
    scrollToSlide(e) {
      if (!this.active)
        this.activatedCallbacks.push(() => this.scrollToSlide(e));
      else {
        const i = this.getScrollTriggerBySlide(e);
        i && (this.viewportElement.scrollTop = i.range[0] * (this.viewportElement.scrollHeight - this.viewportElement.offsetHeight));
      }
    }
    /**
     * Persists the current scroll position to session storage
     * so that it can be restored.
     */
    storeScrollPosition() {
      clearTimeout(this.storeScrollPositionTimeout), this.storeScrollPositionTimeout = setTimeout(() => {
        sessionStorage.setItem("reveal-scroll-top", this.viewportElement.scrollTop), sessionStorage.setItem("reveal-scroll-origin", location.origin + location.pathname), this.storeScrollPositionTimeout = null;
      }, 50);
    }
    /**
     * Restores the scroll position when a deck is reloader.
     */
    restoreScrollPosition() {
      const e = sessionStorage.getItem("reveal-scroll-top"), i = sessionStorage.getItem("reveal-scroll-origin");
      e && i === location.origin + location.pathname && (this.viewportElement.scrollTop = parseInt(e, 10));
    }
    /**
     * Activates the given page and starts its embedded content
     * if there is any.
     *
     * @param {object} page
     */
    activatePage(e) {
      if (!e.active) {
        e.active = true;
        const { slideElement: i, backgroundElement: t, contentElement: s, indexh: a, indexv: r } = e;
        s.style.display = "block", i.classList.add("present"), t && t.classList.add("present"), this.Reveal.setCurrentScrollPage(i, a, r), this.Reveal.backgrounds.bubbleSlideContrastClassToElement(i, this.viewportElement), Array.from(s.parentNode.querySelectorAll(".scroll-page-content")).forEach((o) => {
          o !== s && (o.style.display = "none");
        });
      }
    }
    /**
     * Deactivates the page after it has been visible.
     *
     * @param {object} page
     */
    deactivatePage(e) {
      e.active && (e.active = false, e.slideElement && e.slideElement.classList.remove("present"), e.backgroundElement && e.backgroundElement.classList.remove("present"));
    }
    activateTrigger(e) {
      e.active || (e.active = true, e.activate());
    }
    deactivateTrigger(e) {
      e.active && (e.active = false, e.deactivate && e.deactivate());
    }
    /**
     * Retrieve a slide by its original h/v index (i.e. the indices the
     * slide had before being linearized).
     *
     * @param {number} h
     * @param {number} v
     * @returns {HTMLElement}
     */
    getSlideByIndices(e, i) {
      const t = this.getAllPages().find((s) => s.indexh === e && s.indexv === i);
      return t ? t.slideElement : null;
    }
    /**
     * Retrieve a list of all scroll triggers for the given slide
     * DOM element.
     *
     * @param {HTMLElement} slide
     * @returns {Array}
     */
    getScrollTriggerBySlide(e) {
      return this.slideTriggers.find((i) => i.page.slideElement === e);
    }
    /**
     * Get a list of all pages in the scroll view. This includes
     * both top-level slides and auto-animate steps.
     *
     * @returns {Array}
     */
    getAllPages() {
      return this.pages.flatMap((e) => [e, ...e.autoAnimatePages || []]);
    }
    onScroll() {
      this.syncScrollPosition(), this.storeScrollPosition();
    }
    get viewportElement() {
      return this.Reveal.getViewportElement();
    }
  }
  class Ui {
    constructor(e) {
      this.Reveal = e;
    }
    /**
     * Configures the presentation for printing to a static
     * PDF.
     */
    activate() {
      return It$1(this, null, function* () {
        const e = this.Reveal.getConfig(), i = E$1(this.Reveal.getRevealElement(), de), t = e.slideNumber && /all|print/i.test(e.showSlideNumber), s = this.Reveal.getComputedSlideSize(window.innerWidth, window.innerHeight), a = Math.floor(s.width * (1 + e.margin)), r = Math.floor(s.height * (1 + e.margin)), o = s.width, h = s.height;
        yield new Promise(requestAnimationFrame), Xe("@page{size:" + a + "px " + r + "px; margin: 0px;}"), Xe(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: " + o + "px; max-height:" + h + "px}"), document.documentElement.classList.add("reveal-print", "print-pdf"), document.body.style.width = a + "px", document.body.style.height = r + "px";
        const u = this.Reveal.getViewportElement();
        let g;
        if (u) {
          const A = window.getComputedStyle(u);
          A && A.background && (g = A.background);
        }
        yield new Promise(requestAnimationFrame), this.Reveal.layoutSlideContents(o, h), yield new Promise(requestAnimationFrame);
        const y = i.map((A) => A.scrollHeight), p = [], b = i[0].parentNode;
        let l = 1;
        i.forEach(function(A, M) {
          if (A.classList.contains("stack") === false) {
            let O = (a - o) / 2, U = (r - h) / 2;
            const re = y[M];
            let z = Math.max(Math.ceil(re / r), 1);
            z = Math.min(z, e.pdfMaxPagesPerSlide), (z === 1 && e.center || A.classList.contains("center")) && (U = Math.max((r - re) / 2, 0));
            const R = document.createElement("div");
            if (p.push(R), R.className = "pdf-page", R.style.height = (r + e.pdfPageHeightOffset) * z + "px", g && (R.style.background = g), R.appendChild(A), A.style.left = O + "px", A.style.top = U + "px", A.style.width = o + "px", this.Reveal.slideContent.layout(A), A.slideBackgroundElement && R.insertBefore(A.slideBackgroundElement, A), e.showNotes) {
              const B = this.Reveal.getSlideNotes(A);
              if (B) {
                const W = typeof e.showNotes == "string" ? e.showNotes : "inline", L = document.createElement("div");
                L.classList.add("speaker-notes"), L.classList.add("speaker-notes-pdf"), L.setAttribute("data-layout", W), L.innerHTML = B, W === "separate-page" ? p.push(L) : (L.style.left = "8px", L.style.bottom = "8px", L.style.width = a - 16 + "px", R.appendChild(L));
              }
            }
            if (t) {
              const B = document.createElement("div");
              B.classList.add("slide-number"), B.classList.add("slide-number-pdf"), B.innerHTML = l++, R.appendChild(B);
            }
            if (e.pdfSeparateFragments) {
              const B = this.Reveal.fragments.sort(R.querySelectorAll(".fragment"), true);
              let q;
              B.forEach(function(W, L) {
                q && q.forEach(function(F) {
                  F.classList.remove("current-fragment");
                }), W.forEach(function(F) {
                  F.classList.add("visible", "current-fragment");
                }, this);
                const k = R.cloneNode(true);
                if (t) {
                  const F = k.querySelector(".slide-number-pdf"), C = L + 1;
                  F.innerHTML += "." + C;
                }
                p.push(k), q = W;
              }, this), B.forEach(function(W) {
                W.forEach(function(L) {
                  L.classList.remove("visible", "current-fragment");
                });
              });
            } else
              E$1(R, ".fragment:not(.fade-out)").forEach(function(B) {
                B.classList.add("visible");
              });
          }
        }, this), yield new Promise(requestAnimationFrame), p.forEach((A) => b.appendChild(A)), this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()), this.Reveal.dispatchEvent({ type: "pdf-ready" }), u.classList.remove("loading-scroll-mode");
      });
    }
    /**
     * Checks if the print mode is/should be activated.
     */
    isActive() {
      return this.Reveal.getConfig().view === "print";
    }
  }
  class qi {
    constructor(e) {
      this.Reveal = e;
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      e.fragments === false ? this.disable() : i.fragments === false && this.enable();
    }
    /**
     * If fragments are disabled in the deck, they should all be
     * visible rather than stepped through.
     */
    disable() {
      E$1(this.Reveal.getSlidesElement(), ".fragment").forEach((e) => {
        e.classList.add("visible"), e.classList.remove("current-fragment");
      });
    }
    /**
     * Reverse of #disable(). Only called if fragments have
     * previously been disabled.
     */
    enable() {
      E$1(this.Reveal.getSlidesElement(), ".fragment").forEach((e) => {
        e.classList.remove("visible"), e.classList.remove("current-fragment");
      });
    }
    /**
     * Returns an object describing the available fragment
     * directions.
     *
     * @return {{prev: boolean, next: boolean}}
     */
    availableRoutes() {
      let e = this.Reveal.getCurrentSlide();
      if (e && this.Reveal.getConfig().fragments) {
        let i = e.querySelectorAll(".fragment:not(.disabled)"), t = e.querySelectorAll(".fragment:not(.disabled):not(.visible)");
        return {
          prev: i.length - t.length > 0,
          next: !!t.length
        };
      } else
        return { prev: false, next: false };
    }
    /**
     * Return a sorted fragments list, ordered by an increasing
     * "data-fragment-index" attribute.
     *
     * Fragments will be revealed in the order that they are returned by
     * this function, so you can use the index attributes to control the
     * order of fragment appearance.
     *
     * To maintain a sensible default fragment order, fragments are presumed
     * to be passed in document order. This function adds a "fragment-index"
     * attribute to each node if such an attribute is not already present,
     * and sets that attribute to an integer value which is the position of
     * the fragment within the fragments list.
     *
     * @param {object[]|*} fragments
     * @param {boolean} grouped If true the returned array will contain
     * nested arrays for all fragments with the same index
     * @return {object[]} sorted Sorted array of fragments
     */
    sort(e, i = false) {
      e = Array.from(e);
      let t = [], s = [], a = [];
      e.forEach((o) => {
        if (o.hasAttribute("data-fragment-index")) {
          let h = parseInt(o.getAttribute("data-fragment-index"), 10);
          t[h] || (t[h] = []), t[h].push(o);
        } else
          s.push([o]);
      }), t = t.concat(s);
      let r = 0;
      return t.forEach((o) => {
        o.forEach((h) => {
          a.push(h), h.setAttribute("data-fragment-index", r);
        }), r++;
      }), i === true ? t : a;
    }
    /**
     * Sorts and formats all of fragments in the
     * presentation.
     */
    sortAll() {
      this.Reveal.getHorizontalSlides().forEach((e) => {
        let i = E$1(e, "section");
        i.forEach((t, s) => {
          this.sort(t.querySelectorAll(".fragment"));
        }, this), i.length === 0 && this.sort(e.querySelectorAll(".fragment"));
      });
    }
    /**
     * Refreshes the fragments on the current slide so that they
     * have the appropriate classes (.visible + .current-fragment).
     *
     * @param {number} [index] The index of the current fragment
     * @param {array} [fragments] Array containing all fragments
     * in the current slide
     *
     * @return {{shown: array, hidden: array}}
     */
    update(e, i, t = this.Reveal.getCurrentSlide()) {
      let s = {
        shown: [],
        hidden: []
      };
      if (t && this.Reveal.getConfig().fragments && (i = i || this.sort(t.querySelectorAll(".fragment")), i.length)) {
        let a = 0;
        if (typeof e != "number") {
          let r = this.sort(t.querySelectorAll(".fragment.visible")).pop();
          r && (e = parseInt(r.getAttribute("data-fragment-index") || 0, 10));
        }
        Array.from(i).forEach((r, o) => {
          if (r.hasAttribute("data-fragment-index") && (o = parseInt(r.getAttribute("data-fragment-index"), 10)), a = Math.max(a, o), o <= e) {
            let h = r.classList.contains("visible");
            r.classList.add("visible"), r.classList.remove("current-fragment"), o === e && (this.Reveal.announceStatus(this.Reveal.getStatusText(r)), r.classList.add("current-fragment"), this.Reveal.slideContent.startEmbeddedContent(r)), h || (s.shown.push(r), this.Reveal.dispatchEvent({
              target: r,
              type: "visible",
              bubbles: false
            }));
          } else {
            let h = r.classList.contains("visible");
            r.classList.remove("visible"), r.classList.remove("current-fragment"), h && (this.Reveal.slideContent.stopEmbeddedContent(r), s.hidden.push(r), this.Reveal.dispatchEvent({
              target: r,
              type: "hidden",
              bubbles: false
            }));
          }
        }), e = typeof e == "number" ? e : -1, e = Math.max(Math.min(e, a), -1), t.setAttribute("data-fragment", e);
      }
      return s.hidden.length && this.Reveal.dispatchEvent({
        type: "fragmenthidden",
        data: {
          fragment: s.hidden[0],
          fragments: s.hidden
        }
      }), s.shown.length && this.Reveal.dispatchEvent({
        type: "fragmentshown",
        data: {
          fragment: s.shown[0],
          fragments: s.shown
        }
      }), s;
    }
    /**
     * Formats the fragments on the given slide so that they have
     * valid indices. Call this if fragments are changed in the DOM
     * after reveal.js has already initialized.
     *
     * @param {HTMLElement} slide
     * @return {Array} a list of the HTML fragments that were synced
     */
    sync(e = this.Reveal.getCurrentSlide()) {
      return this.sort(e.querySelectorAll(".fragment"));
    }
    /**
     * Navigate to the specified slide fragment.
     *
     * @param {?number} index The index of the fragment that
     * should be shown, -1 means all are invisible
     * @param {number} offset Integer offset to apply to the
     * fragment index
     *
     * @return {boolean} true if a change was made in any
     * fragments visibility as part of this call
     */
    goto(e, i = 0) {
      let t = this.Reveal.getCurrentSlide();
      if (t && this.Reveal.getConfig().fragments) {
        let s = this.sort(t.querySelectorAll(".fragment:not(.disabled)"));
        if (s.length) {
          if (typeof e != "number") {
            let r = this.sort(t.querySelectorAll(".fragment:not(.disabled).visible")).pop();
            r ? e = parseInt(r.getAttribute("data-fragment-index") || 0, 10) : e = -1;
          }
          e += i;
          let a = this.update(e, s);
          return this.Reveal.controls.update(), this.Reveal.progress.update(), this.Reveal.getConfig().fragmentInURL && this.Reveal.location.writeURL(), !!(a.shown.length || a.hidden.length);
        }
      }
      return false;
    }
    /**
     * Navigate to the next slide fragment.
     *
     * @return {boolean} true if there was a next fragment,
     * false otherwise
     */
    next() {
      return this.goto(null, 1);
    }
    /**
     * Navigate to the previous slide fragment.
     *
     * @return {boolean} true if there was a previous fragment,
     * false otherwise
     */
    prev() {
      return this.goto(null, -1);
    }
  }
  class Wi {
    constructor(e) {
      this.Reveal = e, this.active = false, this.onSlideClicked = this.onSlideClicked.bind(this);
    }
    /**
     * Displays the overview of slides (quick nav) by scaling
     * down and arranging all slide elements.
     */
    activate() {
      if (this.Reveal.getConfig().overview && !this.Reveal.isScrollView() && !this.isActive()) {
        this.active = true, this.Reveal.getRevealElement().classList.add("overview"), this.Reveal.cancelAutoSlide(), this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()), E$1(this.Reveal.getRevealElement(), de).forEach((s) => {
          s.classList.contains("stack") || s.addEventListener("click", this.onSlideClicked, true);
        });
        const e = 70, i = this.Reveal.getComputedSlideSize();
        this.overviewSlideWidth = i.width + e, this.overviewSlideHeight = i.height + e, this.Reveal.getConfig().rtl && (this.overviewSlideWidth = -this.overviewSlideWidth), this.Reveal.updateSlidesVisibility(), this.layout(), this.update(), this.Reveal.layout();
        const t = this.Reveal.getIndices();
        this.Reveal.dispatchEvent({
          type: "overviewshown",
          data: {
            indexh: t.h,
            indexv: t.v,
            currentSlide: this.Reveal.getCurrentSlide()
          }
        });
      }
    }
    /**
     * Uses CSS transforms to position all slides in a grid for
     * display inside of the overview mode.
     */
    layout() {
      this.Reveal.getHorizontalSlides().forEach((e, i) => {
        e.setAttribute("data-index-h", i), ae$1(e, "translate3d(" + i * this.overviewSlideWidth + "px, 0, 0)"), e.classList.contains("stack") && E$1(e, "section").forEach((t, s) => {
          t.setAttribute("data-index-h", i), t.setAttribute("data-index-v", s), ae$1(t, "translate3d(0, " + s * this.overviewSlideHeight + "px, 0)");
        });
      }), Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e, i) => {
        ae$1(e, "translate3d(" + i * this.overviewSlideWidth + "px, 0, 0)"), E$1(e, ".slide-background").forEach((t, s) => {
          ae$1(t, "translate3d(0, " + s * this.overviewSlideHeight + "px, 0)");
        });
      });
    }
    /**
     * Moves the overview viewport to the current slides.
     * Called each time the current slide changes.
     */
    update() {
      const e = Math.min(window.innerWidth, window.innerHeight), i = Math.max(e / 5, 150) / e, t = this.Reveal.getIndices();
      this.Reveal.transformSlides({
        overview: [
          "scale(" + i + ")",
          "translateX(" + -t.h * this.overviewSlideWidth + "px)",
          "translateY(" + -t.v * this.overviewSlideHeight + "px)"
        ].join(" ")
      });
    }
    /**
     * Exits the slide overview and enters the currently
     * active slide.
     */
    deactivate() {
      if (this.Reveal.getConfig().overview) {
        this.active = false, this.Reveal.getRevealElement().classList.remove("overview"), this.Reveal.getRevealElement().classList.add("overview-deactivating"), setTimeout(() => {
          this.Reveal.getRevealElement().classList.remove("overview-deactivating");
        }, 1), this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()), E$1(this.Reveal.getRevealElement(), de).forEach((i) => {
          ae$1(i, ""), i.removeEventListener("click", this.onSlideClicked, true);
        }), E$1(this.Reveal.getBackgroundsElement(), ".slide-background").forEach((i) => {
          ae$1(i, "");
        }), this.Reveal.transformSlides({ overview: "" });
        const e = this.Reveal.getIndices();
        this.Reveal.slide(e.h, e.v), this.Reveal.layout(), this.Reveal.cueAutoSlide(), this.Reveal.dispatchEvent({
          type: "overviewhidden",
          data: {
            indexh: e.h,
            indexv: e.v,
            currentSlide: this.Reveal.getCurrentSlide()
          }
        });
      }
    }
    /**
     * Toggles the slide overview mode on and off.
     *
     * @param {Boolean} [override] Flag which overrides the
     * toggle logic and forcibly sets the desired state. True means
     * overview is open, false means it's closed.
     */
    toggle(e) {
      typeof e == "boolean" ? e ? this.activate() : this.deactivate() : this.isActive() ? this.deactivate() : this.activate();
    }
    /**
     * Checks if the overview is currently active.
     *
     * @return {Boolean} true if the overview is active,
     * false otherwise
     */
    isActive() {
      return this.active;
    }
    /**
     * Invoked when a slide is and we're in the overview.
     *
     * @param {object} event
     */
    onSlideClicked(e) {
      if (this.isActive()) {
        e.preventDefault();
        let i = e.target;
        for (; i && !i.nodeName.match(/section/gi); )
          i = i.parentNode;
        if (i && !i.classList.contains("disabled") && (this.deactivate(), i.nodeName.match(/section/gi))) {
          let t = parseInt(i.getAttribute("data-index-h"), 10), s = parseInt(i.getAttribute("data-index-v"), 10);
          this.Reveal.slide(t, s);
        }
      }
    }
  }
  class ji {
    constructor(e) {
      this.Reveal = e, this.shortcuts = {}, this.bindings = {}, this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      e.navigationMode === "linear" ? (this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"] = "Next slide", this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"] = "Previous slide") : (this.shortcuts["N  ,  SPACE"] = "Next slide", this.shortcuts["P  ,  Shift SPACE"] = "Previous slide", this.shortcuts["&#8592;  ,  H"] = "Navigate left", this.shortcuts["&#8594;  ,  L"] = "Navigate right", this.shortcuts["&#8593;  ,  K"] = "Navigate up", this.shortcuts["&#8595;  ,  J"] = "Navigate down"), this.shortcuts["Alt + &#8592;/&#8593/&#8594;/&#8595;"] = "Navigate without fragments", this.shortcuts["Shift + &#8592;/&#8593/&#8594;/&#8595;"] = "Jump to first/last slide", this.shortcuts["B  ,  ."] = "Pause", this.shortcuts.F = "Fullscreen", this.shortcuts.G = "Jump to slide", this.shortcuts["ESC, O"] = "Slide overview";
    }
    /**
     * Starts listening for keyboard events.
     */
    bind() {
      document.addEventListener("keydown", this.onDocumentKeyDown, false);
    }
    /**
     * Stops listening for keyboard events.
     */
    unbind() {
      document.removeEventListener("keydown", this.onDocumentKeyDown, false);
    }
    /**
     * Add a custom key binding with optional description to
     * be added to the help screen.
     */
    addKeyBinding(e, i) {
      typeof e == "object" && e.keyCode ? this.bindings[e.keyCode] = {
        callback: i,
        key: e.key,
        description: e.description
      } : this.bindings[e] = {
        callback: i,
        key: null,
        description: null
      };
    }
    /**
     * Removes the specified custom key binding.
     */
    removeKeyBinding(e) {
      delete this.bindings[e];
    }
    /**
     * Programmatically triggers a keyboard event
     *
     * @param {int} keyCode
     */
    triggerKey(e) {
      this.onDocumentKeyDown({ keyCode: e });
    }
    /**
     * Registers a new shortcut to include in the help overlay
     *
     * @param {String} key
     * @param {String} value
     */
    registerKeyboardShortcut(e, i) {
      this.shortcuts[e] = i;
    }
    getShortcuts() {
      return this.shortcuts;
    }
    getBindings() {
      return this.bindings;
    }
    /**
     * Handler for the document level 'keydown' event.
     *
     * @param {object} event
     */
    onDocumentKeyDown(e) {
      let i = this.Reveal.getConfig();
      if (typeof i.keyboardCondition == "function" && i.keyboardCondition(e) === false || i.keyboardCondition === "focused" && !this.Reveal.isFocused())
        return true;
      let t = e.keyCode, s = !this.Reveal.isAutoSliding();
      this.Reveal.onUserInput(e);
      let a = document.activeElement && document.activeElement.isContentEditable === true, r = document.activeElement && document.activeElement.tagName && /input|textarea/i.test(document.activeElement.tagName), o = document.activeElement && document.activeElement.className && /speaker-notes/i.test(document.activeElement.className), u = !([32, 37, 38, 39, 40, 63, 78, 80, 191].indexOf(e.keyCode) !== -1 && e.shiftKey || e.altKey) && (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey);
      if (a || r || o || u) return;
      let g = [66, 86, 190, 191, 112], y;
      if (typeof i.keyboard == "object")
        for (y in i.keyboard)
          i.keyboard[y] === "togglePause" && g.push(parseInt(y, 10));
      if (this.Reveal.isOverlayOpen() && !["Escape", "f", "c", "b", "."].includes(e.key) || this.Reveal.isPaused() && g.indexOf(t) === -1)
        return false;
      let p = i.navigationMode === "linear" || !this.Reveal.hasHorizontalSlides() || !this.Reveal.hasVerticalSlides(), b = false;
      if (typeof i.keyboard == "object") {
        for (y in i.keyboard)
          if (parseInt(y, 10) === t) {
            let l = i.keyboard[y];
            typeof l == "function" ? l.apply(null, [e]) : typeof l == "string" && typeof this.Reveal[l] == "function" && this.Reveal[l].call(), b = true;
          }
      }
      if (b === false) {
        for (y in this.bindings)
          if (parseInt(y, 10) === t) {
            let l = this.bindings[y].callback;
            typeof l == "function" ? l.apply(null, [e]) : typeof l == "string" && typeof this.Reveal[l] == "function" && this.Reveal[l].call(), b = true;
          }
      }
      b === false && (b = true, t === 80 || t === 33 ? this.Reveal.prev({ skipFragments: e.altKey }) : t === 78 || t === 34 ? this.Reveal.next({ skipFragments: e.altKey }) : t === 72 || t === 37 ? e.shiftKey ? this.Reveal.slide(0) : !this.Reveal.overview.isActive() && p ? i.rtl ? this.Reveal.next({ skipFragments: e.altKey }) : this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.left({ skipFragments: e.altKey }) : t === 76 || t === 39 ? e.shiftKey ? this.Reveal.slide(this.Reveal.getHorizontalSlides().length - 1) : !this.Reveal.overview.isActive() && p ? i.rtl ? this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.next({ skipFragments: e.altKey }) : this.Reveal.right({ skipFragments: e.altKey }) : t === 75 || t === 38 ? e.shiftKey ? this.Reveal.slide(void 0, 0) : !this.Reveal.overview.isActive() && p ? this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.up({ skipFragments: e.altKey }) : t === 74 || t === 40 ? e.shiftKey ? this.Reveal.slide(void 0, Number.MAX_VALUE) : !this.Reveal.overview.isActive() && p ? this.Reveal.next({ skipFragments: e.altKey }) : this.Reveal.down({ skipFragments: e.altKey }) : t === 36 ? this.Reveal.slide(0) : t === 35 ? this.Reveal.slide(this.Reveal.getHorizontalSlides().length - 1) : t === 32 ? (this.Reveal.overview.isActive() && this.Reveal.overview.deactivate(), e.shiftKey ? this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.next({ skipFragments: e.altKey })) : [58, 59, 66, 86, 190].includes(t) || t === 191 && !e.shiftKey ? this.Reveal.togglePause() : t === 70 ? Dt$1(i.embedded ? this.Reveal.getViewportElement() : document.documentElement) : t === 65 ? i.autoSlideStoppable && this.Reveal.toggleAutoSlide(s) : t === 71 ? i.jumpToSlide && this.Reveal.toggleJumpToSlide() : t === 67 && this.Reveal.isOverlayOpen() ? this.Reveal.closeOverlay() : (t === 63 || t === 191) && e.shiftKey ? this.Reveal.toggleHelp() : t === 112 ? this.Reveal.toggleHelp() : b = false), b ? e.preventDefault && e.preventDefault() : t === 27 || t === 79 ? (this.Reveal.closeOverlay() === false && this.Reveal.overview.toggle(), e.preventDefault && e.preventDefault()) : t === 13 && this.Reveal.overview.isActive() && (this.Reveal.overview.deactivate(), e.preventDefault && e.preventDefault()), this.Reveal.cueAutoSlide();
    }
  }
  class Ki {
    constructor(e) {
      // The minimum number of milliseconds that must pass between
      // calls to history.replaceState
      je(this, "MAX_REPLACE_STATE_FREQUENCY", 1e3);
      this.Reveal = e, this.writeURLTimeout = 0, this.replaceStateTimestamp = 0, this.onWindowHashChange = this.onWindowHashChange.bind(this);
    }
    bind() {
      window.addEventListener("hashchange", this.onWindowHashChange, false);
    }
    unbind() {
      window.removeEventListener("hashchange", this.onWindowHashChange, false);
    }
    /**
     * Returns the slide indices for the given hash link.
     *
     * @param {string} [hash] the hash string that we want to
     * find the indices for
     *
     * @returns slide indices or null
     */
    getIndicesFromHash(e = window.location.hash, i = {}) {
      let t = e.replace(/^#\/?/, ""), s = t.split("/");
      if (!/^[0-9]*$/.test(s[0]) && t.length) {
        let a, r;
        /\/[-\d]+$/g.test(t) && (r = parseInt(t.split("/").pop(), 10), r = isNaN(r) ? void 0 : r, t = t.split("/").shift());
        try {
          const o = decodeURIComponent(t);
          a = (document.getElementById(o) || document.querySelector(`[data-id="${o}"]`)).closest(".slides section");
        } catch (o) {
        }
        if (a)
          return We(Q$1({}, this.Reveal.getIndices(a)), { f: r });
      } else {
        const a = this.Reveal.getConfig();
        let r = a.hashOneBasedIndex || i.oneBasedIndex ? 1 : 0, o = parseInt(s[0], 10) - r || 0, h = parseInt(s[1], 10) - r || 0, u;
        return a.fragmentInURL && (u = parseInt(s[2], 10), isNaN(u) && (u = void 0)), { h: o, v: h, f: u };
      }
      return null;
    }
    /**
     * Reads the current URL (hash) and navigates accordingly.
     */
    readURL() {
      const e = this.Reveal.getIndices(), i = this.getIndicesFromHash();
      i ? (i.h !== e.h || i.v !== e.v || i.f !== void 0) && this.Reveal.slide(i.h, i.v, i.f) : this.Reveal.slide(e.h || 0, e.v || 0);
    }
    /**
     * Updates the page URL (hash) to reflect the current
     * state.
     *
     * @param {number} delay The time in ms to wait before
     * writing the hash
     */
    writeURL(e) {
      let i = this.Reveal.getConfig(), t = this.Reveal.getCurrentSlide();
      if (clearTimeout(this.writeURLTimeout), typeof e == "number")
        this.writeURLTimeout = setTimeout(this.writeURL, e);
      else if (t) {
        let s = this.getHash();
        i.history ? window.location.hash = s : i.hash && (s === "/" ? this.debouncedReplaceState(window.location.pathname + window.location.search) : this.debouncedReplaceState("#" + s));
      }
    }
    replaceState(e) {
      window.history.replaceState(null, null, e), this.replaceStateTimestamp = Date.now();
    }
    debouncedReplaceState(e) {
      clearTimeout(this.replaceStateTimeout), Date.now() - this.replaceStateTimestamp > this.MAX_REPLACE_STATE_FREQUENCY ? this.replaceState(e) : this.replaceStateTimeout = setTimeout(() => this.replaceState(e), this.MAX_REPLACE_STATE_FREQUENCY);
    }
    /**
     * Return a hash URL that will resolve to the given slide location.
     *
     * @param {HTMLElement} [slide=currentSlide] The slide to link to
     */
    getHash(e) {
      let i = "/", t = e || this.Reveal.getCurrentSlide(), s = t ? t.getAttribute("id") : null;
      s && (s = encodeURIComponent(s));
      let a = this.Reveal.getIndices(e);
      if (this.Reveal.getConfig().fragmentInURL || (a.f = void 0), typeof s == "string" && s.length)
        i = "/" + s, a.f >= 0 && (i += "/" + a.f);
      else {
        let r = this.Reveal.getConfig().hashOneBasedIndex ? 1 : 0;
        (a.h > 0 || a.v > 0 || a.f >= 0) && (i += a.h + r), (a.v > 0 || a.f >= 0) && (i += "/" + (a.v + r)), a.f >= 0 && (i += "/" + a.f);
      }
      return i;
    }
    /**
     * Handler for the window level 'hashchange' event.
     *
     * @param {object} [event]
     */
    onWindowHashChange(e) {
      this.readURL();
    }
  }
  class _i {
    constructor(e) {
      this.Reveal = e, this.onNavigateLeftClicked = this.onNavigateLeftClicked.bind(this), this.onNavigateRightClicked = this.onNavigateRightClicked.bind(this), this.onNavigateUpClicked = this.onNavigateUpClicked.bind(this), this.onNavigateDownClicked = this.onNavigateDownClicked.bind(this), this.onNavigatePrevClicked = this.onNavigatePrevClicked.bind(this), this.onNavigateNextClicked = this.onNavigateNextClicked.bind(this), this.onEnterFullscreen = this.onEnterFullscreen.bind(this);
    }
    render() {
      const e = this.Reveal.getConfig().rtl, i = this.Reveal.getRevealElement();
      this.element = document.createElement("aside"), this.element.className = "controls", this.element.innerHTML = `<button class="navigate-left" aria-label="${e ? "next slide" : "previous slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${e ? "previous slide" : "next slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`, this.Reveal.getRevealElement().appendChild(this.element), this.controlsLeft = E$1(i, ".navigate-left"), this.controlsRight = E$1(i, ".navigate-right"), this.controlsUp = E$1(i, ".navigate-up"), this.controlsDown = E$1(i, ".navigate-down"), this.controlsPrev = E$1(i, ".navigate-prev"), this.controlsNext = E$1(i, ".navigate-next"), this.controlsFullscreen = E$1(i, ".enter-fullscreen"), this.controlsRightArrow = this.element.querySelector(".navigate-right"), this.controlsLeftArrow = this.element.querySelector(".navigate-left"), this.controlsDownArrow = this.element.querySelector(".navigate-down");
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      const t = e.controls === "speaker" || e.controls === "speaker-only";
      this.element.style.display = e.controls && (!t || this.Reveal.isSpeakerNotes()) ? "block" : "none", this.element.setAttribute("data-controls-layout", e.controlsLayout), this.element.setAttribute("data-controls-back-arrows", e.controlsBackArrows);
    }
    bind() {
      let e = ["touchstart", "click"];
      Ft$1 && (e = ["touchend"]), e.forEach((i) => {
        this.controlsLeft.forEach((t) => t.addEventListener(i, this.onNavigateLeftClicked, false)), this.controlsRight.forEach((t) => t.addEventListener(i, this.onNavigateRightClicked, false)), this.controlsUp.forEach((t) => t.addEventListener(i, this.onNavigateUpClicked, false)), this.controlsDown.forEach((t) => t.addEventListener(i, this.onNavigateDownClicked, false)), this.controlsPrev.forEach((t) => t.addEventListener(i, this.onNavigatePrevClicked, false)), this.controlsNext.forEach((t) => t.addEventListener(i, this.onNavigateNextClicked, false)), this.controlsFullscreen.forEach((t) => t.addEventListener(i, this.onEnterFullscreen, false));
      });
    }
    unbind() {
      ["touchstart", "touchend", "click"].forEach((e) => {
        this.controlsLeft.forEach((i) => i.removeEventListener(e, this.onNavigateLeftClicked, false)), this.controlsRight.forEach((i) => i.removeEventListener(e, this.onNavigateRightClicked, false)), this.controlsUp.forEach((i) => i.removeEventListener(e, this.onNavigateUpClicked, false)), this.controlsDown.forEach((i) => i.removeEventListener(e, this.onNavigateDownClicked, false)), this.controlsPrev.forEach((i) => i.removeEventListener(e, this.onNavigatePrevClicked, false)), this.controlsNext.forEach((i) => i.removeEventListener(e, this.onNavigateNextClicked, false)), this.controlsFullscreen.forEach((i) => i.removeEventListener(e, this.onEnterFullscreen, false));
      });
    }
    /**
     * Updates the state of all control/navigation arrows.
     */
    update() {
      let e = this.Reveal.availableRoutes();
      [...this.controlsLeft, ...this.controlsRight, ...this.controlsUp, ...this.controlsDown, ...this.controlsPrev, ...this.controlsNext].forEach((t) => {
        t.classList.remove("enabled", "fragmented"), t.setAttribute("disabled", "disabled");
      }), e.left && this.controlsLeft.forEach((t) => {
        t.classList.add("enabled"), t.removeAttribute("disabled");
      }), e.right && this.controlsRight.forEach((t) => {
        t.classList.add("enabled"), t.removeAttribute("disabled");
      }), e.up && this.controlsUp.forEach((t) => {
        t.classList.add("enabled"), t.removeAttribute("disabled");
      }), e.down && this.controlsDown.forEach((t) => {
        t.classList.add("enabled"), t.removeAttribute("disabled");
      }), (e.left || e.up) && this.controlsPrev.forEach((t) => {
        t.classList.add("enabled"), t.removeAttribute("disabled");
      }), (e.right || e.down) && this.controlsNext.forEach((t) => {
        t.classList.add("enabled"), t.removeAttribute("disabled");
      });
      let i = this.Reveal.getCurrentSlide();
      if (i) {
        let t = this.Reveal.fragments.availableRoutes();
        t.prev && this.controlsPrev.forEach((r) => {
          r.classList.add("fragmented", "enabled"), r.removeAttribute("disabled");
        }), t.next && this.controlsNext.forEach((r) => {
          r.classList.add("fragmented", "enabled"), r.removeAttribute("disabled");
        });
        const s = this.Reveal.isVerticalSlide(i), a = s && i.parentElement && i.parentElement.querySelectorAll(":scope > section").length > 1;
        s && a ? (t.prev && this.controlsUp.forEach((r) => {
          r.classList.add("fragmented", "enabled"), r.removeAttribute("disabled");
        }), t.next && this.controlsDown.forEach((r) => {
          r.classList.add("fragmented", "enabled"), r.removeAttribute("disabled");
        })) : (t.prev && this.controlsLeft.forEach((r) => {
          r.classList.add("fragmented", "enabled"), r.removeAttribute("disabled");
        }), t.next && this.controlsRight.forEach((r) => {
          r.classList.add("fragmented", "enabled"), r.removeAttribute("disabled");
        }));
      }
      if (this.Reveal.getConfig().controlsTutorial) {
        let t = this.Reveal.getIndices();
        !this.Reveal.hasNavigatedVertically() && e.down ? this.controlsDownArrow.classList.add("highlight") : (this.controlsDownArrow.classList.remove("highlight"), this.Reveal.getConfig().rtl ? !this.Reveal.hasNavigatedHorizontally() && e.left && t.v === 0 ? this.controlsLeftArrow.classList.add("highlight") : this.controlsLeftArrow.classList.remove("highlight") : !this.Reveal.hasNavigatedHorizontally() && e.right && t.v === 0 ? this.controlsRightArrow.classList.add("highlight") : this.controlsRightArrow.classList.remove("highlight"));
      }
    }
    destroy() {
      this.unbind(), this.element.remove();
    }
    /**
     * Event handlers for navigation control buttons.
     */
    onNavigateLeftClicked(e) {
      e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.getConfig().navigationMode === "linear" ? this.Reveal.prev() : this.Reveal.left();
    }
    onNavigateRightClicked(e) {
      e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.getConfig().navigationMode === "linear" ? this.Reveal.next() : this.Reveal.right();
    }
    onNavigateUpClicked(e) {
      e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.up();
    }
    onNavigateDownClicked(e) {
      e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.down();
    }
    onNavigatePrevClicked(e) {
      e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.prev();
    }
    onNavigateNextClicked(e) {
      e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.next();
    }
    onEnterFullscreen(e) {
      const i = this.Reveal.getConfig(), t = this.Reveal.getViewportElement();
      Dt$1(i.embedded ? t : t.parentElement);
    }
  }
  class $i {
    constructor(e) {
      this.Reveal = e, this.onProgressClicked = this.onProgressClicked.bind(this);
    }
    render() {
      this.element = document.createElement("div"), this.element.className = "progress", this.Reveal.getRevealElement().appendChild(this.element), this.bar = document.createElement("span"), this.element.appendChild(this.bar);
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      this.element.style.display = e.progress ? "block" : "none";
    }
    bind() {
      this.Reveal.getConfig().progress && this.element && this.element.addEventListener("click", this.onProgressClicked, false);
    }
    unbind() {
      this.Reveal.getConfig().progress && this.element && this.element.removeEventListener("click", this.onProgressClicked, false);
    }
    /**
     * Updates the progress bar to reflect the current slide.
     */
    update() {
      if (this.Reveal.getConfig().progress && this.bar) {
        let e = this.Reveal.getProgress();
        this.Reveal.getTotalSlides() < 2 && (e = 0), this.bar.style.transform = "scaleX(" + e + ")";
      }
    }
    getMaxWidth() {
      return this.Reveal.getRevealElement().offsetWidth;
    }
    /**
     * Clicking on the progress bar results in a navigation to the
     * closest approximate horizontal slide using this equation:
     *
     * ( clickX / presentationWidth ) * numberOfSlides
     *
     * @param {object} event
     */
    onProgressClicked(e) {
      this.Reveal.onUserInput(e), e.preventDefault();
      let i = this.Reveal.getSlides(), t = i.length, s = Math.floor(e.clientX / this.getMaxWidth() * t);
      this.Reveal.getConfig().rtl && (s = t - s);
      let a = this.Reveal.getIndices(i[s]);
      this.Reveal.slide(a.h, a.v);
    }
    destroy() {
      this.element.remove();
    }
  }
  class Xi {
    constructor(e) {
      this.Reveal = e, this.lastMouseWheelStep = 0, this.cursorHidden = false, this.cursorInactiveTimeout = 0, this.onDocumentCursorActive = this.onDocumentCursorActive.bind(this), this.onDocumentMouseScroll = this.onDocumentMouseScroll.bind(this);
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      e.mouseWheel ? document.addEventListener("wheel", this.onDocumentMouseScroll, false) : document.removeEventListener("wheel", this.onDocumentMouseScroll, false), e.hideInactiveCursor ? (document.addEventListener("mousemove", this.onDocumentCursorActive, false), document.addEventListener("mousedown", this.onDocumentCursorActive, false)) : (this.showCursor(), document.removeEventListener("mousemove", this.onDocumentCursorActive, false), document.removeEventListener("mousedown", this.onDocumentCursorActive, false));
    }
    /**
     * Shows the mouse pointer after it has been hidden with
     * #hideCursor.
     */
    showCursor() {
      this.cursorHidden && (this.cursorHidden = false, this.Reveal.getRevealElement().style.cursor = "");
    }
    /**
     * Hides the mouse pointer when it's on top of the .reveal
     * container.
     */
    hideCursor() {
      this.cursorHidden === false && (this.cursorHidden = true, this.Reveal.getRevealElement().style.cursor = "none");
    }
    destroy() {
      this.showCursor(), document.removeEventListener("wheel", this.onDocumentMouseScroll, false), document.removeEventListener("mousemove", this.onDocumentCursorActive, false), document.removeEventListener("mousedown", this.onDocumentCursorActive, false);
    }
    /**
     * Called whenever there is mouse input at the document level
     * to determine if the cursor is active or not.
     *
     * @param {object} event
     */
    onDocumentCursorActive(e) {
      this.showCursor(), clearTimeout(this.cursorInactiveTimeout), this.cursorInactiveTimeout = setTimeout(this.hideCursor.bind(this), this.Reveal.getConfig().hideCursorTime);
    }
    /**
     * Handles mouse wheel scrolling, throttled to avoid skipping
     * multiple slides.
     *
     * @param {object} event
     */
    onDocumentMouseScroll(e) {
      if (Date.now() - this.lastMouseWheelStep > 1e3) {
        this.lastMouseWheelStep = Date.now();
        let i = e.detail || -e.wheelDelta;
        i > 0 ? this.Reveal.next() : i < 0 && this.Reveal.prev();
      }
    }
  }
  const Bt$1 = (c, e) => {
    const i = document.createElement("script");
    i.type = "text/javascript", i.async = false, i.defer = false, i.src = c, typeof e == "function" && (i.onload = (s) => {
      s.type === "load" && (i.onload = i.onerror = null, e());
    }, i.onerror = (s) => {
      i.onload = i.onerror = null, e(new Error("Failed loading script: " + i.src + `
` + s));
    });
    const t = document.querySelector("head");
    t && t.insertBefore(i, t.lastChild);
  };
  class Yi {
    constructor(e) {
      this.Reveal = e, this.state = "idle", this.registeredPlugins = {}, this.asyncDependencies = [];
    }
    /**
     * Loads reveal.js dependencies, registers and
     * initializes plugins.
     *
     * Plugins are direct references to a reveal.js plugin
     * object that we register and initialize after any
     * synchronous dependencies have loaded.
     *
     * Dependencies are defined via the 'dependencies' config
     * option and will be loaded prior to starting reveal.js.
     * Some dependencies may have an 'async' flag, if so they
     * will load after reveal.js has been started up.
     */
    load(e, i) {
      return this.state = "loading", e.forEach(this.registerPlugin.bind(this)), new Promise((t) => {
        let s = [], a = 0;
        if (i.forEach((r) => {
          (!r.condition || r.condition()) && (r.async ? this.asyncDependencies.push(r) : s.push(r));
        }), s.length) {
          a = s.length;
          const r = (o) => {
            o && typeof o.callback == "function" && o.callback(), --a === 0 && this.initPlugins().then(t);
          };
          s.forEach((o) => {
            typeof o.id == "string" ? (this.registerPlugin(o), r(o)) : typeof o.src == "string" ? Bt$1(o.src, () => r(o)) : (console.warn("Unrecognized plugin format", o), r());
          });
        } else
          this.initPlugins().then(t);
      });
    }
    /**
     * Initializes our plugins and waits for them to be ready
     * before proceeding.
     */
    initPlugins() {
      return new Promise((e) => {
        let i = Object.values(this.registeredPlugins), t = i.length;
        if (t === 0)
          this.loadAsync().then(e);
        else {
          let s, a = () => {
            --t === 0 ? this.loadAsync().then(e) : s();
          }, r = 0;
          s = () => {
            let o = i[r++];
            if (typeof o.init == "function") {
              let h = o.init(this.Reveal);
              h && typeof h.then == "function" ? h.then(a) : a();
            } else
              a();
          }, s();
        }
      });
    }
    /**
     * Loads all async reveal.js dependencies.
     */
    loadAsync() {
      return this.state = "loaded", this.asyncDependencies.length && this.asyncDependencies.forEach((e) => {
        Bt$1(e.src, e.callback);
      }), Promise.resolve();
    }
    /**
     * Registers a new plugin with this reveal.js instance.
     *
     * reveal.js waits for all registered plugins to initialize
     * before considering itself ready, as long as the plugin
     * is registered before calling `Reveal.initialize()`.
     */
    registerPlugin(e) {
      arguments.length === 2 && typeof arguments[0] == "string" ? (e = arguments[1], e.id = arguments[0]) : typeof e == "function" && (e = e());
      let i = e.id;
      typeof i != "string" ? console.warn("Unrecognized plugin format; can't find plugin.id", e) : this.registeredPlugins[i] === void 0 ? (this.registeredPlugins[i] = e, this.state === "loaded" && typeof e.init == "function" && e.init(this.Reveal)) : console.warn('reveal.js: "' + i + '" plugin has already been registered');
    }
    /**
     * Checks if a specific plugin has been registered.
     *
     * @param {String} id Unique plugin identifier
     */
    hasPlugin(e) {
      return !!this.registeredPlugins[e];
    }
    /**
     * Returns the specific plugin instance, if a plugin
     * with the given ID has been registered.
     *
     * @param {String} id Unique plugin identifier
     */
    getPlugin(e) {
      return this.registeredPlugins[e];
    }
    getRegisteredPlugins() {
      return this.registeredPlugins;
    }
    destroy() {
      Object.values(this.registeredPlugins).forEach((e) => {
        typeof e.destroy == "function" && e.destroy();
      }), this.registeredPlugins = {}, this.asyncDependencies = [];
    }
  }
  class Gi {
    constructor(e) {
      this.Reveal = e, this.onSlidesClicked = this.onSlidesClicked.bind(this), this.iframeTriggerSelector = null, this.mediaTriggerSelector = "[data-preview-image], [data-preview-video]", this.stateProps = ["previewIframe", "previewImage", "previewVideo", "previewFit"], this.state = {};
    }
    update() {
      this.Reveal.getConfig().previewLinks ? this.iframeTriggerSelector = "a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])" : this.iframeTriggerSelector = "[data-preview-link]:not([data-preview-link=false])";
      const e = this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length > 0, i = this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length > 0;
      e || i ? this.Reveal.getSlidesElement().addEventListener("click", this.onSlidesClicked, false) : this.Reveal.getSlidesElement().removeEventListener("click", this.onSlidesClicked, false);
    }
    createOverlay(e) {
      this.dom = document.createElement("div"), this.dom.classList.add("r-overlay"), this.dom.classList.add(e), this.viewport = document.createElement("div"), this.viewport.classList.add("r-overlay-viewport"), this.dom.appendChild(this.viewport), this.Reveal.getRevealElement().appendChild(this.dom);
    }
    /**
     * Opens a lightbox that previews the target URL.
     *
     * @param {string} url - url for lightbox iframe src
     */
    previewIframe(e) {
      this.close(), this.state = { previewIframe: e }, this.createOverlay("r-overlay-preview"), this.dom.dataset.state = "loading", this.viewport.innerHTML = `<header class="r-overlay-header">
				<a class="r-overlay-header-button r-overlay-external" href="${e}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-header-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${e}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`, this.dom.querySelector("iframe").addEventListener("load", (i) => {
        this.dom.dataset.state = "loaded";
      }, false), this.dom.querySelector(".r-overlay-close").addEventListener("click", (i) => {
        this.close(), i.preventDefault();
      }, false), this.dom.querySelector(".r-overlay-external").addEventListener("click", (i) => {
        this.close();
      }, false), this.Reveal.dispatchEvent({ type: "previewiframe", data: { url: e } });
    }
    /**
     * Opens a lightbox window that provides a larger view of the
     * given image/video.
     *
     * @param {string} url - url to the image/video to preview
     * @param {image|video} mediaType
     * @param {string} [fitMode] - the fit mode to use for the preview
     */
    previewMedia(e, i, t) {
      if (i !== "image" && i !== "video") {
        console.warn("Please specify a valid media type to preview (image|video)");
        return;
      }
      this.close(), t = t || "scale-down", this.createOverlay("r-overlay-preview"), this.dom.dataset.state = "loading", this.dom.dataset.previewFit = t, this.viewport.innerHTML = `<header class="r-overlay-header">
				<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;
      const s = this.dom.querySelector(".r-overlay-content");
      if (i === "image") {
        this.state = { previewImage: e, previewFit: t };
        const a = document.createElement("img", {});
        a.src = e, s.appendChild(a), a.addEventListener("load", () => {
          this.dom.dataset.state = "loaded";
        }, false), a.addEventListener("error", () => {
          this.dom.dataset.state = "error", s.innerHTML = '<span class="r-overlay-error">Unable to load image.</span>';
        }, false), this.dom.style.cursor = "zoom-out", this.dom.addEventListener("click", (r) => {
          this.close();
        }, false), this.Reveal.dispatchEvent({ type: "previewimage", data: { url: e } });
      } else if (i === "video") {
        this.state = { previewVideo: e, previewFit: t };
        const a = document.createElement("video");
        a.autoplay = this.dom.dataset.previewAutoplay !== "false", a.controls = this.dom.dataset.previewControls !== "false", a.loop = this.dom.dataset.previewLoop === "true", a.muted = this.dom.dataset.previewMuted === "true", a.playsInline = true, a.src = e, s.appendChild(a), a.addEventListener("loadeddata", () => {
          this.dom.dataset.state = "loaded";
        }, false), a.addEventListener("error", () => {
          this.dom.dataset.state = "error", s.innerHTML = '<span class="r-overlay-error">Unable to load video.</span>';
        }, false), this.Reveal.dispatchEvent({ type: "previewvideo", data: { url: e } });
      } else
        throw new Error("Please specify a valid media type to preview");
      this.dom.querySelector(".r-overlay-close").addEventListener("click", (a) => {
        this.close(), a.preventDefault();
      }, false);
    }
    previewImage(e, i) {
      this.previewMedia(e, "image", i);
    }
    previewVideo(e, i) {
      this.previewMedia(e, "video", i);
    }
    /**
     * Open or close help overlay window.
     *
     * @param {Boolean} [override] Flag which overrides the
     * toggle logic and forcibly sets the desired state. True means
     * help is open, false means it's closed.
     */
    toggleHelp(e) {
      typeof e == "boolean" ? e ? this.showHelp() : this.close() : this.dom ? this.close() : this.showHelp();
    }
    /**
     * Opens an overlay window with help material.
     */
    showHelp() {
      if (this.Reveal.getConfig().help) {
        this.close(), this.createOverlay("r-overlay-help");
        let e = '<p class="title">Keyboard Shortcuts</p>', i = this.Reveal.keyboard.getShortcuts(), t = this.Reveal.keyboard.getBindings();
        e += "<table><th>KEY</th><th>ACTION</th>";
        for (let s in i)
          e += `<tr><td>${s}</td><td>${i[s]}</td></tr>`;
        for (let s in t)
          t[s].key && t[s].description && (e += `<tr><td>${t[s].key}</td><td>${t[s].description}</td></tr>`);
        e += "</table>", this.viewport.innerHTML = `
				<header class="r-overlay-header">
					<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${e}</div>
				</div>
			`, this.dom.querySelector(".r-overlay-close").addEventListener("click", (s) => {
          this.close(), s.preventDefault();
        }, false), this.Reveal.dispatchEvent({ type: "showhelp" });
      }
    }
    isOpen() {
      return !!this.dom;
    }
    /**
     * Closes any currently open overlay.
     */
    close() {
      return this.dom ? (this.dom.remove(), this.dom = null, this.state = {}, this.Reveal.dispatchEvent({ type: "closeoverlay" }), true) : false;
    }
    getState() {
      return this.state;
    }
    setState(e) {
      this.stateProps.every((i) => this.state[i] === e[i]) || (e.previewIframe ? this.previewIframe(e.previewIframe) : e.previewImage ? this.previewImage(e.previewImage, e.previewFit) : e.previewVideo ? this.previewVideo(e.previewVideo, e.previewFit) : this.close());
    }
    onSlidesClicked(e) {
      const i = e.target, t = i.closest(this.iframeTriggerSelector), s = i.closest(this.mediaTriggerSelector);
      if (t) {
        if (e.metaKey || e.shiftKey || e.altKey)
          return;
        const a = t.getAttribute("data-preview-link");
        let o = typeof a == "string" && a.startsWith("http") ? a : t.getAttribute("href");
        o && (this.previewIframe(o), e.preventDefault());
      } else if (s) {
        if (s.hasAttribute("data-preview-image")) {
          let a = s.dataset.previewImage || s.getAttribute("src");
          a && (this.previewImage(a, s.dataset.previewFit), e.preventDefault());
        } else if (s.hasAttribute("data-preview-video")) {
          let a = s.dataset.previewVideo || s.getAttribute("src");
          if (!a) {
            let r = s.querySelector("source");
            r && (a = r.getAttribute("src"));
          }
          a && (this.previewVideo(a, s.dataset.previewFit), e.preventDefault());
        }
      }
    }
    destroy() {
      this.close();
    }
  }
  const Te = 40;
  class Ji {
    constructor(e) {
      this.Reveal = e, this.touchStartX = 0, this.touchStartY = 0, this.touchStartCount = 0, this.touchCaptured = false, this.onPointerDown = this.onPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this);
    }
    /**
     *
     */
    bind() {
      let e = this.Reveal.getRevealElement();
      "onpointerdown" in window ? (e.addEventListener("pointerdown", this.onPointerDown, false), e.addEventListener("pointermove", this.onPointerMove, false), e.addEventListener("pointerup", this.onPointerUp, false)) : window.navigator.msPointerEnabled ? (e.addEventListener("MSPointerDown", this.onPointerDown, false), e.addEventListener("MSPointerMove", this.onPointerMove, false), e.addEventListener("MSPointerUp", this.onPointerUp, false)) : (e.addEventListener("touchstart", this.onTouchStart, false), e.addEventListener("touchmove", this.onTouchMove, false), e.addEventListener("touchend", this.onTouchEnd, false));
    }
    /**
     *
     */
    unbind() {
      let e = this.Reveal.getRevealElement();
      e.removeEventListener("pointerdown", this.onPointerDown, false), e.removeEventListener("pointermove", this.onPointerMove, false), e.removeEventListener("pointerup", this.onPointerUp, false), e.removeEventListener("MSPointerDown", this.onPointerDown, false), e.removeEventListener("MSPointerMove", this.onPointerMove, false), e.removeEventListener("MSPointerUp", this.onPointerUp, false), e.removeEventListener("touchstart", this.onTouchStart, false), e.removeEventListener("touchmove", this.onTouchMove, false), e.removeEventListener("touchend", this.onTouchEnd, false);
    }
    /**
     * Checks if the target element prevents the triggering of
     * swipe navigation.
     */
    isSwipePrevented(e) {
      if (xe(e, "video[controls], audio[controls]")) return true;
      for (; e && typeof e.hasAttribute == "function"; ) {
        if (e.hasAttribute("data-prevent-swipe")) return true;
        e = e.parentNode;
      }
      return false;
    }
    /**
     * Handler for the 'touchstart' event, enables support for
     * swipe and pinch gestures.
     *
     * @param {object} event
     */
    onTouchStart(e) {
      if (this.touchCaptured = false, this.isSwipePrevented(e.target)) return true;
      this.touchStartX = e.touches[0].clientX, this.touchStartY = e.touches[0].clientY, this.touchStartCount = e.touches.length;
    }
    /**
     * Handler for the 'touchmove' event.
     *
     * @param {object} event
     */
    onTouchMove(e) {
      if (this.isSwipePrevented(e.target)) return true;
      let i = this.Reveal.getConfig();
      if (this.touchCaptured)
        Ft$1 && e.preventDefault();
      else {
        this.Reveal.onUserInput(e);
        let t = e.touches[0].clientX, s = e.touches[0].clientY;
        if (e.touches.length === 1 && this.touchStartCount !== 2) {
          let a = this.Reveal.availableRoutes({ includeFragments: true }), r = t - this.touchStartX, o = s - this.touchStartY;
          r > Te && Math.abs(r) > Math.abs(o) ? (this.touchCaptured = true, i.navigationMode === "linear" ? i.rtl ? this.Reveal.next() : this.Reveal.prev() : this.Reveal.left()) : r < -Te && Math.abs(r) > Math.abs(o) ? (this.touchCaptured = true, i.navigationMode === "linear" ? i.rtl ? this.Reveal.prev() : this.Reveal.next() : this.Reveal.right()) : o > Te && a.up ? (this.touchCaptured = true, i.navigationMode === "linear" ? this.Reveal.prev() : this.Reveal.up()) : o < -Te && a.down && (this.touchCaptured = true, i.navigationMode === "linear" ? this.Reveal.next() : this.Reveal.down()), i.embedded ? (this.touchCaptured || this.Reveal.isVerticalSlide()) && e.preventDefault() : e.preventDefault();
        }
      }
    }
    /**
     * Handler for the 'touchend' event.
     *
     * @param {object} event
     */
    onTouchEnd(e) {
      this.touchCaptured && !this.Reveal.slideContent.isAllowedToPlayAudio() && this.Reveal.startEmbeddedContent(this.Reveal.getCurrentSlide()), this.touchCaptured = false;
    }
    /**
     * Convert pointer down to touch start.
     *
     * @param {object} event
     */
    onPointerDown(e) {
      (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], this.onTouchStart(e));
    }
    /**
     * Convert pointer move to touch move.
     *
     * @param {object} event
     */
    onPointerMove(e) {
      (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], this.onTouchMove(e));
    }
    /**
     * Convert pointer up to touch end.
     *
     * @param {object} event
     */
    onPointerUp(e) {
      (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], this.onTouchEnd(e));
    }
  }
  const $e = "focus", Ht$1 = "blur";
  class Qi {
    constructor(e) {
      this.Reveal = e, this.onRevealPointerDown = this.onRevealPointerDown.bind(this), this.onDocumentPointerDown = this.onDocumentPointerDown.bind(this);
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      e.embedded ? this.blur() : (this.focus(), this.unbind());
    }
    bind() {
      this.Reveal.getConfig().embedded && this.Reveal.getRevealElement().addEventListener("pointerdown", this.onRevealPointerDown, false);
    }
    unbind() {
      this.Reveal.getRevealElement().removeEventListener("pointerdown", this.onRevealPointerDown, false), document.removeEventListener("pointerdown", this.onDocumentPointerDown, false);
    }
    focus() {
      this.state !== $e && (this.Reveal.getRevealElement().classList.add("focused"), document.addEventListener("pointerdown", this.onDocumentPointerDown, false)), this.state = $e;
    }
    blur() {
      this.state !== Ht$1 && (this.Reveal.getRevealElement().classList.remove("focused"), document.removeEventListener("pointerdown", this.onDocumentPointerDown, false)), this.state = Ht$1;
    }
    isFocused() {
      return this.state === $e;
    }
    destroy() {
      this.Reveal.getRevealElement().classList.remove("focused");
    }
    onRevealPointerDown(e) {
      this.focus();
    }
    onDocumentPointerDown(e) {
      let i = V(e.target, ".reveal");
      (!i || i !== this.Reveal.getRevealElement()) && this.blur();
    }
  }
  class Zi {
    constructor(e) {
      this.Reveal = e;
    }
    render() {
      this.element = document.createElement("div"), this.element.className = "speaker-notes", this.element.setAttribute("data-prevent-swipe", ""), this.element.setAttribute("tabindex", "0"), this.Reveal.getRevealElement().appendChild(this.element);
    }
    /**
     * Called when the reveal.js config is updated.
     */
    configure(e, i) {
      e.showNotes && this.element.setAttribute("data-layout", typeof e.showNotes == "string" ? e.showNotes : "inline");
    }
    /**
     * Pick up notes from the current slide and display them
     * to the viewer.
     *
     * @see {@link config.showNotes}
     */
    update() {
      this.Reveal.getConfig().showNotes && this.element && this.Reveal.getCurrentSlide() && !this.Reveal.isScrollView() && !this.Reveal.isPrintView() && (this.element.innerHTML = this.getSlideNotes() || '<span class="notes-placeholder">No notes on this slide.</span>');
    }
    /**
     * Updates the visibility of the speaker notes sidebar that
     * is used to share annotated slides. The notes sidebar is
     * only visible if showNotes is true and there are notes on
     * one or more slides in the deck.
     */
    updateVisibility() {
      this.Reveal.getConfig().showNotes && this.hasNotes() && !this.Reveal.isScrollView() && !this.Reveal.isPrintView() ? this.Reveal.getRevealElement().classList.add("show-notes") : this.Reveal.getRevealElement().classList.remove("show-notes");
    }
    /**
     * Checks if there are speaker notes for ANY slide in the
     * presentation.
     */
    hasNotes() {
      return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length > 0;
    }
    /**
     * Checks if this presentation is running inside of the
     * speaker notes window.
     *
     * @return {boolean}
     */
    isSpeakerNotesWindow() {
      return !!window.location.search.match(/receiver/gi);
    }
    /**
     * Retrieves the speaker notes from a slide. Notes can be
     * defined in two ways:
     * 1. As a data-notes attribute on the slide <section>
     * 2. With <aside class="notes"> elements inside the slide
     *
     * @param {HTMLElement} [slide=currentSlide]
     * @return {(string|null)}
     */
    getSlideNotes(e = this.Reveal.getCurrentSlide()) {
      if (e.hasAttribute("data-notes"))
        return e.getAttribute("data-notes");
      let i = e.querySelectorAll("aside.notes");
      return i ? Array.from(i).map((t) => t.innerHTML).join(`
`) : null;
    }
    destroy() {
      this.element.remove();
    }
  }
  class es {
    /**
     * @param {HTMLElement} container The component will append
     * itself to this
     * @param {function} progressCheck A method which will be
     * called frequently to get the current playback progress on
     * a range of 0-1
     */
    constructor(e, i) {
      this.diameter = 100, this.diameter2 = this.diameter / 2, this.thickness = 6, this.playing = false, this.progress = 0, this.progressOffset = 1, this.container = e, this.progressCheck = i, this.canvas = document.createElement("canvas"), this.canvas.className = "playback", this.canvas.width = this.diameter, this.canvas.height = this.diameter, this.canvas.style.width = this.diameter2 + "px", this.canvas.style.height = this.diameter2 + "px", this.context = this.canvas.getContext("2d"), this.container.appendChild(this.canvas), this.render();
    }
    setPlaying(e) {
      const i = this.playing;
      this.playing = e, !i && this.playing ? this.animate() : this.render();
    }
    animate() {
      const e = this.progress;
      this.progress = this.progressCheck(), e > 0.8 && this.progress < 0.2 && (this.progressOffset = this.progress), this.render(), this.playing && requestAnimationFrame(this.animate.bind(this));
    }
    /**
     * Renders the current progress and playback state.
     */
    render() {
      let e = this.playing ? this.progress : 0, i = this.diameter2 - this.thickness, t = this.diameter2, s = this.diameter2, a = 28;
      this.progressOffset += (1 - this.progressOffset) * 0.1;
      const r = -Math.PI / 2 + e * (Math.PI * 2), o = -Math.PI / 2 + this.progressOffset * (Math.PI * 2);
      this.context.save(), this.context.clearRect(0, 0, this.diameter, this.diameter), this.context.beginPath(), this.context.arc(t, s, i + 4, 0, Math.PI * 2, false), this.context.fillStyle = "rgba( 0, 0, 0, 0.4 )", this.context.fill(), this.context.beginPath(), this.context.arc(t, s, i, 0, Math.PI * 2, false), this.context.lineWidth = this.thickness, this.context.strokeStyle = "rgba( 255, 255, 255, 0.2 )", this.context.stroke(), this.playing && (this.context.beginPath(), this.context.arc(t, s, i, o, r, false), this.context.lineWidth = this.thickness, this.context.strokeStyle = "#fff", this.context.stroke()), this.context.translate(t - a / 2, s - a / 2), this.playing ? (this.context.fillStyle = "#fff", this.context.fillRect(0, 0, a / 2 - 4, a), this.context.fillRect(a / 2 + 4, 0, a / 2 - 4, a)) : (this.context.beginPath(), this.context.translate(4, 0), this.context.moveTo(0, 0), this.context.lineTo(a - 4, a / 2), this.context.lineTo(0, a), this.context.fillStyle = "#fff", this.context.fill()), this.context.restore();
    }
    on(e, i) {
      this.canvas.addEventListener(e, i, false);
    }
    off(e, i) {
      this.canvas.removeEventListener(e, i, false);
    }
    destroy() {
      this.playing = false, this.canvas.parentNode && this.container.removeChild(this.canvas);
    }
  }
  const ts = {
    width: 960,
    height: 700,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2,
    controls: true,
    controlsTutorial: true,
    controlsLayout: "bottom-right",
    controlsBackArrows: "faded",
    progress: true,
    slideNumber: false,
    showSlideNumber: "all",
    hashOneBasedIndex: false,
    hash: false,
    respondToHashChanges: true,
    jumpToSlide: true,
    history: false,
    keyboard: true,
    keyboardCondition: null,
    disableLayout: false,
    overview: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    navigationMode: "default",
    shuffle: false,
    fragments: true,
    fragmentInURL: true,
    embedded: false,
    help: true,
    pause: true,
    showNotes: false,
    showHiddenSlides: false,
    autoPlayMedia: null,
    preloadIframes: null,
    mouseWheel: false,
    previewLinks: false,
    viewDistance: 3,
    mobileViewDistance: 2,
    display: "block",
    hideInactiveCursor: true,
    hideCursorTime: 5e3,
    sortFragmentsOnSync: true,
    autoAnimate: true,
    autoAnimateMatcher: null,
    autoAnimateEasing: "ease",
    autoAnimateDuration: 1,
    autoAnimateUnmatched: true,
    autoAnimateStyles: [
      "opacity",
      "color",
      "background-color",
      "padding",
      "font-size",
      "line-height",
      "letter-spacing",
      "border-width",
      "border-color",
      "border-radius",
      "outline",
      "outline-offset"
    ],
    autoSlide: 0,
    autoSlideStoppable: true,
    autoSlideMethod: null,
    defaultTiming: null,
    postMessage: true,
    postMessageEvents: false,
    focusBodyOnPageVisibilityChange: true,
    transition: "slide",
    transitionSpeed: "default",
    backgroundTransition: "fade",
    parallaxBackgroundImage: "",
    parallaxBackgroundSize: "",
    parallaxBackgroundRepeat: "",
    parallaxBackgroundPosition: "",
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,
    view: null,
    scrollLayout: "full",
    scrollSnap: "mandatory",
    scrollProgress: "auto",
    scrollActivationWidth: 435,
    pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,
    pdfSeparateFragments: true,
    pdfPageHeightOffset: -1,
    dependencies: [],
    plugins: []
  }, Ot$1 = "6.0.0";
  function Ut$1(c, e) {
    arguments.length < 2 && (e = arguments[0], c = document.querySelector(".reveal"));
    const i = {};
    let t = {}, s = false, a = false, r, o, h, u, g = {
      hasNavigatedHorizontally: false,
      hasNavigatedVertically: false
    }, y = [], p = 1, b = { layout: "", overview: "" }, l = {}, A = "idle", M = 0, O, U = 0, re = -1, z = false, R = new Ci(i), B = new Ii(i), q = new Mi(i), W = new Hi(i), L = new Bi(i), k = new Oi(i), F = new Ui(i), C = new qi(i), f = new Wi(i), S = new ji(i), T = new Ki(i), X = new _i(i), K = new $i(i), ie = new Xi(i), D = new Yi(i), H = new Gi(i), ne = new Qi(i), Ie = new Ji(i), _ = new Zi(i);
    function Wt(n) {
      if (!c) throw 'Unable to find presentation root (<div class="reveal">).';
      if (s) throw "Reveal.js has already been initialized.";
      if (s = true, l.wrapper = c, l.slides = c.querySelector(".slides"), !l.slides) throw 'Unable to find slides container (<div class="slides">).';
      return t = Q$1(Q$1(Q$1(Q$1(Q$1({}, ts), t), e), n), Mt$1()), /print-pdf/gi.test(window.location.search) && (t.view = "print"), jt(), window.addEventListener("load", he, false), D.load(t.plugins, t.dependencies).then(Kt), new Promise((d) => i.on("ready", d));
    }
    function jt() {
      t.embedded === true ? l.viewport = V(c, ".reveal-viewport") || c : (l.viewport = document.body, document.documentElement.classList.add("reveal-full-page")), l.viewport.classList.add("reveal-viewport");
    }
    function Kt() {
      s !== false && (a = true, Je(), $t(), Jt(), Yt(), Gt(), ni(), Ze(), L.update(true), _t(), T.readURL(), setTimeout(() => {
        l.slides.classList.remove("no-transition"), l.wrapper.classList.add("ready"), j({
          type: "ready",
          data: {
            indexh: r,
            indexv: o,
            currentSlide: u
          }
        });
      }, 1));
    }
    function _t() {
      const n = t.view === "print", d = t.view === "scroll" || t.view === "reader";
      (n || d) && (n ? be() : Ie.unbind(), l.viewport.classList.add("loading-scroll-mode"), n ? document.readyState === "complete" ? F.activate() : window.addEventListener("load", () => F.activate()) : k.activate());
    }
    function Je() {
      t.showHiddenSlides || E$1(l.wrapper, 'section[data-visibility="hidden"]').forEach((n) => {
        const d = n.parentNode;
        d.childElementCount === 1 && /section/i.test(d.nodeName) ? d.remove() : n.remove();
      });
    }
    function $t() {
      l.slides.classList.add("no-transition"), le$1 ? l.wrapper.classList.add("no-hover") : l.wrapper.classList.remove("no-hover"), L.render(), B.render(), q.render(), X.render(), K.render(), _.render(), l.pauseOverlay = wi(l.wrapper, "div", "pause-overlay", t.controls ? '<button class="resume-button">Resume presentation</button>' : null), l.statusElement = Xt(), l.wrapper.setAttribute("role", "application");
    }
    function Xt() {
      let n = l.wrapper.querySelector(".aria-status");
      return n || (n = document.createElement("div"), n.style.position = "absolute", n.style.height = "1px", n.style.width = "1px", n.style.overflow = "hidden", n.style.clip = "rect( 1px, 1px, 1px, 1px )", n.classList.add("aria-status"), n.setAttribute("aria-live", "polite"), n.setAttribute("aria-atomic", "true"), l.wrapper.appendChild(n)), n;
    }
    function Me(n) {
      l.statusElement.textContent = n;
    }
    function ye(n) {
      let d = "";
      if (n.nodeType === 3)
        d += n.textContent.trim();
      else if (n.nodeType === 1) {
        let v = n.getAttribute("aria-hidden"), m = window.getComputedStyle(n).display === "none";
        if (v !== "true" && !m) {
          if (n.tagName === "IMG" || n.tagName === "VIDEO") {
            let P = n.getAttribute("alt");
            P && (d += Qe(P));
          }
          Array.from(n.childNodes).forEach((P) => {
            d += ye(P);
          }), ["P", "DIV", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE"].includes(n.tagName) && d.trim() !== "" && (d = Qe(d));
        }
      }
      return d = d.trim(), d === "" ? "" : d + " ";
    }
    function Qe(n) {
      const d = n.trim();
      return d === "" ? n : /[.!?]$/.test(d) ? d : d + ".";
    }
    function Yt() {
      setInterval(() => {
        (!k.isActive() && l.wrapper.scrollTop !== 0 || l.wrapper.scrollLeft !== 0) && (l.wrapper.scrollTop = 0, l.wrapper.scrollLeft = 0);
      }, 1e3);
    }
    function Gt() {
      document.addEventListener("fullscreenchange", Pe), document.addEventListener("webkitfullscreenchange", Pe);
    }
    function Jt() {
      t.postMessage && window.addEventListener("message", Rt, false);
    }
    function Ze(n) {
      const d = Q$1({}, t);
      if (typeof n == "object" && ge(t, n), i.isReady() === false) return;
      const v = l.wrapper.querySelectorAll(de).length;
      l.wrapper.classList.remove(d.transition), l.wrapper.classList.add(t.transition), l.wrapper.setAttribute("data-transition-speed", t.transitionSpeed), l.wrapper.setAttribute("data-background-transition", t.backgroundTransition), l.viewport.style.setProperty("--slide-width", typeof t.width == "string" ? t.width : t.width + "px"), l.viewport.style.setProperty("--slide-height", typeof t.height == "string" ? t.height : t.height + "px"), t.shuffle && De(), Ke(l.wrapper, "embedded", t.embedded), Ke(l.wrapper, "rtl", t.rtl), Ke(l.wrapper, "center", t.center), t.pause === false && ve(), W.reset(), O && (O.destroy(), O = null), v > 1 && t.autoSlide && t.autoSlideStoppable && (O = new es(l.wrapper, () => Math.min(Math.max((Date.now() - re) / M, 0), 1)), O.on("click", fi), z = false), t.navigationMode !== "default" ? l.wrapper.setAttribute("data-navigation-mode", t.navigationMode) : l.wrapper.removeAttribute("data-navigation-mode"), _.configure(t, d), ne.configure(t, d), ie.configure(t, d), X.configure(t, d), K.configure(t, d), S.configure(t, d), C.configure(t, d), B.configure(t, d), ut();
    }
    function et() {
      window.addEventListener("resize", Pt, false), t.touch && Ie.bind(), t.keyboard && S.bind(), t.progress && K.bind(), t.respondToHashChanges && T.bind(), X.bind(), ne.bind(), l.slides.addEventListener("click", Ct, false), l.slides.addEventListener("transitionend", kt, false), l.pauseOverlay.addEventListener("click", ve, false), t.focusBodyOnPageVisibilityChange && document.addEventListener("visibilitychange", Lt, false);
    }
    function be() {
      Ie.unbind(), ne.unbind(), S.unbind(), X.unbind(), K.unbind(), T.unbind(), window.removeEventListener("resize", Pt, false), l.slides.removeEventListener("click", Ct, false), l.slides.removeEventListener("transitionend", kt, false), l.pauseOverlay.removeEventListener("click", ve, false);
    }
    function Qt() {
      s = false, a !== false && (be(), Se(), _.destroy(), ne.destroy(), H.destroy(), D.destroy(), ie.destroy(), X.destroy(), K.destroy(), L.destroy(), B.destroy(), q.destroy(), document.removeEventListener("fullscreenchange", Pe), document.removeEventListener("webkitfullscreenchange", Pe), document.removeEventListener("visibilitychange", Lt, false), window.removeEventListener("message", Rt, false), window.removeEventListener("load", he, false), l.pauseOverlay && l.pauseOverlay.remove(), l.statusElement && l.statusElement.remove(), document.documentElement.classList.remove("reveal-full-page"), l.wrapper.classList.remove("ready", "center", "has-horizontal-slides", "has-vertical-slides"), l.wrapper.removeAttribute("data-transition-speed"), l.wrapper.removeAttribute("data-background-transition"), l.viewport.classList.remove("reveal-viewport"), l.viewport.style.removeProperty("--slide-width"), l.viewport.style.removeProperty("--slide-height"), l.slides.style.removeProperty("width"), l.slides.style.removeProperty("height"), l.slides.style.removeProperty("zoom"), l.slides.style.removeProperty("left"), l.slides.style.removeProperty("top"), l.slides.style.removeProperty("bottom"), l.slides.style.removeProperty("right"), l.slides.style.removeProperty("transform"), Array.from(l.wrapper.querySelectorAll(de)).forEach((n) => {
        n.style.removeProperty("display"), n.style.removeProperty("top"), n.removeAttribute("hidden"), n.removeAttribute("aria-hidden");
      }));
    }
    function tt(n, d, v) {
      c.addEventListener(n, d, v);
    }
    function it(n, d, v) {
      c.removeEventListener(n, d, v);
    }
    function Ne(n) {
      typeof n.layout == "string" && (b.layout = n.layout), typeof n.overview == "string" && (b.overview = n.overview), b.layout ? ae$1(l.slides, b.layout + " " + b.overview) : ae$1(l.slides, b.overview);
    }
    function j({ target: n = l.wrapper, type: d, data: v, bubbles: m = true }) {
      let w = document.createEvent("HTMLEvents", 1, 2);
      return w.initEvent(d, m, true), ge(w, v), n.dispatchEvent(w), n === l.wrapper && at(d), w;
    }
    function st(n) {
      j({
        type: "slidechanged",
        data: {
          indexh: r,
          indexv: o,
          previousSlide: h,
          currentSlide: u,
          origin: n
        }
      });
    }
    function at(n, d) {
      if (t.postMessageEvents && window.parent !== window.self) {
        let v = {
          namespace: "reveal",
          eventName: n,
          state: St()
        };
        ge(v, d), window.parent.postMessage(JSON.stringify(v), "*");
      }
    }
    function he() {
      if (l.wrapper && !F.isActive()) {
        const n = l.viewport.offsetWidth, d = l.viewport.offsetHeight;
        if (!t.disableLayout) {
          le$1 && !t.embedded && document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
          const v = k.isActive() ? we(n, d) : we(), m = p;
          rt(t.width, t.height), l.slides.style.width = v.width + "px", l.slides.style.height = v.height + "px", p = Math.min(v.presentationWidth / v.width, v.presentationHeight / v.height), p = Math.max(p, t.minScale), p = Math.min(p, t.maxScale), p === 1 || k.isActive() ? (l.slides.style.zoom = "", l.slides.style.left = "", l.slides.style.top = "", l.slides.style.bottom = "", l.slides.style.right = "", Ne({ layout: "" })) : (l.slides.style.zoom = "", l.slides.style.left = "50%", l.slides.style.top = "50%", l.slides.style.bottom = "auto", l.slides.style.right = "auto", Ne({ layout: "translate(-50%, -50%) scale(" + p + ")" }));
          const w = Array.from(l.wrapper.querySelectorAll(de));
          for (let P = 0, x = w.length; P < x; P++) {
            const N = w[P];
            N.style.display !== "none" && (t.center || N.classList.contains("center") ? N.classList.contains("stack") ? N.style.top = 0 : N.style.top = Math.max((v.height - N.scrollHeight) / 2, 0) + "px" : N.style.top = "");
          }
          m !== p && j({
            type: "resize",
            data: {
              oldScale: m,
              scale: p,
              size: v
            }
          });
        }
        Zt(), l.viewport.style.setProperty("--slide-scale", p), l.viewport.style.setProperty("--viewport-width", n + "px"), l.viewport.style.setProperty("--viewport-height", d + "px"), k.layout(), K.update(), L.updateParallax(), f.isActive() && f.update();
      }
    }
    function rt(n, d) {
      E$1(l.slides, "section > .stretch, section > .r-stretch").forEach((v) => {
        let m = Ei(v, d);
        if (/(img|video)/gi.test(v.nodeName)) {
          const w = v.naturalWidth || v.videoWidth, P = v.naturalHeight || v.videoHeight, x = Math.min(n / w, m / P);
          v.style.width = w * x + "px", v.style.height = P * x + "px";
        } else
          v.style.width = n + "px", v.style.height = m + "px";
      });
    }
    function Zt() {
      if (l.wrapper && !t.disableLayout && !F.isActive() && typeof t.scrollActivationWidth == "number" && t.view !== "scroll") {
        const n = we();
        n.presentationWidth > 0 && n.presentationWidth <= t.scrollActivationWidth ? k.isActive() || (L.create(), k.activate()) : k.isActive() && k.deactivate();
      }
    }
    function we(n, d) {
      let v = t.width, m = t.height;
      t.disableLayout && (v = l.slides.offsetWidth, m = l.slides.offsetHeight);
      const w = {
        // Slide size
        width: v,
        height: m,
        // Presentation size
        presentationWidth: n || l.wrapper.offsetWidth,
        presentationHeight: d || l.wrapper.offsetHeight
      };
      return w.presentationWidth -= w.presentationWidth * t.margin, w.presentationHeight -= w.presentationHeight * t.margin, typeof w.width == "string" && /%$/.test(w.width) && (w.width = parseInt(w.width, 10) / 100 * w.presentationWidth), typeof w.height == "string" && /%$/.test(w.height) && (w.height = parseInt(w.height, 10) / 100 * w.presentationHeight), w;
    }
    function nt(n, d) {
      typeof n == "object" && typeof n.setAttribute == "function" && n.setAttribute("data-previous-indexv", d || 0);
    }
    function ot(n) {
      if (typeof n == "object" && typeof n.setAttribute == "function" && n.classList.contains("stack")) {
        const d = n.hasAttribute("data-start-indexv") ? "data-start-indexv" : "data-previous-indexv";
        return parseInt(n.getAttribute(d) || 0, 10);
      }
      return 0;
    }
    function pe(n = u) {
      return n && n.parentNode && !!n.parentNode.nodeName.match(/section/i);
    }
    function ei(n = u) {
      return n.classList.contains(".stack") || n.querySelector("section") !== null;
    }
    function lt() {
      return u && pe(u) ? !u.nextElementSibling : false;
    }
    function dt() {
      return r === 0 && o === 0;
    }
    function Be() {
      return u ? !(u.nextElementSibling || pe(u) && u.parentNode.nextElementSibling) : false;
    }
    function ct() {
      if (t.pause) {
        const n = l.wrapper.classList.contains("paused");
        Se(), l.wrapper.classList.add("paused"), n === false && j({ type: "paused" });
      }
    }
    function ve() {
      const n = l.wrapper.classList.contains("paused");
      l.wrapper.classList.remove("paused"), ue(), n && j({ type: "resumed" });
    }
    function ht(n) {
      typeof n == "boolean" ? n ? ct() : ve() : me() ? ve() : ct();
    }
    function me() {
      return l.wrapper.classList.contains("paused");
    }
    function ti(n) {
      typeof n == "boolean" ? n ? q.show() : q.hide() : q.isVisible() ? q.hide() : q.show();
    }
    function ii(n) {
      typeof n == "boolean" ? n ? Re() : Ae() : z ? Re() : Ae();
    }
    function si() {
      return !!(M && !z);
    }
    function Y(n, d, v, m) {
      if (j({
        type: "beforeslidechange",
        data: {
          indexh: n === void 0 ? r : n,
          indexv: d === void 0 ? o : d,
          origin: m
        }
      }).defaultPrevented) return;
      h = u;
      const P = l.wrapper.querySelectorAll(te$1);
      if (k.isActive()) {
        const J = k.getSlideByIndices(n, d);
        J && k.scrollToSlide(J);
        return;
      }
      if (P.length === 0) return;
      d === void 0 && !f.isActive() && (d = ot(P[n])), h && h.parentNode && h.parentNode.classList.contains("stack") && nt(h.parentNode, o);
      const x = y.concat();
      y.length = 0;
      let N = r || 0, oe = o || 0;
      r = Ee(te$1, n === void 0 ? r : n), o = Ee(_e, d === void 0 ? o : d);
      let G = r !== N || o !== oe;
      G || (h = null);
      let $ = P[r], I = $.querySelectorAll("section");
      c.classList.toggle("is-vertical-slide", I.length > 1), u = I[o] || $;
      let ee = false;
      G && h && u && !f.isActive() && (A = "running", ee = He(h, u, N, oe), ee && l.slides.classList.add("disable-slide-transitions")), Ve(), he(), f.isActive() && f.update(), typeof v != "undefined" && C.goto(v), h && h !== u && (h.classList.remove("present"), h.setAttribute("aria-hidden", "true"), dt() && setTimeout(() => {
        li().forEach((J) => {
          nt(J, 0);
        });
      }, 0));
      e: for (let J = 0, gi = y.length; J < gi; J++) {
        for (let Le = 0; Le < x.length; Le++)
          if (x[Le] === y[J]) {
            x.splice(Le, 1);
            continue e;
          }
        l.viewport.classList.add(y[J]), j({ type: y[J] });
      }
      for (; x.length; )
        l.viewport.classList.remove(x.pop());
      G && (R.afterSlideChanged(), st(m)), (G || !h) && (R.stopEmbeddedContent(h), R.startEmbeddedContent(u)), requestAnimationFrame(() => {
        Me(ye(u));
      }), K.update(), X.update(), _.update(), L.update(), L.updateParallax(), B.update(), C.update(), T.writeURL(), ue(), ee && (setTimeout(() => {
        l.slides.classList.remove("disable-slide-transitions");
      }, 0), t.autoAnimate && W.run(h, u));
    }
    function He(n, d, v, m) {
      return n.hasAttribute("data-auto-animate") && d.hasAttribute("data-auto-animate") && n.getAttribute("data-auto-animate-id") === d.getAttribute("data-auto-animate-id") && !(r > v || o > m ? d : n).hasAttribute("data-auto-animate-restart");
    }
    function ai(n, d, v) {
      let m = r || 0;
      r = d, o = v;
      const w = u !== n;
      h = u, u = n, u && h && t.autoAnimate && He(h, u, m, o) && W.run(h, u), w && (R.afterSlideChanged(), h && (R.stopEmbeddedContent(h), R.stopEmbeddedContent(h.slideBackgroundElement)), R.startEmbeddedContent(u), R.startEmbeddedContent(u.slideBackgroundElement)), requestAnimationFrame(() => {
        Me(ye(u));
      }), st();
    }
    function ut() {
      be(), et(), he(), M = t.autoSlide, ue(), L.create(), T.writeURL(), t.sortFragmentsOnSync === true && C.sortAll(), typeof r != "undefined" && (r = Ee(te$1, r), o = Ee(_e, o)), X.update(), K.update(), Ve(), _.update(), _.updateVisibility(), H.update(), L.update(true), B.update(), R.formatEmbeddedContent(), t.autoPlayMedia === false ? R.stopEmbeddedContent(u, { unloadIframes: false }) : R.startEmbeddedContent(u), f.isActive() && f.layout(), j({ type: "sync" });
    }
    function ri(n = u) {
      L.sync(n), C.sync(n), R.load(n), L.update(), _.update(), j({
        type: "slidesync",
        data: {
          slide: n
        }
      });
    }
    function ni() {
      se().forEach((n) => {
        E$1(n, "section").forEach((d, v) => {
          v > 0 && (d.classList.remove("present"), d.classList.remove("past"), d.classList.add("future"), d.setAttribute("aria-hidden", "true"));
        });
      });
    }
    function De(n = se()) {
      n.forEach((d, v) => {
        let m = n[Math.floor(Math.random() * n.length)];
        m.parentNode === d.parentNode && d.parentNode.insertBefore(d, m);
        let w = d.querySelectorAll("section");
        w.length && De(w);
      });
    }
    function Ee(n, d) {
      let v = E$1(l.wrapper, n), m = v.length, w = k.isActive() || F.isActive(), P = false, x = false;
      if (m) {
        t.loop && (d >= m && (P = true), d %= m, d < 0 && (d = m + d, x = true)), d = Math.max(Math.min(d, m - 1), 0);
        for (let $ = 0; $ < m; $++) {
          let I = v[$], ee = t.rtl && !pe(I);
          if (I.classList.remove("past"), I.classList.remove("present"), I.classList.remove("future"), I.setAttribute("hidden", ""), I.setAttribute("aria-hidden", "true"), I.querySelector("section") && I.classList.add("stack"), w) {
            I.classList.add("present");
            continue;
          }
          $ < d ? (I.classList.add(ee ? "future" : "past"), t.fragments && ft(I)) : $ > d ? (I.classList.add(ee ? "past" : "future"), t.fragments && gt(I)) : $ === d && t.fragments && (P ? gt(I) : x && ft(I));
        }
        let N = v[d], oe = N.classList.contains("present");
        N.classList.add("present"), N.removeAttribute("hidden"), N.removeAttribute("aria-hidden"), oe || j({
          target: N,
          type: "visible",
          bubbles: false
        });
        let G = N.getAttribute("data-state");
        G && (y = y.concat(G.split(" ")));
      } else
        d = 0;
      return d;
    }
    function ft(n) {
      E$1(n, ".fragment").forEach((d) => {
        d.classList.add("visible"), d.classList.remove("current-fragment");
      });
    }
    function gt(n) {
      E$1(n, ".fragment.visible").forEach((d) => {
        d.classList.remove("visible", "current-fragment");
      });
    }
    function Ve() {
      let n = se(), d = n.length, v, m;
      if (d && typeof r != "undefined") {
        const w = f.isActive();
        let P = w ? 10 : t.viewDistance;
        le$1 && (P = w ? 6 : t.mobileViewDistance), F.isActive() && (P = Number.MAX_VALUE);
        for (let x = 0; x < d; x++) {
          let N = n[x], oe = E$1(N, "section"), G = oe.length;
          if (v = Math.abs((r || 0) - x) || 0, t.loop && (v = Math.abs(((r || 0) - x) % (d - P)) || 0), v < P ? R.load(N) : R.unload(N), G) {
            let $ = w ? 0 : ot(N);
            for (let I = 0; I < G; I++) {
              let ee = oe[I];
              m = Math.abs(x === (r || 0) ? (o || 0) - I : I - $), v + m < P ? R.load(ee) : R.unload(ee);
            }
          }
        }
        bt() ? l.wrapper.classList.add("has-vertical-slides") : l.wrapper.classList.remove("has-vertical-slides"), yt() ? l.wrapper.classList.add("has-horizontal-slides") : l.wrapper.classList.remove("has-horizontal-slides");
      }
    }
    function Z({ includeFragments: n = false } = {}) {
      let d = l.wrapper.querySelectorAll(te$1), v = l.wrapper.querySelectorAll(_e), m = {
        left: r > 0,
        right: r < d.length - 1,
        up: o > 0,
        down: o < v.length - 1
      };
      if (t.loop && (d.length > 1 && (m.left = true, m.right = true), v.length > 1 && (m.up = true, m.down = true)), d.length > 1 && t.navigationMode === "linear" && (m.right = m.right || m.down, m.left = m.left || m.up), n === true) {
        let w = C.availableRoutes();
        m.left = m.left || w.prev, m.up = m.up || w.prev, m.down = m.down || w.next, m.right = m.right || w.next;
      }
      if (t.rtl) {
        let w = m.left;
        m.left = m.right, m.right = w;
      }
      return m;
    }
    function pt(n = u) {
      let d = se(), v = 0;
      e: for (let m = 0; m < d.length; m++) {
        let w = d[m], P = w.querySelectorAll("section");
        for (let x = 0; x < P.length; x++) {
          if (P[x] === n)
            break e;
          P[x].dataset.visibility !== "uncounted" && v++;
        }
        if (w === n)
          break;
        w.classList.contains("stack") === false && w.dataset.visibility !== "uncounted" && v++;
      }
      return v;
    }
    function oi() {
      let n = wt(), d = pt();
      if (u) {
        let v = u.querySelectorAll(".fragment");
        if (v.length > 0) {
          let m = u.querySelectorAll(".fragment.visible");
          d += m.length / v.length * 0.9;
        }
      }
      return Math.min(d / (n - 1), 1);
    }
    function vt(n) {
      let d = r, v = o, m;
      if (n)
        if (k.isActive())
          d = parseInt(n.getAttribute("data-index-h"), 10), n.getAttribute("data-index-v") && (v = parseInt(n.getAttribute("data-index-v"), 10));
        else {
          let w = pe(n), P = w ? n.parentNode : n, x = se();
          d = Math.max(x.indexOf(P), 0), v = void 0, w && (v = Math.max(E$1(n.parentNode, "section").indexOf(n), 0));
        }
      if (!n && u && u.querySelectorAll(".fragment").length > 0) {
        let P = u.querySelector(".current-fragment");
        P && P.hasAttribute("data-fragment-index") ? m = parseInt(P.getAttribute("data-fragment-index"), 10) : m = u.querySelectorAll(".fragment.visible").length - 1;
      }
      return { h: d, v, f: m };
    }
    function Fe() {
      return E$1(l.wrapper, de + ':not(.stack):not([data-visibility="uncounted"])');
    }
    function se() {
      return E$1(l.wrapper, te$1);
    }
    function mt() {
      return E$1(l.wrapper, ".slides>section>section");
    }
    function li() {
      return E$1(l.wrapper, te$1 + ".stack");
    }
    function yt() {
      return se().length > 1;
    }
    function bt() {
      return mt().length > 1;
    }
    function di() {
      return Fe().map((n) => {
        let d = {};
        for (let v = 0; v < n.attributes.length; v++) {
          let m = n.attributes[v];
          d[m.name] = m.value;
        }
        return d;
      });
    }
    function wt() {
      return Fe().length;
    }
    function Et(n, d) {
      let v = se()[n], m = v && v.querySelectorAll("section");
      return m && m.length && typeof d == "number" ? m ? m[d] : void 0 : v;
    }
    function ci(n, d) {
      let v = typeof n == "number" ? Et(n, d) : n;
      if (v)
        return v.slideBackgroundElement;
    }
    function St() {
      let n = vt();
      return Q$1({
        indexh: n.h,
        indexv: n.v,
        indexf: n.f,
        paused: me(),
        overview: f.isActive()
      }, H.getState());
    }
    function hi(n) {
      if (typeof n == "object") {
        Y(fe(n.indexh), fe(n.indexv), fe(n.indexf));
        let d = fe(n.paused), v = fe(n.overview);
        typeof d == "boolean" && d !== me() && ht(d), typeof v == "boolean" && v !== f.isActive() && f.toggle(v), H.setState(n);
      }
    }
    function ue() {
      if (Se(), u && t.autoSlide !== false) {
        let n = u.querySelector(".current-fragment[data-autoslide]"), d = n ? n.getAttribute("data-autoslide") : null, v = u.parentNode ? u.parentNode.getAttribute("data-autoslide") : null, m = u.getAttribute("data-autoslide");
        d ? M = parseInt(d, 10) : m ? M = parseInt(m, 10) : v ? M = parseInt(v, 10) : (M = t.autoSlide, u.querySelectorAll(".fragment").length === 0 && E$1(u, "video, audio").forEach((w) => {
          w.hasAttribute("data-autoplay") && M && w.duration * 1e3 / w.playbackRate > M && (M = w.duration * 1e3 / w.playbackRate + 1e3);
        })), M && !z && !me() && !f.isActive() && (!Be() || C.availableRoutes().next || t.loop === true) && (U = setTimeout(() => {
          typeof t.autoSlideMethod == "function" ? t.autoSlideMethod() : Ue(), ue();
        }, M), re = Date.now()), O && O.setPlaying(U !== -1);
      }
    }
    function Se() {
      clearTimeout(U), U = -1;
    }
    function Ae() {
      M && !z && (z = true, j({ type: "autoslidepaused" }), clearTimeout(U), O && O.setPlaying(false));
    }
    function Re() {
      M && z && (z = false, j({ type: "autoslideresumed" }), ue());
    }
    function ke({ skipFragments: n = false } = {}) {
      if (g.hasNavigatedHorizontally = true, k.isActive()) return k.prev();
      t.rtl ? (f.isActive() || n || C.next() === false) && Z().left && Y(r + 1, t.navigationMode === "grid" ? o : void 0) : (f.isActive() || n || C.prev() === false) && Z().left && Y(r - 1, t.navigationMode === "grid" ? o : void 0);
    }
    function Ce({ skipFragments: n = false } = {}) {
      if (g.hasNavigatedHorizontally = true, k.isActive()) return k.next();
      t.rtl ? (f.isActive() || n || C.prev() === false) && Z().right && Y(r - 1, t.navigationMode === "grid" ? o : void 0) : (f.isActive() || n || C.next() === false) && Z().right && Y(r + 1, t.navigationMode === "grid" ? o : void 0);
    }
    function ze({ skipFragments: n = false } = {}) {
      if (k.isActive()) return k.prev();
      (f.isActive() || n || C.prev() === false) && Z().up && Y(r, o - 1);
    }
    function Oe({ skipFragments: n = false } = {}) {
      if (g.hasNavigatedVertically = true, k.isActive()) return k.next();
      (f.isActive() || n || C.next() === false) && Z().down && Y(r, o + 1);
    }
    function At({ skipFragments: n = false } = {}) {
      if (k.isActive()) return k.prev();
      if (n || C.prev() === false)
        if (Z().up)
          ze({ skipFragments: n });
        else {
          let d;
          if (t.rtl ? d = E$1(l.wrapper, te$1 + ".future").pop() : d = E$1(l.wrapper, te$1 + ".past").pop(), d && d.classList.contains("stack")) {
            let v = d.querySelectorAll("section").length - 1 || void 0, m = r - 1;
            Y(m, v);
          } else t.rtl ? Ce({ skipFragments: n }) : ke({ skipFragments: n });
        }
    }
    function Ue({ skipFragments: n = false } = {}) {
      if (g.hasNavigatedHorizontally = true, g.hasNavigatedVertically = true, k.isActive()) return k.next();
      if (n || C.next() === false) {
        let d = Z();
        d.down && d.right && t.loop && lt() && (d.down = false), d.down ? Oe({ skipFragments: n }) : t.rtl ? ke({ skipFragments: n }) : Ce({ skipFragments: n });
      }
    }
    function ui(n) {
      t.autoSlideStoppable && Ae();
    }
    function Rt(n) {
      let d = n.data;
      if (typeof d == "string" && d.charAt(0) === "{" && d.charAt(d.length - 1) === "}" && (d = JSON.parse(d), d.method && typeof i[d.method] == "function"))
        if (Li.test(d.method) === false) {
          const v = i[d.method].apply(i, d.args);
          at("callback", { method: d.method, result: v });
        } else
          console.warn('reveal.js: "' + d.method + '" is is blacklisted from the postMessage API');
    }
    function kt(n) {
      A === "running" && /section/gi.test(n.target.nodeName) && (A = "idle", j({
        type: "slidetransitionend",
        data: { indexh: r, indexv: o, previousSlide: h, currentSlide: u }
      }));
    }
    function Ct(n) {
      const d = V(n.target, 'a[href^="#"]');
      if (d) {
        const v = d.getAttribute("href"), m = T.getIndicesFromHash(v);
        m && (i.slide(m.h, m.v, m.f), n.preventDefault());
      }
    }
    function Pt(n) {
      he();
    }
    function Lt(n) {
      document.hidden === false && document.activeElement !== document.body && (typeof document.activeElement.blur == "function" && document.activeElement.blur(), document.body.focus());
    }
    function Pe(n) {
      (document.fullscreenElement || document.webkitFullscreenElement) === l.wrapper && (n.stopImmediatePropagation(), setTimeout(() => {
        i.layout(), i.focus.focus();
      }, 1));
    }
    function fi(n) {
      Be() && t.loop === false ? (Y(0, 0), Re()) : z ? Re() : Ae();
    }
    const Tt = {
      VERSION: Ot$1,
      initialize: Wt,
      configure: Ze,
      destroy: Qt,
      sync: ut,
      syncSlide: ri,
      syncFragments: C.sync.bind(C),
      // Navigation methods
      slide: Y,
      left: ke,
      right: Ce,
      up: ze,
      down: Oe,
      prev: At,
      next: Ue,
      // Navigation aliases
      navigateLeft: ke,
      navigateRight: Ce,
      navigateUp: ze,
      navigateDown: Oe,
      navigatePrev: At,
      navigateNext: Ue,
      // Fragment methods
      navigateFragment: C.goto.bind(C),
      prevFragment: C.prev.bind(C),
      nextFragment: C.next.bind(C),
      // Event binding
      on: tt,
      off: it,
      // Legacy event binding methods left in for backwards compatibility
      addEventListener: tt,
      removeEventListener: it,
      // Forces an update in slide layout
      layout: he,
      // Randomizes the order of slides
      shuffle: De,
      // Returns an object with the available routes as booleans (left/right/top/bottom)
      availableRoutes: Z,
      // Returns an object with the available fragments as booleans (prev/next)
      availableFragments: C.availableRoutes.bind(C),
      // Toggles a help overlay with keyboard shortcuts
      toggleHelp: H.toggleHelp.bind(H),
      // Toggles the overview mode on/off
      toggleOverview: f.toggle.bind(f),
      // Toggles the scroll view on/off
      toggleScrollView: k.toggle.bind(k),
      // Toggles the "black screen" mode on/off
      togglePause: ht,
      // Toggles the auto slide mode on/off
      toggleAutoSlide: ii,
      // Toggles visibility of the jump-to-slide UI
      toggleJumpToSlide: ti,
      // Slide navigation checks
      isFirstSlide: dt,
      isLastSlide: Be,
      isLastVerticalSlide: lt,
      isVerticalSlide: pe,
      isVerticalStack: ei,
      // State checks
      isPaused: me,
      isAutoSliding: si,
      isSpeakerNotes: _.isSpeakerNotesWindow.bind(_),
      isOverview: f.isActive.bind(f),
      isFocused: ne.isFocused.bind(ne),
      isOverlayOpen: H.isOpen.bind(H),
      isScrollView: k.isActive.bind(k),
      isPrintView: F.isActive.bind(F),
      // Checks if reveal.js has been loaded and is ready for use
      isReady: () => a,
      // Slide preloading
      loadSlide: R.load.bind(R),
      unloadSlide: R.unload.bind(R),
      // Start/stop all media inside of the current slide
      startEmbeddedContent: () => R.startEmbeddedContent(u),
      stopEmbeddedContent: () => R.stopEmbeddedContent(u, { unloadIframes: false }),
      // Lightbox previews
      previewIframe: H.previewIframe.bind(H),
      previewImage: H.previewImage.bind(H),
      previewVideo: H.previewVideo.bind(H),
      showPreview: H.previewIframe.bind(H),
      // deprecated in favor of showIframeLightbox
      hidePreview: H.close.bind(H),
      // Adds or removes all internal event listeners
      addEventListeners: et,
      removeEventListeners: be,
      dispatchEvent: j,
      // Facility for persisting and restoring the presentation state
      getState: St,
      setState: hi,
      // Presentation progress on range of 0-1
      getProgress: oi,
      // Returns the indices of the current, or specified, slide
      getIndices: vt,
      // Returns an Array of key:value maps of the attributes of each
      // slide in the deck
      getSlidesAttributes: di,
      // Returns the number of slides that we have passed
      getSlidePastCount: pt,
      // Returns the total number of slides
      getTotalSlides: wt,
      // Returns the slide element at the specified index
      getSlide: Et,
      // Returns the previous slide element, may be null
      getPreviousSlide: () => h,
      // Returns the current slide element
      getCurrentSlide: () => u,
      // Returns the slide background element at the specified index
      getSlideBackground: ci,
      // Returns the speaker notes string for a slide, or null
      getSlideNotes: _.getSlideNotes.bind(_),
      // Returns an Array of all slides
      getSlides: Fe,
      // Returns an array with all horizontal/vertical slides in the deck
      getHorizontalSlides: se,
      getVerticalSlides: mt,
      // Checks if the presentation contains two or more horizontal
      // and vertical slides
      hasHorizontalSlides: yt,
      hasVerticalSlides: bt,
      // Checks if the deck has navigated on either axis at least once
      hasNavigatedHorizontally: () => g.hasNavigatedHorizontally,
      hasNavigatedVertically: () => g.hasNavigatedVertically,
      shouldAutoAnimateBetween: He,
      // Adds/removes a custom key binding
      addKeyBinding: S.addKeyBinding.bind(S),
      removeKeyBinding: S.removeKeyBinding.bind(S),
      // Programmatically triggers a keyboard event
      triggerKey: S.triggerKey.bind(S),
      // Registers a new shortcut to include in the help overlay
      registerKeyboardShortcut: S.registerKeyboardShortcut.bind(S),
      getComputedSlideSize: we,
      setCurrentScrollPage: ai,
      // Allows for manually removing slides prior to reveal.js initialization
      removeHiddenSlides: Je,
      // Returns the current scale of the presentation content
      getScale: () => p,
      // Returns the current configuration object
      getConfig: () => t,
      // Helper method, retrieves query string as a key:value map
      getQueryHash: Mt$1,
      // Returns the path to the current slide as represented in the URL
      getSlidePath: T.getHash.bind(T),
      // Returns reveal.js DOM elements
      getRevealElement: () => c,
      getSlidesElement: () => l.slides,
      getViewportElement: () => l.viewport,
      getBackgroundsElement: () => L.element,
      // API for registering and retrieving plugins
      registerPlugin: D.registerPlugin.bind(D),
      hasPlugin: D.hasPlugin.bind(D),
      getPlugin: D.getPlugin.bind(D),
      getPlugins: D.getRegisteredPlugins.bind(D)
    };
    return ge(i, We(Q$1({}, Tt), {
      // Methods for announcing content to screen readers
      announceStatus: Me,
      getStatusText: ye,
      // Controllers
      focus: ne,
      scroll: k,
      progress: K,
      controls: X,
      location: T,
      overview: f,
      keyboard: S,
      fragments: C,
      backgrounds: L,
      slideContent: R,
      slideNumber: B,
      onUserInput: ui,
      closeOverlay: H.close.bind(H),
      updateSlidesVisibility: Ve,
      layoutSlideContents: rt,
      transformSlides: Ne,
      cueAutoSlide: ue,
      cancelAutoSlide: Se
    })), Tt;
  }
  const ce$1 = Ut$1, qt$1 = [];
  ce$1.initialize = (c) => {
    const e = document.querySelector(".reveal");
    if (!(e instanceof HTMLElement))
      throw new Error('Unable to find presentation root (<div class="reveal">).');
    return Object.assign(ce$1, new Ut$1(e, c)), qt$1.map((i) => i(ce$1)), ce$1.initialize();
  };
  ["configure", "on", "off", "addEventListener", "removeEventListener", "registerPlugin"].forEach((c) => {
    ce$1[c] = (...e) => {
      qt$1.push((i) => i[c].call(null, ...e));
    };
  });
  ce$1.isReady = () => false;
  ce$1.VERSION = Ot$1;

  const bt = `<!--
	NOTE: You need to build the notes plugin after making changes to this file.
-->
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>reveal.js - Speaker View</title>

		<style>
			body {
				font-family: Helvetica;
				font-size: 18px;
			}

			#current-slide,
			#upcoming-slide,
			#speaker-controls {
				padding: 6px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			#current-slide iframe,
			#upcoming-slide iframe {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
			}

			#current-slide .label,
			#upcoming-slide .label {
				position: absolute;
				top: 10px;
				left: 10px;
				z-index: 2;
			}

			#connection-status {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 20;
				padding: 30% 20% 20% 20%;
				font-size: 18px;
				color: #222;
				background: #fff;
				text-align: center;
				box-sizing: border-box;
				line-height: 1.4;
			}

			.overlay-element {
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				text-shadow: none;
				background: rgba( 220, 220, 220, 0.8 );
				color: #222;
				font-size: 14px;
			}

			.overlay-element.interactive:hover {
				background: rgba( 220, 220, 220, 1 );
			}

			#current-slide {
				position: absolute;
				width: 60%;
				height: 100%;
				top: 0;
				left: 0;
				padding-right: 0;
			}

			#upcoming-slide {
				position: absolute;
				width: 40%;
				height: 40%;
				right: 0;
				top: 0;
			}

			/* Speaker controls */
			#speaker-controls {
				position: absolute;
				top: 40%;
				right: 0;
				width: 40%;
				height: 60%;
				overflow: auto;
				font-size: 18px;
			}

				.speaker-controls-time.hidden,
				.speaker-controls-notes.hidden {
					display: none;
				}

				.speaker-controls-time .label,
				.speaker-controls-pace .label,
				.speaker-controls-notes .label {
					text-transform: uppercase;
					font-weight: normal;
					font-size: 0.66em;
					color: #666;
					margin: 0;
				}

				.speaker-controls-time, .speaker-controls-pace {
					border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );
					margin-bottom: 10px;
					padding: 10px 16px;
					padding-bottom: 20px;
					cursor: pointer;
				}

				.speaker-controls-time .reset-button {
					opacity: 0;
					float: right;
					color: #666;
					text-decoration: none;
				}
				.speaker-controls-time:hover .reset-button {
					opacity: 1;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock {
					width: 50%;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock,
				.speaker-controls-time .pacing .hours-value,
				.speaker-controls-time .pacing .minutes-value,
				.speaker-controls-time .pacing .seconds-value {
					font-size: 1.9em;
				}

				.speaker-controls-time .timer {
					float: left;
				}

				.speaker-controls-time .clock {
					float: right;
					text-align: right;
				}

				.speaker-controls-time span.mute {
					opacity: 0.3;
				}

				.speaker-controls-time .pacing-title {
					margin-top: 5px;
				}

				.speaker-controls-time .pacing.ahead {
					color: blue;
				}

				.speaker-controls-time .pacing.on-track {
					color: green;
				}

				.speaker-controls-time .pacing.behind {
					color: red;
				}

				.speaker-controls-notes {
					padding: 10px 16px;
				}

				.speaker-controls-notes .value {
					margin-top: 5px;
					line-height: 1.4;
					font-size: 1.2em;
				}

			/* Layout selector */
			#speaker-layout {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #222;
				z-index: 10;
			}
				#speaker-layout select {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 0;
					box-shadow: 0;
					cursor: pointer;
					opacity: 0;

					font-size: 1em;
					background-color: transparent;

					-moz-appearance: none;
					-webkit-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}

				#speaker-layout select:focus {
					outline: none;
					box-shadow: none;
				}

			.clear {
				clear: both;
			}

			/* Speaker layout: Wide */
			body[data-speaker-layout="wide"] #current-slide,
			body[data-speaker-layout="wide"] #upcoming-slide {
				width: 50%;
				height: 45%;
				padding: 6px;
			}

			body[data-speaker-layout="wide"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="wide"] #upcoming-slide {
				top: 0;
				left: 50%;
			}

			body[data-speaker-layout="wide"] #speaker-controls {
				top: 45%;
				left: 0;
				width: 100%;
				height: 50%;
				font-size: 1.25em;
			}

			/* Speaker layout: Tall */
			body[data-speaker-layout="tall"] #current-slide,
			body[data-speaker-layout="tall"] #upcoming-slide {
				width: 45%;
				height: 50%;
				padding: 6px;
			}

			body[data-speaker-layout="tall"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="tall"] #upcoming-slide {
				top: 50%;
				left: 0;
			}

			body[data-speaker-layout="tall"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 45%;
				width: 55%;
				height: 100%;
				font-size: 1.25em;
			}

			/* Speaker layout: Notes only */
			body[data-speaker-layout="notes-only"] #current-slide,
			body[data-speaker-layout="notes-only"] #upcoming-slide {
				display: none;
			}

			body[data-speaker-layout="notes-only"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 1.25em;
			}

			@media screen and (max-width: 1080px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 16px;
				}
			}

			@media screen and (max-width: 900px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 14px;
				}
			}

			@media screen and (max-width: 800px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 12px;
				}
			}

		</style>
	</head>

	<body>

		<div id="connection-status">Loading speaker view...</div>

		<div id="current-slide"></div>
		<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>
		<div id="speaker-controls">
			<div class="speaker-controls-time">
				<h4 class="label">Time <span class="reset-button">Click to Reset</span></h4>
				<div class="clock">
					<span class="clock-value">0:00 AM</span>
				</div>
				<div class="timer">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
				<div class="clear"></div>

				<h4 class="label pacing-title" style="display: none">Pacing – Time to finish current slide</h4>
				<div class="pacing" style="display: none">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
			</div>

			<div class="speaker-controls-notes hidden">
				<h4 class="label">Notes</h4>
				<div class="value"></div>
			</div>
		</div>
		<div id="speaker-layout" class="overlay-element interactive">
			<span class="speaker-layout-label"></span>
			<select class="speaker-layout-dropdown"></select>
		</div>

		<script>

			(function() {

				var notes,
					notesValue,
					currentState,
					currentSlide,
					upcomingSlide,
					layoutLabel,
					layoutDropdown,
					pendingCalls = {},
					lastRevealApiCallId = 0,
					connected = false

				var connectionStatus = document.querySelector( '#connection-status' );

				var SPEAKER_LAYOUTS = {
					'default': 'Default',
					'wide': 'Wide',
					'tall': 'Tall',
					'notes-only': 'Notes only'
				};

				setupLayout();

				let openerOrigin;

				try {
					openerOrigin = window.opener.location.origin;
				}
				catch ( error ) { console.warn( error ) }

				// In order to prevent XSS, the speaker view will only run if its
				// opener has the same origin as itself
				if( window.location.origin !== openerOrigin ) {
					connectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';
					return;
				}

				var connectionTimeout = setTimeout( function() {
					connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';
				}, 5000 );

				window.addEventListener( 'message', function( event ) {

					// Validate the origin of all messages to avoid parsing messages
					// that aren't meant for us. Ignore when running off file:// so
					// that the speaker view continues to work without a web server.
					if( window.location.origin !== event.origin && window.location.origin !== 'file://' ) {
						return
					}

					clearTimeout( connectionTimeout );
					connectionStatus.style.display = 'none';

					var data = JSON.parse( event.data );

					// The overview mode is only useful to the reveal.js instance
					// where navigation occurs so we don't sync it
					if( data.state ) delete data.state.overview;

					// Messages sent by the notes plugin inside of the main window
					if( data && data.namespace === 'reveal-notes' ) {
						if( data.type === 'connect' ) {
							handleConnectMessage( data );
						}
						else if( data.type === 'state' ) {
							handleStateMessage( data );
						}
						else if( data.type === 'return' ) {
							pendingCalls[data.callId](data.result);
							delete pendingCalls[data.callId];
						}
					}
					// Messages sent by the reveal.js inside of the current slide preview
					else if( data && data.namespace === 'reveal' ) {
						const supportedEvents = [
							'slidechanged',
							'fragmentshown',
							'fragmenthidden',
							'paused',
							'resumed',
							'previewiframe',
							'previewimage',
							'previewvideo',
							'closeoverlay'
						];

						if( /ready/.test( data.eventName ) ) {
							// Send a message back to notify that the handshake is complete
							window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );
						}
						else if( supportedEvents.includes( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {
							dispatchStateToMainWindow( data.state );
						}
					}

				} );

				/**
				 * Updates the presentation in the main window to match the state
				 * of the presentation in the notes window.
				 */
				const dispatchStateToMainWindow = debounce(( state ) => {
					window.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );
				}, 500);

				/**
				 * Asynchronously calls the Reveal.js API of the main frame.
				 */
				function callRevealApi( methodName, methodArguments, callback ) {

					var callId = ++lastRevealApiCallId;
					pendingCalls[callId] = callback;
					window.opener.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'call',
						callId: callId,
						methodName: methodName,
						arguments: methodArguments
					} ), '*' );

				}

				/**
				 * Called when the main window is trying to establish a
				 * connection.
				 */
				function handleConnectMessage( data ) {

					if( connected === false ) {
						connected = true;

						setupIframes( data );
						setupKeyboard();
						setupNotes();
						setupTimer();
						setupHeartbeat();
					}

				}

				/**
				 * Called when the main window sends an updated state.
				 */
				function handleStateMessage( data ) {

					// Store the most recently set state to avoid circular loops
					// applying the same state
					currentState = JSON.stringify( data.state );

					// No need for updating the notes in case of fragment changes
					if ( data.notes ) {
						notes.classList.remove( 'hidden' );
						notesValue.style.whiteSpace = data.whitespace;
						if( data.markdown ) {
							notesValue.innerHTML = marked.parse( data.notes );
						}
						else {
							notesValue.innerHTML = data.notes;
						}
					}
					else {
						notes.classList.add( 'hidden' );
					}

					// Don't show lightboxes in the upcoming slide
					const { previewVideo, previewImage, previewIframe, ...upcomingState } = data.state;

					// Update the note slides
					currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ upcomingState ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );

				}

				// Limit to max one state update per X ms
				handleStateMessage = debounce( handleStateMessage, 200 );

				/**
				 * Forward keyboard events to the current slide window.
				 * This enables keyboard events to work even if focus
				 * isn't set on the current slide iframe.
				 *
				 * Block F5 default handling, it reloads and disconnects
				 * the speaker notes window.
				 */
				function setupKeyboard() {

					document.addEventListener( 'keydown', function( event ) {
						if( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {
							event.preventDefault();
							return false;
						}
						currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );
					} );

				}

				/**
				 * Creates the preview iframes.
				 */
				function setupIframes( data ) {

					var params = [
						'receiver',
						'progress=false',
						'history=false',
						'transition=none',
						'autoSlide=0',
						'backgroundTransition=none'
					].join( '&' );

					var urlSeparator = /\\?/.test(data.url) ? '&' : '?';
					var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
					var currentURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&postMessageEvents=true' + hash;
					var upcomingURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&controls=false' + hash;

					currentSlide = document.createElement( 'iframe' );
					currentSlide.setAttribute( 'width', 1280 );
					currentSlide.setAttribute( 'height', 1024 );
					currentSlide.setAttribute( 'src', currentURL );
					document.querySelector( '#current-slide' ).appendChild( currentSlide );

					upcomingSlide = document.createElement( 'iframe' );
					upcomingSlide.setAttribute( 'width', 640 );
					upcomingSlide.setAttribute( 'height', 512 );
					upcomingSlide.setAttribute( 'src', upcomingURL );
					document.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );

				}

				/**
				 * Setup the notes UI.
				 */
				function setupNotes() {

					notes = document.querySelector( '.speaker-controls-notes' );
					notesValue = document.querySelector( '.speaker-controls-notes .value' );

				}

				/**
				 * We send out a heartbeat at all times to ensure we can
				 * reconnect with the main presentation window after reloads.
				 */
				function setupHeartbeat() {

					setInterval( () => {
						window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );
					}, 1000 );

				}

				function getTimings( callback ) {

					callRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {
						callRevealApi( 'getConfig', [], function ( config ) {
							var totalTime = config.totalTime;
							var minTimePerSlide = config.minimumTimePerSlide || 0;
							var defaultTiming = config.defaultTiming;
							if ((defaultTiming == null) && (totalTime == null)) {
								callback(null);
								return;
							}
							// Setting totalTime overrides defaultTiming
							if (totalTime) {
								defaultTiming = 0;
							}
							var timings = [];
							for ( var i in slideAttributes ) {
								var slide = slideAttributes[ i ];
								var timing = defaultTiming;
								if( slide.hasOwnProperty( 'data-timing' )) {
									var t = slide[ 'data-timing' ];
									timing = parseInt(t);
									if( isNaN(timing) ) {
										console.warn("Could not parse timing '" + t + "' of slide " + i + "; using default of " + defaultTiming);
										timing = defaultTiming;
									}
								}
								timings.push(timing);
							}
							if ( totalTime ) {
								// After we've allocated time to individual slides, we summarize it and
								// subtract it from the total time
								var remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );
								// The remaining time is divided by the number of slides that have 0 seconds
								// allocated at the moment, giving the average time-per-slide on the remaining slides
								var remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length
								var timePerSlide = Math.round( remainingTime / remainingSlides, 0 )
								// And now we replace every zero-value timing with that average
								timings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );
							}
							var slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length
							if ( slidesUnderMinimum ) {
								message = "The pacing time for " + slidesUnderMinimum + " slide(s) is under the configured minimum of " + minTimePerSlide + " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";
								alert(message);
							}
							callback( timings );
						} );
					} );

				}

				/**
				 * Return the number of seconds allocated for presenting
				 * all slides up to and including this one.
				 */
				function getTimeAllocated( timings, callback ) {

					callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
						var allocated = 0;
						for (var i in timings.slice(0, currentSlide + 1)) {
							allocated += timings[i];
						}
						callback( allocated );
					} );

				}

				/**
				 * Create the timer and clock and start updating them
				 * at an interval.
				 */
				function setupTimer() {

					var start = new Date(),
					timeEl = document.querySelector( '.speaker-controls-time' ),
					clockEl = timeEl.querySelector( '.clock-value' ),
					hoursEl = timeEl.querySelector( '.hours-value' ),
					minutesEl = timeEl.querySelector( '.minutes-value' ),
					secondsEl = timeEl.querySelector( '.seconds-value' ),
					pacingTitleEl = timeEl.querySelector( '.pacing-title' ),
					pacingEl = timeEl.querySelector( '.pacing' ),
					pacingHoursEl = pacingEl.querySelector( '.hours-value' ),
					pacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),
					pacingSecondsEl = pacingEl.querySelector( '.seconds-value' );

					var timings = null;
					getTimings( function ( _timings ) {

						timings = _timings;
						if (_timings !== null) {
							pacingTitleEl.style.removeProperty('display');
							pacingEl.style.removeProperty('display');
						}

						// Update once directly
						_updateTimer();

						// Then update every second
						setInterval( _updateTimer, 1000 );

					} );


					function _resetTimer() {

						if (timings == null) {
							start = new Date();
							_updateTimer();
						}
						else {
							// Reset timer to beginning of current slide
							getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
								var slideEndTiming = slideEndTimingSeconds * 1000;
								callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
									var currentSlideTiming = timings[currentSlide] * 1000;
									var previousSlidesTiming = slideEndTiming - currentSlideTiming;
									var now = new Date();
									start = new Date(now.getTime() - previousSlidesTiming);
									_updateTimer();
								} );
							} );
						}

					}

					timeEl.addEventListener( 'click', function() {
						_resetTimer();
						return false;
					} );

					function _displayTime( hrEl, minEl, secEl, time) {

						var sign = Math.sign(time) == -1 ? "-" : "";
						time = Math.abs(Math.round(time / 1000));
						var seconds = time % 60;
						var minutes = Math.floor( time / 60 ) % 60 ;
						var hours = Math.floor( time / ( 60 * 60 )) ;
						hrEl.innerHTML = sign + zeroPadInteger( hours );
						if (hours == 0) {
							hrEl.classList.add( 'mute' );
						}
						else {
							hrEl.classList.remove( 'mute' );
						}
						minEl.innerHTML = ':' + zeroPadInteger( minutes );
						if (hours == 0 && minutes == 0) {
							minEl.classList.add( 'mute' );
						}
						else {
							minEl.classList.remove( 'mute' );
						}
						secEl.innerHTML = ':' + zeroPadInteger( seconds );
					}

					function _updateTimer() {

						var diff, hours, minutes, seconds,
						now = new Date();

						diff = now.getTime() - start.getTime();

						clockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
						_displayTime( hoursEl, minutesEl, secondsEl, diff );
						if (timings !== null) {
							_updatePacing(diff);
						}

					}

					function _updatePacing(diff) {

						getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
							var slideEndTiming = slideEndTimingSeconds * 1000;

							callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
								var currentSlideTiming = timings[currentSlide] * 1000;
								var timeLeftCurrentSlide = slideEndTiming - diff;
								if (timeLeftCurrentSlide < 0) {
									pacingEl.className = 'pacing behind';
								}
								else if (timeLeftCurrentSlide < currentSlideTiming) {
									pacingEl.className = 'pacing on-track';
								}
								else {
									pacingEl.className = 'pacing ahead';
								}
								_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );
							} );
						} );
					}

				}

				/**
				 * Sets up the speaker view layout and layout selector.
				 */
				function setupLayout() {

					layoutDropdown = document.querySelector( '.speaker-layout-dropdown' );
					layoutLabel = document.querySelector( '.speaker-layout-label' );

					// Render the list of available layouts
					for( var id in SPEAKER_LAYOUTS ) {
						var option = document.createElement( 'option' );
						option.setAttribute( 'value', id );
						option.textContent = SPEAKER_LAYOUTS[ id ];
						layoutDropdown.appendChild( option );
					}

					// Monitor the dropdown for changes
					layoutDropdown.addEventListener( 'change', function( event ) {

						setLayout( layoutDropdown.value );

					}, false );

					// Restore any currently persisted layout
					setLayout( getLayout() );

				}

				/**
				 * Sets a new speaker view layout. The layout is persisted
				 * in local storage.
				 */
				function setLayout( value ) {

					var title = SPEAKER_LAYOUTS[ value ];

					layoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );
					layoutDropdown.value = value;

					document.body.setAttribute( 'data-speaker-layout', value );

					// Persist locally
					if( supportsLocalStorage() ) {
						window.localStorage.setItem( 'reveal-speaker-layout', value );
					}

				}

				/**
				 * Returns the ID of the most recently set speaker layout
				 * or our default layout if none has been set.
				 */
				function getLayout() {

					if( supportsLocalStorage() ) {
						var layout = window.localStorage.getItem( 'reveal-speaker-layout' );
						if( layout ) {
							return layout;
						}
					}

					// Default to the first record in the layouts hash
					for( var id in SPEAKER_LAYOUTS ) {
						return id;
					}

				}

				function supportsLocalStorage() {

					try {
						localStorage.setItem('test', 'test');
						localStorage.removeItem('test');
						return true;
					}
					catch( e ) {
						return false;
					}

				}

				function zeroPadInteger( num ) {

					var str = '00' + parseInt( num );
					return str.substring( str.length - 2 );

				}

				/**
				 * Limits the frequency at which a function can be called.
				 */
				function debounce( fn, ms ) {

					var lastTime = 0,
						timeout;

					return function() {

						var args = arguments;
						var context = this;

						clearTimeout( timeout );

						var timeSinceLastCall = Date.now() - lastTime;
						if( timeSinceLastCall > ms ) {
							fn.apply( context, args );
							lastTime = Date.now();
						}
						else {
							timeout = setTimeout( function() {
								fn.apply( context, args );
								lastTime = Date.now();
							}, ms - timeSinceLastCall );
						}

					}

				}

			})();

		<\/script>
	</body>
</html>`;
  function H() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var R = H();
  function st(r) {
    R = r;
  }
  var v = { exec: () => null };
  function d(r, t = "") {
    let n = typeof r == "string" ? r : r.source, s = { replace: (e, a) => {
      let i = typeof a == "string" ? a : a.source;
      return i = i.replace(b.caret, "$1"), n = n.replace(e, i), s;
    }, getRegex: () => new RegExp(n, t) };
    return s;
  }
  var wt = (() => {
    try {
      return !!new RegExp("(?<=1)(?<!1)");
    } catch {
      return false;
    }
  })(), b = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}>`) }, xt = /^(?:[ \t]*(?:\n|$))+/, yt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, St = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, L = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, vt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Z = / {0,3}(?:[*+-]|\d{1,9}[.)])/, it = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, at = d(it).replace(/bull/g, Z).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Tt = d(it).replace(/bull/g, Z).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), U = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Rt = /^[^\n]+/, W = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, At = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", W).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), $t = d(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Z).getRegex(), M = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", j = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Et = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", j).replace("tag", M).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), lt = d(U).replace("hr", L).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", M).getRegex(), zt = d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", lt).getRegex(), J = { blockquote: zt, code: yt, def: At, fences: St, heading: vt, hr: L, html: Et, lheading: at, list: $t, newline: xt, paragraph: lt, table: v, text: Rt }, Y = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", L).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", M).getRegex(), Lt = { ...J, lheading: Tt, table: Y, paragraph: d(U).replace("hr", L).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Y).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", M).getRegex() }, Pt = { ...J, html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", j).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: v, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: d(U).replace("hr", L).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", at).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, It = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ct = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ot = /^( {2,}|\\)\n(?!\s*$)/, _t = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, q = /[\p{P}\p{S}]/u, Q = /[\s\p{P}\p{S}]/u, ct = /[^\s\p{P}\p{S}]/u, Mt = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Q).getRegex(), pt = /(?!~)[\p{P}\p{S}]/u, qt = /(?!~)[\s\p{P}\p{S}]/u, Nt = /(?:[^\s\p{P}\p{S}]|~)/u, ut = /(?![*_])[\p{P}\p{S}]/u, Dt = /(?![*_])[\s\p{P}\p{S}]/u, Bt = /(?:[^\s\p{P}\p{S}]|[*_])/u, Ot = d(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", wt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), ht = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Ht = d(ht, "u").replace(/punct/g, q).getRegex(), Zt = d(ht, "u").replace(/punct/g, pt).getRegex(), dt = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ut = d(dt, "gu").replace(/notPunctSpace/g, ct).replace(/punctSpace/g, Q).replace(/punct/g, q).getRegex(), Wt = d(dt, "gu").replace(/notPunctSpace/g, Nt).replace(/punctSpace/g, qt).replace(/punct/g, pt).getRegex(), jt = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ct).replace(/punctSpace/g, Q).replace(/punct/g, q).getRegex(), Jt = d(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, ut).getRegex(), Qt = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", Kt = d(Qt, "gu").replace(/notPunctSpace/g, Bt).replace(/punctSpace/g, Dt).replace(/punct/g, ut).getRegex(), Gt = d(/\\(punct)/, "gu").replace(/punct/g, q).getRegex(), Vt = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Xt = d(j).replace("(?:-->|$)", "-->").getRegex(), Yt = d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Xt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), I = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Ft = d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", I).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), gt = d(/^!?\[(label)\]\[(ref)\]/).replace("label", I).replace("ref", W).getRegex(), ft = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", W).getRegex(), te = d("reflink|nolink(?!\\()", "g").replace("reflink", gt).replace("nolink", ft).getRegex(), F = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, K = { _backpedal: v, anyPunctuation: Gt, autolink: Vt, blockSkip: Ot, br: ot, code: Ct, del: v, delLDelim: v, delRDelim: v, emStrongLDelim: Ht, emStrongRDelimAst: Ut, emStrongRDelimUnd: jt, escape: It, link: Ft, nolink: ft, punctuation: Mt, reflink: gt, reflinkSearch: te, tag: Yt, text: _t, url: v }, ee = { ...K, link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", I).getRegex(), reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", I).getRegex() }, D = { ...K, emStrongRDelimAst: Wt, emStrongLDelim: Zt, delLDelim: Jt, delRDelim: Kt, url: d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", F).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: d(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", F).getRegex() }, ne = { ...D, br: d(ot).replace("{2,}", "*").getRegex(), text: d(D.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, P = { normal: J, gfm: Lt, pedantic: Pt }, $ = { normal: K, gfm: D, breaks: ne, pedantic: ee }, re = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, tt = (r) => re[r];
  function S(r, t) {
    if (t) {
      if (b.escapeTest.test(r)) return r.replace(b.escapeReplace, tt);
    } else if (b.escapeTestNoEncode.test(r)) return r.replace(b.escapeReplaceNoEncode, tt);
    return r;
  }
  function et(r) {
    try {
      r = encodeURI(r).replace(b.percentDecode, "%");
    } catch {
      return null;
    }
    return r;
  }
  function nt(r, t) {
    let n = r.replace(b.findPipe, (a, i, o) => {
      let l = false, u = i;
      for (; --u >= 0 && o[u] === "\\"; ) l = !l;
      return l ? "|" : " |";
    }), s = n.split(b.splitPipe), e = 0;
    if (s[0].trim() || s.shift(), s.length > 0 && !s.at(-1)?.trim() && s.pop(), t) if (s.length > t) s.splice(t);
    else for (; s.length < t; ) s.push("");
    for (; e < s.length; e++) s[e] = s[e].trim().replace(b.slashPipe, "|");
    return s;
  }
  function E(r, t, n) {
    let s = r.length;
    if (s === 0) return "";
    let e = 0;
    for (; e < s && r.charAt(s - e - 1) === t; )
      e++;
    return r.slice(0, s - e);
  }
  function se(r, t) {
    if (r.indexOf(t[1]) === -1) return -1;
    let n = 0;
    for (let s = 0; s < r.length; s++) if (r[s] === "\\") s++;
    else if (r[s] === t[0]) n++;
    else if (r[s] === t[1] && (n--, n < 0)) return s;
    return n > 0 ? -2 : -1;
  }
  function ie(r, t = 0) {
    let n = t, s = "";
    for (let e of r) if (e === "	") {
      let a = 4 - n % 4;
      s += " ".repeat(a), n += a;
    } else s += e, n++;
    return s;
  }
  function rt(r, t, n, s, e) {
    let a = t.href, i = t.title || null, o = r[1].replace(e.other.outputLinkReplace, "$1");
    s.state.inLink = true;
    let l = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: n, href: a, title: i, text: o, tokens: s.inlineTokens(o) };
    return s.state.inLink = false, l;
  }
  function ae(r, t, n) {
    let s = r.match(n.other.indentCodeCompensation);
    if (s === null) return t;
    let e = s[1];
    return t.split(`
`).map((a) => {
      let i = a.match(n.other.beginningSpace);
      if (i === null) return a;
      let [o] = i;
      return o.length >= e.length ? a.slice(e.length) : a;
    }).join(`
`);
  }
  var C = class {
    options;
    rules;
    lexer;
    constructor(r) {
      this.options = r || R;
    }
    space(r) {
      let t = this.rules.block.newline.exec(r);
      if (t && t[0].length > 0) return { type: "space", raw: t[0] };
    }
    code(r) {
      let t = this.rules.block.code.exec(r);
      if (t) {
        let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : E(n, `
`) };
      }
    }
    fences(r) {
      let t = this.rules.block.fences.exec(r);
      if (t) {
        let n = t[0], s = ae(n, t[3] || "", this.rules);
        return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: s };
      }
    }
    heading(r) {
      let t = this.rules.block.heading.exec(r);
      if (t) {
        let n = t[2].trim();
        if (this.rules.other.endingHash.test(n)) {
          let s = E(n, "#");
          (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
        }
        return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
      }
    }
    hr(r) {
      let t = this.rules.block.hr.exec(r);
      if (t) return { type: "hr", raw: E(t[0], `
`) };
    }
    blockquote(r) {
      let t = this.rules.block.blockquote.exec(r);
      if (t) {
        let n = E(t[0], `
`).split(`
`), s = "", e = "", a = [];
        for (; n.length > 0; ) {
          let i = false, o = [], l;
          for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) o.push(n[l]), i = true;
          else if (!i) o.push(n[l]);
          else break;
          n = n.slice(l);
          let u = o.join(`
`), c = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          s = s ? `${s}
${u}` : u, e = e ? `${e}
${c}` : c;
          let h = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(c, a, true), this.lexer.state.top = h, n.length === 0) break;
          let p = a.at(-1);
          if (p?.type === "code") break;
          if (p?.type === "blockquote") {
            let g = p, f = g.raw + `
` + n.join(`
`), k = this.blockquote(f);
            a[a.length - 1] = k, s = s.substring(0, s.length - g.raw.length) + k.raw, e = e.substring(0, e.length - g.text.length) + k.text;
            break;
          } else if (p?.type === "list") {
            let g = p, f = g.raw + `
` + n.join(`
`), k = this.list(f);
            a[a.length - 1] = k, s = s.substring(0, s.length - p.raw.length) + k.raw, e = e.substring(0, e.length - g.raw.length) + k.raw, n = f.substring(a.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: s, tokens: a, text: e };
      }
    }
    list(r) {
      let t = this.rules.block.list.exec(r);
      if (t) {
        let n = t[1].trim(), s = n.length > 1, e = { type: "list", raw: "", ordered: s, start: s ? +n.slice(0, -1) : "", loose: false, items: [] };
        n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
        let a = this.rules.other.listItemRegex(n), i = false;
        for (; r; ) {
          let l = false, u = "", c = "";
          if (!(t = a.exec(r)) || this.rules.block.hr.test(r)) break;
          u = t[0], r = r.substring(u.length);
          let h = ie(t[2].split(`
`, 1)[0], t[1].length), p = r.split(`
`, 1)[0], g = !h.trim(), f = 0;
          if (this.options.pedantic ? (f = 2, c = h.trimStart()) : g ? f = t[1].length + 1 : (f = h.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = h.slice(f), f += t[1].length), g && this.rules.other.blankLine.test(p) && (u += p + `
`, r = r.substring(p.length + 1), l = true), !l) {
            let k = this.rules.other.nextBulletRegex(f), y = this.rules.other.hrRegex(f), V = this.rules.other.fencesBeginRegex(f), X = this.rules.other.headingBeginRegex(f), mt = this.rules.other.htmlBeginRegex(f), kt = this.rules.other.blockquoteBeginRegex(f);
            for (; r; ) {
              let N = r.split(`
`, 1)[0], A;
              if (p = N, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), A = p) : A = p.replace(this.rules.other.tabCharGlobal, "    "), V.test(p) || X.test(p) || mt.test(p) || kt.test(p) || k.test(p) || y.test(p)) break;
              if (A.search(this.rules.other.nonSpaceChar) >= f || !p.trim()) c += `
` + A.slice(f);
              else {
                if (g || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || V.test(h) || X.test(h) || y.test(h)) break;
                c += `
` + p;
              }
              g = !p.trim(), u += N + `
`, r = r.substring(N.length + 1), h = A.slice(f);
            }
          }
          e.loose || (i ? e.loose = true : this.rules.other.doubleBlankLine.test(u) && (i = true)), e.items.push({ type: "list_item", raw: u, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), e.raw += u;
        }
        let o = e.items.at(-1);
        if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
        else return;
        e.raw = e.raw.trimEnd();
        for (let l of e.items) {
          if (this.lexer.state.top = false, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
            if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
              l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
              for (let c = this.lexer.inlineQueue.length - 1; c >= 0; c--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
                this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
                break;
              }
            }
            let u = this.rules.other.listTaskCheckbox.exec(l.raw);
            if (u) {
              let c = { type: "checkbox", raw: u[0] + " ", checked: u[0] !== "[ ]" };
              l.checked = c.checked, e.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
            }
          }
          if (!e.loose) {
            let u = l.tokens.filter((h) => h.type === "space"), c = u.length > 0 && u.some((h) => this.rules.other.anyLine.test(h.raw));
            e.loose = c;
          }
        }
        if (e.loose) for (let l of e.items) {
          l.loose = true;
          for (let u of l.tokens) u.type === "text" && (u.type = "paragraph");
        }
        return e;
      }
    }
    html(r) {
      let t = this.rules.block.html.exec(r);
      if (t) return { type: "html", block: true, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
    }
    def(r) {
      let t = this.rules.block.def.exec(r);
      if (t) {
        let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", e = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
        return { type: "def", tag: n, raw: t[0], href: s, title: e };
      }
    }
    table(r) {
      let t = this.rules.block.table.exec(r);
      if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
      let n = nt(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), e = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: t[0], header: [], align: [], rows: [] };
      if (n.length === s.length) {
        for (let i of s) this.rules.other.tableAlignRight.test(i) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(i) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(i) ? a.align.push("left") : a.align.push(null);
        for (let i = 0; i < n.length; i++) a.header.push({ text: n[i], tokens: this.lexer.inline(n[i]), header: true, align: a.align[i] });
        for (let i of e) a.rows.push(nt(i, a.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: false, align: a.align[l] })));
        return a;
      }
    }
    lheading(r) {
      let t = this.rules.block.lheading.exec(r);
      if (t) return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) };
    }
    paragraph(r) {
      let t = this.rules.block.paragraph.exec(r);
      if (t) {
        let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
        return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
      }
    }
    text(r) {
      let t = this.rules.block.text.exec(r);
      if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
    }
    escape(r) {
      let t = this.rules.inline.escape.exec(r);
      if (t) return { type: "escape", raw: t[0], text: t[1] };
    }
    tag(r) {
      let t = this.rules.inline.tag.exec(r);
      if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
    }
    link(r) {
      let t = this.rules.inline.link.exec(r);
      if (t) {
        let n = t[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
          if (!this.rules.other.endAngleBracket.test(n)) return;
          let a = E(n.slice(0, -1), "\\");
          if ((n.length - a.length) % 2 === 0) return;
        } else {
          let a = se(t[2], "()");
          if (a === -2) return;
          if (a > -1) {
            let i = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + a;
            t[2] = t[2].substring(0, a), t[0] = t[0].substring(0, i).trim(), t[3] = "";
          }
        }
        let s = t[2], e = "";
        if (this.options.pedantic) {
          let a = this.rules.other.pedanticHrefTitle.exec(s);
          a && (s = a[1], e = a[3]);
        } else e = t[3] ? t[3].slice(1, -1) : "";
        return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), rt(t, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: e && e.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
      }
    }
    reflink(r, t) {
      let n;
      if ((n = this.rules.inline.reflink.exec(r)) || (n = this.rules.inline.nolink.exec(r))) {
        let s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), e = t[s.toLowerCase()];
        if (!e) {
          let a = n[0].charAt(0);
          return { type: "text", raw: a, text: a };
        }
        return rt(n, e, n[0], this.lexer, this.rules);
      }
    }
    emStrong(r, t, n = "") {
      let s = this.rules.inline.emStrongLDelim.exec(r);
      if (!(!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !n || this.rules.inline.punctuation.exec(n))) {
        let e = [...s[0]].length - 1, a, i, o = e, l = 0, u = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (u.lastIndex = 0, t = t.slice(-1 * r.length + e); (s = u.exec(t)) != null; ) {
          if (a = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !a) continue;
          if (i = [...a].length, s[3] || s[4]) {
            o += i;
            continue;
          } else if ((s[5] || s[6]) && e % 3 && !((e + i) % 3)) {
            l += i;
            continue;
          }
          if (o -= i, o > 0) continue;
          i = Math.min(i, i + o + l);
          let c = [...s[0]][0].length, h = r.slice(0, e + s.index + c + i);
          if (Math.min(e, i) % 2) {
            let g = h.slice(1, -1);
            return { type: "em", raw: h, text: g, tokens: this.lexer.inlineTokens(g) };
          }
          let p = h.slice(2, -2);
          return { type: "strong", raw: h, text: p, tokens: this.lexer.inlineTokens(p) };
        }
      }
    }
    codespan(r) {
      let t = this.rules.inline.code.exec(r);
      if (t) {
        let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), e = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
        return s && e && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
      }
    }
    br(r) {
      let t = this.rules.inline.br.exec(r);
      if (t) return { type: "br", raw: t[0] };
    }
    del(r, t, n = "") {
      let s = this.rules.inline.delLDelim.exec(r);
      if (s && (!s[1] || !n || this.rules.inline.punctuation.exec(n))) {
        let e = [...s[0]].length - 1, a, i, o = e, l = this.rules.inline.delRDelim;
        for (l.lastIndex = 0, t = t.slice(-1 * r.length + e); (s = l.exec(t)) != null; ) {
          if (a = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !a || (i = [...a].length, i !== e)) continue;
          if (s[3] || s[4]) {
            o += i;
            continue;
          }
          if (o -= i, o > 0) continue;
          i = Math.min(i, i + o);
          let u = [...s[0]][0].length, c = r.slice(0, e + s.index + u + i), h = c.slice(e, -e);
          return { type: "del", raw: c, text: h, tokens: this.lexer.inlineTokens(h) };
        }
      }
    }
    autolink(r) {
      let t = this.rules.inline.autolink.exec(r);
      if (t) {
        let n, s;
        return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), { type: "link", raw: t[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    url(r) {
      let t;
      if (t = this.rules.inline.url.exec(r)) {
        let n, s;
        if (t[2] === "@") n = t[0], s = "mailto:" + n;
        else {
          let e;
          do
            e = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
          while (e !== t[0]);
          n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
        }
        return { type: "link", raw: t[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    inlineText(r) {
      let t = this.rules.inline.text.exec(r);
      if (t) {
        let n = this.lexer.state.inRawBlock;
        return { type: "text", raw: t[0], text: t[0], escaped: n };
      }
    }
  }, w = class B {
    tokens;
    options;
    state;
    inlineQueue;
    tokenizer;
    constructor(t) {
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || R, this.options.tokenizer = this.options.tokenizer || new C(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      let n = { other: b, block: P.normal, inline: $.normal };
      this.options.pedantic ? (n.block = P.pedantic, n.inline = $.pedantic) : this.options.gfm && (n.block = P.gfm, this.options.breaks ? n.inline = $.breaks : n.inline = $.gfm), this.tokenizer.rules = n;
    }
    static get rules() {
      return { block: P, inline: $ };
    }
    static lex(t, n) {
      return new B(n).lex(t);
    }
    static lexInline(t, n) {
      return new B(n).inlineTokens(t);
    }
    lex(t) {
      t = t.replace(b.carriageReturn, `
`), this.blockTokens(t, this.tokens);
      for (let n = 0; n < this.inlineQueue.length; n++) {
        let s = this.inlineQueue[n];
        this.inlineTokens(s.src, s.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(t, n = [], s = false) {
      for (this.options.pedantic && (t = t.replace(b.tabCharGlobal, "    ").replace(b.spaceLine, "")); t; ) {
        let e;
        if (this.options.extensions?.block?.some((i) => (e = i.call({ lexer: this }, t, n)) ? (t = t.substring(e.raw.length), n.push(e), true) : false)) continue;
        if (e = this.tokenizer.space(t)) {
          t = t.substring(e.raw.length);
          let i = n.at(-1);
          e.raw.length === 1 && i !== void 0 ? i.raw += `
` : n.push(e);
          continue;
        }
        if (e = this.tokenizer.code(t)) {
          t = t.substring(e.raw.length);
          let i = n.at(-1);
          i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + e.raw, i.text += `
` + e.text, this.inlineQueue.at(-1).src = i.text) : n.push(e);
          continue;
        }
        if (e = this.tokenizer.fences(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.heading(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.hr(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.blockquote(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.list(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.html(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.def(t)) {
          t = t.substring(e.raw.length);
          let i = n.at(-1);
          i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + e.raw, i.text += `
` + e.raw, this.inlineQueue.at(-1).src = i.text) : this.tokens.links[e.tag] || (this.tokens.links[e.tag] = { href: e.href, title: e.title }, n.push(e));
          continue;
        }
        if (e = this.tokenizer.table(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        if (e = this.tokenizer.lheading(t)) {
          t = t.substring(e.raw.length), n.push(e);
          continue;
        }
        let a = t;
        if (this.options.extensions?.startBlock) {
          let i = 1 / 0, o = t.slice(1), l;
          this.options.extensions.startBlock.forEach((u) => {
            l = u.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (i = Math.min(i, l));
          }), i < 1 / 0 && i >= 0 && (a = t.substring(0, i + 1));
        }
        if (this.state.top && (e = this.tokenizer.paragraph(a))) {
          let i = n.at(-1);
          s && i?.type === "paragraph" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + e.raw, i.text += `
` + e.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : n.push(e), s = a.length !== t.length, t = t.substring(e.raw.length);
          continue;
        }
        if (e = this.tokenizer.text(t)) {
          t = t.substring(e.raw.length);
          let i = n.at(-1);
          i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + e.raw, i.text += `
` + e.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : n.push(e);
          continue;
        }
        if (t) {
          let i = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(i);
            break;
          } else throw new Error(i);
        }
      }
      return this.state.top = true, n;
    }
    inline(t, n = []) {
      return this.inlineQueue.push({ src: t, tokens: n }), n;
    }
    inlineTokens(t, n = []) {
      let s = t, e = null;
      if (this.tokens.links) {
        let l = Object.keys(this.tokens.links);
        if (l.length > 0) for (; (e = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; ) l.includes(e[0].slice(e[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, e.index) + "[" + "a".repeat(e[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (e = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; ) s = s.slice(0, e.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      let a;
      for (; (e = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; ) a = e[2] ? e[2].length : 0, s = s.slice(0, e.index + a) + "[" + "a".repeat(e[0].length - a - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      s = this.options.hooks?.emStrongMask?.call({ lexer: this }, s) ?? s;
      let i = false, o = "";
      for (; t; ) {
        i || (o = ""), i = false;
        let l;
        if (this.options.extensions?.inline?.some((c) => (l = c.call({ lexer: this }, t, n)) ? (t = t.substring(l.raw.length), n.push(l), true) : false)) continue;
        if (l = this.tokenizer.escape(t)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.tag(t)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.link(t)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.reflink(t, this.tokens.links)) {
          t = t.substring(l.raw.length);
          let c = n.at(-1);
          l.type === "text" && c?.type === "text" ? (c.raw += l.raw, c.text += l.text) : n.push(l);
          continue;
        }
        if (l = this.tokenizer.emStrong(t, s, o)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.codespan(t)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.br(t)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.del(t, s, o)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (l = this.tokenizer.autolink(t)) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        if (!this.state.inLink && (l = this.tokenizer.url(t))) {
          t = t.substring(l.raw.length), n.push(l);
          continue;
        }
        let u = t;
        if (this.options.extensions?.startInline) {
          let c = 1 / 0, h = t.slice(1), p;
          this.options.extensions.startInline.forEach((g) => {
            p = g.call({ lexer: this }, h), typeof p == "number" && p >= 0 && (c = Math.min(c, p));
          }), c < 1 / 0 && c >= 0 && (u = t.substring(0, c + 1));
        }
        if (l = this.tokenizer.inlineText(u)) {
          t = t.substring(l.raw.length), l.raw.slice(-1) !== "_" && (o = l.raw.slice(-1)), i = true;
          let c = n.at(-1);
          c?.type === "text" ? (c.raw += l.raw, c.text += l.text) : n.push(l);
          continue;
        }
        if (t) {
          let c = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(c);
            break;
          } else throw new Error(c);
        }
      }
      return n;
    }
  }, _ = class {
    options;
    parser;
    constructor(r) {
      this.options = r || R;
    }
    space(r) {
      return "";
    }
    code({ text: r, lang: t, escaped: n }) {
      let s = (t || "").match(b.notSpaceStart)?.[0], e = r.replace(b.endingNewline, "") + `
`;
      return s ? '<pre><code class="language-' + S(s) + '">' + (n ? e : S(e, true)) + `</code></pre>
` : "<pre><code>" + (n ? e : S(e, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: r }) {
      return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
    }
    html({ text: r }) {
      return r;
    }
    def(r) {
      return "";
    }
    heading({ tokens: r, depth: t }) {
      return `<h${t}>${this.parser.parseInline(r)}</h${t}>
`;
    }
    hr(r) {
      return `<hr>
`;
    }
    list(r) {
      let t = r.ordered, n = r.start, s = "";
      for (let i = 0; i < r.items.length; i++) {
        let o = r.items[i];
        s += this.listitem(o);
      }
      let e = t ? "ol" : "ul", a = t && n !== 1 ? ' start="' + n + '"' : "";
      return "<" + e + a + `>
` + s + "</" + e + `>
`;
    }
    listitem(r) {
      return `<li>${this.parser.parse(r.tokens)}</li>
`;
    }
    checkbox({ checked: r }) {
      return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
    }
    paragraph({ tokens: r }) {
      return `<p>${this.parser.parseInline(r)}</p>
`;
    }
    table(r) {
      let t = "", n = "";
      for (let e = 0; e < r.header.length; e++) n += this.tablecell(r.header[e]);
      t += this.tablerow({ text: n });
      let s = "";
      for (let e = 0; e < r.rows.length; e++) {
        let a = r.rows[e];
        n = "";
        for (let i = 0; i < a.length; i++) n += this.tablecell(a[i]);
        s += this.tablerow({ text: n });
      }
      return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
    }
    tablerow({ text: r }) {
      return `<tr>
${r}</tr>
`;
    }
    tablecell(r) {
      let t = this.parser.parseInline(r.tokens), n = r.header ? "th" : "td";
      return (r.align ? `<${n} align="${r.align}">` : `<${n}>`) + t + `</${n}>
`;
    }
    strong({ tokens: r }) {
      return `<strong>${this.parser.parseInline(r)}</strong>`;
    }
    em({ tokens: r }) {
      return `<em>${this.parser.parseInline(r)}</em>`;
    }
    codespan({ text: r }) {
      return `<code>${S(r, true)}</code>`;
    }
    br(r) {
      return "<br>";
    }
    del({ tokens: r }) {
      return `<del>${this.parser.parseInline(r)}</del>`;
    }
    link({ href: r, title: t, tokens: n }) {
      let s = this.parser.parseInline(n), e = et(r);
      if (e === null) return s;
      r = e;
      let a = '<a href="' + r + '"';
      return t && (a += ' title="' + S(t) + '"'), a += ">" + s + "</a>", a;
    }
    image({ href: r, title: t, text: n, tokens: s }) {
      s && (n = this.parser.parseInline(s, this.parser.textRenderer));
      let e = et(r);
      if (e === null) return S(n);
      r = e;
      let a = `<img src="${r}" alt="${S(n)}"`;
      return t && (a += ` title="${S(t)}"`), a += ">", a;
    }
    text(r) {
      return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : S(r.text);
    }
  }, G = class {
    strong({ text: r }) {
      return r;
    }
    em({ text: r }) {
      return r;
    }
    codespan({ text: r }) {
      return r;
    }
    del({ text: r }) {
      return r;
    }
    html({ text: r }) {
      return r;
    }
    text({ text: r }) {
      return r;
    }
    link({ text: r }) {
      return "" + r;
    }
    image({ text: r }) {
      return "" + r;
    }
    br() {
      return "";
    }
    checkbox({ raw: r }) {
      return r;
    }
  }, x = class O {
    options;
    renderer;
    textRenderer;
    constructor(t) {
      this.options = t || R, this.options.renderer = this.options.renderer || new _(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new G();
    }
    static parse(t, n) {
      return new O(n).parse(t);
    }
    static parseInline(t, n) {
      return new O(n).parseInline(t);
    }
    parse(t) {
      let n = "";
      for (let s = 0; s < t.length; s++) {
        let e = t[s];
        if (this.options.extensions?.renderers?.[e.type]) {
          let i = e, o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
          if (o !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(i.type)) {
            n += o || "";
            continue;
          }
        }
        let a = e;
        switch (a.type) {
          case "space": {
            n += this.renderer.space(a);
            break;
          }
          case "hr": {
            n += this.renderer.hr(a);
            break;
          }
          case "heading": {
            n += this.renderer.heading(a);
            break;
          }
          case "code": {
            n += this.renderer.code(a);
            break;
          }
          case "table": {
            n += this.renderer.table(a);
            break;
          }
          case "blockquote": {
            n += this.renderer.blockquote(a);
            break;
          }
          case "list": {
            n += this.renderer.list(a);
            break;
          }
          case "checkbox": {
            n += this.renderer.checkbox(a);
            break;
          }
          case "html": {
            n += this.renderer.html(a);
            break;
          }
          case "def": {
            n += this.renderer.def(a);
            break;
          }
          case "paragraph": {
            n += this.renderer.paragraph(a);
            break;
          }
          case "text": {
            n += this.renderer.text(a);
            break;
          }
          default: {
            let i = 'Token with "' + a.type + '" type was not found.';
            if (this.options.silent) return console.error(i), "";
            throw new Error(i);
          }
        }
      }
      return n;
    }
    parseInline(t, n = this.renderer) {
      let s = "";
      for (let e = 0; e < t.length; e++) {
        let a = t[e];
        if (this.options.extensions?.renderers?.[a.type]) {
          let o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
          if (o !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
            s += o || "";
            continue;
          }
        }
        let i = a;
        switch (i.type) {
          case "escape": {
            s += n.text(i);
            break;
          }
          case "html": {
            s += n.html(i);
            break;
          }
          case "link": {
            s += n.link(i);
            break;
          }
          case "image": {
            s += n.image(i);
            break;
          }
          case "checkbox": {
            s += n.checkbox(i);
            break;
          }
          case "strong": {
            s += n.strong(i);
            break;
          }
          case "em": {
            s += n.em(i);
            break;
          }
          case "codespan": {
            s += n.codespan(i);
            break;
          }
          case "br": {
            s += n.br(i);
            break;
          }
          case "del": {
            s += n.del(i);
            break;
          }
          case "text": {
            s += n.text(i);
            break;
          }
          default: {
            let o = 'Token with "' + i.type + '" type was not found.';
            if (this.options.silent) return console.error(o), "";
            throw new Error(o);
          }
        }
      }
      return s;
    }
  }, z = class {
    options;
    block;
    constructor(r) {
      this.options = r || R;
    }
    static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
    static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
    preprocess(r) {
      return r;
    }
    postprocess(r) {
      return r;
    }
    processAllTokens(r) {
      return r;
    }
    emStrongMask(r) {
      return r;
    }
    provideLexer() {
      return this.block ? w.lex : w.lexInline;
    }
    provideParser() {
      return this.block ? x.parse : x.parseInline;
    }
  }, le = class {
    defaults = H();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = x;
    Renderer = _;
    TextRenderer = G;
    Lexer = w;
    Tokenizer = C;
    Hooks = z;
    constructor(...r) {
      this.use(...r);
    }
    walkTokens(r, t) {
      let n = [];
      for (let s of r) switch (n = n.concat(t.call(this, s)), s.type) {
        case "table": {
          let e = s;
          for (let a of e.header) n = n.concat(this.walkTokens(a.tokens, t));
          for (let a of e.rows) for (let i of a) n = n.concat(this.walkTokens(i.tokens, t));
          break;
        }
        case "list": {
          let e = s;
          n = n.concat(this.walkTokens(e.items, t));
          break;
        }
        default: {
          let e = s;
          this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((a) => {
            let i = e[a].flat(1 / 0);
            n = n.concat(this.walkTokens(i, t));
          }) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
        }
      }
      return n;
    }
    use(...r) {
      let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return r.forEach((n) => {
        let s = { ...n };
        if (s.async = this.defaults.async || s.async || false, n.extensions && (n.extensions.forEach((e) => {
          if (!e.name) throw new Error("extension name required");
          if ("renderer" in e) {
            let a = t.renderers[e.name];
            a ? t.renderers[e.name] = function(...i) {
              let o = e.renderer.apply(this, i);
              return o === false && (o = a.apply(this, i)), o;
            } : t.renderers[e.name] = e.renderer;
          }
          if ("tokenizer" in e) {
            if (!e.level || e.level !== "block" && e.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
            let a = t[e.level];
            a ? a.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
          }
          "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
        }), s.extensions = t), n.renderer) {
          let e = this.defaults.renderer || new _(this.defaults);
          for (let a in n.renderer) {
            if (!(a in e)) throw new Error(`renderer '${a}' does not exist`);
            if (["options", "parser"].includes(a)) continue;
            let i = a, o = n.renderer[i], l = e[i];
            e[i] = (...u) => {
              let c = o.apply(e, u);
              return c === false && (c = l.apply(e, u)), c || "";
            };
          }
          s.renderer = e;
        }
        if (n.tokenizer) {
          let e = this.defaults.tokenizer || new C(this.defaults);
          for (let a in n.tokenizer) {
            if (!(a in e)) throw new Error(`tokenizer '${a}' does not exist`);
            if (["options", "rules", "lexer"].includes(a)) continue;
            let i = a, o = n.tokenizer[i], l = e[i];
            e[i] = (...u) => {
              let c = o.apply(e, u);
              return c === false && (c = l.apply(e, u)), c;
            };
          }
          s.tokenizer = e;
        }
        if (n.hooks) {
          let e = this.defaults.hooks || new z();
          for (let a in n.hooks) {
            if (!(a in e)) throw new Error(`hook '${a}' does not exist`);
            if (["options", "block"].includes(a)) continue;
            let i = a, o = n.hooks[i], l = e[i];
            z.passThroughHooks.has(a) ? e[i] = (u) => {
              if (this.defaults.async && z.passThroughHooksRespectAsync.has(a)) return (async () => {
                let h = await o.call(e, u);
                return l.call(e, h);
              })();
              let c = o.call(e, u);
              return l.call(e, c);
            } : e[i] = (...u) => {
              if (this.defaults.async) return (async () => {
                let h = await o.apply(e, u);
                return h === false && (h = await l.apply(e, u)), h;
              })();
              let c = o.apply(e, u);
              return c === false && (c = l.apply(e, u)), c;
            };
          }
          s.hooks = e;
        }
        if (n.walkTokens) {
          let e = this.defaults.walkTokens, a = n.walkTokens;
          s.walkTokens = function(i) {
            let o = [];
            return o.push(a.call(this, i)), e && (o = o.concat(e.call(this, i))), o;
          };
        }
        this.defaults = { ...this.defaults, ...s };
      }), this;
    }
    setOptions(r) {
      return this.defaults = { ...this.defaults, ...r }, this;
    }
    lexer(r, t) {
      return w.lex(r, t ?? this.defaults);
    }
    parser(r, t) {
      return x.parse(r, t ?? this.defaults);
    }
    parseMarkdown(r) {
      return (t, n) => {
        let s = { ...n }, e = { ...this.defaults, ...s }, a = this.onError(!!e.silent, !!e.async);
        if (this.defaults.async === true && s.async === false) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof t > "u" || t === null) return a(new Error("marked(): input parameter is undefined or null"));
        if (typeof t != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
        if (e.hooks && (e.hooks.options = e, e.hooks.block = r), e.async) return (async () => {
          let i = e.hooks ? await e.hooks.preprocess(t) : t, o = await (e.hooks ? await e.hooks.provideLexer() : r ? w.lex : w.lexInline)(i, e), l = e.hooks ? await e.hooks.processAllTokens(o) : o;
          e.walkTokens && await Promise.all(this.walkTokens(l, e.walkTokens));
          let u = await (e.hooks ? await e.hooks.provideParser() : r ? x.parse : x.parseInline)(l, e);
          return e.hooks ? await e.hooks.postprocess(u) : u;
        })().catch(a);
        try {
          e.hooks && (t = e.hooks.preprocess(t));
          let i = (e.hooks ? e.hooks.provideLexer() : r ? w.lex : w.lexInline)(t, e);
          e.hooks && (i = e.hooks.processAllTokens(i)), e.walkTokens && this.walkTokens(i, e.walkTokens);
          let o = (e.hooks ? e.hooks.provideParser() : r ? x.parse : x.parseInline)(i, e);
          return e.hooks && (o = e.hooks.postprocess(o)), o;
        } catch (i) {
          return a(i);
        }
      };
    }
    onError(r, t) {
      return (n) => {
        if (n.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
          let s = "<p>An error occurred:</p><pre>" + S(n.message + "", true) + "</pre>";
          return t ? Promise.resolve(s) : s;
        }
        if (t) return Promise.reject(n);
        throw n;
      };
    }
  }, T = new le();
  function m(r, t) {
    return T.parse(r, t);
  }
  m.options = m.setOptions = function(r) {
    return T.setOptions(r), m.defaults = T.defaults, st(m.defaults), m;
  };
  m.getDefaults = H;
  m.defaults = R;
  m.use = function(...r) {
    return T.use(...r), m.defaults = T.defaults, st(m.defaults), m;
  };
  m.walkTokens = function(r, t) {
    return T.walkTokens(r, t);
  };
  m.parseInline = T.parseInline;
  m.Parser = x;
  m.parser = x.parse;
  m.Renderer = _;
  m.TextRenderer = G;
  m.Lexer = w;
  m.lexer = w.lex;
  m.Tokenizer = C;
  m.Hooks = z;
  m.parse = m;
  m.options;
  m.setOptions;
  m.use;
  m.walkTokens;
  m.parseInline;
  x.parse;
  w.lex;
  const oe = () => {
    let r, t = null, n;
    function s() {
      if (t && !t.closed)
        t.focus();
      else {
        if (t = window.open("about:blank", "reveal.js - Notes", "width=1100,height=700"), t.marked = m, t.document.write(bt), !t) {
          alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");
          return;
        }
        a();
      }
    }
    function e(h) {
      t && !t.closed ? t.focus() : (t = h, window.addEventListener("message", u), c());
    }
    function a() {
      const h = n.getConfig().url, p = typeof h == "string" ? h : window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
      r = setInterval(function() {
        t.postMessage(JSON.stringify({
          namespace: "reveal-notes",
          type: "connect",
          state: n.getState(),
          url: p
        }), "*");
      }, 500), window.addEventListener("message", u);
    }
    function i(h, p, g) {
      let f = n[h].apply(n, p);
      t.postMessage(JSON.stringify({
        namespace: "reveal-notes",
        type: "return",
        result: f,
        callId: g
      }), "*");
    }
    function o(h) {
      let p = n.getCurrentSlide(), g = p.querySelectorAll("aside.notes"), f = p.querySelector(".current-fragment"), k = {
        namespace: "reveal-notes",
        type: "state",
        notes: "",
        markdown: false,
        whitespace: "normal",
        state: n.getState()
      };
      if (p.hasAttribute("data-notes") && (k.notes = p.getAttribute("data-notes"), k.whitespace = "pre-wrap"), f) {
        let y = f.querySelector("aside.notes");
        y ? (k.notes = y.innerHTML, k.markdown = typeof y.getAttribute("data-markdown") == "string", g = null) : f.hasAttribute("data-notes") && (k.notes = f.getAttribute("data-notes"), k.whitespace = "pre-wrap", g = null);
      }
      g && g.length && (g = Array.from(g).filter((y) => y.closest(".fragment") === null), k.notes = g.map((y) => y.innerHTML).join(`
`), k.markdown = g[0] && typeof g[0].getAttribute("data-markdown") == "string"), t.postMessage(JSON.stringify(k), "*");
    }
    function l(h) {
      try {
        return window.location.origin === h.source.location.origin;
      } catch {
        return false;
      }
    }
    function u(h) {
      if (l(h))
        try {
          let p = JSON.parse(h.data);
          p && p.namespace === "reveal-notes" && p.type === "connected" ? (clearInterval(r), c()) : p && p.namespace === "reveal-notes" && p.type === "call" && i(p.methodName, p.arguments, p.callId);
        } catch {
        }
    }
    function c() {
      n.on("slidechanged", o), n.on("fragmentshown", o), n.on("fragmenthidden", o), n.on("overviewhidden", o), n.on("overviewshown", o), n.on("paused", o), n.on("resumed", o), n.on("previewiframe", o), n.on("previewimage", o), n.on("previewvideo", o), n.on("closeoverlay", o), o();
    }
    return {
      id: "notes",
      init: function(h) {
        n = h, /receiver/i.test(window.location.search) || (window.location.search.match(/(\?|\&)notes/gi) !== null ? s() : window.addEventListener("message", (p) => {
          if (!t && typeof p.data == "string") {
            let g;
            try {
              g = JSON.parse(p.data);
            } catch {
            }
            g && g.namespace === "reveal-notes" && g.type === "heartbeat" && e(p.source);
          }
        }), n.addKeyBinding({ keyCode: 83, key: "S", description: "Speaker notes view" }, function() {
          s();
        }));
      },
      open: s
    };
  }, ce = oe;

  /*****************************************************************
   ** Author: Asvin Goel, goel@telematique.eu
   **
   ** A plugin for reveal.js adding a chalkboard.
   **
   ** Version: 2.3.3
   **
   ** License: MIT license (see LICENSE.md)
   **
   ** Credits:
   ** Chalkboard effect by Mohamed Moustafa https://github.com/mmoustafa/Chalkboard
   ** Multi color support initially added by Kurt Rinnert https://github.com/rinnert
   ** Compatibility with reveal.js v4 by Hakim El Hattab https://github.com/hakimel
   ******************************************************************/


  window.RevealChalkboard = window.RevealChalkboard || {
  	id: 'RevealChalkboard',
  	init: function ( deck ) {
  		initChalkboard.call(this, deck );
  	},
  	configure: function ( config ) {
  		configure( config );
  	},
  	toggleNotesCanvas: function () {
  		toggleNotesCanvas();
  	},
  	toggleChalkboard: function () {
  		toggleChalkboard();
  	},
  	colorIndex: function () {
  		colorIndex();
  	},
  	colorNext: function () {
  		colorNext();
  	},
  	colorPrev: function () {
  		colorPrev();
  	},
  	clear: function () {
  		clear();
  	},
  	reset: function () {
  		reset();
  	},
  	resetAll: function () {
  		resetAll();
  	},
  	updateStorage: function () {
  		updateStorage();
  	},
  	getData: function () {
  		return getData();
  	},
  	download: function () {
  		download();
  	},
  };

  function scriptPath() {
  	// obtain plugin path from the script element
  	var src;
  	if ( document.currentScript ) {
  		src = document.currentScript.src;
  	} else {
  		var bundleSel = document.querySelector( 'script[src$="/dist/syncdeck-reveal.js"], script[src$="dist/syncdeck-reveal.js"]' );
  		if ( bundleSel ) {
  			src = bundleSel.src;
  		} else {
  			var sel = document.querySelector( 'script[src$="/chalkboard/chalkboard.js"], script[src$="chalkboard/chalkboard.js"], script[src$="/chalkboard/plugin.js"]' );
  			if ( sel ) {
  				src = sel.src;
  			}
  		}
  	}
  	if ( src && /\/dist\/syncdeck-reveal\.js(?:[?#].*)?$/.test( src ) ) {
  		return src.replace( /\/dist\/syncdeck-reveal\.js(?:[?#].*)?$/, '/chalkboard/' );
  	}
  	var path = ( src === undefined ) ? "" : src.slice( 0, src.lastIndexOf( "/" ) + 1 );
  //console.log("Path: " + path);
  	return path;
  }
  var path = scriptPath();

  const initChalkboard = function ( Reveal ) {
  //console.warn(path);
  	/* Feature detection for passive event handling*/
  	var passiveSupported = false;

  	try {
  		window.addEventListener( 'test', null, Object.defineProperty( {}, 'passive', {
  			get: function () {
  				passiveSupported = true;
  			}
  		} ) );
  	} catch ( err ) {}


  /*****************************************************************
   ** Configuration
   ******************************************************************/
  	var background, pens, draw, color;
  	var grid = false;
  	var boardmarkerWidth = 3;
  	var chalkWidth = 7;
  	var chalkEffect = 1.0;
  	var rememberColor = [ true, false ];
  	var eraser = {
  		src: path + 'img/sponge.png',
  		radius: 20
  	};
  	var boardmarkers = [ {
  			color: 'rgba(100,100,100,1)',
  			cursor: 'url(' + path + 'img/boardmarker-black.png), auto'
  		},
  		{
  			color: 'rgba(30,144,255, 1)',
  			cursor: 'url(' + path + 'img/boardmarker-blue.png), auto'
  		},
  		{
  			color: 'rgba(220,20,60,1)',
  			cursor: 'url(' + path + 'img/boardmarker-red.png), auto'
  		},
  		{
  			color: 'rgba(50,205,50,1)',
  			cursor: 'url(' + path + 'img/boardmarker-green.png), auto'
  		},
  		{
  			color: 'rgba(255,140,0,1)',
  			cursor: 'url(' + path + 'img/boardmarker-orange.png), auto'
  		},
  		{
  			color: 'rgba(150,0,20150,1)',
  			cursor: 'url(' + path + 'img/boardmarker-purple.png), auto'
  		},
  		{
  			color: 'rgba(255,220,0,1)',
  			cursor: 'url(' + path + 'img/boardmarker-yellow.png), auto'
  		}
  	];
  	var chalks = [ {
  			color: 'rgba(255,255,255,0.5)',
  			cursor: 'url(' + path + 'img/chalk-white.png), auto'
  		},
  		{
  			color: 'rgba(96, 154, 244, 0.5)',
  			cursor: 'url(' + path + 'img/chalk-blue.png), auto'
  		},
  		{
  			color: 'rgba(237, 20, 28, 0.5)',
  			cursor: 'url(' + path + 'img/chalk-red.png), auto'
  		},
  		{
  			color: 'rgba(20, 237, 28, 0.5)',
  			cursor: 'url(' + path + 'img/chalk-green.png), auto'
  		},
  		{
  			color: 'rgba(220, 133, 41, 0.5)',
  			cursor: 'url(' + path + 'img/chalk-orange.png), auto'
  		},
  		{
  			color: 'rgba(220,0,220,0.5)',
  			cursor: 'url(' + path + 'img/chalk-purple.png), auto'
  		},
  		{
  			color: 'rgba(255,220,0,0.5)',
  			cursor: 'url(' + path + 'img/chalk-yellow.png), auto'
  		}
  	];

    var sponge = 		{
  		cursor: 'url(' + path + 'img/sponge.png), auto'
  	};


  	var keyBindings = {
  		toggleNotesCanvas: {
  			keyCode: 67,
  			key: 'C',
  			description: 'Toggle notes canvas'
  		},
  		toggleChalkboard: {
  			keyCode: 66,
  			key: 'B',
  			description: 'Toggle chalkboard'
  		},
  		clear: {
  			keyCode: 46,
  			key: 'DEL',
  			description: 'Clear drawings on slide'
  		},
  /*
  		reset: {
  			keyCode: 173,
  			key: '-',
  			description: 'Reset drawings on slide'
  		},
  */
  		resetAll: {
  			keyCode: 8,
  			key: 'BACKSPACE',
  			description: 'Reset all drawings'
  		},
  		colorNext: {
  			keyCode: 88,
  			key: 'X',
  			description: 'Next color'
  		},
  		colorPrev: {
  			keyCode: 89,
  			key: 'Y',
  			description: 'Previous color'
  		},
  		download: {
  			keyCode: 68,
  			key: 'D',
  			description: 'Download drawings'
  		}
  	};


  	var theme = 'chalkboard';
  	var color = [ 0, 0 ];
  	var colorButtons = true;
  	var boardHandle = true;
  	var transition = 800;

  	var readOnly = false;
  	var messageType = 'broadcast';

  	var config = configure( Reveal.getConfig().chalkboard || {} );
  	if ( config.keyBindings ) {
  		for ( var key in config.keyBindings ) {
  			keyBindings[ key ] = config.keyBindings[ key ];
  		}	}

  	function configure( config ) {

  		if ( config.boardmarkerWidth || config.penWidth ) boardmarkerWidth = config.boardmarkerWidth || config.penWidth;
  		if ( config.chalkWidth ) chalkWidth = config.chalkWidth;
  		if ( config.chalkEffect ) chalkEffect = config.chalkEffect;
  		if ( config.rememberColor ) rememberColor = config.rememberColor;
  		if ( config.eraser ) eraser = config.eraser;
  		if ( config.boardmarkers ) boardmarkers = config.boardmarkers;
  		if ( config.chalks ) chalks = config.chalks;

  		if ( config.theme ) theme = config.theme;
  		switch ( theme ) {
  		case 'whiteboard':
  			background = [ 'rgba(127,127,127,.1)', path + 'img/whiteboard.png' ];
  			draw = [ drawWithBoardmarker, drawWithBoardmarker ];
  			pens = [ boardmarkers, boardmarkers ];
  			grid = {
  				color: 'rgb(127,127,255,0.1)',
  				distance: 40,
  				width: 2
  			};
  			break;
  		case 'chalkboard':
  		default:
  			background = [ 'rgba(127,127,127,.1)', path + 'img/blackboard.png' ];
  			draw = [ drawWithBoardmarker, drawWithChalk ];
  			pens = [ boardmarkers, chalks ];
  			grid = {
  				color: 'rgb(50,50,10,0.5)',
  				distance: 80,
  				width: 2
  			};
  		}

  		if ( config.background ) background = config.background;
  		if ( config.grid != undefined ) grid = config.grid;

  		if ( config.toggleChalkboardButton != undefined ) config.toggleChalkboardButton;
  		if ( config.toggleNotesButton != undefined ) config.toggleNotesButton;
  		if ( config.colorButtons != undefined ) colorButtons = config.colorButtons;
  		if ( config.boardHandle != undefined ) boardHandle = config.boardHandle;
  		if ( config.transition ) transition = config.transition;

  		if ( config.readOnly != undefined ) readOnly = config.readOnly;
  		if ( config.messageType ) messageType = config.messageType;

  		if ( drawingCanvas && ( config.theme || config.background || config.grid ) ) {
  			var canvas = document.getElementById( drawingCanvas[ 1 ].id );
  			canvas.style.background = 'url("' + background[ 1 ] + '") repeat';
  			clearCanvas( 1 );
  			drawGrid();
  		}

  		return config;
  	}
  /*****************************************************************
   ** Setup
   ******************************************************************/

  	function whenReady( callback ) {
  		// wait for markdown to be parsed and code to be highlighted
  		if ( !document.querySelector( 'section[data-markdown]:not([data-markdown-parsed])' ) 
  			   && !document.querySelector( '[data-load]:not([data-loaded])') 
  		     && !document.querySelector( 'code[data-line-numbers*="|"]') 	
  		) {
  			callback();
  		} else {
  			console.log( "Wait for external sources to be loaded and code to be highlighted" );
  			setTimeout( whenReady, 500, callback );
  		}
  	}

  	function whenLoaded( callback ) {
  		// wait for drawings to be loaded and markdown to be parsed
  		if ( loaded !== null ) {
  			callback();
  		} else {
  			console.log( "Wait for drawings to be loaded" );
  			setTimeout( whenLoaded, 500, callback );
  		}
  	}

  	var drawingCanvas = [ {
  		id: 'notescanvas'
  	}, {
  		id: 'chalkboard'
  	} ];
  	setupDrawingCanvas( 0 );
  	setupDrawingCanvas( 1 );

  	var mode = 0; // 0: notes canvas, 1: chalkboard
  	var board = 0; // board index (only for chalkboard)

  	var mouseX = 0;
  	var mouseY = 0;
  	var lastX = null;
  	var lastY = null;

  	var drawing = false;
  	var erasing = false;

  	var slideStart = Date.now();
  	var slideIndices = {
  		h: 0,
  		v: 0
  	};

  	var timeouts = [
  		[],
  		[]
  	];
  	var slidechangeTimeout = null;
  	var pendingTransitionEnd = null; // { el, fn } — cleaned up by clearCanvas(0)
  	var updateStorageTimeout = null;
  	var playback = false;

    function changeCursor( element, tool ) {
      element.style.cursor = tool.cursor;
      var palette = document.querySelector('.palette[data-mode="' + mode + '"]');
      if ( palette ) {
        palette.style.cursor = tool.cursor;
      }
    }

  	function createPalette( colors, length ) {
  		if ( length === true || length > colors.length ) {
  			length = colors.length;
  		}
  		var palette = document.createElement( 'div' );
  		palette.classList.add( 'palette' );
  		var list = document.createElement( 'ul' );
  		// color pickers
  		for ( var i = 0; i < length; i++ ) {
  			var colorButton = document.createElement( 'li' );
  			colorButton.setAttribute( 'data-color', i );
  			colorButton.innerHTML = '<i class="fa fa-square"></i>';
  			colorButton.style.color = colors[ i ].color;
  			colorButton.addEventListener( 'click', function ( e ) {
  				var element = e.target;
  				while ( !element.hasAttribute( 'data-color' ) ) {
  					element = element.parentElement;
  				}
  				colorIndex( parseInt( element.getAttribute( 'data-color' ) ) );
  			} );
  			colorButton.addEventListener( 'touchstart', function ( e ) {
  				var element = e.target;
  				while ( !element.hasAttribute( 'data-color' ) ) {
  					element = element.parentElement;
  				}
  				colorIndex( parseInt( element.getAttribute( 'data-color' ) ) );
  			} );
  			list.appendChild( colorButton );
  		}
      // eraser
      var eraserButton = document.createElement( 'li' );
  		eraserButton.setAttribute( 'data-eraser', 'true' );
  		var spongeImg = document.createElement( 'img' );
  		spongeImg.src = eraser.src;
      spongeImg.height = "24";
      spongeImg.width = "24";
      spongeImg.style.marginTop = '10px';
      spongeImg.style.marginRight = '0';
      spongeImg.style.marginBottom = '0';
      spongeImg.style.marginLeft = '0';
  		eraserButton.appendChild(spongeImg);
  		eraserButton.addEventListener( 'click', function ( e ) {
  			colorIndex( -1 );
  		} );
  		eraserButton.addEventListener( 'touchstart', function ( e ) {
  			colorIndex( -1 );
  		} );
  		list.appendChild( eraserButton );

  		palette.appendChild( list );
  		return palette;
  	}
  	function switchBoard( boardIdx ) {
  		selectBoard( boardIdx, true );
  		// broadcast
  		var message = new CustomEvent( messageType );
  			message.content = {
  			sender: 'chalkboard-plugin',
  			type: 'selectboard',
  			timestamp: Date.now() - slideStart,
  			mode,
  			board
  		};
  		document.dispatchEvent( message );	
  	}

  	function setupDrawingCanvas( id ) {
  		var container = document.createElement( 'div' );
  		container.id = drawingCanvas[ id ].id;
  		container.classList.add( 'overlay' );
  		container.classList.add( 'r-overlay' );
  		container.setAttribute( 'data-prevent-swipe', 'true' );
  		container.oncontextmenu = function () {
  			return false;
  		};

      changeCursor( container, pens[ id ][ color[ id ] ] );

  		drawingCanvas[ id ].width = window.innerWidth;
  		drawingCanvas[ id ].height = window.innerHeight;
  		drawingCanvas[ id ].scale = 1;
  		drawingCanvas[ id ].xOffset = 0;
  		drawingCanvas[ id ].yOffset = 0;

  		if ( id == "0" ) {
  			container.style.background = 'rgba(0,0,0,0)';
  			container.style.zIndex = 24;
  			container.style.opacity = 1;
  			container.style.visibility = 'visible';
  			container.style.pointerEvents = 'none';
  			container.style['backdrop-filter'] = 'none';
  			container.style['-webkit-backdrop-filter'] = 'none';

  			document.querySelector( '.slides' );
  			var aspectRatio = Reveal.getConfig().width / Reveal.getConfig().height;
  			if ( drawingCanvas[ id ].width > drawingCanvas[ id ].height * aspectRatio ) {
  				drawingCanvas[ id ].xOffset = ( drawingCanvas[ id ].width - drawingCanvas[ id ].height * aspectRatio ) / 2;
  			} else if ( drawingCanvas[ id ].height > drawingCanvas[ id ].width / aspectRatio ) {
  				drawingCanvas[ id ].yOffset = ( drawingCanvas[ id ].height - drawingCanvas[ id ].width / aspectRatio ) / 2;
  			}

  			if ( colorButtons ) {
  				var palette = createPalette( boardmarkers, colorButtons );
          palette.dataset.mode = id;
  				palette.style.visibility = 'hidden'; // only show palette in drawing mode
  				container.appendChild( palette );
  			}
  		} else {
  			container.style.background = 'url("' + background[ id ] + '") repeat';
  			container.style.zIndex = 26;
  			container.style.opacity = 0;
  			container.style.visibility = 'hidden';

  			if ( colorButtons ) {
  				var palette = createPalette( chalks, colorButtons );
          palette.dataset.mode = id;
  				container.appendChild( palette );
  			}
  			if ( boardHandle ) {
  				var handle = document.createElement( 'div' );
  				handle.classList.add( 'boardhandle' );
  				handle.innerHTML = '<ul><li><a id="previousboard" href="#" title="Previous board"><i class="fas fa-chevron-up"></i></a></li><li><a id="nextboard" href="#" title="Next board"><i class="fas fa-chevron-down"></i></a></li></ul>';
  				handle.querySelector( '#previousboard' ).addEventListener( 'click', function ( e ) {
  					e.preventDefault();
  					switchBoard( board - 1 );
  				} );
  				handle.querySelector( '#nextboard' ).addEventListener( 'click', function ( e ) {
  					e.preventDefault();
  					switchBoard( board + 1 );
  				} );
  				handle.querySelector( '#previousboard' ).addEventListener( 'touchstart', function ( e ) {
  					e.preventDefault();
  					switchBoard( board - 1 );
  				} );
  				handle.querySelector( '#nextboard' ).addEventListener( 'touchstart', function ( e ) {
  					e.preventDefault();
  					switchBoard( board + 1 );
  				} );

  				container.appendChild( handle );
  			}
  		}

  		var canvas = document.createElement( 'canvas' );
  		canvas.width = drawingCanvas[ id ].width;
  		canvas.height = drawingCanvas[ id ].height;
  		canvas.setAttribute( 'data-chalkboard', id );
      changeCursor( canvas, pens[ id ][ color[ id ] ] );
  		container.appendChild( canvas );
  		drawingCanvas[ id ].canvas = canvas;

  		drawingCanvas[ id ].context = canvas.getContext( '2d' );

  		setupCanvasEvents( container );

  		document.querySelector( '.reveal' ).appendChild( container );
  		drawingCanvas[ id ].container = container;
  	}


  /*****************************************************************
   ** Storage
   ******************************************************************/

  	var storage = [ {
  			width: Reveal.getConfig().width,
  			height: Reveal.getConfig().height,
  			data: []
  		},
  		{
  			width: Reveal.getConfig().width,
  			height: Reveal.getConfig().height,
  			data: []
  		}
  	];

  	var loaded = null;

  	if ( config.storage ) {
  		// Get chalkboard drawings from session storage
  		loaded = initStorage( sessionStorage.getItem( config.storage ) );
  	}

  	if ( !loaded && config.src != null ) {
  		// Get chalkboard drawings from the given file
  		loadData( config.src );
  	}

  	/**
  	 * Initialize storage.
  	 */
  	function initStorage( json ) {
  		var success = false;
  		try {
  			var data = JSON.parse( json );
  			for ( var id = 0; id < data.length; id++ ) {
  				if ( drawingCanvas[ id ].width != data[ id ].width || drawingCanvas[ id ].height != data[ id ].height ) {
  					drawingCanvas[ id ].scale = Math.min( drawingCanvas[ id ].width / data[ id ].width, drawingCanvas[ id ].height / data[ id ].height );
  					drawingCanvas[ id ].xOffset = ( drawingCanvas[ id ].width - data[ id ].width * drawingCanvas[ id ].scale ) / 2;
  					drawingCanvas[ id ].yOffset = ( drawingCanvas[ id ].height - data[ id ].height * drawingCanvas[ id ].scale ) / 2;
  				}
  				if ( config.readOnly ) {
  					drawingCanvas[ id ].container.style.cursor = 'default';
  					drawingCanvas[ id ].canvas.style.cursor = 'default';
  				}
  			}
  			success = true;
  			storage = data;
  		} catch ( err ) {
  			console.warn( "Cannot initialise storage!" );
  		}
  		return success;
  	}


  	/**
  	 * Load data.
  	 */
  	function loadData( filename ) {
  		var xhr = new XMLHttpRequest();
  		xhr.onload = function () {
  			if ( xhr.readyState === 4 && xhr.status != 404 ) {
  				loaded = initStorage( xhr.responseText );
  				updateStorage();
  				console.log( "Drawings loaded from file" );
  			} else {
  				config.readOnly = undefined;
  				readOnly = undefined;
  				console.warn( 'Failed to get file ' + filename + '. ReadyState: ' + xhr.readyState + ', Status: ' + xhr.status );
  				loaded = false;
  			}
  		};

  		xhr.open( 'GET', filename, true );
  		try {
  			xhr.send();
  		} catch ( error ) {
  			config.readOnly = undefined;
  			readOnly = undefined;
  			console.warn( 'Failed to get file ' + filename + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + error );
  			loaded = false;
  		}
  	}


  	function storageChanged( now ) {
  		if ( !now ) {
  			// create or update timer
  			if ( updateStorageTimeout ) {
  				clearTimeout( updateStorageTimeout );
  			}
  			updateStorageTimeout = setTimeout( storageChanged, 1000, true);
  		}
  		else {
  // console.log("Update storage", updateStorageTimeout,  Date.now());
  			updateStorage();
  			updateStorageTimeout = null;
  		}
  	}

  	function updateStorage() {
  		var json = JSON.stringify( storage );
  		if ( config.storage ) {
  			sessionStorage.setItem( config.storage, json );
  		}
  		return json;
  	}

  	function recordEvent( event ) {
  //console.log(event);
  		event.time = Date.now() - slideStart;
  		if ( mode == 1 ) event.board = board;
  		var slideData = getSlideData();
  		var i = slideData.events.length;
  		while ( i > 0 && event.time < slideData.events[ i - 1 ].time ) {
  			i--;
  		}
  		slideData.events.splice( i, 0, event );
  		slideData.duration = Math.max( slideData.duration, Date.now() - slideStart ) + 1;

  		storageChanged();
  	}

  	/**
  	 * Get data as json string.
  	 */
  	function getData() {
  		// cleanup slide data without events
  		for ( var id = 0; id < 2; id++ ) {
  			for ( var i = storage[ id ].data.length - 1; i >= 0; i-- ) {
  				if ( storage[ id ].data[ i ].events.length == 0 ) {
  					storage[ id ].data.splice( i, 1 );
  				}
  			}
  		}

  		return updateStorage();
  	}

  	/**
  	 * Replay a single stroke event received from an external source (e.g.
  	 * instructor→student sync). Adds the event to storage for persistence
  	 * and draws it immediately when the target slide is currently visible.
  	 *
  	 * @param {number} replayMode  0 = notes canvas, 1 = chalkboard
  	 * @param {{h:number,v:number,f:number}} slide  Target slide indices
  	 * @param {{type:string,x1?:number,y1?:number,x2?:number,y2?:number,
  	 *           x?:number,y?:number,color?:number,board?:number,time?:number}} event
  	 */
  	function replayStroke( replayMode, slide, event ) {
  		if ( replayMode !== 0 && replayMode !== 1 ) return;
  		if ( !slide || !event ) return;

  		// Find or create a storage entry for the target slide (without touching
  		// the current slide, so Reveal.getCurrentSlide() is never needed here).
  		var slideData = null;
  		for ( var i = 0; i < storage[ replayMode ].data.length; i++ ) {
  			var d = storage[ replayMode ].data[ i ];
  			if ( d.slide.h === slide.h && d.slide.v === slide.v && d.slide.f === slide.f ) {
  				slideData = d;
  				break;
  			}
  		}
  		if ( !slideData ) {
  			// Always store at f:-1 — fragments share one drawing layer (see getSlideData).
  			slideData = { slide: { h: slide.h, v: slide.v, f: -1 }, page: 0, events: [], duration: 0 };
  			storage[ replayMode ].data.push( slideData );
  		}

  		var evt = Object.assign( { time: 0 }, event );
  		slideData.events.push( evt );
  		slideData.duration = Math.max( slideData.duration, evt.time || 0 ) + 1;
  		storageChanged();

  		// Draw immediately only when this slide is currently visible.
  		if ( slideIndices.h !== slide.h || slideIndices.v !== slide.v ) return;

  		var canvas = drawingCanvas[ replayMode ];
  		var ctx = canvas.context;
  		var s = canvas.scale;
  		var xOff = canvas.xOffset;
  		var yOff = canvas.yOffset;

  		if ( event.type === 'draw' ) {
  			draw[ replayMode ]( ctx,
  				event.x1 * s + xOff, event.y1 * s + yOff,
  				event.x2 * s + xOff, event.y2 * s + yOff,
  				event.color
  			);
  		} else if ( event.type === 'erase' ) {
  			eraseWithSponge( ctx, event.x * s + xOff, event.y * s + yOff );
  		}
  	}

  	/**
  	 * Replace the full drawing state from a JSON blob (getData() on the
  	 * instructor side) and immediately redraw the current slide.
  	 *
  	 * @param {string} json  JSON string as returned by getData()
  	 */
  	function loadState( json ) {
  		if ( initStorage( json ) ) {
  			startPlayback( Infinity, mode );
  		}
  	}

  	/**
  	 * Download data.
  	 */
  	function downloadData() {
  		var a = document.createElement( 'a' );
  		document.body.appendChild( a );
  		try {
  			a.download = 'chalkboard.json';
  			var blob = new Blob( [ getData() ], {
  				type: 'application/json'
  			} );
  			a.href = window.URL.createObjectURL( blob );
  		} catch ( error ) {
  			// https://stackoverflow.com/a/6234804
  			// escape data for proper handling of quotes and line breaks
  			// in case malicious user gets a chance to craft the exception message
  			error = String(error)
  					.replace(/&/g, "&amp;")
  					.replace(/</g, "&lt;")
  					.replace(/>/g, "&gt;")
  					.replace(/"/g, "&quot;")
  					.replace(/'/g, "&#039;");
  			a.innerHTML += ' (' + error + ')';
  		}
  		a.click();
  		document.body.removeChild( a );
  	}

  	/**
  	 * Returns data object for the slide with the given indices.
  	 */
  	function getSlideData( indices, id ) {
  		if ( id == undefined ) id = mode;
  		if ( !indices ) indices = slideIndices;
  		var data;
  		// Match on {h, v} only — fragment index is intentionally ignored so that
  		// all fragment states of a slide share one drawing layer.  This prevents
  		// blank-canvas bugs when navigating backward (Reveal enters the slide at
  		// f=MAX rather than f=-1, which would miss entries stored at f=-1).
  		for ( var i = 0; i < storage[ id ].data.length; i++ ) {
  			if ( storage[ id ].data[ i ].slide.h === indices.h && storage[ id ].data[ i ].slide.v === indices.v ) {
  				data = storage[ id ].data[ i ];
  				return data;
  			}
  		}
  		var page = Number( Reveal.getCurrentSlide().getAttribute('data-pdf-page-number') );
  		storage[ id ].data.push( {
  			slide: { h: indices.h, v: indices.v, f: -1 },
  			page,
  			events: [],
  			duration: 0
  		} );
  		data = storage[ id ].data[ storage[ id ].data.length - 1 ];
  		return data;
  	}

  	/**
  	 * Returns maximum duration of slide playback for both modes
  	 */
  	function getSlideDuration( indices ) {
  		if ( !indices ) indices = slideIndices;
  		var duration = 0;
  		for ( var id = 0; id < 2; id++ ) {
  			for ( var i = 0; i < storage[ id ].data.length; i++ ) {
  				// Match on {h, v} only — same as getSlideData, so backward navigation
  				// (where Reveal enters at f=MAX rather than f=-1) still finds the entry.
  				if ( storage[ id ].data[ i ].slide.h === indices.h && storage[ id ].data[ i ].slide.v === indices.v ) {
  					duration = Math.max( duration, storage[ id ].data[ i ].duration );
  					break;
  				}
  			}
  		}
  //console.log( duration );
  		return duration;
  	}

  /*****************************************************************
   ** Print
   ******************************************************************/
  	var printMode = ( /print-pdf/gi ).test( window.location.search );
  //console.log("createPrintout" + printMode)

  	function addPageNumbers() {
  		// determine page number for printouts with fragments serialised
  		var slides = Reveal.getSlides();
  		var page = 0;
  		for ( var i=0; i < slides.length; i++) {
  			slides[i].setAttribute('data-pdf-page-number',page.toString());
  			// add number of fragments without fragment indices
  			var count = slides[i].querySelectorAll('.fragment:not([data-fragment-index])').length;
  			var fragments = slides[i].querySelectorAll('.fragment[data-fragment-index]');
  			for ( var j=0; j < fragments.length; j++) {
  				// increasenumber of fragments by highest fragment index (which start at 0)
  				if ( Number(fragments[j].getAttribute('data-fragment-index')) + 1 > count ) {
  					count = Number(fragments[j].getAttribute('data-fragment-index')) + 1;
  				}
  			}
  			page += count + 1;
  		}
  	}

  	function createPrintout() {
  		//console.warn(Reveal.getTotalSlides(),Reveal.getSlidesElement());
  		if ( storage[ 1 ].data.length == 0 ) return;
  		console.log( 'Create printout(s) for ' + storage[ 1 ].data.length + " slides" );
  		drawingCanvas[ 0 ].container.style.opacity = 0; // do not print notes canvas
  		drawingCanvas[ 0 ].container.style.visibility = 'hidden';

  		var patImg = new Image();
  		patImg.onload = function () {
  			var slides = Reveal.getSlides();
  //console.log(slides);
  			for ( var i = storage[ 1 ].data.length - 1; i >= 0; i-- ) {
  				console.log( 'Create printout for slide ' + storage[ 1 ].data[ i ].slide.h + '.' + storage[ 1 ].data[ i ].slide.v );
  				var slideData = getSlideData( storage[ 1 ].data[ i ].slide, 1 );
  				var drawings = createDrawings( slideData, patImg );
  				addDrawings( slides[storage[ 1 ].data[ i ].page], drawings );

  			}
  //			Reveal.sync();
  		};
  		patImg.src = background[ 1 ];
  	}


  	function cloneCanvas( oldCanvas ) {
  		//create a new canvas
  		var newCanvas = document.createElement( 'canvas' );
  		var context = newCanvas.getContext( '2d' );
  		//set dimensions
  		newCanvas.width = oldCanvas.width;
  		newCanvas.height = oldCanvas.height;
  		//apply the old canvas to the new one
  		context.drawImage( oldCanvas, 0, 0 );
  		//return the new canvas
  		return newCanvas;
  	}

  	function getCanvas( template, container, board ) {
  		var idx = container.findIndex( element => element.board === board );
  		if ( idx === -1 ) {
  			var canvas = cloneCanvas( template );
  			if ( !container.length ) {
  				idx = 0;
  				container.push( {
  					board,
  					canvas
  				} );
  			} else if ( board < container[ 0 ].board ) {
  				idx = 0;
  				container.unshift( {
  					board,
  					canvas
  				} );
  			} else if ( board > container[ container.length - 1 ].board ) {
  				idx = container.length;
  				container.push( {
  					board,
  					canvas
  				} );
  			}
  		}

  		return container[ idx ].canvas;
  	}

  	function createDrawings( slideData, patImg ) {
  		var width = Reveal.getConfig().width;
  		var height = Reveal.getConfig().height;
  		var scale = 1;
  		var xOffset = 0;
  		var yOffset = 0;
  		if ( width != storage[ 1 ].width || height != storage[ 1 ].height ) {
  			scale = Math.min( width / storage[ 1 ].width, height / storage[ 1 ].height );
  			xOffset = ( width - storage[ 1 ].width * scale ) / 2;
  			yOffset = ( height - storage[ 1 ].height * scale ) / 2;
  		}
  		mode = 1;
  		board = 0;
  //		console.log( 'Create printout(s) for slide ', slideData );

  		var drawings = [];
  		var template = document.createElement( 'canvas' );
  		template.width = width;
  		template.height = height;

  		var imgCtx = template.getContext( '2d' );
  		imgCtx.fillStyle = imgCtx.createPattern( patImg, 'repeat' );
  		imgCtx.rect( 0, 0, width, height );
  		imgCtx.fill();

  		for ( var j = 0; j < slideData.events.length; j++ ) {
  			switch ( slideData.events[ j ].type ) {
  			case 'draw':
  				draw[ 1 ]( getCanvas( template, drawings, board ).getContext( '2d' ),
  					xOffset + slideData.events[ j ].x1 * scale,
  					yOffset + slideData.events[ j ].y1 * scale,
  					xOffset + slideData.events[ j ].x2 * scale,
  					yOffset + slideData.events[ j ].y2 * scale,
  					yOffset + slideData.events[ j ].color
  				);
  				break;
  			case 'erase':
  				eraseWithSponge( getCanvas( template, drawings, board ).getContext( '2d' ),
  					xOffset + slideData.events[ j ].x * scale,
  					yOffset + slideData.events[ j ].y * scale
  				);
  				break;
  			case 'selectboard':
  				selectBoard( slideData.events[ j ].board );
  				break;
  			case 'clear':
  				getCanvas( template, drawings, board ).getContext( '2d' ).clearRect( 0, 0, width, height );
  				getCanvas( template, drawings, board ).getContext( '2d' ).fill();
  				break;
  			}
  		}

  		drawings = drawings.sort( ( a, b ) => a.board > b.board && 1 || -1 );

  		mode = 0;

  		return drawings;
  	}

  	function addDrawings( slide, drawings ) {
  		var parent = slide.parentElement.parentElement;
  		var nextSlide = slide.parentElement.nextElementSibling;

  		for ( var i = 0; i < drawings.length; i++ ) {
  			var newPDFPage = document.createElement( 'div' );
  			newPDFPage.classList.add( 'pdf-page' );
  			newPDFPage.style.height = Reveal.getConfig().height;
  			newPDFPage.append( drawings[ i ].canvas );
  //console.log("Add drawing", newPDFPage);
  			if ( nextSlide != null ) {
  				parent.insertBefore( newPDFPage, nextSlide );
  			} else {
  				parent.append( newPDFPage );
  			}
  		}
  	}

  	/*****************************************************************
  	 ** Drawings
  	 ******************************************************************/

  	function drawWithBoardmarker( context, fromX, fromY, toX, toY, colorIdx ) {
  		if ( colorIdx == undefined ) colorIdx = color[ mode ];
  		context.lineWidth = boardmarkerWidth;
  		context.lineCap = 'round';
  		context.strokeStyle = boardmarkers[ colorIdx ].color;
  		context.beginPath();
  		context.moveTo( fromX, fromY );
  		context.lineTo( toX, toY );
  		context.stroke();
  	}

  	function drawWithChalk( context, fromX, fromY, toX, toY, colorIdx ) {
  		if ( colorIdx == undefined ) colorIdx = color[ mode ];
  		var brushDiameter = chalkWidth;
  		context.lineWidth = brushDiameter;
  		context.lineCap = 'round';
  		context.fillStyle = chalks[ colorIdx ].color; // 'rgba(255,255,255,0.5)';
  		context.strokeStyle = chalks[ colorIdx ].color;

  		var opacity = 1.0;
  		context.strokeStyle = context.strokeStyle.replace( /[\d\.]+\)$/g, opacity + ')' );
  		context.beginPath();
  		context.moveTo( fromX, fromY );
  		context.lineTo( toX, toY );
  		context.stroke();
  		// Chalk Effect
  		var length = Math.round( Math.sqrt( Math.pow( toX - fromX, 2 ) + Math.pow( toY - fromY, 2 ) ) / ( 5 / brushDiameter ) );
  		var xUnit = ( toX - fromX ) / length;
  		var yUnit = ( toY - fromY ) / length;
  		for ( var i = 0; i < length; i++ ) {
  			if ( chalkEffect > ( Math.random() * 0.9 ) ) {
  				var xCurrent = fromX + ( i * xUnit );
  				var yCurrent = fromY + ( i * yUnit );
  				var xRandom = xCurrent + ( Math.random() - 0.5 ) * brushDiameter * 1.2;
  				var yRandom = yCurrent + ( Math.random() - 0.5 ) * brushDiameter * 1.2;
  				context.clearRect( xRandom, yRandom, Math.random() * 2 + 2, Math.random() + 1 );
  			}
  		}
  	}
   
  	function eraseWithSponge( context, x, y ) {
  		context.save();
  		context.beginPath();
  		context.arc( x + eraser.radius, y + eraser.radius, eraser.radius, 0, 2 * Math.PI, false );
  		context.clip();
  		context.clearRect( x - 1, y - 1, eraser.radius * 2 + 2, eraser.radius * 2 + 2 );
  		context.restore();
  		if ( mode == 1 && grid ) {
  			redrawGrid( x + eraser.radius, y + eraser.radius, eraser.radius );
  		}
  	}


  	/**
  	 * Show an overlay for the chalkboard.
  	 */
  	function showChalkboard() {
  //console.log("showChalkboard");
  		drawingCanvas[ 1 ].container.style.opacity = 1;
  		drawingCanvas[ 1 ].container.style.visibility = 'visible';
  		mode = 1;
  	}


  	/**
  	 * Closes open chalkboard.
  	 */
  	function closeChalkboard() {
  		drawingCanvas[ 1 ].container.style.opacity = 0;
  		drawingCanvas[ 1 ].container.style.visibility = 'hidden';
  		lastX = null;
  		lastY = null;
  		mode = 0;
  	}

  	/**
  	 * Clear current canvas.
  	 */
  	function clearCanvas( id ) {
  		if ( id == 0 ) {
  			clearTimeout( slidechangeTimeout );
  			if ( pendingTransitionEnd ) {
  				pendingTransitionEnd.el.removeEventListener( 'transitionend', pendingTransitionEnd.fn );
  				pendingTransitionEnd = null;
  			}
  		}
  		drawingCanvas[ id ].context.clearRect( 0, 0, drawingCanvas[ id ].width, drawingCanvas[ id ].height );
  		if ( id == 1 && grid ) drawGrid();
  	}

  	/**
  	 * Draw grid on background
  	 */
  	function drawGrid() {
  		var context = drawingCanvas[ 1 ].context;

  		drawingCanvas[ 1 ].scale = Math.min( drawingCanvas[ 1 ].width / storage[ 1 ].width, drawingCanvas[ 1 ].height / storage[ 1 ].height );
  		drawingCanvas[ 1 ].xOffset = ( drawingCanvas[ 1 ].width - storage[ 1 ].width * drawingCanvas[ 1 ].scale ) / 2;
  		drawingCanvas[ 1 ].yOffset = ( drawingCanvas[ 1 ].height - storage[ 1 ].height * drawingCanvas[ 1 ].scale ) / 2;

  		var scale = drawingCanvas[ 1 ].scale;
  		drawingCanvas[ 1 ].xOffset;
  		drawingCanvas[ 1 ].yOffset;

  		var distance = grid.distance * scale;

  		var fromX = drawingCanvas[ 1 ].width / 2 - distance / 2 - Math.floor( ( drawingCanvas[ 1 ].width - distance ) / 2 / distance ) * distance;
  		for ( var x = fromX; x < drawingCanvas[ 1 ].width; x += distance ) {
  			context.beginPath();
  			context.lineWidth = grid.width * scale;
  			context.lineCap = 'round';
  			context.fillStyle = grid.color;
  			context.strokeStyle = grid.color;
  			context.moveTo( x, 0 );
  			context.lineTo( x, drawingCanvas[ 1 ].height );
  			context.stroke();
  		}
  		var fromY = drawingCanvas[ 1 ].height / 2 - distance / 2 - Math.floor( ( drawingCanvas[ 1 ].height - distance ) / 2 / distance ) * distance;

  		for ( var y = fromY; y < drawingCanvas[ 1 ].height; y += distance ) {
  			context.beginPath();
  			context.lineWidth = grid.width * scale;
  			context.lineCap = 'round';
  			context.fillStyle = grid.color;
  			context.strokeStyle = grid.color;
  			context.moveTo( 0, y );
  			context.lineTo( drawingCanvas[ 1 ].width, y );
  			context.stroke();
  		}
  	}

  	function redrawGrid( centerX, centerY, diameter ) {
  		var context = drawingCanvas[ 1 ].context;

  		drawingCanvas[ 1 ].scale = Math.min( drawingCanvas[ 1 ].width / storage[ 1 ].width, drawingCanvas[ 1 ].height / storage[ 1 ].height );
  		drawingCanvas[ 1 ].xOffset = ( drawingCanvas[ 1 ].width - storage[ 1 ].width * drawingCanvas[ 1 ].scale ) / 2;
  		drawingCanvas[ 1 ].yOffset = ( drawingCanvas[ 1 ].height - storage[ 1 ].height * drawingCanvas[ 1 ].scale ) / 2;

  		var scale = drawingCanvas[ 1 ].scale;
  		drawingCanvas[ 1 ].xOffset;
  		drawingCanvas[ 1 ].yOffset;

  		var distance = grid.distance * scale;

  		var fromX = drawingCanvas[ 1 ].width / 2 - distance / 2 - Math.floor( ( drawingCanvas[ 1 ].width - distance ) / 2 / distance ) * distance;

  		for ( var x = fromX + distance * Math.ceil( ( centerX - diameter - fromX ) / distance ); x <= fromX + distance * Math.floor( ( centerX + diameter - fromX ) / distance ); x += distance ) {
  			context.beginPath();
  			context.lineWidth = grid.width * scale;
  			context.lineCap = 'round';
  			context.fillStyle = grid.color;
  			context.strokeStyle = grid.color;
  			context.moveTo( x, centerY - Math.sqrt( diameter * diameter - ( centerX - x ) * ( centerX - x ) ) );
  			context.lineTo( x, centerY + Math.sqrt( diameter * diameter - ( centerX - x ) * ( centerX - x ) ) );
  			context.stroke();
  		}
  		var fromY = drawingCanvas[ 1 ].height / 2 - distance / 2 - Math.floor( ( drawingCanvas[ 1 ].height - distance ) / 2 / distance ) * distance;
  		for ( var y = fromY + distance * Math.ceil( ( centerY - diameter - fromY ) / distance ); y <= fromY + distance * Math.floor( ( centerY + diameter - fromY ) / distance ); y += distance ) {
  			context.beginPath();
  			context.lineWidth = grid.width * scale;
  			context.lineCap = 'round';
  			context.fillStyle = grid.color;
  			context.strokeStyle = grid.color;
  			context.moveTo( centerX - Math.sqrt( diameter * diameter - ( centerY - y ) * ( centerY - y ) ), y );
  			context.lineTo( centerX + Math.sqrt( diameter * diameter - ( centerY - y ) * ( centerY - y ) ), y );
  			context.stroke();
  		}
  	}

  	/**
  	 * Set the  color
  	 */
  	function setColor( index, record ) {    
   		// protect against out of bounds (this could happen when
    	// replaying events recorded with different color settings).
      if ( index >= pens[ mode ].length ) index = 0;

  	  color[ mode ] = index;

      if ( color[ mode ] < 0 ) {
        // use eraser
        changeCursor( drawingCanvas[ mode ].canvas, sponge );
      }
      else {
        changeCursor( drawingCanvas[ mode ].canvas, pens[ mode ][ color[ mode ] ] );
      }
  	}

  	/**
  	 * Set the  board
  	 */
  	function selectBoard( boardIdx, record ) {
  //console.log("Set board",boardIdx);
  		if ( board == boardIdx ) return;

  		board = boardIdx;
  		redrawChalkboard( boardIdx );
  		if ( record ) {
  			recordEvent( { type: 'selectboard' } );
  		}
  	}

  	function redrawChalkboard( boardIdx ) {
  		clearCanvas( 1 );
  		var slideData = getSlideData( slideIndices, 1 );
  		var index = 0;
  		while ( index < slideData.events.length && slideData.events[ index ].time < Date.now() - slideStart ) {
  			if ( boardIdx == slideData.events[ index ].board ) {
  				playEvent( 1, slideData.events[ index ], Date.now() - slideStart );
  			}

  			index++;
  		}
  	}


  	/**
  	 * Forward cycle color
  	 */
  	function cycleColorNext() {
  		color[ mode ] = ( color[ mode ] + 1 ) % pens[ mode ].length;
  		return color[ mode ];
  	}

  	/**
  	 * Backward cycle color
  	 */
  	function cycleColorPrev() {
  		color[ mode ] = ( color[ mode ] + ( pens[ mode ].length - 1 ) ) % pens[ mode ].length;
  		return color[ mode ];
  	}

  /*****************************************************************
   ** Broadcast
   ******************************************************************/

  	var eventQueue = [];

  	document.addEventListener( 'received', function ( message ) {
  		if ( message.content && message.content.sender == 'chalkboard-plugin' ) {
  			// add message to queue
  			eventQueue.push( message );
  			console.log( JSON.stringify( message ) );
  		}
  		if ( eventQueue.length == 1 ) processQueue();
  	} );

  	function processQueue() {
  		// take first message from queue
  		var message = eventQueue.shift();

  		// synchronize time with seminar host
  		slideStart = Date.now() - message.content.timestamp;
  		// set status
  		if ( mode < message.content.mode ) {
  			// open chalkboard
  			showChalkboard();
  		} else if ( mode > message.content.mode ) {
  			// close chalkboard
  			closeChalkboard();
  		}
  		if ( board != message.content.board ) {
  			board = message.content.board;
  			redrawChalkboard( board );
  		}
  		switch ( message.content.type ) {
  		case 'showChalkboard':
  			showChalkboard();
  			break;
  		case 'closeChalkboard':
  			closeChalkboard();
  			break;
  		case 'erase':
  			erasePoint( message.content.x, message.content.y );
  			break;
  		case 'draw':
  			drawSegment( message.content.fromX, message.content.fromY, message.content.toX, message.content.toY, message.content.color );
  			break;
  		case 'clear':
  			clearSlide();
  			break;
  		case 'selectboard':
  			selectBoard( message.content.board, true );
  			break;
  		case 'resetSlide':
  			resetSlideDrawings();
  			break;
  		case 'init':
  			storage = message.content.storage;
  			for ( var id = 0; id < 2; id++ ) {
  				drawingCanvas[ id ].scale = Math.min( drawingCanvas[ id ].width / storage[ id ].width, drawingCanvas[ id ].height / storage[ id ].height );
  				drawingCanvas[ id ].xOffset = ( drawingCanvas[ id ].width - storage[ id ].width * drawingCanvas[ id ].scale ) / 2;
  				drawingCanvas[ id ].yOffset = ( drawingCanvas[ id ].height - storage[ id ].height * drawingCanvas[ id ].scale ) / 2;
  			}
  			clearCanvas( 0 );
  			clearCanvas( 1 );
  			if ( !playback ) {
  				slidechangeTimeout = setTimeout( startPlayback, transition, getSlideDuration(), 0 );
  			}
  			if ( mode == 1 && message.content.mode == 0 ) {
  				setTimeout( closeChalkboard, transition + 50 );
  			}
  			if ( mode == 0 && message.content.mode == 1 ) {
  				setTimeout( showChalkboard, transition + 50 );
  			}
  			mode = message.content.mode;
  			board = message.content.board;
  			break;
  		}

  		// continue with next message if queued
  		if ( eventQueue.length > 0 ) {
  			processQueue();
  		} else {
  			storageChanged();
  		}
  	}

  	document.addEventListener( 'welcome', function ( user ) {
  		// broadcast storage
  		var message = new CustomEvent( messageType );
  		message.content = {
  			sender: 'chalkboard-plugin',
  			recipient: user.id,
  			type: 'init',
  			timestamp: Date.now() - slideStart,
  			storage: storage,
  			mode,
  			board
  		};
  		document.dispatchEvent( message );
  	} );

  	/*****************************************************************
  	 ** Playback
  	 ******************************************************************/

  	document.addEventListener( 'seekplayback', function ( event ) {
  //console.log('event seekplayback ' + event.timestamp);
  		stopPlayback();
  		if ( !playback || event.timestamp == 0 ) {
  			// in other cases startplayback fires after seeked
  			startPlayback( event.timestamp );
  		}
  		//console.log('seeked');
  	} );


  	document.addEventListener( 'startplayback', function ( event ) {
  //console.log('event startplayback ' + event.timestamp);
  		stopPlayback();
  		playback = true;
  		startPlayback( event.timestamp );
  	} );

  	document.addEventListener( 'stopplayback', function ( event ) {
  //console.log('event stopplayback ' + (Date.now() - slideStart) );
  		playback = false;
  		stopPlayback();
  	} );

  	document.addEventListener( 'startrecording', function ( event ) {
  //console.log('event startrecording ' + event.timestamp);
  		startRecording();
  	} );


  	function startRecording() {
  		resetSlide( true );
  		slideStart = Date.now();
  	}

  	function startPlayback( timestamp, finalMode ) {
  //console.log("playback " + timestamp );
  		slideStart = Date.now() - timestamp;
  		closeChalkboard();
  		mode = 0;
  		board = 0;
  		for ( var id = 0; id < 2; id++ ) {
  			clearCanvas( id );
  			var slideData = getSlideData( slideIndices, id );
  //console.log( timestamp +" / " + JSON.stringify(slideData));
  			var index = 0;
  			while ( index < slideData.events.length && slideData.events[ index ].time < ( Date.now() - slideStart ) ) {
  				playEvent( id, slideData.events[ index ], timestamp );
  				index++;
  			}

  			while ( playback && index < slideData.events.length ) {
  				timeouts[ id ].push( setTimeout( playEvent, slideData.events[ index ].time - ( Date.now() - slideStart ), id, slideData.events[ index ], timestamp ) );
  				index++;
  			}
  		}
  //console.log("Mode: " + finalMode + "/" + mode );
  		if ( finalMode != undefined ) {
  			mode = finalMode;
  		}
  		if ( mode == 1 ) showChalkboard();
  //console.log("playback (ok)");

  	}
  	function stopPlayback() {
  //console.log("stopPlayback");
  //console.log("Timeouts: " + timeouts[0].length + "/"+ timeouts[1].length);
  		for ( var id = 0; id < 2; id++ ) {
  			for ( var i = 0; i < timeouts[ id ].length; i++ ) {
  				clearTimeout( timeouts[ id ][ i ] );
  			}
  			timeouts[ id ] = [];
  		}
  	}
  	function playEvent( id, event, timestamp ) {
  //console.log( timestamp +" / " + JSON.stringify(event));
  //console.log( id + ": " + timestamp +" / " +  event.time +" / " + event.type +" / " + mode );
  		switch ( event.type ) {
  		case 'open':
  			if ( timestamp <= event.time ) {
  				showChalkboard();
  			} else {
  				mode = 1;
  			}

  			break;
  		case 'close':
  			if ( timestamp < event.time ) {
  				closeChalkboard();
  			} else {
  				mode = 0;
  			}
  			break;
  		case 'clear':
  			clearCanvas( id );
  			break;
  		case 'selectboard':
  			selectBoard( event.board );
  			break;
  		case 'draw':
  			drawLine( id, event);
  			break;
  		case 'erase':
  			eraseCircle( id, event);
  			break;
  		}
  	}
  	function drawLine( id, event, timestamp ) {
  		var ctx = drawingCanvas[ id ].context;
  		var scale = drawingCanvas[ id ].scale;
  		var xOffset = drawingCanvas[ id ].xOffset;
  		var yOffset = drawingCanvas[ id ].yOffset;
  		draw[ id ]( ctx, xOffset + event.x1 * scale, yOffset + event.y1 * scale, xOffset + event.x2 * scale, yOffset + event.y2 * scale, event.color );
  	}
  	function eraseCircle( id, event, timestamp ) {
  		var ctx = drawingCanvas[ id ].context;
  		var scale = drawingCanvas[ id ].scale;
  		var xOffset = drawingCanvas[ id ].xOffset;
  		var yOffset = drawingCanvas[ id ].yOffset;

  		eraseWithSponge( ctx, xOffset + event.x * scale, yOffset + event.y * scale );
  	}
  	function startErasing( x, y ) {
  		drawing = false;
  		erasing = true;
  		erasePoint( x, y );
  	}

  	function erasePoint( x, y ) {
  		var ctx = drawingCanvas[ mode ].context;
  		var scale = drawingCanvas[ mode ].scale;
  		var xOffset = drawingCanvas[ mode ].xOffset;
  		var yOffset = drawingCanvas[ mode ].yOffset;

  		recordEvent( {
  			type: 'erase',
  			x,
  			y
  		} );

  		if (
  			x * scale + xOffset > 0 &&
  			y * scale + yOffset > 0 &&
  			x * scale + xOffset < drawingCanvas[ mode ].width &&
  			y * scale + yOffset < drawingCanvas[ mode ].height
  		) {
  			eraseWithSponge( ctx, x * scale + xOffset, y * scale + yOffset );
  		}
  	}

  	function stopErasing() {
  		erasing = false;
  	}

  	function startDrawing( x, y ) {
  		drawing = true;

  		drawingCanvas[ mode ].context;
  		var scale = drawingCanvas[ mode ].scale;
  		var xOffset = drawingCanvas[ mode ].xOffset;
  		var yOffset = drawingCanvas[ mode ].yOffset;
  		lastX = x * scale + xOffset;
  		lastY = y * scale + yOffset;
  	}

  	function drawSegment( fromX, fromY, toX, toY, colorIdx ) {
  		var ctx = drawingCanvas[ mode ].context;
  		var scale = drawingCanvas[ mode ].scale;
  		var xOffset = drawingCanvas[ mode ].xOffset;
  		var yOffset = drawingCanvas[ mode ].yOffset;

  		recordEvent( {
  			type: 'draw',
  			color: colorIdx,
  			x1: fromX,
  			y1: fromY,
  			x2: toX,
  			y2: toY
  		} );

  		if (
  			fromX * scale + xOffset > 0 &&
  			fromY * scale + yOffset > 0 &&
  			fromX * scale + xOffset < drawingCanvas[ mode ].width &&
  			fromY * scale + yOffset < drawingCanvas[ mode ].height &&
  			toX * scale + xOffset > 0 &&
  			toY * scale + yOffset > 0 &&
  			toX * scale + xOffset < drawingCanvas[ mode ].width &&
  			toY * scale + yOffset < drawingCanvas[ mode ].height
  		) {
  			draw[ mode ]( ctx, fromX * scale + xOffset, fromY * scale + yOffset, toX * scale + xOffset, toY * scale + yOffset, colorIdx );
  		}
  	}

  	function stopDrawing() {
  		drawing = false;
  	}


  /*****************************************************************
   ** User interface
   ******************************************************************/

  	function setupCanvasEvents( canvas ) {
  // TODO: check all touchevents
  		canvas.addEventListener( 'touchstart', function ( evt ) {
  			evt.preventDefault();
  //console.log("Touch start");
  			if ( !readOnly && evt.target.getAttribute( 'data-chalkboard' ) == mode ) {
  				var scale = drawingCanvas[ mode ].scale;
  				var xOffset = drawingCanvas[ mode ].xOffset;
  				var yOffset = drawingCanvas[ mode ].yOffset;

  				var touch = evt.touches[ 0 ];
  				mouseX = touch.pageX;
  				mouseY = touch.pageY;
          if ( color[ mode ]  < 0 ) {
            startErasing( ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale);
          }
          else {
    				startDrawing( ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale );
          }
  			}
  		}, passiveSupported ? {
  			passive: false
  		} : false );

  		canvas.addEventListener( 'touchmove', function ( evt ) {
  			evt.preventDefault();
  //console.log("Touch move");
  			if ( drawing || erasing ) {
  				var scale = drawingCanvas[ mode ].scale;
  				var xOffset = drawingCanvas[ mode ].xOffset;
  				var yOffset = drawingCanvas[ mode ].yOffset;

  				var touch = evt.touches[ 0 ];
  				mouseX = touch.pageX;
  				mouseY = touch.pageY;

  				if ( drawing ) {
  					drawSegment( ( lastX - xOffset ) / scale, ( lastY - yOffset ) / scale, ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale, color[ mode ] );
  					// broadcast
  					var message = new CustomEvent( messageType );
  					message.content = {
  						sender: 'chalkboard-plugin',
  						type: 'draw',
  						timestamp: Date.now() - slideStart,
  						mode,
  						board,
  						fromX: ( lastX - xOffset ) / scale,
  						fromY: ( lastY - yOffset ) / scale,
  						toX: ( mouseX - xOffset ) / scale,
  						toY: ( mouseY - yOffset ) / scale,
  						color: color[ mode ]
  					};
  					document.dispatchEvent( message );

  					lastX = mouseX;
  					lastY = mouseY;
  				} else {
  					erasePoint( ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale );
  					// broadcast
  					var message = new CustomEvent( messageType );
  					message.content = {
  						sender: 'chalkboard-plugin',
  						type: 'erase',
  						timestamp: Date.now() - slideStart,
  						mode,
  						board,
  						x: ( mouseX - xOffset ) / scale,
  						y: ( mouseY - yOffset ) / scale
  					};
  					document.dispatchEvent( message );
  				}

  			}
  		}, false );


  		canvas.addEventListener( 'touchend', function ( evt ) {
  			evt.preventDefault();
  			stopDrawing();
  			stopErasing();
  		}, false );

  		canvas.addEventListener( 'mousedown', function ( evt ) {
  			evt.preventDefault();
  			if ( !readOnly && evt.target.getAttribute( 'data-chalkboard' ) == mode ) {
  //console.log( "mousedown: " + evt.button );
  				var scale = drawingCanvas[ mode ].scale;
  				var xOffset = drawingCanvas[ mode ].xOffset;
  				var yOffset = drawingCanvas[ mode ].yOffset;

  				mouseX = evt.pageX;
  				mouseY = evt.pageY;

  				if ( color[ mode ]  < 0 || evt.button == 2 || evt.button == 1 ) {
            if ( color[ mode ]  >= 0 ) {
              // show sponge
              changeCursor( drawingCanvas[ mode ].canvas, sponge );
            }
  					startErasing( ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale );
  					// broadcast
  					var message = new CustomEvent( messageType );
  					message.content = {
  						sender: 'chalkboard-plugin',
  						type: 'erase',
  						timestamp: Date.now() - slideStart,
  						mode,
  						board,
  						x: ( mouseX - xOffset ) / scale,
  						y: ( mouseY - yOffset ) / scale
  					};
  					document.dispatchEvent( message );
  				} else {
  					startDrawing( ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale );
  				}
  			}
  		} );

  		canvas.addEventListener( 'mousemove', function ( evt ) {
  			evt.preventDefault();
  //console.log("Mouse move");

  			var scale = drawingCanvas[ mode ].scale;
  			var xOffset = drawingCanvas[ mode ].xOffset;
  			var yOffset = drawingCanvas[ mode ].yOffset;

  			mouseX = evt.pageX;
  			mouseY = evt.pageY;

  			if ( drawing || erasing ) {
  				var scale = drawingCanvas[ mode ].scale;
  				var xOffset = drawingCanvas[ mode ].xOffset;
  				var yOffset = drawingCanvas[ mode ].yOffset;

  				mouseX = evt.pageX;
  				mouseY = evt.pageY;

  				if ( drawing ) {
  					drawSegment( ( lastX - xOffset ) / scale, ( lastY - yOffset ) / scale, ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale, color[ mode ] );
  					// broadcast
  					var message = new CustomEvent( messageType );
  					message.content = {
  						sender: 'chalkboard-plugin',
  						type: 'draw',
  						timestamp: Date.now() - slideStart,
  						mode,
  						board,
  						fromX: ( lastX - xOffset ) / scale,
  						fromY: ( lastY - yOffset ) / scale,
  						toX: ( mouseX - xOffset ) / scale,
  						toY: ( mouseY - yOffset ) / scale,
  						color: color[ mode ]
  					};
  					document.dispatchEvent( message );

  					lastX = mouseX;
  					lastY = mouseY;
  				} else {
  					erasePoint( ( mouseX - xOffset ) / scale, ( mouseY - yOffset ) / scale );
  					// broadcast
  					var message = new CustomEvent( messageType );
  					message.content = {
  						sender: 'chalkboard-plugin',
  						type: 'erase',
  						timestamp: Date.now() - slideStart,
  						mode,
  						board,
  						x: ( mouseX - xOffset ) / scale,
  						y: ( mouseY - yOffset ) / scale
  					};
  					document.dispatchEvent( message );
  				}

  			}
  		} );


  		canvas.addEventListener( 'mouseup', function ( evt ) {
  			evt.preventDefault();
        if ( color[ mode ] >= 0 ) {
          changeCursor( drawingCanvas[ mode ].canvas, pens[ mode ][ color[ mode ] ] );
        }
  			if ( drawing || erasing ) {
  				stopDrawing();
  				stopErasing();
  			}
  		} );
  	}

  	function resize() {
  //console.log("resize");
  		// Resize the canvas and draw everything again
  		var timestamp = Date.now() - slideStart;
  		if ( !playback ) {
  			timestamp = getSlideDuration();
  		}

  //console.log( drawingCanvas[0].scale + "/" + drawingCanvas[0].xOffset + "/" +drawingCanvas[0].yOffset );
  		for ( var id = 0; id < 2; id++ ) {
  			drawingCanvas[ id ].width = window.innerWidth;
  			drawingCanvas[ id ].height = window.innerHeight;
  			drawingCanvas[ id ].canvas.width = drawingCanvas[ id ].width;
  			drawingCanvas[ id ].canvas.height = drawingCanvas[ id ].height;
  			drawingCanvas[ id ].context.canvas.width = drawingCanvas[ id ].width;
  			drawingCanvas[ id ].context.canvas.height = drawingCanvas[ id ].height;

  			drawingCanvas[ id ].scale = Math.min( drawingCanvas[ id ].width / storage[ id ].width, drawingCanvas[ id ].height / storage[ id ].height );
  			drawingCanvas[ id ].xOffset = ( drawingCanvas[ id ].width - storage[ id ].width * drawingCanvas[ id ].scale ) / 2;
  			drawingCanvas[ id ].yOffset = ( drawingCanvas[ id ].height - storage[ id ].height * drawingCanvas[ id ].scale ) / 2;
  //console.log( drawingCanvas[id].scale + "/" + drawingCanvas[id].xOffset + "/" +drawingCanvas[id].yOffset );
  		}
  //console.log( window.innerWidth + "/" + window.innerHeight);
  		startPlayback( timestamp, mode);
  	}

  	Reveal.addEventListener( 'pdf-ready', function ( evt ) {
  //		console.log( "Create printouts when ready" );
  		whenLoaded( createPrintout );
  	});

  	Reveal.addEventListener( 'ready', function ( evt ) {
  //console.log('ready');
  		if ( !printMode ) {
  			window.addEventListener( 'resize', resize );

  			slideStart = Date.now() - getSlideDuration();
  			slideIndices = Reveal.getIndices();
  			if ( !playback ) {
  				startPlayback( getSlideDuration(), 0 );
  			}
  			if ( Reveal.isAutoSliding() ) {
  				var event = new CustomEvent( 'startplayback' );
  				event.timestamp = 0;
  				document.dispatchEvent( event );
  			}
  			updateStorage();
  			whenReady( addPageNumbers );
  		}
  	} );
  	Reveal.addEventListener( 'slidechanged', function ( evt ) {
  //		clearTimeout( slidechangeTimeout );
  //console.log('slidechanged');
  		if ( !printMode ) {
  			slideStart = Date.now() - getSlideDuration();
  			slideIndices = Reveal.getIndices();
  			closeChalkboard();
  			board = 0;
  			clearCanvas( 0 );
  			clearCanvas( 1 );
  			if ( !playback ) {
  				var pendingDuration = getSlideDuration();
  				var playbackFired = false;
  				var transitionEl = Reveal.getCurrentSlide();
  				var firePlayback = function() {
  					if ( playbackFired ) return;
  					playbackFired = true;
  					clearTimeout( slidechangeTimeout );
  					if ( pendingTransitionEnd ) {
  						pendingTransitionEnd.el.removeEventListener( 'transitionend', pendingTransitionEnd.fn );
  						pendingTransitionEnd = null;
  					}
  					startPlayback( pendingDuration, 0 );
  				};
  				var transitionEndHandler = function( e ) {
  					if ( e.target !== transitionEl ) return;
  					firePlayback();
  				};
  				transitionEl.addEventListener( 'transitionend', transitionEndHandler );
  				pendingTransitionEnd = { el: transitionEl, fn: transitionEndHandler };
  				slidechangeTimeout = setTimeout( firePlayback, transition );
  			}
  			if ( Reveal.isAutoSliding() ) {
  				var event = new CustomEvent( 'startplayback' );
  				event.timestamp = 0;
  				document.dispatchEvent( event );
  			}
  		}
  	} );
  	Reveal.addEventListener( 'fragmentshown', function ( evt ) {
  //		clearTimeout( slidechangeTimeout );
  //console.log('fragmentshown');
  		if ( !printMode ) {
  			slideStart = Date.now() - getSlideDuration();
  			slideIndices = Reveal.getIndices();
  			closeChalkboard();
  			board = 0;
  			clearCanvas( 0 );
  			clearCanvas( 1 );
  			if ( Reveal.isAutoSliding() ) {
  				var event = new CustomEvent( 'startplayback' );
  				event.timestamp = 0;
  				document.dispatchEvent( event );
  			} else if ( !playback ) {
  				startPlayback( getSlideDuration(), 0 );
  //				closeChalkboard();
  			}
  		}
  	} );
  	Reveal.addEventListener( 'fragmenthidden', function ( evt ) {
  //		clearTimeout( slidechangeTimeout );
  //console.log('fragmenthidden');
  		if ( !printMode ) {
  			slideStart = Date.now() - getSlideDuration();
  			slideIndices = Reveal.getIndices();
  			closeChalkboard();
  			board = 0;
  			clearCanvas( 0 );
  			clearCanvas( 1 );
  			if ( Reveal.isAutoSliding() ) {
  				document.dispatchEvent( new CustomEvent( 'stopplayback' ) );
  			} else if ( !playback ) {
  				startPlayback( getSlideDuration() );
  				closeChalkboard();
  			}
  		}
  	} );

  	Reveal.addEventListener( 'autoslideresumed', function ( evt ) {
  //console.log('autoslideresumed');
  		var event = new CustomEvent( 'startplayback' );
  		event.timestamp = 0;
  		document.dispatchEvent( event );
  	} );
  	Reveal.addEventListener( 'autoslidepaused', function ( evt ) {
  //console.log('autoslidepaused');
  		document.dispatchEvent( new CustomEvent( 'stopplayback' ) );

  		// advance to end of slide
  //		closeChalkboard();
  		startPlayback( getSlideDuration(), 0 );
  	} );

  	function toggleNotesCanvas() {
  		if ( !readOnly ) {
  			if ( mode == 1 ) {
  				toggleChalkboard();
  				notescanvas.style.background = background[ 0 ]; //'rgba(255,0,0,0.5)';
  				notescanvas.style.pointerEvents = 'auto';
  			}
  			else {
  				if ( notescanvas.style.pointerEvents != 'none' ) {
  					// hide notes canvas
  					if ( colorButtons ) {
  						notescanvas.querySelector( '.palette' ).style.visibility = 'hidden';
  					}
  					notescanvas.style.background = 'rgba(0,0,0,0)';
  					notescanvas.style.pointerEvents = 'none';
  				}
  				else {
  					// show notes canvas
  					if ( colorButtons ) {
  						notescanvas.querySelector( '.palette' ).style.visibility = 'visible';
  					}
  					notescanvas.style.background = background[ 0 ]; //'rgba(255,0,0,0.5)';
  					notescanvas.style.pointerEvents = 'auto';

  					var idx = 0;
  					if ( color[ mode ] ) {
  						idx = color[ mode ];
  					}

  					setColor( idx);
  				}
  			}
  		}
  	}
  	function toggleChalkboard() {
  //console.log("toggleChalkboard " + mode);
  		if ( mode == 1 ) {
  			if ( !readOnly ) {
  				recordEvent( { type: 'close' } );
  			}
  			closeChalkboard();

  			// broadcast
  			var message = new CustomEvent( messageType );
  			message.content = {
  				sender: 'chalkboard-plugin',
  				type: 'closeChalkboard',
  				timestamp: Date.now() - slideStart,
  				mode: 0,
  				board
  			};
  			document.dispatchEvent( message );


  		} else {
  			showChalkboard();
  			if ( !readOnly ) {
  				recordEvent( { type: 'open' } );
  				// broadcast
  				var message = new CustomEvent( messageType );
  				message.content = {
  					sender: 'chalkboard-plugin',
  					type: 'showChalkboard',
  					timestamp: Date.now() - slideStart,
  					mode: 1,
  					board
  				};
  				document.dispatchEvent( message );

  				var idx = 0;

  				if ( rememberColor[ mode ] ) {
  					idx = color[ mode ];
  				}

  				setColor( idx);
  			}
  		}
  	}
  	function clearSlide() {
  		recordEvent( { type: 'clear' } );
  		clearCanvas( mode );
  	}

  	function clear() {
  		if ( !readOnly ) {
  			clearSlide();
  			// broadcast
  			var message = new CustomEvent( messageType );
  			message.content = {
  				sender: 'chalkboard-plugin',
  				type: 'clear',
  				timestamp: Date.now() - slideStart,
  				mode,
  				board
  			};
  			document.dispatchEvent( message );
  		}
  	}
  	function colorIndex( idx ) {
  		if ( !readOnly ) {
  			setColor( idx);
  		}
  	}

  	function colorNext() {
  		if ( !readOnly ) {
  			let idx = cycleColorNext();
  			setColor( idx);
  		}
  	}

  	function colorPrev() {
  		if ( !readOnly ) {
  			let idx = cycleColorPrev();
  			setColor( idx);
  		}
  	}

  	function resetSlideDrawings() {
  		slideStart = Date.now();
  		closeChalkboard();

  		clearCanvas( 0 );
  		clearCanvas( 1 );

  		mode = 1;
  		var slideData = getSlideData();
  		slideData.duration = 0;
  		slideData.events = [];
  		mode = 0;
  		var slideData = getSlideData();
  		slideData.duration = 0;
  		slideData.events = [];

  		updateStorage();
  	}

  	function resetSlide( force ) {
  		var ok = force || confirm( "Please confirm to delete chalkboard drawings on this slide!" );
  		if ( ok ) {
  //console.log("resetSlide ");
  			stopPlayback();
  			resetSlideDrawings();
  			// broadcast
  			var message = new CustomEvent( messageType );
  			message.content = {
  				sender: 'chalkboard-plugin',
  				type: 'resetSlide',
  				timestamp: Date.now() - slideStart,
  				mode,
  				board
  			};
  			document.dispatchEvent( message );
  		}
  	}
  	function resetStorage( force ) {
  		var ok = force || confirm( "Please confirm to delete all chalkboard drawings!" );
  		if ( ok ) {
  			stopPlayback();
  			slideStart = Date.now();
  			clearCanvas( 0 );
  			clearCanvas( 1 );
  			if ( mode == 1 ) {
  				closeChalkboard();
  			}

  			storage = [ {
  					width: Reveal.getConfig().width,
  					height: Reveal.getConfig().height,
  					data: []
  				},
  				{
  					width: Reveal.getConfig().width,
  					height: Reveal.getConfig().height,
  					data: []
  				}
  			];

  			if ( config.storage ) {
  				sessionStorage.setItem( config.storage, null );
  			}
  			// broadcast
  			var message = new CustomEvent( messageType );
  			message.content = {
  				sender: 'chalkboard-plugin',
  				type: 'init',
  				timestamp: Date.now() - slideStart,
  				storage,
  				mode,
  				board
  			};
  			document.dispatchEvent( message );
  		}
  	}
  	this.toggleNotesCanvas = toggleNotesCanvas;
  	this.toggleChalkboard = toggleChalkboard;
  	this.colorIndex = colorIndex;
  	this.colorNext = colorNext;
  	this.colorPrev = colorPrev;
  	this.clear = clear;
  	this.reset = resetSlide;
  	this.resetAll = resetStorage;
  	this.download = downloadData;
  	this.updateStorage = updateStorage;
  	this.getData = getData;
  	this.replayStroke = replayStroke;
  	this.loadState = loadState;
  	this.configure = configure;


  	for ( var key in keyBindings ) {
  		if ( keyBindings[ key ] ) {
  			Reveal.addKeyBinding( keyBindings[ key ], RevealChalkboard[ key ] );
  		}
  	}
  	return this;
  };

  (function () {
    const DEFAULT_STORYBOARD_CONFIG = {
      reveal: null,
      storyboardId: 'storyboard',
      trackId: 'storyboard-track',
      toggleKey: 'm',
    };

    function normalizeIndices(indices) {
      return {
        h: Number(indices?.h ?? 0),
        v: Number(indices?.v ?? 0),
        f: Number(indices?.f ?? -1),
      };
    }

    function getSlideLabel(section, index) {
      const heading = section.querySelector('h1, h2, h3');
      const text = heading ? heading.textContent.trim() : `Slide ${index + 1}`;
      return text.replace(/\s+/g, ' ');
    }

    function getStackChildLabel(section, hIndex, vIndex) {
      const heading = section.querySelector('h1, h2, h3');
      const text = heading ? heading.textContent.trim() : `Slide ${hIndex + 1}.${vIndex + 1}`;
      return text.replace(/\s+/g, ' ');
    }

    function createSlidePreview(section) {
      const sectionClone = section.cloneNode(true);
      sectionClone.classList.remove('past', 'future', 'stack');
      sectionClone.classList.add('present');
      // Reveal.js sets inline transform/opacity on slides during transitions.
      // Those inline styles beat CSS specificity and blank the preview, so clear them.
      sectionClone.style.removeProperty('opacity');
      sectionClone.style.removeProperty('visibility');
      sectionClone.style.removeProperty('display');
      sectionClone.style.removeProperty('transform');

      sectionClone.querySelectorAll('.fragment').forEach((node) => {
        node.classList.add('visible');
      });

      sectionClone.querySelectorAll('.yes-ring').forEach((node) => {
        node.style.animation = 'none';
        node.style.opacity = '0.45';
      });

      const scene = document.createElement('div');
      scene.className = 'story-scene reveal';

      const slides = document.createElement('div');
      slides.className = 'slides';
      slides.appendChild(sectionClone);
      scene.appendChild(slides);

      const preview = document.createElement('div');
      preview.className = 'story-preview';
      preview.appendChild(scene);
      return preview;
    }

    function initRevealStoryboard(options = {}) {
      const config = {
        ...DEFAULT_STORYBOARD_CONFIG,
        ...options,
      };

      const reveal = config.reveal || /** @type {any} */ (window).Reveal;
      if (!reveal) return;

      const storyboardId = config.storyboardId;
      const trackId = config.trackId;
      const toggleKey = (config.toggleKey || 'm').toLowerCase();

      const storyboard = document.getElementById(storyboardId);
      const storyboardTrack = document.getElementById(trackId);
      if (!storyboard || !storyboardTrack) return;

      // ── Boundary state ──────────────────────────────────────────────────────
      let currentBoundaryIndex = null;
      let currentReleasedRange = null;
      let liveRegion;

      function getRole() {
        return window.RevealIframeSyncAPI?.getStatus()?.role ?? null;
      }

      // Inject boundary-specific CSS once (idempotent).
      function injectBoundaryStyles() {
        if (document.getElementById('reveal-storyboard-boundary-css')) return;
        const style = document.createElement('style');
        style.id = 'reveal-storyboard-boundary-css';
        style.textContent = [
          '.storyboard-draggable { cursor: grab; touch-action: pan-y; }',
          '.storyboard-dragging { cursor: grabbing; user-select: none; }',
          '.story-preview, .story-preview * { pointer-events: none !important; }',
          '.story-thumb-wrap { position: relative; display: inline-flex; flex-shrink: 0; }',
          '.story-thumb-wrap.story-stack-wrap { flex-direction: column; gap: 6px; }',
          '.story-boundary-btn {',
          '  position: absolute; bottom: 4px; right: 4px;',
          '  width: 22px; height: 22px;',
          '  background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.3);',
          '  border-radius: 4px; color: #aaa; font-size: 12px;',
          '  cursor: pointer; display: flex; align-items: center; justify-content: center;',
          '  opacity: 0; transition: opacity 0.15s; z-index: 2;',
          '}',
          '.story-thumb-wrap:hover .story-boundary-btn,',
          '.story-thumb-wrap:focus-within .story-boundary-btn,',
          '.story-boundary-btn:focus { opacity: 1; }',
          '.story-thumb-wrap.story-thumb-boundary .story-boundary-btn {',
          '  opacity: 1; background: var(--cyan, #0ff); color: #000;',
          '  border-color: var(--cyan, #0ff);',
          '}',
          '.story-thumb-wrap.story-thumb-boundary .story-thumb {',
          '  border-color: var(--amber, #f90) !important;',
          '  box-shadow: 0 0 0 1px rgba(255,153,0,0.35) inset;',
          '}',
          '.story-thumb-wrap.story-thumb-released .story-thumb {',
          '  box-shadow: 0 0 0 8px rgba(0,200,160,0.34) inset;',
          '  border-color: rgba(0,200,160,0.78);',
          '}',
          '.story-thumb-wrap.story-thumb-release-start .story-thumb {',
          '  box-shadow: 0 0 0 16px rgba(0,200,160,0.40) inset;',
          '}',
          '.story-thumb-wrap.story-thumb-release-end .story-thumb {',
          '  box-shadow: 0 0 0 16px rgba(0,200,160,0.40) inset;',
          '}',
          '.story-thumb-wrap.story-thumb-boundary.story-thumb-released .story-thumb {',
          '  border-color: var(--amber, #f90) !important;',
          '  box-shadow: 0 0 0 16px rgba(0,200,160,0.34) inset, 0 0 0 2px rgba(255,153,0,0.55) inset;',
          '}',
          '.story-thumb-wrap.story-thumb-boundary.story-thumb-release-start .story-thumb,',
          '.story-thumb-wrap.story-thumb-boundary.story-thumb-release-end .story-thumb {',
          '  border-color: var(--amber, #f90) !important;',
          '  box-shadow: 0 0 0 16px rgba(0,200,160,0.34) inset, 0 0 0 4px rgba(255,153,0,0.68) inset;',
          '}',
          '.story-thumb-wrap.story-stack-wrap .story-thumb {',
          '  margin-bottom: 0;',
          '}',
          '.story-stack-badge {',
          '  position: absolute; top: 6px; right: 6px;',
          '  z-index: 2; padding: 2px 6px; border-radius: 999px;',
          '  background: rgba(0,0,0,0.65); color: #d5f5ff;',
          '  font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase;',
          '}',
          '.story-stack-meta {',
          '  display: inline-flex; margin-left: 6px; opacity: 0.72;',
          '  font-size: 11px;',
          '}',
          '.story-stack-children {',
          '  display: flex; gap: 4px; flex-wrap: wrap; max-width: 100%;',
          '}',
          '.story-stack-child {',
          '  min-width: 26px; height: 24px; padding: 0 8px;',
          '  border-radius: 999px; border: 1px solid rgba(255,255,255,0.18);',
          '  background: rgba(255,255,255,0.08); color: inherit;',
          '  cursor: pointer; font-size: 11px;',
          '}',
          '.story-stack-child:hover, .story-stack-child:focus {',
          '  border-color: rgba(255,255,255,0.42);',
          '  background: rgba(255,255,255,0.14);',
          '}',
          '.story-stack-child.active {',
          '  background: rgba(0,255,255,0.18);',
          '  border-color: var(--cyan, #0ff);',
          '}',
        ].join('\n');
        document.head.appendChild(style);
      }

      // Visually hidden live region appended to body (NOT inside storyboard which
      // has aria-hidden="true" when closed — that would suppress announcements).
      function createLiveRegion() {
        const el = document.createElement('div');
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
        el.style.cssText = [
          'position:absolute',
          'width:1px',
          'height:1px',
          'padding:0',
          'margin:-1px',
          'overflow:hidden',
          'clip:rect(0,0,0,0)',
          'white-space:nowrap',
          'border:0',
        ].join(';');
        document.body.appendChild(el);
        return el;
      }

      // Update the boundary marker visuals and announce the change.
      function applyStoryboardRangeClasses() {
        storyboardTrack.querySelectorAll('.story-thumb-wrap').forEach((wrap) => {
          const slideH = Number(wrap.dataset.slideH ?? wrap.dataset.slide);
          const isBoundary = currentBoundaryIndex !== null && slideH === currentBoundaryIndex;
          const isReleased = currentReleasedRange
            && slideH >= currentReleasedRange.startH
            && slideH <= currentReleasedRange.endH;
          const isReleaseStart = currentReleasedRange && slideH === currentReleasedRange.startH;
          const isReleaseEnd = currentReleasedRange && slideH === currentReleasedRange.endH;

          wrap.classList.toggle('story-thumb-boundary', isBoundary);
          wrap.classList.toggle('story-thumb-released', !!isReleased);
          wrap.classList.toggle('story-thumb-release-start', !!isReleaseStart);
          wrap.classList.toggle('story-thumb-release-end', !!isReleaseEnd);

          const btn = wrap.querySelector('.story-boundary-btn');
          if (btn) btn.setAttribute('aria-pressed', isBoundary ? 'true' : 'false');
        });
      }

      function updateBoundaryMarker(index, options = {}) {
        const nextBoundaryIndex = (index != null && Number.isFinite(Number(index)))
          ? Number(index)
          : null;
        const boundaryChanged = nextBoundaryIndex !== currentBoundaryIndex;

        currentBoundaryIndex = nextBoundaryIndex;

        applyStoryboardRangeClasses();

        if (options.announce === false || !boundaryChanged || !liveRegion) {
          return;
        }

        if (currentBoundaryIndex !== null) {
          liveRegion.textContent = `Student boundary set to slide ${currentBoundaryIndex + 1}`;
        } else {
          liveRegion.textContent = 'Student boundary cleared';
        }
      }

      function updateReleasedRange(range) {
        if (range && Number.isFinite(Number(range.startH)) && Number.isFinite(Number(range.endH))) {
          currentReleasedRange = {
            startH: Number(range.startH),
            endH: Number(range.endH),
          };
        } else {
          currentReleasedRange = null;
        }

        applyStoryboardRangeClasses();
      }

      function initTrackDragScroll() {
        const existingDragState = storyboardTrack.__syncDeckStoryboardDragState;
        if (existingDragState && typeof existingDragState.cleanup === 'function') {
          return existingDragState.cleanup;
        }

        const DRAG_THRESHOLD_PX = 6;
        const dragAbortController = typeof AbortController === 'function'
          ? new AbortController()
          : null;
        let activePointerId = null;
        let dragStartX = 0;
        let dragStartScrollLeft = 0;
        let pointerDown = false;
        let didDrag = false;
        let suppressClick = false;
        let suppressClickTimeoutId = null;

        function addDragListener(target, type, handler, options = {}) {
          const listenerOptions = dragAbortController
            ? { ...options, signal: dragAbortController.signal }
            : options;
          target.addEventListener(type, handler, listenerOptions);
        }

        function resetPointerDrag() {
          pointerDown = false;
          didDrag = false;
          activePointerId = null;
          storyboardTrack.classList.remove('storyboard-dragging');
        }

        function cleanupPointerDrag() {
          resetPointerDrag();
          if (suppressClickTimeoutId !== null) {
            clearTimeout(suppressClickTimeoutId);
            suppressClickTimeoutId = null;
            suppressClick = false;
          }
          storyboardTrack.classList.remove('storyboard-draggable');
          if (dragAbortController) {
            dragAbortController.abort();
          }
          delete storyboardTrack.__syncDeckStoryboardDragState;
        }

        storyboardTrack.__syncDeckStoryboardDragState = {
          cleanup: cleanupPointerDrag,
        };

        storyboardTrack.classList.add('storyboard-draggable');

        addDragListener(storyboardTrack, 'pointerdown', (event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;
          // Ignore additional pointers while a drag is already in progress
          // (e.g. a second finger on touch) to prevent mid-gesture state reset.
          if (activePointerId !== null) return;
          pointerDown = true;
          didDrag = false;
          activePointerId = event.pointerId;
          dragStartX = event.clientX;
          dragStartScrollLeft = storyboardTrack.scrollLeft;
        });

        addDragListener(window, 'pointermove', (event) => {
          if (!pointerDown || event.pointerId !== activePointerId) return;

          const pointerReleased = event.buttons === 0
            || (event.pointerType !== 'mouse' && event.pressure === 0);
          if (pointerReleased) {
            resetPointerDrag();
            return;
          }

          const deltaX = event.clientX - dragStartX;
          if (!didDrag && Math.abs(deltaX) >= DRAG_THRESHOLD_PX) {
            didDrag = true;
            storyboardTrack.classList.add('storyboard-dragging');
          }
          if (!didDrag) return;

          storyboardTrack.scrollLeft = dragStartScrollLeft - deltaX;
          event.preventDefault();
        });

        function endPointerDrag(event) {
          if (activePointerId == null || event.pointerId !== activePointerId) return;

          if (didDrag) {
            if (suppressClickTimeoutId !== null) {
              clearTimeout(suppressClickTimeoutId);
            }
            suppressClick = true;
            suppressClickTimeoutId = setTimeout(() => {
              suppressClickTimeoutId = null;
              suppressClick = false;
            }, 0);
          }

          resetPointerDrag();
        }

        addDragListener(window, 'pointerup', endPointerDrag);
        addDragListener(window, 'pointercancel', endPointerDrag);

        addDragListener(window, 'blur', () => {
          resetPointerDrag();
        });

        addDragListener(storyboardTrack, 'dragstart', (event) => {
          event.preventDefault();
        });

        addDragListener(storyboardTrack, 'click', (event) => {
          if (!suppressClick) return;
          event.preventDefault();
          event.stopPropagation();
        }, { capture: true });

        return cleanupPointerDrag;
      }

      injectBoundaryStyles();
      liveRegion = createLiveRegion();
      initTrackDragScroll();

      // ── Slide data ──────────────────────────────────────────────────────────
      const slideSections = Array.from(document.querySelectorAll('.reveal .slides > section'));

      function getChildSections(section) {
        return Array.from(section.children).filter((node) => node.tagName === 'SECTION');
      }

      function getStoryboardEntries() {
        return slideSections.map((section, h) => {
          const childSections = getChildSections(section);
          const isStack = childSections.length > 0;
          return {
            h,
            section,
            isStack,
            childSections: isStack ? childSections : [section],
          };
        });
      }

      function getSyncStatus() {
        const syncApi = window.RevealIframeSyncAPI;
        if (!syncApi || typeof syncApi.getStatus !== 'function') return null;
        return syncApi.getStatus();
      }

      function getReleasedRange(status) {
        const explicitRange = status?.releasedRegion;
        if (explicitRange && Number.isFinite(Number(explicitRange.startH)) && Number.isFinite(Number(explicitRange.endH))) {
          return {
            startH: Number(explicitRange.startH),
            endH: Number(explicitRange.endH),
          };
        }

        if (!status?.studentBoundary) return null;

        const boundaryH = Number(status.studentBoundary.h);
        const currentH = Number(status.indices?.h ?? reveal.getIndices().h ?? 0);
        if (!Number.isFinite(boundaryH) || !Number.isFinite(currentH)) return null;

        return {
          startH: Math.min(currentH, boundaryH),
          endH: Math.max(currentH, boundaryH),
        };
      }

      function getAllowedMaxSlideIndex() {
        const lastIndex = Math.max(0, slideSections.length - 1);
        const syncApi = window.RevealIframeSyncAPI;
        if (!syncApi || typeof syncApi.getStatus !== 'function') return lastIndex;

        const status = syncApi.getStatus();
        if (!status) return lastIndex;

        // Never restrict when:
        //  - role is instructor (they can always see everything)
        //  - forward navigation is explicitly allowed
        //  - boundary was set locally (this iframe is the acting instructor, even
        //    if its role was not yet upgraded to 'instructor' by the host)
        if (status.role !== 'student' || status.capabilities?.canNavigateForward || status.boundaryIsLocal) {
          return lastIndex;
        }

        // Only restrict when an explicit boundary has been set.
        // Without a boundary (null), show all slides — navigation enforcement
        // handles snap-back separately and avoids blanking at an arbitrary position.
        if (status.studentBoundary == null) return lastIndex;
        const boundaryH = Number(status.studentBoundary.h);
        if (!Number.isFinite(boundaryH)) return lastIndex;
        return Math.max(0, Math.min(lastIndex, boundaryH));
      }

      function renderStoryboard() {
        storyboardTrack.innerHTML = '';
        storyboardTrack.setAttribute('role', 'group');
        storyboardTrack.setAttribute('aria-label', 'Slide storyboard');

        const status = getSyncStatus();
        const statusBoundaryH = status?.studentBoundary?.h;
        updateBoundaryMarker(
          statusBoundaryH != null ? Number(statusBoundaryH) : null,
          { announce: false },
        );
        const activeIndices = normalizeIndices(reveal.getIndices());
        const entries = getStoryboardEntries();
        const allowedMaxIndex = getAllowedMaxSlideIndex();
        const hiddenCount = Math.max(0, entries.length - (allowedMaxIndex + 1));
        const isInstructor = getRole() === 'instructor';

        entries.forEach((entry) => {
          if (entry.h > allowedMaxIndex) return;

          // Wrapper div — holds nav button + optional boundary button.
          // data-slide on the wrapper is read by updateBoundaryMarker.
          const wrap = document.createElement('div');
          wrap.className = `story-thumb-wrap${entry.isStack ? ' story-stack-wrap' : ''}`;
          wrap.dataset.slide = String(entry.h);
          wrap.dataset.slideH = String(entry.h);

          const previewV = (entry.isStack && activeIndices.h === entry.h)
            ? Math.max(0, Math.min(entry.childSections.length - 1, activeIndices.v))
            : 0;
          const previewSection = entry.childSections[previewV] || entry.childSections[0];

          // Navigation button (data-slide kept here too for updateStoryboardActive compat).
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'story-thumb';
          button.dataset.slide = String(entry.h);
          button.dataset.slideH = String(entry.h);
          button.setAttribute('aria-label', `Go to ${getSlideLabel(previewSection, entry.h)}`);

          const num = document.createElement('span');
          num.className = 'story-num';
          num.textContent = String(entry.h + 1).padStart(2, '0');

          const caption = document.createElement('span');
          caption.className = 'story-caption';
          caption.textContent = getSlideLabel(previewSection, entry.h);

          button.appendChild(num);
          button.appendChild(createSlidePreview(previewSection));
          button.appendChild(caption);
          if (entry.isStack) {
            const badge = document.createElement('span');
            badge.className = 'story-stack-badge';
            badge.textContent = 'Stack';
            button.appendChild(badge);

            const meta = document.createElement('span');
            meta.className = 'story-stack-meta';
            meta.textContent = `${entry.childSections.length} slides`;
            caption.appendChild(meta);
          }
          button.addEventListener('click', () => {
            const currentIndices = normalizeIndices(reveal.getIndices());
            const targetV = currentIndices.h === entry.h
              ? Math.max(0, Math.min(entry.childSections.length - 1, currentIndices.v))
              : 0;
            reveal.slide(entry.h, entry.isStack ? targetV : 0);
          });
          wrap.appendChild(button);

          if (entry.isStack) {
            const childRail = document.createElement('div');
            childRail.className = 'story-stack-children';
            childRail.setAttribute('role', 'group');
            childRail.setAttribute('aria-label', `Slides in stack ${entry.h + 1}`);

            entry.childSections.forEach((childSection, v) => {
              const childButton = document.createElement('button');
              childButton.type = 'button';
              childButton.className = 'story-stack-child';
              childButton.dataset.slideH = String(entry.h);
              childButton.dataset.slideV = String(v);
              childButton.textContent = String(v + 1);
              const childLabel = getStackChildLabel(childSection, entry.h, v);
              childButton.title = childLabel;
              childButton.setAttribute('aria-label', `Go to ${childLabel}`);
              childButton.addEventListener('click', (event) => {
                event.stopPropagation();
                reveal.slide(entry.h, v);
              });
              childRail.appendChild(childButton);
            });

            wrap.appendChild(childRail);
          }

          // Boundary button — instructor only. Not rendered for students so
          // there is nothing to accidentally activate.
          if (isInstructor) {
            const boundaryBtn = document.createElement('button');
            boundaryBtn.type = 'button';
            boundaryBtn.className = 'story-boundary-btn';
            boundaryBtn.setAttribute('aria-label', `Set student boundary to slide ${entry.h + 1}`);
            boundaryBtn.setAttribute('aria-pressed', 'false');
            boundaryBtn.textContent = '\u2691'; // ⚑ flag
            boundaryBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              // Toggle: clicking the active boundary slide clears it.
              const isClear = currentBoundaryIndex === entry.h;
              window.dispatchEvent(new CustomEvent('reveal-storyboard-boundary-moved', {
                detail: isClear ? { indices: null } : { indices: { h: entry.h, v: 0, f: -1 } },
              }));
            });
            wrap.appendChild(boundaryBtn);
          }

          storyboardTrack.appendChild(wrap);
        });

        if (hiddenCount > 0) {
          const lockedCard = document.createElement('div');
          lockedCard.className = 'story-thumb story-thumb-locked';
          lockedCard.setAttribute('aria-label', `${hiddenCount} additional slides are currently locked`);

          const num = document.createElement('span');
          num.className = 'story-num';
          num.textContent = '🔒';

          const body = document.createElement('div');
          body.className = 'story-lock-body';
          body.textContent = `+${hiddenCount} locked`;

          const caption = document.createElement('span');
          caption.className = 'story-caption';
          caption.textContent = 'Host-controlled slides';

          lockedCard.appendChild(num);
          lockedCard.appendChild(body);
          lockedCard.appendChild(caption);
          storyboardTrack.appendChild(lockedCard);
        }

        updateReleasedRange(getReleasedRange(status));

        // Reapply boundary marker after re-render (handles role-change refreshes).
        if (currentBoundaryIndex !== null) {
          updateBoundaryMarker(currentBoundaryIndex, { announce: false });
        }
      }

      function updateStoryboardActive(indices) {
        const active = normalizeIndices(indices);
        const thumbs = storyboardTrack.querySelectorAll('.story-thumb');
        thumbs.forEach((thumb) => {
          const slideH = Number(thumb.dataset.slideH ?? thumb.dataset.slide);
          thumb.classList.toggle('active', slideH === active.h);
        });

        const childButtons = storyboardTrack.querySelectorAll('.story-stack-child');
        childButtons.forEach((button) => {
          const slideH = Number(button.dataset.slideH);
          const slideV = Number(button.dataset.slideV);
          button.classList.toggle('active', slideH === active.h && slideV === active.v);
        });

        const activeThumb = storyboardTrack.querySelector('.story-thumb.active');
        if (activeThumb) {
          activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      function toggleStoryboard() {
        document.body.classList.toggle('storyboard-open');
        const isOpen = document.body.classList.contains('storyboard-open');
        storyboard.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        reveal.layout();
        // Notify reveal-iframe-sync (and any other listener) so the host can
        // reflect the storyboard state in its own UI.
        window.dispatchEvent(new CustomEvent('reveal-storyboard-changed', { detail: { open: isOpen } }));
      }

      function refreshStoryboard() {
        renderStoryboard();
        updateStoryboardActive(reveal.getIndices());
      }

      refreshStoryboard();

      reveal.on('slidechanged', (event) => {
        updateStoryboardActive({ h: event.indexh, v: event.indexv, f: -1 });
        updateReleasedRange(getReleasedRange(getSyncStatus()));
      });

      window.addEventListener('reveal-iframesync-status', () => {
        refreshStoryboard();
      });

      // M key (or configured toggleKey) opens/closes the storyboard.
      document.addEventListener('keydown', (event) => {
        const tagName = document.activeElement?.tagName;
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key.toLowerCase() === toggleKey) {
          event.preventDefault();
          toggleStoryboard();
        }
      });

      // Arrow Left/Right move focus between nav buttons when the storyboard is focused.
      // Scoped to storyboardTrack so arrow keys only fire when inside the strip.
      storyboardTrack.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const activeEl = document.activeElement;
        const focusWithinStoryboard = activeEl && storyboardTrack.contains(activeEl);
        if (!focusWithinStoryboard) return;

        const navBtns = Array.from(
          storyboardTrack.querySelectorAll('button.story-thumb, button.story-stack-child'),
        );
        const cur = navBtns.indexOf(activeEl);
        if (cur === -1) return;
        e.preventDefault(); // prevent Reveal from consuming arrow keys
        const next = e.key === 'ArrowRight'
          ? Math.min(cur + 1, navBtns.length - 1)
          : Math.max(cur - 1, 0);
        navBtns[next].focus();
        navBtns[next].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });

      // Allow reveal-iframe-sync (and any other code) to drive the storyboard
      // without a direct reference to toggleStoryboard().
      // Used when the container site sends overview commands or setState with overview:true/false.
      window.addEventListener('reveal-storyboard-toggle', () => {
        toggleStoryboard();
      });

      window.addEventListener('reveal-storyboard-set', (event) => {
        const shouldBeOpen = !!event.detail?.open;
        const isOpen = document.body.classList.contains('storyboard-open');
        if (shouldBeOpen !== isOpen) toggleStoryboard();
      });

      // Incoming boundary update from reveal-iframe-sync (triggered when host sends
      // setStudentBoundary command to either instructor or student iframe).
      window.addEventListener('reveal-storyboard-boundary-update', (event) => {
        const h = event.detail?.indices?.h;
        updateBoundaryMarker(h != null ? Number(h) : null);
      });
    }

    window.initRevealStoryboard = initRevealStoryboard;
  })();

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
   *     deckId: '2d-arrays',          // optional logical deck id
   *     hostOrigin: '*',              // recommended: exact host origin in production
   *     allowedOrigins: ['*'],        // origins accepted for inbound commands
   *   }
   * });
   *
   * Role note:
   * The plugin always starts in 'standalone' mode until a host message or
   * RevealIframeSyncAPI.setRole(...) explicitly promotes it to 'student' or
   * 'instructor'. This avoids exposing managed-role UI in unmanaged contexts.
   * </script>
   */

  (function () {
    const IFRAME_SYNC_VERSION = '2.1.0';
    const NAV_LOCK_STYLE_ID = 'reveal-iframe-sync-nav-lock-styles';

    const DEFAULTS = {
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

    function normalizePresentationTitle(value) {
      if (typeof value !== 'string') return null;
      const trimmed = value.trim();
      return trimmed ? trimmed : null;
    }

    function getPresentationMetadata() {
      const title = normalizePresentationTitle(document.title);
      if (!title) return {};
      return { title };
    }

    function emitMetadata(ctx, options) {
      const metadata = getPresentationMetadata();
      const serialized = JSON.stringify(metadata);
      const force = !!options?.force;
      const hasMetadata = Object.keys(metadata).length > 0;

      if (!hasMetadata && !force) return metadata;

      if (!force && serialized === ctx.state.lastPublishedMetadata) return metadata;

      ctx.state.lastPublishedMetadata = serialized;
      safePostToParent(ctx, 'metadata', metadata);
      return metadata;
    }

    function debugLog(...args) {
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

      .reveal .controls [data-syncdeck-visible="true"] {
        visibility: visible !important;
        opacity: 1 !important;
      }

      .reveal .controls .navigate-left,
      .reveal .controls .navigate-right,
      .reveal .controls .navigate-up,
      .reveal .controls .navigate-down {
        transition: opacity 240ms ease;
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

    function isSupportedRole(role) {
      return role === 'student' || role === 'instructor' || role === 'standalone';
    }

    function resetBoundaryState(ctx) {
      ctx.state.studentMaxIndices = titleSlideBoundary();
      ctx.state.hasExplicitBoundary = false;
      ctx.state.boundaryIsLocal = false;
      ctx.state.exactStudentMaxIndices = null;
      ctx.state.lastAllowedStudentIndices = titleSlideBoundary();
      ctx.state.topSlideFragmentsByH = {};
      ctx.state.releaseStartH = null;
      ctx.state.releaseEndH = null;
      window.dispatchEvent(new CustomEvent('reveal-storyboard-boundary-update', {
        detail: { indices: getStudentBoundary(ctx) },
      }));
    }

    function applyRoleChange(ctx, role, readyReason) {
      if (!isSupportedRole(role)) return false;

      if (ctx.state.standaloneControlRefreshTimer) {
        clearTimeout(ctx.state.standaloneControlRefreshTimer);
        ctx.state.standaloneControlRefreshTimer = null;
      }

      ctx.state.role = role;
      ctx.state.pauseLockedByHost = false;
      applyPauseLockUi(ctx);

      if (ctx.state.role === 'student') {
        // Reset boundary to title slide when demoting to student.
        resetBoundaryState(ctx);
        // Prevent student from drawing on the chalkboard canvas.
        callChalkboard(ctx, 'configure', [{ readOnly: true }]);
      } else if (ctx.state.role === 'standalone') {
        // Solo mode should not retain host-controlled student boundaries.
        resetBoundaryState(ctx);
        // Standalone decks should regain full chalkboard control immediately.
        callChalkboard(ctx, 'configure', [{ readOnly: false }]);
      } else if (ctx.state.role === 'instructor') {
        // Instructor role must also keep chalkboard input unrestricted.
        callChalkboard(ctx, 'configure', [{ readOnly: false }]);
      }

      // Update navigation controls to reflect new role.
      updateNavigationControls(ctx);
      safePostToParent(ctx, 'roleChanged', { role: ctx.state.role });
      announceReady(ctx, readyReason);
      emitActivityRequestForCurrentSlide(ctx);

      if (canBroadcastChalkboard(ctx)) {
        // Broadcast the current drawing state immediately so the host can
        // relay it onward when this role can author chalkboard state.
        // Covers both first load and reloads —
        // when sessionStorage is configured the plugin restores its drawings
        // before setRole arrives, so downstream views get re-synced automatically.
        const cbApi = chalkboardApi();
        if (cbApi) {
          safePostToParent(ctx, 'chalkboardState', { storage: cbApi.getData() });
        }
      }

      return true;
    }

    function getRoleCapabilities(ctx) {
      const isInstructor = ctx.state.role === 'instructor';
      const isStandalone = ctx.state.role === 'standalone';
      return {
        canNavigateBack: (isInstructor || isStandalone) ? true : !!ctx.config.studentCanNavigateBack,
        canNavigateForward: (isInstructor || isStandalone) ? true : !!ctx.config.studentCanNavigateForward,
      };
    }

    function canBroadcastChalkboard(ctx) {
      return ctx.state.role === 'instructor' || ctx.state.role === 'standalone';
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

    function getSlideElement(indices) {
      const current = normalizeIndices(indices);
      const topLevelSlides = document.querySelectorAll('.reveal .slides > section');
      const topLevelSlide = topLevelSlides[Number(current.h)];
      if (!topLevelSlide) return null;

      const childSlides = topLevelSlide.querySelectorAll(':scope > section');
      if (!childSlides.length) return topLevelSlide;
      return childSlides[Math.max(0, Math.min(childSlides.length - 1, Number(current.v)))] || null;
    }

    function parseActivityOptions(rawOptions) {
      if (typeof rawOptions !== 'string' || rawOptions.trim() === '') {
        return {};
      }

      try {
        const parsed = JSON.parse(rawOptions);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          return {};
        }
        return parsed;
      } catch {
        return {};
      }
    }

    function normalizeActivityTrigger(rawTrigger) {
      if (typeof rawTrigger !== 'string') {
        return 'slide-enter';
      }

      const trimmedTrigger = rawTrigger.trim();
      return trimmedTrigger || 'slide-enter';
    }

    function buildActivityRequestPayload(slide, indices) {
      if (!(slide instanceof Element)) return null;

      const activityId = slide.getAttribute('data-activity-id');
      if (typeof activityId !== 'string' || activityId.trim() === '') {
        return null;
      }

      const resolvedIndices = normalizeIndices(indices);
      return {
        activityId: activityId.trim(),
        indices: resolvedIndices,
        instanceKey: `${activityId.trim()}:${resolvedIndices.h}:${resolvedIndices.v}`,
        activityOptions: parseActivityOptions(slide.getAttribute('data-activity-options')),
        trigger: normalizeActivityTrigger(slide.getAttribute('data-activity-trigger')),
      };
    }

    function getActivityRequestForCurrentSlide(ctx) {
      const currentIndices = normalizeIndices(ctx.deck.getIndices());
      const currentSlide = ctx.deck.getCurrentSlide?.() || getSlideElement(currentIndices);
      const primaryRequest = buildActivityRequestPayload(currentSlide, currentIndices);
      if (!primaryRequest) return null;

      const topLevelSlides = document.querySelectorAll('.reveal .slides > section');
      const topLevelSlide = topLevelSlides[currentIndices.h];
      const childSlides = Array.from(topLevelSlide?.querySelectorAll(':scope > section') || []);
      if (!childSlides.length) {
        return primaryRequest;
      }

      const stackRequests = childSlides
        .map((slide, childIndex) => buildActivityRequestPayload(slide, {
          h: currentIndices.h,
          v: childIndex,
          f: childIndex === currentIndices.v ? currentIndices.f : -1,
        }))
        .filter((request) => request && request.instanceKey !== primaryRequest.instanceKey);

      if (!stackRequests.length) {
        return primaryRequest;
      }

      return {
        ...primaryRequest,
        stackRequests,
      };
    }

    function emitActivityRequestForCurrentSlide(ctx) {
      if (ctx.state.role === 'student') return false;

      const payload = getActivityRequestForCurrentSlide(ctx);
      if (!payload) return false;

      safePostToParent(ctx, 'activityRequest', payload);
      return true;
    }

    function getTopLevelSlideCount() {
      return document.querySelectorAll('.reveal .slides > section').length;
    }

    function getChildSlideCount(h) {
      const topLevelSlides = document.querySelectorAll('.reveal .slides > section');
      const topLevelSlide = topLevelSlides[Number(h)];
      if (!topLevelSlide) return 0;
      return topLevelSlide.querySelectorAll(':scope > section').length;
    }

    function getFragmentCount(indices) {
      const slide = getSlideElement(indices);
      if (!slide) return 0;
      return slide.querySelectorAll('.fragment').length;
    }

    function stepIndicesNext(indices) {
      const current = normalizeIndices(indices);
      const fragmentCount = getFragmentCount(current);
      if (current.f < fragmentCount - 1) {
        return { h: current.h, v: current.v, f: current.f + 1 };
      }

      const childSlideCount = getChildSlideCount(current.h);
      if (childSlideCount > 0 && current.v < childSlideCount - 1) {
        return { h: current.h, v: current.v + 1, f: -1 };
      }

      return {
        h: Math.min(getTopLevelSlideCount() - 1, current.h + 1),
        v: 0,
        f: -1,
      };
    }

    function stepIndicesPrev(indices) {
      const current = normalizeIndices(indices);
      if (current.f > -1) {
        return { h: current.h, v: current.v, f: current.f - 1 };
      }

      const childSlideCount = getChildSlideCount(current.h);
      if (childSlideCount > 0 && current.v > 0) {
        const prevV = current.v - 1;
        return {
          h: current.h,
          v: prevV,
          f: getFragmentCount({ h: current.h, v: prevV, f: -1 }) - 1,
        };
      }

      if (current.h <= 0) {
        return { h: 0, v: 0, f: -1 };
      }

      const prevH = current.h - 1;
      const prevChildCount = getChildSlideCount(prevH);
      const prevV = prevChildCount > 0 ? prevChildCount - 1 : 0;
      return {
        h: prevH,
        v: prevV,
        f: getFragmentCount({ h: prevH, v: prevV, f: -1 }) - 1,
      };
    }

    function revealAllFragmentsIndexForSlide(indices) {
      const slide = getSlideElement(indices);
      if (!slide) return -1;
      const fragments = slide.querySelectorAll('.fragment');
      return fragments.length ? fragments.length - 1 : -1;
    }

    function hasExplicitHorizontalReleaseRange(ctx) {
      if (ctx.state.role !== 'student' || !ctx.state.hasExplicitBoundary) {
        return false;
      }
      if (!Number.isFinite(ctx.state.releaseStartH) || !Number.isFinite(ctx.state.releaseEndH)) {
        return false;
      }
      return Number(ctx.state.releaseStartH) !== Number(ctx.state.releaseEndH);
    }

    function isStudentReleasedFlatSlide(ctx, indices) {
      const current = normalizeIndices(indices);
      if (ctx.state.role !== 'student' || current.v !== 0) {
        return false;
      }
      if (!hasExplicitHorizontalReleaseRange(ctx)) {
        return false;
      }

      const startH = Math.min(Number(ctx.state.releaseStartH), Number(ctx.state.releaseEndH));
      const endH = Math.max(Number(ctx.state.releaseStartH), Number(ctx.state.releaseEndH));
      if (current.h < startH || current.h > endH) {
        return false;
      }

      const exactBoundary = exactTopSlideBoundary(ctx);
      return !(exactBoundary && exactBoundary.h === current.h);
    }

    function normalizeStudentVisibleIndices(ctx, indices) {
      const current = normalizeIndices(indices);
      if (ctx.state.role !== 'student') {
        return current;
      }

      if (current.v > 0) {
        return {
          h: current.h,
          v: current.v,
          f: revealAllFragmentsIndexForSlide(current),
        };
      }

      if (isStudentReleasedFlatSlide(ctx, current)) {
        return {
          h: current.h,
          v: current.v,
          f: revealAllFragmentsIndexForSlide(current),
        };
      }

      return current;
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
      const root = document;
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
      if (isStudentReleasedFlatSlide(ctx, nav.current)) return false;
      if (!hasForwardFragmentStep(ctx.deck)) return false;
      if (nav.current.v !== 0) return false;

      const exactBoundary = exactTopSlideBoundary(ctx);
      if (!exactBoundary) return true;
      if (nav.current.h !== exactBoundary.h) return true;

      return nav.current.f < exactBoundary.f;
    }

    function canRewindLeftWithinHF(ctx, nav) {
      if (isStudentReleasedFlatSlide(ctx, nav.current)) return false;
      if (!hasBackwardFragmentStep(ctx.deck)) return false;
      if (!nav.canGoBack) return false;
      return nav.current.v === 0;
    }

    function moveVertical(ctx, direction) {
      const current = normalizeIndices(ctx.deck.getIndices());
      const routes = getDirectionalRoutes(ctx.deck);
      const canMoveVertically = direction === 'up' ? routes.hasUp : routes.hasDown;

      debugLog(() => ['verticalMethod:start', {
        methodName: direction,
        role: ctx.state.role,
        current,
        routes,
        canMoveVertically,
        activeElement: describeElement(document.activeElement),
      }]);
      if (ctx.state.role === 'student') {
        const nav = buildNavigationStatus(ctx);
        if (!(direction === 'up' ? nav.canGoUp : nav.canGoDown)) {
          debugLog(() => ['verticalMethod:block', { methodName: direction, nav }]);
          return undefined;
        }
      }

      if (!canMoveVertically) {
        debugLog(() => ['verticalMethod:noRoute', { methodName: direction, current, routes }]);
        return undefined;
      }

      if (direction === 'down' && current.v === 0) {
        rememberTopSlideFragment(ctx, current);
        suppressFutureFragmentsOnSlide(ctx.deck.getCurrentSlide?.(), current.f);
      }

      const targetV = direction === 'up' ? current.v - 1 : current.v + 1;
      const targetF = targetV === 0
        ? resolveTopSlideReturnFragment(ctx, current.h)
        : (ctx.state.role === 'student'
          ? revealAllFragmentsIndexForSlide({ h: current.h, v: targetV, f: -1 })
          : -1);

      if (targetV === 0) {
        clearSuppressedFutureFragments();
      }

      debugLog(() => ['verticalMethod:slide', {
        methodName: direction,
        from: current,
        to: { h: current.h, v: targetV, f: targetF },
      }]);
      return ctx.deck.slide?.(current.h, targetV, targetF);
    }

    function moveHorizontal(ctx, direction) {
      const current = normalizeIndices(ctx.deck.getIndices());
      const routes = getDirectionalRoutes(ctx.deck);
      const hasHorizontalRoute = direction === 'left' ? routes.hasLeft : routes.hasRight;
      const hasFragmentStep = direction === 'left'
        ? hasBackwardFragmentStep(ctx.deck)
        : hasForwardFragmentStep(ctx.deck);

      debugLog(() => ['horizontalMethod:start', {
        methodName: direction,
        role: ctx.state.role,
        current,
        routes,
        hasHorizontalRoute,
        hasFragmentStep,
        activeElement: describeElement(document.activeElement),
      }]);

      if (ctx.state.role === 'student') {
        const nav = buildNavigationStatus(ctx);
        if (direction === 'left') {
          if (canRewindLeftWithinHF(ctx, nav)) {
            const target = { h: current.h, v: current.v, f: current.f - 1 };
            debugLog(() => ['horizontalMethod:studentPrevFragment', { from: current, to: target, nav }]);
            return ctx.deck.slide?.(target.h, target.v, target.f);
          }
          if (nav.canGoLeft && hasHorizontalRoute) {
            const target = normalizeStudentVisibleIndices(ctx, { h: current.h - 1, v: 0, f: -1 });
            debugLog(() => ['horizontalMethod:studentSlideHorizontal', { from: current, to: target, nav }]);
            return ctx.deck.slide?.(target.h, target.v, target.f);
          }
          debugLog(() => ['horizontalMethod:studentBlocked', { methodName: direction, nav, current }]);
          return undefined;
        }

        if (canAdvanceRightWithinHF(ctx, nav)) {
          const target = { h: current.h, v: current.v, f: current.f + 1 };
          debugLog(() => ['horizontalMethod:studentNextFragment', { from: current, to: target, nav }]);
          return ctx.deck.slide?.(target.h, target.v, target.f);
        }
        if (nav.canGoRight && hasHorizontalRoute) {
          const target = normalizeStudentVisibleIndices(ctx, { h: current.h + 1, v: 0, f: -1 });
          debugLog(() => ['horizontalMethod:studentSlideHorizontal', { from: current, to: target, nav }]);
          return ctx.deck.slide?.(target.h, target.v, target.f);
        }
        debugLog(() => ['horizontalMethod:studentBlocked', { methodName: direction, nav, current }]);
        return undefined;
      }

      if (direction === 'left' && hasFragmentStep) {
        const target = { h: current.h, v: current.v, f: current.f - 1 };
        debugLog(() => ['horizontalMethod:prevFragment', { from: current, to: target }]);
        return ctx.deck.slide?.(target.h, target.v, target.f);
      }

      if (direction === 'right' && hasFragmentStep) {
        const target = { h: current.h, v: current.v, f: current.f + 1 };
        debugLog(() => ['horizontalMethod:nextFragment', { from: current, to: target }]);
        return ctx.deck.slide?.(target.h, target.v, target.f);
      }

      if (hasHorizontalRoute) {
        const target = { h: direction === 'left' ? current.h - 1 : current.h + 1, v: 0, f: -1 };
        debugLog(() => ['horizontalMethod:slideHorizontal', { from: current, to: target }]);
        return ctx.deck.slide?.(target.h, target.v, target.f);
      }

      debugLog(() => ['horizontalMethod:blocked', { methodName: direction, current, routes }]);
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
      debugLog(() => ['updateNavigationControls', {
        role: ctx.state.role,
        current: nav.current,
        canGoLeft: nav.canGoLeft,
        canGoRight: nav.canGoRight,
        canGoUp: nav.canGoUp,
        canGoDown: nav.canGoDown,
        canGoBack: nav.canGoBack,
        canGoForward: nav.canGoForward,
        isUnrestricted,
      }]);

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

    function scheduleStandaloneControlRefresh(ctx, delayMs) {
      if (ctx.state.standaloneControlRefreshTimer) {
        clearTimeout(ctx.state.standaloneControlRefreshTimer);
        ctx.state.standaloneControlRefreshTimer = null;
      }

      if (ctx.state.role !== 'standalone') return;

      ctx.state.standaloneControlRefreshTimer = window.setTimeout(() => {
        ctx.state.standaloneControlRefreshTimer = null;
        if (ctx.state.role !== 'standalone') return;
        updateNavigationControls(ctx);
      }, Number.isFinite(Number(delayMs)) ? Number(delayMs) : 1000);
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
      emitMetadata(ctx);
      emitLocalStatusEvent(ctx, reason || 'init');
    }

    function wireMetadataObserver(ctx) {
      const publishMetadata = () => emitMetadata(ctx);
      if (typeof MutationObserver !== 'function') {
        window.addEventListener('load', publishMetadata);
        ctx.cleanup.push(() => window.removeEventListener('load', publishMetadata));
        return;
      }

      let titleObserver = null;

      function disconnectTitleObserver() {
        if (!titleObserver) return;
        titleObserver.disconnect();
        titleObserver = null;
      }

      function observeTitleElement() {
        disconnectTitleObserver();

        const titleEl = document.querySelector('head > title');
        if (!titleEl) return;

        titleObserver = new MutationObserver(() => {
          publishMetadata();
        });

        titleObserver.observe(titleEl, {
          childList: true,
          characterData: true,
          subtree: true,
        });
      }

      if (document.head) {
        const headObserver = new MutationObserver((mutations) => {
          const titleChanged = mutations.some((mutation) => {
            if (mutation.type !== 'childList') return false;

            return [...mutation.addedNodes, ...mutation.removedNodes].some((node) => (
              node.nodeType === Node.ELEMENT_NODE
              && node.nodeName === 'TITLE'
            ));
          });

          if (!titleChanged) return;

          observeTitleElement();
          publishMetadata();
        });

        headObserver.observe(document.head, {
          childList: true,
        });
        observeTitleElement();
        ctx.cleanup.push(() => {
          headObserver.disconnect();
          disconnectTitleObserver();
        });
      }

      window.addEventListener('load', publishMetadata);
      ctx.cleanup.push(() => window.removeEventListener('load', publishMetadata));
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

    function ensureNativePauseSuppressionStyles() {
      if (document.getElementById('syncdeck-native-pause-suppression')) return;

      const style = document.createElement('style');
      style.id = 'syncdeck-native-pause-suppression';
      style.textContent = [
        'body[data-syncdeck-hide-native-pause="true"] .pause-overlay,',
        'body[data-syncdeck-hide-native-pause="true"] .pause-help,',
        'body[data-syncdeck-hide-native-pause="true"] .resume-button,',
        'body[data-syncdeck-hide-native-pause="true"] .pause-screen,',
        'body[data-syncdeck-hide-native-pause="true"] [aria-label="Resume presentation"],',
        'body[data-syncdeck-hide-native-pause="true"] button[title="Resume presentation"] {',
        '  display: none !important;',
        '  visibility: hidden !important;',
        '  opacity: 0 !important;',
        '}',
      ].join('\n');
      document.head.appendChild(style);
    }

    function syncNativePauseUiSuppression(ctx) {
      ensureNativePauseSuppressionStyles();
      const shouldHideNativePauseUi = ctx.state.role === 'student';
      document.body?.setAttribute('data-syncdeck-hide-native-pause', shouldHideNativePauseUi ? 'true' : 'false');
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
      syncNativePauseUiSuppression(ctx);
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

    function wrapNavigationMethods(ctx) {
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

        ctx.deck[methodName] = function wrappedNavigationMethod(...args) {
          if (!ctx.state.applyingRemote && (methodName === 'up' || methodName === 'down')) {
            return moveVertical(ctx, methodName);
          }

          if (!ctx.state.applyingRemote && (methodName === 'left' || methodName === 'right')) {
            return moveHorizontal(ctx, methodName);
          }

          if (!ctx.state.applyingRemote && ctx.state.role === 'student') {
            const nav = buildNavigationStatus(ctx);
            const canUseNext = methodName === 'next'
              ? (
                nav.canGoForward
                || nav.canGoDown
                || nav.canGoRight
                || canAdvanceRightWithinHF(ctx, nav)
              )
              : predicate(nav);
            if (!canUseNext) {
              return undefined;
            }
            if (
              methodName === 'prev'
              && isStudentReleasedFlatSlide(ctx, nav.current)
              && nav.canGoLeft
              && !canRewindLeftWithinHF(ctx, nav)
            ) {
              return moveHorizontal(ctx, 'left');
            }
            if (
              methodName === 'next'
              && nav.canGoRight
              && !nav.canGoDown
              && !canAdvanceRightWithinHF(ctx, nav)
            ) {
              return moveHorizontal(ctx, 'right');
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

    function captureStudentBoundary(ctx, indices) {
      const current = normalizeIndices(indices ?? ctx.deck.getIndices());
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

    function applySyncedState(ctx, payload, options = {}) {
      if (!payload?.state) return null;

      // Strip `overview` before applying — Reveal's built-in grid overview
      // should never be activated on the receiving end. Instead, route the
      // overview flag to the custom bottom-of-screen storyboard strip.
      const { overview, ...safeState } = payload.state;
      const resolvedState = resolveStudentSyncedState(ctx, safeState, options);
      ctx.deck.setState({
        ...safeState,
        indexh: resolvedState.applied.h,
        indexv: resolvedState.applied.v,
        indexf: resolvedState.applied.f,
      });
      if (overview !== undefined) {
        window.dispatchEvent(new CustomEvent('reveal-storyboard-set', { detail: { open: !!overview } }));
      }

      return resolvedState;
    }

    function applyRelativeInstructorSync(ctx, direction) {
      const baseIndices = normalizeIndices(ctx.state.lastSyncedInstructorIndices ?? ctx.deck.getIndices());
      const nextIndices = direction === 'prev'
        ? stepIndicesPrev(baseIndices)
        : stepIndicesNext(baseIndices);

      ctx.state.lastSyncedInstructorIndices = nextIndices;
      return applySyncedState(ctx, {
        state: {
          indexh: nextIndices.h,
          indexv: nextIndices.v,
          indexf: nextIndices.f,
        },
      });
    }

    function resolveStudentSyncedState(ctx, state, options = {}) {
      const incoming = stateIndicesFromPayload(state);

      if (ctx.state.role !== 'student') {
        return { applied: incoming, syncedBoundary: incoming };
      }

      const current = normalizeIndices(ctx.deck.getIndices());
      const preserveLocalStackPosition = !options.forceExact
        && current.h === incoming.h
        && topLevelSlideHasVerticalChildren(incoming.h)
        && (current.v > 0 || incoming.v > 0);
      const applied = preserveLocalStackPosition
        ? { h: incoming.h, v: current.v, f: current.f }
        : incoming;
      if (incoming.v === 0) {
        rememberTopSlideFragment(ctx, incoming);
      }
      if (applied.v === 0) {
        clearSuppressedFutureFragments();
      }

      const normalizedApplied = normalizeStudentVisibleIndices(ctx, applied);

      return {
        applied: normalizedApplied,
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
      let lastAllowedTarget = normalizeStudentVisibleIndices(ctx, current);

      // Notify the storyboard so it can display the boundary marker for all roles.
      window.dispatchEvent(new CustomEvent('reveal-storyboard-boundary-update', {
        detail: { indices: nextBoundary },
      }));

      if (ctx.state.role === 'student') {
        // A boundary grant changes the released region but should not pull a
        // student forward on its own. Only snap when the student is already past
        // the new boundary; later synced instructor movement can still pull them.
        if (isPastBoundary) {
          const normalizedSnapTarget = normalizeStudentVisibleIndices(ctx, snapTarget);
          ctx.deck.slide(normalizedSnapTarget.h, normalizedSnapTarget.v, normalizedSnapTarget.f);
          lastAllowedTarget = normalizedSnapTarget;
        }
      }

      // Reset the allowed-position cache for each explicit boundary session so a
      // later snap-back cannot reuse a stale v/f location from an older boundary
      // on the same horizontal slide.
      ctx.state.lastAllowedStudentIndices = normalizeStudentVisibleIndices(ctx, lastAllowedTarget);

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

    function resetStudentFollowInstructorState(ctx) {
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
    }

    function enforceStudentNavigationBoundary(ctx) {
      // This now acts as a safety net. The preventive control system (updateNavigationControls)
      // should block navigation before it happens, but we keep this as a fallback for any
      // edge cases where navigation might slip through (e.g., direct API calls, browser bugs).
      if (ctx.state.applyingRemote) return;
      if (ctx.state.role !== 'student') return;
      if (!ctx.state.studentMaxIndices) return;

      const current = normalizeStudentVisibleIndices(ctx, ctx.deck.getIndices());
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
      if (!canGoForward && isPastForwardBoundary(ctx, current)) shouldReset = true;

      if (!shouldReset) {
        if (compareIndices(current, normalizeIndices(ctx.deck.getIndices())) !== 0) {
          ctx.state.applyingRemote = true;
          try {
            ctx.deck.slide(current.h, current.v, current.f);
          } finally {
            queueMicrotask(() => {
              ctx.state.applyingRemote = false;
            });
          }
        }
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
      let boundaryCaptureReason = 'captureStudentBoundary';
      let boundaryCaptureTarget = null;

      if (!deck) return;

      ctx.state.applyingRemote = true;
      try {
        switch (command.name) {
          case 'next':
            if (ctx.state.role === 'student' && !ctx.state.hasExplicitBoundary && ctx.state.lastSyncedInstructorIndices) {
              payload.__resolvedSyncBoundary = applyRelativeInstructorSync(ctx, 'next')?.syncedBoundary || null;
              boundaryCaptureTarget = payload.__resolvedSyncBoundary;
            } else {
              deck.next();
              boundaryCaptureTarget = normalizeIndices(ctx.deck.getIndices());
              ctx.state.lastSyncedInstructorIndices = boundaryCaptureTarget;
            }
            shouldCaptureStudentBoundary = true;
            break;
          case 'prev':
            if (ctx.state.role === 'student' && !ctx.state.hasExplicitBoundary && ctx.state.lastSyncedInstructorIndices) {
              payload.__resolvedSyncBoundary = applyRelativeInstructorSync(ctx, 'prev')?.syncedBoundary || null;
              boundaryCaptureTarget = payload.__resolvedSyncBoundary;
            } else {
              deck.prev();
              boundaryCaptureTarget = normalizeIndices(ctx.deck.getIndices());
              ctx.state.lastSyncedInstructorIndices = boundaryCaptureTarget;
            }
            shouldCaptureStudentBoundary = true;
            break;
          case 'slide':
            if (ctx.state.role === 'student') {
              payload.__resolvedSyncBoundary = applySyncedState(ctx, {
                state: {
                  indexh: payload.h ?? 0,
                  indexv: payload.v ?? 0,
                  indexf: payload.f,
                },
              })?.syncedBoundary || null;
              boundaryCaptureTarget = payload.__resolvedSyncBoundary;
            } else {
              deck.slide(payload.h ?? 0, payload.v ?? 0, payload.f);
              boundaryCaptureTarget = normalizeIndices({ h: payload.h ?? 0, v: payload.v ?? 0, f: payload.f });
            }
            shouldCaptureStudentBoundary = true;
            ctx.state.lastSyncedInstructorIndices = boundaryCaptureTarget;
            break;
          case 'setState':
            payload.__resolvedSyncBoundary = applySyncedState(ctx, payload)?.syncedBoundary || null;
            shouldCaptureStudentBoundary = true;
            boundaryCaptureTarget = payload.__resolvedSyncBoundary;
            ctx.state.lastSyncedInstructorIndices = boundaryCaptureTarget;
            break;
          case 'syncToInstructor':
            if (ctx.state.role === 'student') {
              resetStudentFollowInstructorState(ctx);
            }
            payload.__resolvedSyncBoundary = applySyncedState(ctx, payload, { forceExact: true })?.syncedBoundary || null;
            shouldCaptureStudentBoundary = true;
            boundaryCaptureReason = 'syncToInstructor';
            boundaryCaptureTarget = payload.__resolvedSyncBoundary;
            ctx.state.lastSyncedInstructorIndices = boundaryCaptureTarget;
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
            applyRoleChange(ctx, payload.role, 'roleChanged');
            break;
          case 'allowStudentForwardTo': {
            const target = payload.indices || payload;
            setStudentBoundary(ctx, target, {
              reason: 'allowStudentForwardTo',
              releaseStartH: payload.releaseStartH,
            });
            break;
          }
          case 'setStudentBoundary': {
            const target = payload.indices || payload;
            setStudentBoundary(ctx, target, {
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
            // Host asks the active authoring iframe for a full state snapshot.
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
          captureStudentBoundary(ctx, boundaryCaptureTarget || ctx.deck.getIndices());
          updateNavigationControls(ctx);
          emitLocalStatusEvent(ctx, boundaryCaptureReason);
        }

        const syncedBoundaryIndices = (command.name === 'setState' || command.name === 'syncToInstructor' || command.name === 'slide')
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
            if (!!ctx.deck.isPaused?.() !== statePaused) {
              ctx.deck.togglePause?.(statePaused);
            }
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

      const emitActivityRequest = () => {
        emitActivityRequestForCurrentSlide(ctx);
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

      // When an authoring role changes slides, send a full chalkboard snapshot so
      // the host can replace its delta buffer with a clean checkpoint.
      // Using slidechanged only (not fragmentshown/hidden) — fragment moves
      // don't change the active drawing layer, so there is nothing to flush.
      const flushChalkboardState = () => {
        if (ctx.state.applyingRemote) return;
        if (!canBroadcastChalkboard(ctx)) return;
        const cbApi = chalkboardApi();
        if (cbApi) {
          safePostToParent(ctx, 'chalkboardState', { storage: cbApi.getData() });
        }
      };

      deck.on('slidechanged', emitState);
      deck.on('slidechanged', emitActivityRequest);
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
        if (currentControls) {
          const supportsPointerEvents = typeof window.PointerEvent === 'function';

          const handleDirectionalControl = (button) => {
            debugLog(() => ['control:activate', {
              role: ctx.state.role,
              button: button.className,
              current: normalizeIndices(ctx.deck.getIndices()),
              activeElement: describeElement(document.activeElement),
            }]);
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
            if (!button) return null;

            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === 'function') {
              event.stopImmediatePropagation();
            }
            return button;
          };

          const interceptControlActivate = (event) => {
            const button = interceptControlPress(event);
            if (!button) return;
            handleDirectionalControl(button);
          };

          const interceptControlClick = (event) => {
            const button = interceptControlPress(event);
            if (!button) return;
            // Pointer-originated activations were already handled on pointerdown.
            // Keep click handling for keyboard/programmatic activation.
            if (supportsPointerEvents && event.detail !== 0) {
              return;
            }
            handleDirectionalControl(button);
          };

          if (supportsPointerEvents) {
            currentControls.addEventListener('pointerdown', interceptControlActivate, true);
          } else {
            currentControls.addEventListener('mousedown', interceptControlActivate, true);
            currentControls.addEventListener('touchstart', interceptControlActivate, true);
          }
          currentControls.addEventListener('click', interceptControlClick, true);
          ctx.cleanup.push(() => {
            if (supportsPointerEvents) {
              currentControls.removeEventListener('pointerdown', interceptControlActivate, true);
            } else {
              currentControls.removeEventListener('mousedown', interceptControlActivate, true);
              currentControls.removeEventListener('touchstart', interceptControlActivate, true);
            }
            currentControls.removeEventListener('click', interceptControlClick, true);
          });
        }
      }

      const interceptDirectionalKeyboard = (event) => {
        debugLog(() => ['raw-keydown', {
          key: event.key,
          defaultPrevented: event.defaultPrevented,
          target: describeElement(event.target),
          activeElement: describeElement(document.activeElement),
        }]);
        if (event.defaultPrevented) return;
        if (event.ctrlKey || event.metaKey || event.altKey) return;

        const isVerticalKey = event.key === 'ArrowUp' || event.key === 'ArrowDown';
        const isHorizontalKey = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
        const lowerKey = typeof event.key === 'string' ? event.key.toLowerCase() : '';
        const isInstructorPauseKey = (ctx.state.role === 'instructor' || ctx.state.role === 'standalone')
          && (lowerKey === 'b' || lowerKey === 'p');
        const isStudentPrevKey = ctx.state.role === 'student'
          && (event.key === 'PageUp' || lowerKey === 'h');
        const isStudentNextKey = ctx.state.role === 'student'
          && (event.key === 'PageDown' || event.key === ' ' || event.code === 'Space' || lowerKey === 'l');
        if (!isVerticalKey && !isHorizontalKey && !isStudentPrevKey && !isStudentNextKey && !isInstructorPauseKey) return;

        if (ctx.state.role === 'student' && ctx.state.pauseLockedByHost) {
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === 'function') {
            event.stopImmediatePropagation();
          }
          return;
        }

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

        debugLog(() => ['keyboard:intercept', {
          role: ctx.state.role,
          key: event.key,
          current: normalizeIndices(ctx.deck.getIndices()),
          activeElement: describeElement(document.activeElement),
        }]);

        if (isInstructorPauseKey) {
          ctx.deck.togglePause?.();
        } else if (event.key === 'ArrowUp') {
          ctx.deck.up?.();
        } else if (event.key === 'ArrowDown') {
          ctx.deck.down?.();
        } else if (event.key === 'ArrowLeft') {
          ctx.deck.left?.();
        } else if (event.key === 'ArrowRight') {
          ctx.deck.right?.();
        } else if (isStudentPrevKey) {
          if (lowerKey === 'h') {
            ctx.deck.left?.();
          } else {
            ctx.deck.prev?.();
          }
        } else if (isStudentNextKey) {
          if (lowerKey === 'l') {
            ctx.deck.right?.();
          } else {
            ctx.deck.next?.();
          }
        }
      };

      window.addEventListener('keydown', interceptDirectionalKeyboard, true);
      ctx.cleanup.push(() => {
        window.removeEventListener('keydown', interceptDirectionalKeyboard, true);
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
      // to downstream viewers. Only relayed when this frame can author state.
      // The plugin fires 'broadcast' CustomEvents on document; event.content
      // carries {sender, type:'draw'|'erase', mode, board, fromX/Y, toX/Y, color,
      // x, y, timestamp} — all coordinates are already in logical space
      // (divided by canvas scale) so students can replay them at any viewport size.
      const onChalkboardBroadcast = (event) => {
        if (!canBroadcastChalkboard(ctx)) return;
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
        deck.off('slidechanged', emitActivityRequest);
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
          lastSyncedInstructorIndices: null,
          topSlideFragmentsByH: {},
          touchGesture: null,
          releaseStartH: null,
          releaseEndH: null,
          standaloneControlRefreshTimer: null,
          lastPublishedMetadata: null,
        },
      };

      debugLog(() => ['init', {
        role: ctx.state.role,
        deckId: config.deckId || null,
        hostOrigin: config.hostOrigin,
      }]);

      wireDeckEvents(ctx);
      wireWindowMessageListener(ctx);
      wireMetadataObserver(ctx);
      wrapNavigationMethods(ctx);
      applyPauseLockUi(ctx);

      // Initialize navigation controls based on starting role and capabilities.
      updateNavigationControls(ctx);
      scheduleStandaloneControlRefresh(ctx, 1000);

      const api = {
        version: IFRAME_SYNC_VERSION,
        getRole: () => ctx.state.role,
        getStudentBoundary: () => getStudentBoundary(ctx),
        getCapabilities: () => getRoleCapabilities(ctx),
        getStatus: () => buildSyncStatusPayload(ctx, 'apiGetStatus'),
        getMetadata: () => getPresentationMetadata(),
        setRole: (role) => {
          applyRoleChange(ctx, role, 'apiSetRole');
        },
        sendState: () => safePostToParent(ctx, 'state', currentDeckState(deck)),
        sendMetadata: (options) => emitMetadata(ctx, options),
        sendCustom: (eventName, payload) => safePostToParent(ctx, eventName, payload || {}),
        chalkboard: {
          call: (method, ...args) => callChalkboard(ctx, method, args),
          toggleBoard: () => callChalkboard(ctx, 'toggleChalkboard'),
          toggleNotes: () => callChalkboard(ctx, 'toggleNotesCanvas'),
          clear: () => callChalkboard(ctx, 'clear'),
          reset: () => callChalkboard(ctx, 'reset'),
        },
        destroy: () => {
          if (ctx.state.standaloneControlRefreshTimer) {
            clearTimeout(ctx.state.standaloneControlRefreshTimer);
            ctx.state.standaloneControlRefreshTimer = null;
          }
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

  (function (global) {

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

  if (typeof window !== 'undefined') {
    if (ce && !ce.id) {
      ce.id = 'notes';
    }
    window.Reveal = window.Reveal || ce$1;
    window.RevealNotes = window.RevealNotes || ce;
  }

})();
