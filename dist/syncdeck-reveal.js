(function () {
	'use strict';

	/*!
	* reveal.js 5.1.0
	* https://revealjs.com
	* MIT licensed
	*
	* Copyright (C) 2011-2024 Hakim El Hattab, https://hakim.se
	*/
	const e$1=(e,t)=>{for(let i in t)e[i]=t[i];return e},t$1=(e,t)=>Array.from(e.querySelectorAll(t)),i$1=(e,t,i)=>{i?e.classList.add(t):e.classList.remove(t);},s$1=e=>{if("string"==typeof e){if("null"===e)return null;if("true"===e)return  true;if("false"===e)return  false;if(e.match(/^-?[\d\.]+$/))return parseFloat(e)}return e},a$1=(e,t)=>{e.style.transform=t;},n$1=(e,t)=>{let i=e.matches||e.matchesSelector||e.msMatchesSelector;return !(!i||!i.call(e,t))},r$1=(e,t)=>{if("function"==typeof e.closest)return e.closest(t);for(;e;){if(n$1(e,t))return e;e=e.parentNode;}return null},o$1=e=>{let t=(e=e||document.documentElement).requestFullscreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;t&&t.apply(e);},l$1=e=>{let t=document.createElement("style");return t.type="text/css",e&&e.length>0&&(t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))),document.head.appendChild(t),t},d$1=()=>{let e={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,(t=>{e[t.split("=").shift()]=t.split("=").pop();}));for(let t in e){let i=e[t];e[t]=s$1(unescape(i));}return void 0!==e.dependencies&&delete e.dependencies,e},c$1={mp4:"video/mp4",m4a:"video/mp4",ogv:"video/ogg",mpeg:"video/mpeg",webm:"video/webm"},h$1=navigator.userAgent,u$1=/(iphone|ipod|ipad|android)/gi.test(h$1)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1,g$1=/android/gi.test(h$1);var p$1=function(e){if(e){var t=function(e){return [].slice.call(e)},i=3,s=[],a=null,n="requestAnimationFrame"in e?function(){e.cancelAnimationFrame(a),a=e.requestAnimationFrame((function(){return o(s.filter((function(e){return e.dirty&&e.active})))}));}:function(){},r=function(e){return function(){s.forEach((function(t){return t.dirty=e})),n();}},o=function(e){e.filter((function(e){return !e.styleComputed})).forEach((function(e){e.styleComputed=h(e);})),e.filter(u).forEach(g);var t=e.filter(c);t.forEach(d),t.forEach((function(e){g(e),l(e);})),t.forEach(p);},l=function(e){return e.dirty=0},d=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap";},c=function(e){return 2!==e.dirty||2===e.dirty&&e.element.parentNode.clientWidth!==e.availableWidth},h=function(t){var i=e.getComputedStyle(t.element,null);return t.currentFontSize=parseFloat(i.getPropertyValue("font-size")),t.display=i.getPropertyValue("display"),t.whiteSpace=i.getPropertyValue("white-space"),true},u=function(e){var t=false;return !e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=true,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=true,e.whiteSpace="nowrap"),e.preStyleTestCompleted=true,t)},g=function(e){e.element.style.whiteSpace=e.whiteSpace,e.element.style.display=e.display,e.element.style.fontSize=e.currentFontSize+"px";},p=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}));},v=function(e,t){return function(){e.dirty=t,e.active&&n();}},m=function(e){return function(){s=s.filter((function(t){return t.element!==e.element})),e.observeMutations&&e.observer.disconnect(),e.element.style.whiteSpace=e.originalStyle.whiteSpace,e.element.style.display=e.originalStyle.display,e.element.style.fontSize=e.originalStyle.fontSize;}},f=function(e){return function(){e.active||(e.active=true,n());}},y=function(e){return function(){return e.active=false}},b=function(e){e.observeMutations&&(e.observer=new MutationObserver(v(e,1)),e.observer.observe(e.element,e.observeMutations));},w={minSize:16,maxSize:512,multiLine:true,observeMutations:"MutationObserver"in e&&{subtree:true,childList:true,characterData:true}},E=null,S=function(){e.clearTimeout(E),E=e.setTimeout(r(2),k.observeWindowDelay);},A=["resize","orientationchange"];return Object.defineProperty(k,"observeWindow",{set:function(t){var i="".concat(t?"add":"remove","EventListener");A.forEach((function(t){e[i](t,S);}));}}),k.observeWindow=true,k.observeWindowDelay=100,k.fitAll=r(i),k}function R(e,t){var a=Object.assign({},w,t),r=e.map((function(e){var t=Object.assign({},a,{element:e,active:true});return function(e){e.originalStyle={whiteSpace:e.element.style.whiteSpace,display:e.element.style.display,fontSize:e.element.style.fontSize},b(e),e.newbie=true,e.dirty=true,s.push(e);}(t),{element:e,fit:v(t,i),unfreeze:f(t),freeze:y(t),unsubscribe:m(t)}}));return n(),r}function k(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return "string"==typeof e?R(t(document.querySelectorAll(e)),i):R([e],i)[0]}}("undefined"==typeof window?null:window);let v$1 = class v{constructor(e){this.Reveal=e,this.startEmbeddedIframe=this.startEmbeddedIframe.bind(this);}shouldPreload(e){if(this.Reveal.isScrollView())return  true;let t=this.Reveal.getConfig().preloadIframes;return "boolean"!=typeof t&&(t=e.hasAttribute("data-preload")),t}load(e,i={}){e.style.display=this.Reveal.getConfig().display,t$1(e,"img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach((e=>{("IFRAME"!==e.tagName||this.shouldPreload(e))&&(e.setAttribute("src",e.getAttribute("data-src")),e.setAttribute("data-lazy-loaded",""),e.removeAttribute("data-src"));})),t$1(e,"video, audio").forEach((e=>{let i=0;t$1(e,"source[data-src]").forEach((e=>{e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src"),e.setAttribute("data-lazy-loaded",""),i+=1;})),u$1&&"VIDEO"===e.tagName&&e.setAttribute("playsinline",""),i>0&&e.load();}));let s=e.slideBackgroundElement;if(s){s.style.display="block";let t=e.slideBackgroundContentElement,a=e.getAttribute("data-background-iframe");if(false===s.hasAttribute("data-loaded")){s.setAttribute("data-loaded","true");let n=e.getAttribute("data-background-image"),r=e.getAttribute("data-background-video"),o=e.hasAttribute("data-background-video-loop"),l=e.hasAttribute("data-background-video-muted");if(n)/^data:/.test(n.trim())?t.style.backgroundImage=`url(${n.trim()})`:t.style.backgroundImage=n.split(",").map((e=>`url(${((e="")=>encodeURI(e).replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)))(decodeURI(e.trim()))})`)).join(",");else if(r&&!this.Reveal.isSpeakerNotes()){let e=document.createElement("video");o&&e.setAttribute("loop",""),l&&(e.muted=true),u$1&&(e.muted=true,e.setAttribute("playsinline","")),r.split(",").forEach((t=>{const i=document.createElement("source");i.setAttribute("src",t);let s=((e="")=>c$1[e.split(".").pop()])(t);s&&i.setAttribute("type",s),e.appendChild(i);})),t.appendChild(e);}else if(a&&true!==i.excludeIframes){let e=document.createElement("iframe");e.setAttribute("allowfullscreen",""),e.setAttribute("mozallowfullscreen",""),e.setAttribute("webkitallowfullscreen",""),e.setAttribute("allow","autoplay"),e.setAttribute("data-src",a),e.style.width="100%",e.style.height="100%",e.style.maxHeight="100%",e.style.maxWidth="100%",t.appendChild(e);}}let n=t.querySelector("iframe[data-src]");n&&this.shouldPreload(s)&&!/autoplay=(1|true|yes)/gi.test(a)&&n.getAttribute("src")!==a&&n.setAttribute("src",a);}this.layout(e);}layout(e){Array.from(e.querySelectorAll(".r-fit-text")).forEach((e=>{p$1(e,{minSize:24,maxSize:.8*this.Reveal.getConfig().height,observeMutations:false,observeWindow:false});}));}unload(e){e.style.display="none";let i=this.Reveal.getSlideBackground(e);i&&(i.style.display="none",t$1(i,"iframe[src]").forEach((e=>{e.removeAttribute("src");}))),t$1(e,"video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach((e=>{e.setAttribute("data-src",e.getAttribute("src")),e.removeAttribute("src");})),t$1(e,"video[data-lazy-loaded] source[src], audio source[src]").forEach((e=>{e.setAttribute("data-src",e.getAttribute("src")),e.removeAttribute("src");}));}formatEmbeddedContent(){let e=(e,i,s)=>{t$1(this.Reveal.getSlidesElement(),"iframe["+e+'*="'+i+'"]').forEach((t=>{let i=t.getAttribute(e);i&&-1===i.indexOf(s)&&t.setAttribute(e,i+(/\?/.test(i)?"&":"?")+s);}));};e("src","youtube.com/embed/","enablejsapi=1"),e("data-src","youtube.com/embed/","enablejsapi=1"),e("src","player.vimeo.com/","api=1"),e("data-src","player.vimeo.com/","api=1");}startEmbeddedContent(e){e&&!this.Reveal.isSpeakerNotes()&&(t$1(e,'img[src$=".gif"]').forEach((e=>{e.setAttribute("src",e.getAttribute("src"));})),t$1(e,"video, audio").forEach((e=>{if(r$1(e,".fragment")&&!r$1(e,".fragment.visible"))return;let t=this.Reveal.getConfig().autoPlayMedia;if("boolean"!=typeof t&&(t=e.hasAttribute("data-autoplay")||!!r$1(e,".slide-background")),t&&"function"==typeof e.play)if(e.readyState>1)this.startEmbeddedMedia({target:e});else if(u$1){let t=e.play();t&&"function"==typeof t.catch&&false===e.controls&&t.catch((()=>{e.controls=true,e.addEventListener("play",(()=>{e.controls=false;}));}));}else e.removeEventListener("loadeddata",this.startEmbeddedMedia),e.addEventListener("loadeddata",this.startEmbeddedMedia);})),t$1(e,"iframe[src]").forEach((e=>{r$1(e,".fragment")&&!r$1(e,".fragment.visible")||this.startEmbeddedIframe({target:e});})),t$1(e,"iframe[data-src]").forEach((e=>{r$1(e,".fragment")&&!r$1(e,".fragment.visible")||e.getAttribute("src")!==e.getAttribute("data-src")&&(e.removeEventListener("load",this.startEmbeddedIframe),e.addEventListener("load",this.startEmbeddedIframe),e.setAttribute("src",e.getAttribute("data-src")));})));}startEmbeddedMedia(e){let t=!!r$1(e.target,"html"),i=!!r$1(e.target,".present");t&&i&&(e.target.paused||e.target.ended)&&(e.target.currentTime=0,e.target.play()),e.target.removeEventListener("loadeddata",this.startEmbeddedMedia);}startEmbeddedIframe(e){let t=e.target;if(t&&t.contentWindow){let i=!!r$1(e.target,"html"),s=!!r$1(e.target,".present");if(i&&s){let e=this.Reveal.getConfig().autoPlayMedia;"boolean"!=typeof e&&(e=t.hasAttribute("data-autoplay")||!!r$1(t,".slide-background")),/youtube\.com\/embed\//.test(t.getAttribute("src"))&&e?t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*"):/player\.vimeo\.com\//.test(t.getAttribute("src"))&&e?t.contentWindow.postMessage('{"method":"play"}',"*"):t.contentWindow.postMessage("slide:start","*");}}}stopEmbeddedContent(i,s={}){s=e$1({unloadIframes:true},s),i&&i.parentNode&&(t$1(i,"video, audio").forEach((e=>{e.hasAttribute("data-ignore")||"function"!=typeof e.pause||(e.setAttribute("data-paused-by-reveal",""),e.pause());})),t$1(i,"iframe").forEach((e=>{e.contentWindow&&e.contentWindow.postMessage("slide:stop","*"),e.removeEventListener("load",this.startEmbeddedIframe);})),t$1(i,'iframe[src*="youtube.com/embed/"]').forEach((e=>{!e.hasAttribute("data-ignore")&&e.contentWindow&&"function"==typeof e.contentWindow.postMessage&&e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*");})),t$1(i,'iframe[src*="player.vimeo.com/"]').forEach((e=>{!e.hasAttribute("data-ignore")&&e.contentWindow&&"function"==typeof e.contentWindow.postMessage&&e.contentWindow.postMessage('{"method":"pause"}',"*");})),true===s.unloadIframes&&t$1(i,"iframe[data-src]").forEach((e=>{e.setAttribute("src","about:blank"),e.removeAttribute("src");})));}};const m$1=".slides section",f$1=".slides>section",y$1=".slides>section.present>section",b$1=/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview/,w$1=/fade-(down|up|right|left|out|in-then-out|in-then-semi-out)|semi-fade-out|current-visible|shrink|grow/;let E$1 = class E{constructor(e){this.Reveal=e;}render(){this.element=document.createElement("div"),this.element.className="slide-number",this.Reveal.getRevealElement().appendChild(this.element);}configure(e,t){let i="none";e.slideNumber&&!this.Reveal.isPrintView()&&("all"===e.showSlideNumber||"speaker"===e.showSlideNumber&&this.Reveal.isSpeakerNotes())&&(i="block"),this.element.style.display=i;}update(){this.Reveal.getConfig().slideNumber&&this.element&&(this.element.innerHTML=this.getSlideNumber());}getSlideNumber(e=this.Reveal.getCurrentSlide()){let t,i=this.Reveal.getConfig(),s="h.v";if("function"==typeof i.slideNumber)t=i.slideNumber(e);else {"string"==typeof i.slideNumber&&(s=i.slideNumber),/c/.test(s)||1!==this.Reveal.getHorizontalSlides().length||(s="c");let a=e&&"uncounted"===e.dataset.visibility?0:1;switch(t=[],s){case "c":t.push(this.Reveal.getSlidePastCount(e)+a);break;case "c/t":t.push(this.Reveal.getSlidePastCount(e)+a,"/",this.Reveal.getTotalSlides());break;default:let i=this.Reveal.getIndices(e);t.push(i.h+a);let n="h/v"===s?"/":".";this.Reveal.isVerticalSlide(e)&&t.push(n,i.v+1);}}let a="#"+this.Reveal.location.getHash(e);return this.formatNumber(t[0],t[1],t[2],a)}formatNumber(e,t,i,s="#"+this.Reveal.location.getHash()){return "number"!=typeof i||isNaN(i)?`<a href="${s}">\n\t\t\t\t\t<span class="slide-number-a">${e}</span>\n\t\t\t\t\t</a>`:`<a href="${s}">\n\t\t\t\t\t<span class="slide-number-a">${e}</span>\n\t\t\t\t\t<span class="slide-number-delimiter">${t}</span>\n\t\t\t\t\t<span class="slide-number-b">${i}</span>\n\t\t\t\t\t</a>`}destroy(){this.element.remove();}};let S$1 = class S{constructor(e){this.Reveal=e,this.onInput=this.onInput.bind(this),this.onBlur=this.onBlur.bind(this),this.onKeyDown=this.onKeyDown.bind(this);}render(){this.element=document.createElement("div"),this.element.className="jump-to-slide",this.jumpInput=document.createElement("input"),this.jumpInput.type="text",this.jumpInput.className="jump-to-slide-input",this.jumpInput.placeholder="Jump to slide",this.jumpInput.addEventListener("input",this.onInput),this.jumpInput.addEventListener("keydown",this.onKeyDown),this.jumpInput.addEventListener("blur",this.onBlur),this.element.appendChild(this.jumpInput);}show(){this.indicesOnShow=this.Reveal.getIndices(),this.Reveal.getRevealElement().appendChild(this.element),this.jumpInput.focus();}hide(){this.isVisible()&&(this.element.remove(),this.jumpInput.value="",clearTimeout(this.jumpTimeout),delete this.jumpTimeout);}isVisible(){return !!this.element.parentNode}jump(){clearTimeout(this.jumpTimeout),delete this.jumpTimeout;let e,t=this.jumpInput.value.trim("");if(/^\d+$/.test(t)){const i=this.Reveal.getConfig().slideNumber;if("c"===i||"c/t"===i){const i=this.Reveal.getSlides()[parseInt(t,10)-1];i&&(e=this.Reveal.getIndices(i));}}return e||(/^\d+\.\d+$/.test(t)&&(t=t.replace(".","/")),e=this.Reveal.location.getIndicesFromHash(t,{oneBasedIndex:true})),!e&&/\S+/i.test(t)&&t.length>1&&(e=this.search(t)),e&&""!==t?(this.Reveal.slide(e.h,e.v,e.f),true):(this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),false)}jumpAfter(e){clearTimeout(this.jumpTimeout),this.jumpTimeout=setTimeout((()=>this.jump()),e);}search(e){const t=new RegExp("\\b"+e.trim()+"\\b","i"),i=this.Reveal.getSlides().find((e=>t.test(e.innerText)));return i?this.Reveal.getIndices(i):null}cancel(){this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),this.hide();}confirm(){this.jump(),this.hide();}destroy(){this.jumpInput.removeEventListener("input",this.onInput),this.jumpInput.removeEventListener("keydown",this.onKeyDown),this.jumpInput.removeEventListener("blur",this.onBlur),this.element.remove();}onKeyDown(e){13===e.keyCode?this.confirm():27===e.keyCode&&(this.cancel(),e.stopImmediatePropagation());}onInput(e){this.jumpAfter(200);}onBlur(){setTimeout((()=>this.hide()),1);}};const A$1=e=>{let t=e.match(/^#([0-9a-f]{3})$/i);if(t&&t[1])return t=t[1],{r:17*parseInt(t.charAt(0),16),g:17*parseInt(t.charAt(1),16),b:17*parseInt(t.charAt(2),16)};let i=e.match(/^#([0-9a-f]{6})$/i);if(i&&i[1])return i=i[1],{r:parseInt(i.slice(0,2),16),g:parseInt(i.slice(2,4),16),b:parseInt(i.slice(4,6),16)};let s=e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(s)return {r:parseInt(s[1],10),g:parseInt(s[2],10),b:parseInt(s[3],10)};let a=e.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);return a?{r:parseInt(a[1],10),g:parseInt(a[2],10),b:parseInt(a[3],10),a:parseFloat(a[4])}:null};let R$1 = class R{constructor(e){this.Reveal=e;}render(){this.element=document.createElement("div"),this.element.className="backgrounds",this.Reveal.getRevealElement().appendChild(this.element);}create(){this.element.innerHTML="",this.element.classList.add("no-transition"),this.Reveal.getHorizontalSlides().forEach((e=>{let i=this.createBackground(e,this.element);t$1(e,"section").forEach((e=>{this.createBackground(e,i),i.classList.add("stack");}));})),this.Reveal.getConfig().parallaxBackgroundImage?(this.element.style.backgroundImage='url("'+this.Reveal.getConfig().parallaxBackgroundImage+'")',this.element.style.backgroundSize=this.Reveal.getConfig().parallaxBackgroundSize,this.element.style.backgroundRepeat=this.Reveal.getConfig().parallaxBackgroundRepeat,this.element.style.backgroundPosition=this.Reveal.getConfig().parallaxBackgroundPosition,setTimeout((()=>{this.Reveal.getRevealElement().classList.add("has-parallax-background");}),1)):(this.element.style.backgroundImage="",this.Reveal.getRevealElement().classList.remove("has-parallax-background"));}createBackground(e,t){let i=document.createElement("div");i.className="slide-background "+e.className.replace(/present|past|future/,"");let s=document.createElement("div");return s.className="slide-background-content",i.appendChild(s),t.appendChild(i),e.slideBackgroundElement=i,e.slideBackgroundContentElement=s,this.sync(e),i}sync(e){const t=e.slideBackgroundElement,i=e.slideBackgroundContentElement,s={background:e.getAttribute("data-background"),backgroundSize:e.getAttribute("data-background-size"),backgroundImage:e.getAttribute("data-background-image"),backgroundVideo:e.getAttribute("data-background-video"),backgroundIframe:e.getAttribute("data-background-iframe"),backgroundColor:e.getAttribute("data-background-color"),backgroundGradient:e.getAttribute("data-background-gradient"),backgroundRepeat:e.getAttribute("data-background-repeat"),backgroundPosition:e.getAttribute("data-background-position"),backgroundTransition:e.getAttribute("data-background-transition"),backgroundOpacity:e.getAttribute("data-background-opacity")},a=e.hasAttribute("data-preload");e.classList.remove("has-dark-background"),e.classList.remove("has-light-background"),t.removeAttribute("data-loaded"),t.removeAttribute("data-background-hash"),t.removeAttribute("data-background-size"),t.removeAttribute("data-background-transition"),t.style.backgroundColor="",i.style.backgroundSize="",i.style.backgroundRepeat="",i.style.backgroundPosition="",i.style.backgroundImage="",i.style.opacity="",i.innerHTML="",s.background&&(/^(http|file|\/\/)/gi.test(s.background)||/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(s.background)?e.setAttribute("data-background-image",s.background):t.style.background=s.background),(s.background||s.backgroundColor||s.backgroundGradient||s.backgroundImage||s.backgroundVideo||s.backgroundIframe)&&t.setAttribute("data-background-hash",s.background+s.backgroundSize+s.backgroundImage+s.backgroundVideo+s.backgroundIframe+s.backgroundColor+s.backgroundGradient+s.backgroundRepeat+s.backgroundPosition+s.backgroundTransition+s.backgroundOpacity),s.backgroundSize&&t.setAttribute("data-background-size",s.backgroundSize),s.backgroundColor&&(t.style.backgroundColor=s.backgroundColor),s.backgroundGradient&&(t.style.backgroundImage=s.backgroundGradient),s.backgroundTransition&&t.setAttribute("data-background-transition",s.backgroundTransition),a&&t.setAttribute("data-preload",""),s.backgroundSize&&(i.style.backgroundSize=s.backgroundSize),s.backgroundRepeat&&(i.style.backgroundRepeat=s.backgroundRepeat),s.backgroundPosition&&(i.style.backgroundPosition=s.backgroundPosition),s.backgroundOpacity&&(i.style.opacity=s.backgroundOpacity);const n=this.getContrastClass(e);"string"==typeof n&&e.classList.add(n);}getContrastClass(e){const t=e.slideBackgroundElement;let i=e.getAttribute("data-background-color");if(!i||!A$1(i)){let e=window.getComputedStyle(t);e&&e.backgroundColor&&(i=e.backgroundColor);}if(i){const e=A$1(i);if(e&&0!==e.a)return "string"==typeof(s=i)&&(s=A$1(s)),(s?(299*s.r+587*s.g+114*s.b)/1e3:null)<128?"has-dark-background":"has-light-background"}var s;return null}bubbleSlideContrastClassToElement(e,t){["has-light-background","has-dark-background"].forEach((i=>{e.classList.contains(i)?t.classList.add(i):t.classList.remove(i);}),this);}update(e=false){let i=this.Reveal.getConfig(),s=this.Reveal.getCurrentSlide(),a=this.Reveal.getIndices(),n=null,r=i.rtl?"future":"past",o=i.rtl?"past":"future";if(Array.from(this.element.childNodes).forEach(((i,s)=>{i.classList.remove("past","present","future"),s<a.h?i.classList.add(r):s>a.h?i.classList.add(o):(i.classList.add("present"),n=i),(e||s===a.h)&&t$1(i,".slide-background").forEach(((e,t)=>{e.classList.remove("past","present","future");const i="number"==typeof a.v?a.v:0;t<i?e.classList.add("past"):t>i?e.classList.add("future"):(e.classList.add("present"),s===a.h&&(n=e));}));})),this.previousBackground&&!this.previousBackground.closest("body")&&(this.previousBackground=null),n&&this.previousBackground){let e=this.previousBackground.getAttribute("data-background-hash"),t=n.getAttribute("data-background-hash");if(t&&t===e&&n!==this.previousBackground){this.element.classList.add("no-transition");const e=n.querySelector("video"),t=this.previousBackground.querySelector("video");if(e&&t){const i=e.parentNode;t.parentNode.appendChild(e),i.appendChild(t);}}}if(this.previousBackground&&this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground,{unloadIframes:!this.Reveal.slideContent.shouldPreload(this.previousBackground)}),n){this.Reveal.slideContent.startEmbeddedContent(n);let e=n.querySelector(".slide-background-content");if(e){let t=e.style.backgroundImage||"";/\.gif/i.test(t)&&(e.style.backgroundImage="",window.getComputedStyle(e).opacity,e.style.backgroundImage=t);}this.previousBackground=n;}s&&this.bubbleSlideContrastClassToElement(s,this.Reveal.getRevealElement()),setTimeout((()=>{this.element.classList.remove("no-transition");}),10);}updateParallax(){let e=this.Reveal.getIndices();if(this.Reveal.getConfig().parallaxBackgroundImage){let t,i,s=this.Reveal.getHorizontalSlides(),a=this.Reveal.getVerticalSlides(),n=this.element.style.backgroundSize.split(" ");1===n.length?t=i=parseInt(n[0],10):(t=parseInt(n[0],10),i=parseInt(n[1],10));let r,o,l=this.element.offsetWidth,d=s.length;r="number"==typeof this.Reveal.getConfig().parallaxBackgroundHorizontal?this.Reveal.getConfig().parallaxBackgroundHorizontal:d>1?(t-l)/(d-1):0,o=r*e.h*-1;let c,h,u=this.element.offsetHeight,g=a.length;c="number"==typeof this.Reveal.getConfig().parallaxBackgroundVertical?this.Reveal.getConfig().parallaxBackgroundVertical:(i-u)/(g-1),h=g>0?c*e.v:0,this.element.style.backgroundPosition=o+"px "+-h+"px";}}destroy(){this.element.remove();}};let k$1=0;let L$1 = class L{constructor(e){this.Reveal=e;}run(e,t){this.reset();let i=this.Reveal.getSlides(),s=i.indexOf(t),a=i.indexOf(e);if(e&&t&&e.hasAttribute("data-auto-animate")&&t.hasAttribute("data-auto-animate")&&e.getAttribute("data-auto-animate-id")===t.getAttribute("data-auto-animate-id")&&!(s>a?t:e).hasAttribute("data-auto-animate-restart")){this.autoAnimateStyleSheet=this.autoAnimateStyleSheet||l$1();let i=this.getAutoAnimateOptions(t);e.dataset.autoAnimate="pending",t.dataset.autoAnimate="pending",i.slideDirection=s>a?"forward":"backward";let n="none"===e.style.display;n&&(e.style.display=this.Reveal.getConfig().display);let r=this.getAutoAnimatableElements(e,t).map((e=>this.autoAnimateElements(e.from,e.to,e.options||{},i,k$1++)));if(n&&(e.style.display="none"),"false"!==t.dataset.autoAnimateUnmatched&&true===this.Reveal.getConfig().autoAnimateUnmatched){let e=.8*i.duration,s=.2*i.duration;this.getUnmatchedAutoAnimateElements(t).forEach((e=>{let t=this.getAutoAnimateOptions(e,i),s="unmatched";t.duration===i.duration&&t.delay===i.delay||(s="unmatched-"+k$1++,r.push(`[data-auto-animate="running"] [data-auto-animate-target="${s}"] { transition: opacity ${t.duration}s ease ${t.delay}s; }`)),e.dataset.autoAnimateTarget=s;}),this),r.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${e}s ease ${s}s; }`);}this.autoAnimateStyleSheet.innerHTML=r.join(""),requestAnimationFrame((()=>{this.autoAnimateStyleSheet&&(getComputedStyle(this.autoAnimateStyleSheet).fontWeight,t.dataset.autoAnimate="running");})),this.Reveal.dispatchEvent({type:"autoanimate",data:{fromSlide:e,toSlide:t,sheet:this.autoAnimateStyleSheet}});}}reset(){t$1(this.Reveal.getRevealElement(),'[data-auto-animate]:not([data-auto-animate=""])').forEach((e=>{e.dataset.autoAnimate="";})),t$1(this.Reveal.getRevealElement(),"[data-auto-animate-target]").forEach((e=>{delete e.dataset.autoAnimateTarget;})),this.autoAnimateStyleSheet&&this.autoAnimateStyleSheet.parentNode&&(this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet),this.autoAnimateStyleSheet=null);}autoAnimateElements(e,t,i,s,a){e.dataset.autoAnimateTarget="",t.dataset.autoAnimateTarget=a;let n=this.getAutoAnimateOptions(t,s);void 0!==i.delay&&(n.delay=i.delay),void 0!==i.duration&&(n.duration=i.duration),void 0!==i.easing&&(n.easing=i.easing);let r=this.getAutoAnimatableProperties("from",e,i),o=this.getAutoAnimatableProperties("to",t,i);if(t.classList.contains("fragment")&&(delete o.styles.opacity,e.classList.contains("fragment"))){(e.className.match(w$1)||[""])[0]===(t.className.match(w$1)||[""])[0]&&"forward"===s.slideDirection&&t.classList.add("visible","disabled");}if(false!==i.translate||false!==i.scale){let e=this.Reveal.getScale(),t={x:(r.x-o.x)/e,y:(r.y-o.y)/e,scaleX:r.width/o.width,scaleY:r.height/o.height};t.x=Math.round(1e3*t.x)/1e3,t.y=Math.round(1e3*t.y)/1e3,t.scaleX=Math.round(1e3*t.scaleX)/1e3,t.scaleX=Math.round(1e3*t.scaleX)/1e3;let s=false!==i.translate&&(0!==t.x||0!==t.y),a=false!==i.scale&&(0!==t.scaleX||0!==t.scaleY);if(s||a){let e=[];s&&e.push(`translate(${t.x}px, ${t.y}px)`),a&&e.push(`scale(${t.scaleX}, ${t.scaleY})`),r.styles.transform=e.join(" "),r.styles["transform-origin"]="top left",o.styles.transform="none";}}for(let e in o.styles){const t=o.styles[e],i=r.styles[e];t===i?delete o.styles[e]:(true===t.explicitValue&&(o.styles[e]=t.value),true===i.explicitValue&&(r.styles[e]=i.value));}let l="",d=Object.keys(o.styles);if(d.length>0){r.styles.transition="none",o.styles.transition=`all ${n.duration}s ${n.easing} ${n.delay}s`,o.styles["transition-property"]=d.join(", "),o.styles["will-change"]=d.join(", "),l='[data-auto-animate-target="'+a+'"] {'+Object.keys(r.styles).map((e=>e+": "+r.styles[e]+" !important;")).join("")+'}[data-auto-animate="running"] [data-auto-animate-target="'+a+'"] {'+Object.keys(o.styles).map((e=>e+": "+o.styles[e]+" !important;")).join("")+"}";}return l}getAutoAnimateOptions(t,i){let s={easing:this.Reveal.getConfig().autoAnimateEasing,duration:this.Reveal.getConfig().autoAnimateDuration,delay:0};if(s=e$1(s,i),t.parentNode){let e=r$1(t.parentNode,"[data-auto-animate-target]");e&&(s=this.getAutoAnimateOptions(e,s));}return t.dataset.autoAnimateEasing&&(s.easing=t.dataset.autoAnimateEasing),t.dataset.autoAnimateDuration&&(s.duration=parseFloat(t.dataset.autoAnimateDuration)),t.dataset.autoAnimateDelay&&(s.delay=parseFloat(t.dataset.autoAnimateDelay)),s}getAutoAnimatableProperties(e,t,i){let s=this.Reveal.getConfig(),a={styles:[]};if(false!==i.translate||false!==i.scale){let e;if("function"==typeof i.measure)e=i.measure(t);else if(s.center)e=t.getBoundingClientRect();else {let i=this.Reveal.getScale();e={x:t.offsetLeft*i,y:t.offsetTop*i,width:t.offsetWidth*i,height:t.offsetHeight*i};}a.x=e.x,a.y=e.y,a.width=e.width,a.height=e.height;}const n=getComputedStyle(t);return (i.styles||s.autoAnimateStyles).forEach((t=>{let i;"string"==typeof t&&(t={property:t}),void 0!==t.from&&"from"===e?i={value:t.from,explicitValue:true}:void 0!==t.to&&"to"===e?i={value:t.to,explicitValue:true}:("line-height"===t.property&&(i=parseFloat(n["line-height"])/parseFloat(n["font-size"])),isNaN(i)&&(i=n[t.property])),""!==i&&(a.styles[t.property]=i);})),a}getAutoAnimatableElements(e,t){let i=("function"==typeof this.Reveal.getConfig().autoAnimateMatcher?this.Reveal.getConfig().autoAnimateMatcher:this.getAutoAnimatePairs).call(this,e,t),s=[];return i.filter(((e,t)=>{if(-1===s.indexOf(e.to))return s.push(e.to),true}))}getAutoAnimatePairs(e,t){let i=[];const s="h1, h2, h3, h4, h5, h6, p, li";return this.findAutoAnimateMatches(i,e,t,"[data-id]",(e=>e.nodeName+":::"+e.getAttribute("data-id"))),this.findAutoAnimateMatches(i,e,t,s,(e=>e.nodeName+":::"+e.innerText)),this.findAutoAnimateMatches(i,e,t,"img, video, iframe",(e=>e.nodeName+":::"+(e.getAttribute("src")||e.getAttribute("data-src")))),this.findAutoAnimateMatches(i,e,t,"pre",(e=>e.nodeName+":::"+e.innerText)),i.forEach((e=>{n$1(e.from,s)?e.options={scale:false}:n$1(e.from,"pre")&&(e.options={scale:false,styles:["width","height"]},this.findAutoAnimateMatches(i,e.from,e.to,".hljs .hljs-ln-code",(e=>e.textContent),{scale:false,styles:[],measure:this.getLocalBoundingBox.bind(this)}),this.findAutoAnimateMatches(i,e.from,e.to,".hljs .hljs-ln-numbers[data-line-number]",(e=>e.getAttribute("data-line-number")),{scale:false,styles:["width"],measure:this.getLocalBoundingBox.bind(this)}));}),this),i}getLocalBoundingBox(e){const t=this.Reveal.getScale();return {x:Math.round(e.offsetLeft*t*100)/100,y:Math.round(e.offsetTop*t*100)/100,width:Math.round(e.offsetWidth*t*100)/100,height:Math.round(e.offsetHeight*t*100)/100}}findAutoAnimateMatches(e,t,i,s,a,n){let r={},o={};[].slice.call(t.querySelectorAll(s)).forEach(((e,t)=>{const i=a(e);"string"==typeof i&&i.length&&(r[i]=r[i]||[],r[i].push(e));})),[].slice.call(i.querySelectorAll(s)).forEach(((t,i)=>{const s=a(t);let l;if(o[s]=o[s]||[],o[s].push(t),r[s]){const e=o[s].length-1,t=r[s].length-1;r[s][e]?(l=r[s][e],r[s][e]=null):r[s][t]&&(l=r[s][t],r[s][t]=null);}l&&e.push({from:l,to:t,options:n});}));}getUnmatchedAutoAnimateElements(e){return [].slice.call(e.children).reduce(((e,t)=>{const i=t.querySelector("[data-auto-animate-target]");return t.hasAttribute("data-auto-animate-target")||i||e.push(t),t.querySelector("[data-auto-animate-target]")&&(e=e.concat(this.getUnmatchedAutoAnimateElements(t))),e}),[])}};let C$1 = class C{constructor(e){this.Reveal=e,this.active=false,this.activatedCallbacks=[],this.onScroll=this.onScroll.bind(this);}activate(){if(this.active)return;const e=this.Reveal.getState();this.active=true,this.slideHTMLBeforeActivation=this.Reveal.getSlidesElement().innerHTML;const i=t$1(this.Reveal.getRevealElement(),f$1),s=t$1(this.Reveal.getRevealElement(),".backgrounds>.slide-background");let a;this.viewportElement.classList.add("loading-scroll-mode","reveal-scroll");const n=window.getComputedStyle(this.viewportElement);n&&n.background&&(a=n.background);const r=[],o=i[0].parentNode;let l;const d=(e,t,i,n)=>{let o;if(l&&this.Reveal.shouldAutoAnimateBetween(l,e))o=document.createElement("div"),o.className="scroll-page-content scroll-auto-animate-page",o.style.display="none",l.closest(".scroll-page-content").parentNode.appendChild(o);else {const e=document.createElement("div");if(e.className="scroll-page",r.push(e),n&&s.length>t){const i=s[t],n=window.getComputedStyle(i);n&&n.background?e.style.background=n.background:a&&(e.style.background=a);}else a&&(e.style.background=a);const i=document.createElement("div");i.className="scroll-page-sticky",e.appendChild(i),o=document.createElement("div"),o.className="scroll-page-content",i.appendChild(o);}o.appendChild(e),e.classList.remove("past","future"),e.setAttribute("data-index-h",t),e.setAttribute("data-index-v",i),e.slideBackgroundElement&&(e.slideBackgroundElement.remove("past","future"),o.insertBefore(e.slideBackgroundElement,e)),l=e;};i.forEach(((e,t)=>{this.Reveal.isVerticalStack(e)?e.querySelectorAll("section").forEach(((e,i)=>{d(e,t,i,true);})):d(e,t,0);}),this),this.createProgressBar(),t$1(this.Reveal.getRevealElement(),".stack").forEach((e=>e.remove())),r.forEach((e=>o.appendChild(e))),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.layout(),this.Reveal.setState(e),this.activatedCallbacks.forEach((e=>e())),this.activatedCallbacks=[],this.restoreScrollPosition(),this.viewportElement.classList.remove("loading-scroll-mode"),this.viewportElement.addEventListener("scroll",this.onScroll,{passive:true});}deactivate(){if(!this.active)return;const e=this.Reveal.getState();this.active=false,this.viewportElement.removeEventListener("scroll",this.onScroll),this.viewportElement.classList.remove("reveal-scroll"),this.removeProgressBar(),this.Reveal.getSlidesElement().innerHTML=this.slideHTMLBeforeActivation,this.Reveal.sync(),this.Reveal.setState(e),this.slideHTMLBeforeActivation=null;}toggle(e){"boolean"==typeof e?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate();}isActive(){return this.active}createProgressBar(){this.progressBar=document.createElement("div"),this.progressBar.className="scrollbar",this.progressBarInner=document.createElement("div"),this.progressBarInner.className="scrollbar-inner",this.progressBar.appendChild(this.progressBarInner),this.progressBarPlayhead=document.createElement("div"),this.progressBarPlayhead.className="scrollbar-playhead",this.progressBarInner.appendChild(this.progressBarPlayhead),this.viewportElement.insertBefore(this.progressBar,this.viewportElement.firstChild);const e=e=>{let t=(e.clientY-this.progressBarInner.getBoundingClientRect().top)/this.progressBarHeight;t=Math.max(Math.min(t,1),0),this.viewportElement.scrollTop=t*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight);},t=i=>{this.draggingProgressBar=false,this.showProgressBar(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t);};this.progressBarInner.addEventListener("mousedown",(i=>{i.preventDefault(),this.draggingProgressBar=true,document.addEventListener("mousemove",e),document.addEventListener("mouseup",t),e(i);}));}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null);}layout(){this.isActive()&&(this.syncPages(),this.syncScrollPosition());}syncPages(){const e=this.Reveal.getConfig(),t=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),i=this.Reveal.getScale(),s="compact"===e.scrollLayout,a=this.viewportElement.offsetHeight,n=t.height*i,r=s?n:a;this.scrollTriggerHeight=s?n:a,this.viewportElement.style.setProperty("--page-height",r+"px"),this.viewportElement.style.scrollSnapType="string"==typeof e.scrollSnap?`y ${e.scrollSnap}`:"",this.slideTriggers=[];const o=Array.from(this.Reveal.getRevealElement().querySelectorAll(".scroll-page"));this.pages=o.map((i=>{const n=this.createPage({pageElement:i,slideElement:i.querySelector("section"),stickyElement:i.querySelector(".scroll-page-sticky"),contentElement:i.querySelector(".scroll-page-content"),backgroundElement:i.querySelector(".slide-background"),autoAnimateElements:i.querySelectorAll(".scroll-auto-animate-page"),autoAnimatePages:[]});n.pageElement.style.setProperty("--slide-height",true===e.center?"auto":t.height+"px"),this.slideTriggers.push({page:n,activate:()=>this.activatePage(n),deactivate:()=>this.deactivatePage(n)}),this.createFragmentTriggersForPage(n),n.autoAnimateElements.length>0&&this.createAutoAnimateTriggersForPage(n);let o=Math.max(n.scrollTriggers.length-1,0);o+=n.autoAnimatePages.reduce(((e,t)=>e+Math.max(t.scrollTriggers.length-1,0)),n.autoAnimatePages.length),n.pageElement.querySelectorAll(".scroll-snap-point").forEach((e=>e.remove()));for(let e=0;e<o+1;e++){const t=document.createElement("div");t.className="scroll-snap-point",t.style.height=this.scrollTriggerHeight+"px",t.style.scrollSnapAlign=s?"center":"start",n.pageElement.appendChild(t),0===e&&(t.style.marginTop=-this.scrollTriggerHeight+"px");}return s&&n.scrollTriggers.length>0?(n.pageHeight=a,n.pageElement.style.setProperty("--page-height",a+"px")):(n.pageHeight=r,n.pageElement.style.removeProperty("--page-height")),n.scrollPadding=this.scrollTriggerHeight*o,n.totalHeight=n.pageHeight+n.scrollPadding,n.pageElement.style.setProperty("--page-scroll-padding",n.scrollPadding+"px"),o>0?(n.stickyElement.style.position="sticky",n.stickyElement.style.top=Math.max((a-n.pageHeight)/2,0)+"px"):(n.stickyElement.style.position="relative",n.pageElement.style.scrollSnapAlign=n.pageHeight<a?"center":"start"),n})),this.setTriggerRanges(),this.viewportElement.setAttribute("data-scrollbar",e.scrollProgress),e.scrollProgress&&this.totalScrollTriggerCount>1?(this.progressBar||this.createProgressBar(),this.syncProgressBar()):this.removeProgressBar();}setTriggerRanges(){this.totalScrollTriggerCount=this.slideTriggers.reduce(((e,t)=>e+Math.max(t.page.scrollTriggers.length,1)),0);let e=0;this.slideTriggers.forEach(((t,i)=>{t.range=[e,e+Math.max(t.page.scrollTriggers.length,1)/this.totalScrollTriggerCount];const s=(t.range[1]-t.range[0])/t.page.scrollTriggers.length;t.page.scrollTriggers.forEach(((t,i)=>{t.range=[e+i*s,e+(i+1)*s];})),e=t.range[1];}));}createFragmentTriggersForPage(e,t){t=t||e.slideElement;const i=this.Reveal.fragments.sort(t.querySelectorAll(".fragment"),true);return i.length&&(e.fragments=this.Reveal.fragments.sort(t.querySelectorAll(".fragment:not(.disabled)")),e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(-1,e.fragments,t);}}),i.forEach(((i,s)=>{e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(s,e.fragments,t);}});}))),e.scrollTriggers.length}createAutoAnimateTriggersForPage(e){e.autoAnimateElements.length>0&&this.slideTriggers.push(...Array.from(e.autoAnimateElements).map(((t,i)=>{let s=this.createPage({slideElement:t.querySelector("section"),contentElement:t,backgroundElement:t.querySelector(".slide-background")});return this.createFragmentTriggersForPage(s,s.slideElement),e.autoAnimatePages.push(s),{page:s,activate:()=>this.activatePage(s),deactivate:()=>this.deactivatePage(s)}})));}createPage(e){return e.scrollTriggers=[],e.indexh=parseInt(e.slideElement.getAttribute("data-index-h"),10),e.indexv=parseInt(e.slideElement.getAttribute("data-index-v"),10),e}syncProgressBar(){this.progressBarInner.querySelectorAll(".scrollbar-slide").forEach((e=>e.remove()));const e=this.viewportElement.scrollHeight,t=this.viewportElement.offsetHeight,i=t/e;this.progressBarHeight=this.progressBarInner.offsetHeight,this.playheadHeight=Math.max(i*this.progressBarHeight,8),this.progressBarScrollableHeight=this.progressBarHeight-this.playheadHeight;const s=t/e*this.progressBarHeight,a=Math.min(s/8,4);this.progressBarPlayhead.style.height=this.playheadHeight-a+"px",s>6?this.slideTriggers.forEach((e=>{const{page:t}=e;t.progressBarSlide=document.createElement("div"),t.progressBarSlide.className="scrollbar-slide",t.progressBarSlide.style.top=e.range[0]*this.progressBarHeight+"px",t.progressBarSlide.style.height=(e.range[1]-e.range[0])*this.progressBarHeight-a+"px",t.progressBarSlide.classList.toggle("has-triggers",t.scrollTriggers.length>0),this.progressBarInner.appendChild(t.progressBarSlide),t.scrollTriggerElements=t.scrollTriggers.map(((i,s)=>{const n=document.createElement("div");return n.className="scrollbar-trigger",n.style.top=(i.range[0]-e.range[0])*this.progressBarHeight+"px",n.style.height=(i.range[1]-i.range[0])*this.progressBarHeight-a+"px",t.progressBarSlide.appendChild(n),0===s&&(n.style.display="none"),n}));})):this.pages.forEach((e=>e.progressBarSlide=null));}syncScrollPosition(){const e=this.viewportElement.offsetHeight,t=e/this.viewportElement.scrollHeight,i=this.viewportElement.scrollTop,s=this.viewportElement.scrollHeight-e,a=Math.max(Math.min(i/s,1),0),n=Math.max(Math.min((i+e/2)/this.viewportElement.scrollHeight,1),0);let r;this.slideTriggers.forEach((e=>{const{page:i}=e;a>=e.range[0]-2*t&&a<=e.range[1]+2*t&&!i.loaded?(i.loaded=true,this.Reveal.slideContent.load(i.slideElement)):i.loaded&&(i.loaded=false,this.Reveal.slideContent.unload(i.slideElement)),a>=e.range[0]&&a<=e.range[1]?(this.activateTrigger(e),r=e.page):e.active&&this.deactivateTrigger(e);})),r&&r.scrollTriggers.forEach((e=>{n>=e.range[0]&&n<=e.range[1]?this.activateTrigger(e):e.active&&this.deactivateTrigger(e);})),this.setProgressBarValue(i/(this.viewportElement.scrollHeight-e));}setProgressBarValue(e){this.progressBar&&(this.progressBarPlayhead.style.transform=`translateY(${e*this.progressBarScrollableHeight}px)`,this.getAllPages().filter((e=>e.progressBarSlide)).forEach((e=>{e.progressBarSlide.classList.toggle("active",true===e.active),e.scrollTriggers.forEach(((t,i)=>{e.scrollTriggerElements[i].classList.toggle("active",true===e.active&&true===t.active);}));})),this.showProgressBar());}showProgressBar(){this.progressBar.classList.add("visible"),clearTimeout(this.hideProgressBarTimeout),"auto"!==this.Reveal.getConfig().scrollProgress||this.draggingProgressBar||(this.hideProgressBarTimeout=setTimeout((()=>{this.progressBar&&this.progressBar.classList.remove("visible");}),500));}prev(){this.viewportElement.scrollTop-=this.scrollTriggerHeight;}next(){this.viewportElement.scrollTop+=this.scrollTriggerHeight;}scrollToSlide(e){if(this.active){const t=this.getScrollTriggerBySlide(e);t&&(this.viewportElement.scrollTop=t.range[0]*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight));}else this.activatedCallbacks.push((()=>this.scrollToSlide(e)));}storeScrollPosition(){clearTimeout(this.storeScrollPositionTimeout),this.storeScrollPositionTimeout=setTimeout((()=>{sessionStorage.setItem("reveal-scroll-top",this.viewportElement.scrollTop),sessionStorage.setItem("reveal-scroll-origin",location.origin+location.pathname),this.storeScrollPositionTimeout=null;}),50);}restoreScrollPosition(){const e=sessionStorage.getItem("reveal-scroll-top"),t=sessionStorage.getItem("reveal-scroll-origin");e&&t===location.origin+location.pathname&&(this.viewportElement.scrollTop=parseInt(e,10));}activatePage(e){if(!e.active){e.active=true;const{slideElement:t,backgroundElement:i,contentElement:s,indexh:a,indexv:n}=e;s.style.display="block",t.classList.add("present"),i&&i.classList.add("present"),this.Reveal.setCurrentScrollPage(t,a,n),this.Reveal.backgrounds.bubbleSlideContrastClassToElement(t,this.viewportElement),Array.from(s.parentNode.querySelectorAll(".scroll-page-content")).forEach((e=>{e!==s&&(e.style.display="none");}));}}deactivatePage(e){e.active&&(e.active=false,e.slideElement&&e.slideElement.classList.remove("present"),e.backgroundElement&&e.backgroundElement.classList.remove("present"));}activateTrigger(e){e.active||(e.active=true,e.activate());}deactivateTrigger(e){e.active&&(e.active=false,e.deactivate&&e.deactivate());}getSlideByIndices(e,t){const i=this.getAllPages().find((i=>i.indexh===e&&i.indexv===t));return i?i.slideElement:null}getScrollTriggerBySlide(e){return this.slideTriggers.find((t=>t.page.slideElement===e))}getAllPages(){return this.pages.flatMap((e=>[e,...e.autoAnimatePages||[]]))}onScroll(){this.syncScrollPosition(),this.storeScrollPosition();}get viewportElement(){return this.Reveal.getViewportElement()}};let x$1 = class x{constructor(e){this.Reveal=e;}async activate(){const e=this.Reveal.getConfig(),i=t$1(this.Reveal.getRevealElement(),m$1),s=e.slideNumber&&/all|print/i.test(e.showSlideNumber),a=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),n=Math.floor(a.width*(1+e.margin)),r=Math.floor(a.height*(1+e.margin)),o=a.width,d=a.height;await new Promise(requestAnimationFrame),l$1("@page{size:"+n+"px "+r+"px; margin: 0px;}"),l$1(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: "+o+"px; max-height:"+d+"px}"),document.documentElement.classList.add("reveal-print","print-pdf"),document.body.style.width=n+"px",document.body.style.height=r+"px";const c=this.Reveal.getViewportElement();let h;if(c){const e=window.getComputedStyle(c);e&&e.background&&(h=e.background);}await new Promise(requestAnimationFrame),this.Reveal.layoutSlideContents(o,d),await new Promise(requestAnimationFrame);const u=i.map((e=>e.scrollHeight)),g=[],p=i[0].parentNode;let v=1;i.forEach((function(i,a){if(false===i.classList.contains("stack")){let l=(n-o)/2,c=(r-d)/2;const p=u[a];let m=Math.max(Math.ceil(p/r),1);m=Math.min(m,e.pdfMaxPagesPerSlide),(1===m&&e.center||i.classList.contains("center"))&&(c=Math.max((r-p)/2,0));const f=document.createElement("div");if(g.push(f),f.className="pdf-page",f.style.height=(r+e.pdfPageHeightOffset)*m+"px",h&&(f.style.background=h),f.appendChild(i),i.style.left=l+"px",i.style.top=c+"px",i.style.width=o+"px",this.Reveal.slideContent.layout(i),i.slideBackgroundElement&&f.insertBefore(i.slideBackgroundElement,i),e.showNotes){const t=this.Reveal.getSlideNotes(i);if(t){const i=8,s="string"==typeof e.showNotes?e.showNotes:"inline",a=document.createElement("div");a.classList.add("speaker-notes"),a.classList.add("speaker-notes-pdf"),a.setAttribute("data-layout",s),a.innerHTML=t,"separate-page"===s?g.push(a):(a.style.left=i+"px",a.style.bottom=i+"px",a.style.width=n-2*i+"px",f.appendChild(a));}}if(s){const e=document.createElement("div");e.classList.add("slide-number"),e.classList.add("slide-number-pdf"),e.innerHTML=v++,f.appendChild(e);}if(e.pdfSeparateFragments){const e=this.Reveal.fragments.sort(f.querySelectorAll(".fragment"),true);let t;e.forEach((function(e,i){t&&t.forEach((function(e){e.classList.remove("current-fragment");})),e.forEach((function(e){e.classList.add("visible","current-fragment");}),this);const a=f.cloneNode(true);if(s){const e=i+1;a.querySelector(".slide-number-pdf").innerHTML+="."+e;}g.push(a),t=e;}),this),e.forEach((function(e){e.forEach((function(e){e.classList.remove("visible","current-fragment");}));}));}else t$1(f,".fragment:not(.fade-out)").forEach((function(e){e.classList.add("visible");}));}}),this),await new Promise(requestAnimationFrame),g.forEach((e=>p.appendChild(e))),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.dispatchEvent({type:"pdf-ready"}),c.classList.remove("loading-scroll-mode");}isActive(){return "print"===this.Reveal.getConfig().view}};let P$1 = class P{constructor(e){this.Reveal=e;}configure(e,t){ false===e.fragments?this.disable():false===t.fragments&&this.enable();}disable(){t$1(this.Reveal.getSlidesElement(),".fragment").forEach((e=>{e.classList.add("visible"),e.classList.remove("current-fragment");}));}enable(){t$1(this.Reveal.getSlidesElement(),".fragment").forEach((e=>{e.classList.remove("visible"),e.classList.remove("current-fragment");}));}availableRoutes(){let e=this.Reveal.getCurrentSlide();if(e&&this.Reveal.getConfig().fragments){let t=e.querySelectorAll(".fragment:not(.disabled)"),i=e.querySelectorAll(".fragment:not(.disabled):not(.visible)");return {prev:t.length-i.length>0,next:!!i.length}}return {prev:false,next:false}}sort(e,t=false){e=Array.from(e);let i=[],s=[],a=[];e.forEach((e=>{if(e.hasAttribute("data-fragment-index")){let t=parseInt(e.getAttribute("data-fragment-index"),10);i[t]||(i[t]=[]),i[t].push(e);}else s.push([e]);})),i=i.concat(s);let n=0;return i.forEach((e=>{e.forEach((e=>{a.push(e),e.setAttribute("data-fragment-index",n);})),n++;})),true===t?i:a}sortAll(){this.Reveal.getHorizontalSlides().forEach((e=>{let i=t$1(e,"section");i.forEach(((e,t)=>{this.sort(e.querySelectorAll(".fragment"));}),this),0===i.length&&this.sort(e.querySelectorAll(".fragment"));}));}update(e,t,i=this.Reveal.getCurrentSlide()){let s={shown:[],hidden:[]};if(i&&this.Reveal.getConfig().fragments&&(t=t||this.sort(i.querySelectorAll(".fragment"))).length){let a=0;if("number"!=typeof e){let t=this.sort(i.querySelectorAll(".fragment.visible")).pop();t&&(e=parseInt(t.getAttribute("data-fragment-index")||0,10));}Array.from(t).forEach(((t,i)=>{if(t.hasAttribute("data-fragment-index")&&(i=parseInt(t.getAttribute("data-fragment-index"),10)),a=Math.max(a,i),i<=e){let a=t.classList.contains("visible");t.classList.add("visible"),t.classList.remove("current-fragment"),i===e&&(this.Reveal.announceStatus(this.Reveal.getStatusText(t)),t.classList.add("current-fragment"),this.Reveal.slideContent.startEmbeddedContent(t)),a||(s.shown.push(t),this.Reveal.dispatchEvent({target:t,type:"visible",bubbles:false}));}else {let e=t.classList.contains("visible");t.classList.remove("visible"),t.classList.remove("current-fragment"),e&&(this.Reveal.slideContent.stopEmbeddedContent(t),s.hidden.push(t),this.Reveal.dispatchEvent({target:t,type:"hidden",bubbles:false}));}})),e="number"==typeof e?e:-1,e=Math.max(Math.min(e,a),-1),i.setAttribute("data-fragment",e);}return s.hidden.length&&this.Reveal.dispatchEvent({type:"fragmenthidden",data:{fragment:s.hidden[0],fragments:s.hidden}}),s.shown.length&&this.Reveal.dispatchEvent({type:"fragmentshown",data:{fragment:s.shown[0],fragments:s.shown}}),s}sync(e=this.Reveal.getCurrentSlide()){return this.sort(e.querySelectorAll(".fragment"))}goto(e,t=0){let i=this.Reveal.getCurrentSlide();if(i&&this.Reveal.getConfig().fragments){let s=this.sort(i.querySelectorAll(".fragment:not(.disabled)"));if(s.length){if("number"!=typeof e){let t=this.sort(i.querySelectorAll(".fragment:not(.disabled).visible")).pop();e=t?parseInt(t.getAttribute("data-fragment-index")||0,10):-1;}e+=t;let a=this.update(e,s);return this.Reveal.controls.update(),this.Reveal.progress.update(),this.Reveal.getConfig().fragmentInURL&&this.Reveal.location.writeURL(),!(!a.shown.length&&!a.hidden.length)}}return  false}next(){return this.goto(null,1)}prev(){return this.goto(null,-1)}};let T$1 = class T{constructor(e){this.Reveal=e,this.active=false,this.onSlideClicked=this.onSlideClicked.bind(this);}activate(){if(this.Reveal.getConfig().overview&&!this.Reveal.isScrollView()&&!this.isActive()){this.active=true,this.Reveal.getRevealElement().classList.add("overview"),this.Reveal.cancelAutoSlide(),this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()),t$1(this.Reveal.getRevealElement(),m$1).forEach((e=>{e.classList.contains("stack")||e.addEventListener("click",this.onSlideClicked,true);}));const e=70,i=this.Reveal.getComputedSlideSize();this.overviewSlideWidth=i.width+e,this.overviewSlideHeight=i.height+e,this.Reveal.getConfig().rtl&&(this.overviewSlideWidth=-this.overviewSlideWidth),this.Reveal.updateSlidesVisibility(),this.layout(),this.update(),this.Reveal.layout();const s=this.Reveal.getIndices();this.Reveal.dispatchEvent({type:"overviewshown",data:{indexh:s.h,indexv:s.v,currentSlide:this.Reveal.getCurrentSlide()}});}}layout(){this.Reveal.getHorizontalSlides().forEach(((e,i)=>{e.setAttribute("data-index-h",i),a$1(e,"translate3d("+i*this.overviewSlideWidth+"px, 0, 0)"),e.classList.contains("stack")&&t$1(e,"section").forEach(((e,t)=>{e.setAttribute("data-index-h",i),e.setAttribute("data-index-v",t),a$1(e,"translate3d(0, "+t*this.overviewSlideHeight+"px, 0)");}));})),Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach(((e,i)=>{a$1(e,"translate3d("+i*this.overviewSlideWidth+"px, 0, 0)"),t$1(e,".slide-background").forEach(((e,t)=>{a$1(e,"translate3d(0, "+t*this.overviewSlideHeight+"px, 0)");}));}));}update(){const e=Math.min(window.innerWidth,window.innerHeight),t=Math.max(e/5,150)/e,i=this.Reveal.getIndices();this.Reveal.transformSlides({overview:["scale("+t+")","translateX("+-i.h*this.overviewSlideWidth+"px)","translateY("+-i.v*this.overviewSlideHeight+"px)"].join(" ")});}deactivate(){if(this.Reveal.getConfig().overview){this.active=false,this.Reveal.getRevealElement().classList.remove("overview"),this.Reveal.getRevealElement().classList.add("overview-deactivating"),setTimeout((()=>{this.Reveal.getRevealElement().classList.remove("overview-deactivating");}),1),this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()),t$1(this.Reveal.getRevealElement(),m$1).forEach((e=>{a$1(e,""),e.removeEventListener("click",this.onSlideClicked,true);})),t$1(this.Reveal.getBackgroundsElement(),".slide-background").forEach((e=>{a$1(e,"");})),this.Reveal.transformSlides({overview:""});const e=this.Reveal.getIndices();this.Reveal.slide(e.h,e.v),this.Reveal.layout(),this.Reveal.cueAutoSlide(),this.Reveal.dispatchEvent({type:"overviewhidden",data:{indexh:e.h,indexv:e.v,currentSlide:this.Reveal.getCurrentSlide()}});}}toggle(e){"boolean"==typeof e?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate();}isActive(){return this.active}onSlideClicked(e){if(this.isActive()){e.preventDefault();let t=e.target;for(;t&&!t.nodeName.match(/section/gi);)t=t.parentNode;if(t&&!t.classList.contains("disabled")&&(this.deactivate(),t.nodeName.match(/section/gi))){let e=parseInt(t.getAttribute("data-index-h"),10),i=parseInt(t.getAttribute("data-index-v"),10);this.Reveal.slide(e,i);}}}};let N$1 = class N{constructor(e){this.Reveal=e,this.shortcuts={},this.bindings={},this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this);}configure(e,t){"linear"===e.navigationMode?(this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"]="Next slide",this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"]="Previous slide"):(this.shortcuts["N  ,  SPACE"]="Next slide",this.shortcuts["P  ,  Shift SPACE"]="Previous slide",this.shortcuts["&#8592;  ,  H"]="Navigate left",this.shortcuts["&#8594;  ,  L"]="Navigate right",this.shortcuts["&#8593;  ,  K"]="Navigate up",this.shortcuts["&#8595;  ,  J"]="Navigate down"),this.shortcuts["Alt + &#8592;/&#8593/&#8594;/&#8595;"]="Navigate without fragments",this.shortcuts["Shift + &#8592;/&#8593/&#8594;/&#8595;"]="Jump to first/last slide",this.shortcuts["B  ,  ."]="Pause",this.shortcuts.F="Fullscreen",this.shortcuts.G="Jump to slide",this.shortcuts["ESC, O"]="Slide overview";}bind(){document.addEventListener("keydown",this.onDocumentKeyDown,false);}unbind(){document.removeEventListener("keydown",this.onDocumentKeyDown,false);}addKeyBinding(e,t){"object"==typeof e&&e.keyCode?this.bindings[e.keyCode]={callback:t,key:e.key,description:e.description}:this.bindings[e]={callback:t,key:null,description:null};}removeKeyBinding(e){delete this.bindings[e];}triggerKey(e){this.onDocumentKeyDown({keyCode:e});}registerKeyboardShortcut(e,t){this.shortcuts[e]=t;}getShortcuts(){return this.shortcuts}getBindings(){return this.bindings}onDocumentKeyDown(e){let t=this.Reveal.getConfig();if("function"==typeof t.keyboardCondition&&false===t.keyboardCondition(e))return  true;if("focused"===t.keyboardCondition&&!this.Reveal.isFocused())return  true;let i=e.keyCode,s=!this.Reveal.isAutoSliding();this.Reveal.onUserInput(e);let a=document.activeElement&&true===document.activeElement.isContentEditable,n=document.activeElement&&document.activeElement.tagName&&/input|textarea/i.test(document.activeElement.tagName),r=document.activeElement&&document.activeElement.className&&/speaker-notes/i.test(document.activeElement.className),l=!(-1!==[32,37,38,39,40,63,78,80,191].indexOf(e.keyCode)&&e.shiftKey||e.altKey)&&(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey);if(a||n||r||l)return;let d,c=[66,86,190,191,112];if("object"==typeof t.keyboard)for(d in t.keyboard)"togglePause"===t.keyboard[d]&&c.push(parseInt(d,10));if(this.Reveal.isPaused()&&-1===c.indexOf(i))return  false;let h="linear"===t.navigationMode||!this.Reveal.hasHorizontalSlides()||!this.Reveal.hasVerticalSlides(),u=false;if("object"==typeof t.keyboard)for(d in t.keyboard)if(parseInt(d,10)===i){let i=t.keyboard[d];"function"==typeof i?i.apply(null,[e]):"string"==typeof i&&"function"==typeof this.Reveal[i]&&this.Reveal[i].call(),u=true;}if(false===u)for(d in this.bindings)if(parseInt(d,10)===i){let t=this.bindings[d].callback;"function"==typeof t?t.apply(null,[e]):"string"==typeof t&&"function"==typeof this.Reveal[t]&&this.Reveal[t].call(),u=true;} false===u&&(u=true,80===i||33===i?this.Reveal.prev({skipFragments:e.altKey}):78===i||34===i?this.Reveal.next({skipFragments:e.altKey}):72===i||37===i?e.shiftKey?this.Reveal.slide(0):!this.Reveal.overview.isActive()&&h?t.rtl?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.left({skipFragments:e.altKey}):76===i||39===i?e.shiftKey?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):!this.Reveal.overview.isActive()&&h?t.rtl?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey}):this.Reveal.right({skipFragments:e.altKey}):75===i||38===i?e.shiftKey?this.Reveal.slide(void 0,0):!this.Reveal.overview.isActive()&&h?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.up({skipFragments:e.altKey}):74===i||40===i?e.shiftKey?this.Reveal.slide(void 0,Number.MAX_VALUE):!this.Reveal.overview.isActive()&&h?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.down({skipFragments:e.altKey}):36===i?this.Reveal.slide(0):35===i?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):32===i?(this.Reveal.overview.isActive()&&this.Reveal.overview.deactivate(),e.shiftKey?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey})):[58,59,66,86,190].includes(i)||191===i&&!e.shiftKey?this.Reveal.togglePause():70===i?o$1(t.embedded?this.Reveal.getViewportElement():document.documentElement):65===i?t.autoSlideStoppable&&this.Reveal.toggleAutoSlide(s):71===i?t.jumpToSlide&&this.Reveal.toggleJumpToSlide():63!==i&&191!==i||!e.shiftKey?112===i?this.Reveal.toggleHelp():u=false:this.Reveal.toggleHelp()),u?e.preventDefault&&e.preventDefault():27!==i&&79!==i||(false===this.Reveal.closeOverlay()&&this.Reveal.overview.toggle(),e.preventDefault&&e.preventDefault()),this.Reveal.cueAutoSlide();}};let M$1 = class M{MAX_REPLACE_STATE_FREQUENCY=1e3;constructor(e){this.Reveal=e,this.writeURLTimeout=0,this.replaceStateTimestamp=0,this.onWindowHashChange=this.onWindowHashChange.bind(this);}bind(){window.addEventListener("hashchange",this.onWindowHashChange,false);}unbind(){window.removeEventListener("hashchange",this.onWindowHashChange,false);}getIndicesFromHash(e=window.location.hash,t={}){let i=e.replace(/^#\/?/,""),s=i.split("/");if(/^[0-9]*$/.test(s[0])||!i.length){const e=this.Reveal.getConfig();let i,a=e.hashOneBasedIndex||t.oneBasedIndex?1:0,n=parseInt(s[0],10)-a||0,r=parseInt(s[1],10)-a||0;return e.fragmentInURL&&(i=parseInt(s[2],10),isNaN(i)&&(i=void 0)),{h:n,v:r,f:i}}{let e,t;/\/[-\d]+$/g.test(i)&&(t=parseInt(i.split("/").pop(),10),t=isNaN(t)?void 0:t,i=i.split("/").shift());try{e=document.getElementById(decodeURIComponent(i)).closest(".slides section");}catch(e){}if(e)return {...this.Reveal.getIndices(e),f:t}}return null}readURL(){const e=this.Reveal.getIndices(),t=this.getIndicesFromHash();t?t.h===e.h&&t.v===e.v&&void 0===t.f||this.Reveal.slide(t.h,t.v,t.f):this.Reveal.slide(e.h||0,e.v||0);}writeURL(e){let t=this.Reveal.getConfig(),i=this.Reveal.getCurrentSlide();if(clearTimeout(this.writeURLTimeout),"number"==typeof e)this.writeURLTimeout=setTimeout(this.writeURL,e);else if(i){let e=this.getHash();t.history?window.location.hash=e:t.hash&&("/"===e?this.debouncedReplaceState(window.location.pathname+window.location.search):this.debouncedReplaceState("#"+e));}}replaceState(e){window.history.replaceState(null,null,e),this.replaceStateTimestamp=Date.now();}debouncedReplaceState(e){clearTimeout(this.replaceStateTimeout),Date.now()-this.replaceStateTimestamp>this.MAX_REPLACE_STATE_FREQUENCY?this.replaceState(e):this.replaceStateTimeout=setTimeout((()=>this.replaceState(e)),this.MAX_REPLACE_STATE_FREQUENCY);}getHash(e){let t="/",i=e||this.Reveal.getCurrentSlide(),s=i?i.getAttribute("id"):null;s&&(s=encodeURIComponent(s));let a=this.Reveal.getIndices(e);if(this.Reveal.getConfig().fragmentInURL||(a.f=void 0),"string"==typeof s&&s.length)t="/"+s,a.f>=0&&(t+="/"+a.f);else {let e=this.Reveal.getConfig().hashOneBasedIndex?1:0;(a.h>0||a.v>0||a.f>=0)&&(t+=a.h+e),(a.v>0||a.f>=0)&&(t+="/"+(a.v+e)),a.f>=0&&(t+="/"+a.f);}return t}onWindowHashChange(e){this.readURL();}};let I$1 = class I{constructor(e){this.Reveal=e,this.onNavigateLeftClicked=this.onNavigateLeftClicked.bind(this),this.onNavigateRightClicked=this.onNavigateRightClicked.bind(this),this.onNavigateUpClicked=this.onNavigateUpClicked.bind(this),this.onNavigateDownClicked=this.onNavigateDownClicked.bind(this),this.onNavigatePrevClicked=this.onNavigatePrevClicked.bind(this),this.onNavigateNextClicked=this.onNavigateNextClicked.bind(this),this.onEnterFullscreen=this.onEnterFullscreen.bind(this);}render(){const e=this.Reveal.getConfig().rtl,i=this.Reveal.getRevealElement();this.element=document.createElement("aside"),this.element.className="controls",this.element.innerHTML=`<button class="navigate-left" aria-label="${e?"next slide":"previous slide"}"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-right" aria-label="${e?"previous slide":"next slide"}"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`,this.Reveal.getRevealElement().appendChild(this.element),this.controlsLeft=t$1(i,".navigate-left"),this.controlsRight=t$1(i,".navigate-right"),this.controlsUp=t$1(i,".navigate-up"),this.controlsDown=t$1(i,".navigate-down"),this.controlsPrev=t$1(i,".navigate-prev"),this.controlsNext=t$1(i,".navigate-next"),this.controlsFullscreen=t$1(i,".enter-fullscreen"),this.controlsRightArrow=this.element.querySelector(".navigate-right"),this.controlsLeftArrow=this.element.querySelector(".navigate-left"),this.controlsDownArrow=this.element.querySelector(".navigate-down");}configure(e,t){this.element.style.display=e.controls?"block":"none",this.element.setAttribute("data-controls-layout",e.controlsLayout),this.element.setAttribute("data-controls-back-arrows",e.controlsBackArrows);}bind(){let e=["touchstart","click"];g$1&&(e=["touchstart"]),e.forEach((e=>{this.controlsLeft.forEach((t=>t.addEventListener(e,this.onNavigateLeftClicked,false))),this.controlsRight.forEach((t=>t.addEventListener(e,this.onNavigateRightClicked,false))),this.controlsUp.forEach((t=>t.addEventListener(e,this.onNavigateUpClicked,false))),this.controlsDown.forEach((t=>t.addEventListener(e,this.onNavigateDownClicked,false))),this.controlsPrev.forEach((t=>t.addEventListener(e,this.onNavigatePrevClicked,false))),this.controlsNext.forEach((t=>t.addEventListener(e,this.onNavigateNextClicked,false))),this.controlsFullscreen.forEach((t=>t.addEventListener(e,this.onEnterFullscreen,false)));}));}unbind(){["touchstart","click"].forEach((e=>{this.controlsLeft.forEach((t=>t.removeEventListener(e,this.onNavigateLeftClicked,false))),this.controlsRight.forEach((t=>t.removeEventListener(e,this.onNavigateRightClicked,false))),this.controlsUp.forEach((t=>t.removeEventListener(e,this.onNavigateUpClicked,false))),this.controlsDown.forEach((t=>t.removeEventListener(e,this.onNavigateDownClicked,false))),this.controlsPrev.forEach((t=>t.removeEventListener(e,this.onNavigatePrevClicked,false))),this.controlsNext.forEach((t=>t.removeEventListener(e,this.onNavigateNextClicked,false))),this.controlsFullscreen.forEach((t=>t.removeEventListener(e,this.onEnterFullscreen,false)));}));}update(){let e=this.Reveal.availableRoutes();[...this.controlsLeft,...this.controlsRight,...this.controlsUp,...this.controlsDown,...this.controlsPrev,...this.controlsNext].forEach((e=>{e.classList.remove("enabled","fragmented"),e.setAttribute("disabled","disabled");})),e.left&&this.controlsLeft.forEach((e=>{e.classList.add("enabled"),e.removeAttribute("disabled");})),e.right&&this.controlsRight.forEach((e=>{e.classList.add("enabled"),e.removeAttribute("disabled");})),e.up&&this.controlsUp.forEach((e=>{e.classList.add("enabled"),e.removeAttribute("disabled");})),e.down&&this.controlsDown.forEach((e=>{e.classList.add("enabled"),e.removeAttribute("disabled");})),(e.left||e.up)&&this.controlsPrev.forEach((e=>{e.classList.add("enabled"),e.removeAttribute("disabled");})),(e.right||e.down)&&this.controlsNext.forEach((e=>{e.classList.add("enabled"),e.removeAttribute("disabled");}));let t=this.Reveal.getCurrentSlide();if(t){let e=this.Reveal.fragments.availableRoutes();e.prev&&this.controlsPrev.forEach((e=>{e.classList.add("fragmented","enabled"),e.removeAttribute("disabled");})),e.next&&this.controlsNext.forEach((e=>{e.classList.add("fragmented","enabled"),e.removeAttribute("disabled");})),this.Reveal.isVerticalSlide(t)?(e.prev&&this.controlsUp.forEach((e=>{e.classList.add("fragmented","enabled"),e.removeAttribute("disabled");})),e.next&&this.controlsDown.forEach((e=>{e.classList.add("fragmented","enabled"),e.removeAttribute("disabled");}))):(e.prev&&this.controlsLeft.forEach((e=>{e.classList.add("fragmented","enabled"),e.removeAttribute("disabled");})),e.next&&this.controlsRight.forEach((e=>{e.classList.add("fragmented","enabled"),e.removeAttribute("disabled");})));}if(this.Reveal.getConfig().controlsTutorial){let t=this.Reveal.getIndices();!this.Reveal.hasNavigatedVertically()&&e.down?this.controlsDownArrow.classList.add("highlight"):(this.controlsDownArrow.classList.remove("highlight"),this.Reveal.getConfig().rtl?!this.Reveal.hasNavigatedHorizontally()&&e.left&&0===t.v?this.controlsLeftArrow.classList.add("highlight"):this.controlsLeftArrow.classList.remove("highlight"):!this.Reveal.hasNavigatedHorizontally()&&e.right&&0===t.v?this.controlsRightArrow.classList.add("highlight"):this.controlsRightArrow.classList.remove("highlight"));}}destroy(){this.unbind(),this.element.remove();}onNavigateLeftClicked(e){e.preventDefault(),this.Reveal.onUserInput(),"linear"===this.Reveal.getConfig().navigationMode?this.Reveal.prev():this.Reveal.left();}onNavigateRightClicked(e){e.preventDefault(),this.Reveal.onUserInput(),"linear"===this.Reveal.getConfig().navigationMode?this.Reveal.next():this.Reveal.right();}onNavigateUpClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.up();}onNavigateDownClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.down();}onNavigatePrevClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.prev();}onNavigateNextClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.next();}onEnterFullscreen(e){const t=this.Reveal.getConfig(),i=this.Reveal.getViewportElement();o$1(t.embedded?i:i.parentElement);}};class B{constructor(e){this.Reveal=e,this.onProgressClicked=this.onProgressClicked.bind(this);}render(){this.element=document.createElement("div"),this.element.className="progress",this.Reveal.getRevealElement().appendChild(this.element),this.bar=document.createElement("span"),this.element.appendChild(this.bar);}configure(e,t){this.element.style.display=e.progress?"block":"none";}bind(){this.Reveal.getConfig().progress&&this.element&&this.element.addEventListener("click",this.onProgressClicked,false);}unbind(){this.Reveal.getConfig().progress&&this.element&&this.element.removeEventListener("click",this.onProgressClicked,false);}update(){if(this.Reveal.getConfig().progress&&this.bar){let e=this.Reveal.getProgress();this.Reveal.getTotalSlides()<2&&(e=0),this.bar.style.transform="scaleX("+e+")";}}getMaxWidth(){return this.Reveal.getRevealElement().offsetWidth}onProgressClicked(e){this.Reveal.onUserInput(e),e.preventDefault();let t=this.Reveal.getSlides(),i=t.length,s=Math.floor(e.clientX/this.getMaxWidth()*i);this.Reveal.getConfig().rtl&&(s=i-s);let a=this.Reveal.getIndices(t[s]);this.Reveal.slide(a.h,a.v);}destroy(){this.element.remove();}}class H{constructor(e){this.Reveal=e,this.lastMouseWheelStep=0,this.cursorHidden=false,this.cursorInactiveTimeout=0,this.onDocumentCursorActive=this.onDocumentCursorActive.bind(this),this.onDocumentMouseScroll=this.onDocumentMouseScroll.bind(this);}configure(e,t){e.mouseWheel?document.addEventListener("wheel",this.onDocumentMouseScroll,false):document.removeEventListener("wheel",this.onDocumentMouseScroll,false),e.hideInactiveCursor?(document.addEventListener("mousemove",this.onDocumentCursorActive,false),document.addEventListener("mousedown",this.onDocumentCursorActive,false)):(this.showCursor(),document.removeEventListener("mousemove",this.onDocumentCursorActive,false),document.removeEventListener("mousedown",this.onDocumentCursorActive,false));}showCursor(){this.cursorHidden&&(this.cursorHidden=false,this.Reveal.getRevealElement().style.cursor="");}hideCursor(){ false===this.cursorHidden&&(this.cursorHidden=true,this.Reveal.getRevealElement().style.cursor="none");}destroy(){this.showCursor(),document.removeEventListener("wheel",this.onDocumentMouseScroll,false),document.removeEventListener("mousemove",this.onDocumentCursorActive,false),document.removeEventListener("mousedown",this.onDocumentCursorActive,false);}onDocumentCursorActive(e){this.showCursor(),clearTimeout(this.cursorInactiveTimeout),this.cursorInactiveTimeout=setTimeout(this.hideCursor.bind(this),this.Reveal.getConfig().hideCursorTime);}onDocumentMouseScroll(e){if(Date.now()-this.lastMouseWheelStep>1e3){this.lastMouseWheelStep=Date.now();let t=e.detail||-e.wheelDelta;t>0?this.Reveal.next():t<0&&this.Reveal.prev();}}}const D=(e,t)=>{const i=document.createElement("script");i.type="text/javascript",i.async=false,i.defer=false,i.src=e,"function"==typeof t&&(i.onload=i.onreadystatechange=e=>{("load"===e.type||/loaded|complete/.test(i.readyState))&&(i.onload=i.onreadystatechange=i.onerror=null,t());},i.onerror=e=>{i.onload=i.onreadystatechange=i.onerror=null,t(new Error("Failed loading script: "+i.src+"\n"+e));});const s=document.querySelector("head");s.insertBefore(i,s.lastChild);};class F{constructor(e){this.Reveal=e,this.state="idle",this.registeredPlugins={},this.asyncDependencies=[];}load(e,t){return this.state="loading",e.forEach(this.registerPlugin.bind(this)),new Promise((e=>{let i=[],s=0;if(t.forEach((e=>{e.condition&&!e.condition()||(e.async?this.asyncDependencies.push(e):i.push(e));})),i.length){s=i.length;const t=t=>{t&&"function"==typeof t.callback&&t.callback(),0==--s&&this.initPlugins().then(e);};i.forEach((e=>{"string"==typeof e.id?(this.registerPlugin(e),t(e)):"string"==typeof e.src?D(e.src,(()=>t(e))):(console.warn("Unrecognized plugin format",e),t());}));}else this.initPlugins().then(e);}))}initPlugins(){return new Promise((e=>{let t=Object.values(this.registeredPlugins),i=t.length;if(0===i)this.loadAsync().then(e);else {let s,a=()=>{0==--i?this.loadAsync().then(e):s();},n=0;s=()=>{let e=t[n++];if("function"==typeof e.init){let t=e.init(this.Reveal);t&&"function"==typeof t.then?t.then(a):a();}else a();},s();}}))}loadAsync(){return this.state="loaded",this.asyncDependencies.length&&this.asyncDependencies.forEach((e=>{D(e.src,e.callback);})),Promise.resolve()}registerPlugin(e){2===arguments.length&&"string"==typeof arguments[0]?(e=arguments[1]).id=arguments[0]:"function"==typeof e&&(e=e());let t=e.id;"string"!=typeof t?console.warn("Unrecognized plugin format; can't find plugin.id",e):void 0===this.registeredPlugins[t]?(this.registeredPlugins[t]=e,"loaded"===this.state&&"function"==typeof e.init&&e.init(this.Reveal)):console.warn('reveal.js: "'+t+'" plugin has already been registered');}hasPlugin(e){return !!this.registeredPlugins[e]}getPlugin(e){return this.registeredPlugins[e]}getRegisteredPlugins(){return this.registeredPlugins}destroy(){Object.values(this.registeredPlugins).forEach((e=>{"function"==typeof e.destroy&&e.destroy();})),this.registeredPlugins={},this.asyncDependencies=[];}}let z$1 = class z{constructor(e){this.Reveal=e,this.touchStartX=0,this.touchStartY=0,this.touchStartCount=0,this.touchCaptured=false,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this);}bind(){let e=this.Reveal.getRevealElement();"onpointerdown"in window?(e.addEventListener("pointerdown",this.onPointerDown,false),e.addEventListener("pointermove",this.onPointerMove,false),e.addEventListener("pointerup",this.onPointerUp,false)):window.navigator.msPointerEnabled?(e.addEventListener("MSPointerDown",this.onPointerDown,false),e.addEventListener("MSPointerMove",this.onPointerMove,false),e.addEventListener("MSPointerUp",this.onPointerUp,false)):(e.addEventListener("touchstart",this.onTouchStart,false),e.addEventListener("touchmove",this.onTouchMove,false),e.addEventListener("touchend",this.onTouchEnd,false));}unbind(){let e=this.Reveal.getRevealElement();e.removeEventListener("pointerdown",this.onPointerDown,false),e.removeEventListener("pointermove",this.onPointerMove,false),e.removeEventListener("pointerup",this.onPointerUp,false),e.removeEventListener("MSPointerDown",this.onPointerDown,false),e.removeEventListener("MSPointerMove",this.onPointerMove,false),e.removeEventListener("MSPointerUp",this.onPointerUp,false),e.removeEventListener("touchstart",this.onTouchStart,false),e.removeEventListener("touchmove",this.onTouchMove,false),e.removeEventListener("touchend",this.onTouchEnd,false);}isSwipePrevented(e){if(n$1(e,"video[controls], audio[controls]"))return  true;for(;e&&"function"==typeof e.hasAttribute;){if(e.hasAttribute("data-prevent-swipe"))return  true;e=e.parentNode;}return  false}onTouchStart(e){if(this.touchCaptured=false,this.isSwipePrevented(e.target))return  true;this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.touchStartCount=e.touches.length;}onTouchMove(e){if(this.isSwipePrevented(e.target))return  true;let t=this.Reveal.getConfig();if(this.touchCaptured)g$1&&e.preventDefault();else {this.Reveal.onUserInput(e);let i=e.touches[0].clientX,s=e.touches[0].clientY;if(1===e.touches.length&&2!==this.touchStartCount){let a=this.Reveal.availableRoutes({includeFragments:true}),n=i-this.touchStartX,r=s-this.touchStartY;n>40&&Math.abs(n)>Math.abs(r)?(this.touchCaptured=true,"linear"===t.navigationMode?t.rtl?this.Reveal.next():this.Reveal.prev():this.Reveal.left()):n<-40&&Math.abs(n)>Math.abs(r)?(this.touchCaptured=true,"linear"===t.navigationMode?t.rtl?this.Reveal.prev():this.Reveal.next():this.Reveal.right()):r>40&&a.up?(this.touchCaptured=true,"linear"===t.navigationMode?this.Reveal.prev():this.Reveal.up()):r<-40&&a.down&&(this.touchCaptured=true,"linear"===t.navigationMode?this.Reveal.next():this.Reveal.down()),t.embedded?(this.touchCaptured||this.Reveal.isVerticalSlide())&&e.preventDefault():e.preventDefault();}}}onTouchEnd(e){this.touchCaptured=false;}onPointerDown(e){e.pointerType!==e.MSPOINTER_TYPE_TOUCH&&"touch"!==e.pointerType||(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchStart(e));}onPointerMove(e){e.pointerType!==e.MSPOINTER_TYPE_TOUCH&&"touch"!==e.pointerType||(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchMove(e));}onPointerUp(e){e.pointerType!==e.MSPOINTER_TYPE_TOUCH&&"touch"!==e.pointerType||(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchEnd(e));}};const q$1="focus",O$1="blur";class W{constructor(e){this.Reveal=e,this.onRevealPointerDown=this.onRevealPointerDown.bind(this),this.onDocumentPointerDown=this.onDocumentPointerDown.bind(this);}configure(e,t){e.embedded?this.blur():(this.focus(),this.unbind());}bind(){this.Reveal.getConfig().embedded&&this.Reveal.getRevealElement().addEventListener("pointerdown",this.onRevealPointerDown,false);}unbind(){this.Reveal.getRevealElement().removeEventListener("pointerdown",this.onRevealPointerDown,false),document.removeEventListener("pointerdown",this.onDocumentPointerDown,false);}focus(){this.state!==q$1&&(this.Reveal.getRevealElement().classList.add("focused"),document.addEventListener("pointerdown",this.onDocumentPointerDown,false)),this.state=q$1;}blur(){this.state!==O$1&&(this.Reveal.getRevealElement().classList.remove("focused"),document.removeEventListener("pointerdown",this.onDocumentPointerDown,false)),this.state=O$1;}isFocused(){return this.state===q$1}destroy(){this.Reveal.getRevealElement().classList.remove("focused");}onRevealPointerDown(e){this.focus();}onDocumentPointerDown(e){let t=r$1(e.target,".reveal");t&&t===this.Reveal.getRevealElement()||this.blur();}}class U{constructor(e){this.Reveal=e;}render(){this.element=document.createElement("div"),this.element.className="speaker-notes",this.element.setAttribute("data-prevent-swipe",""),this.element.setAttribute("tabindex","0"),this.Reveal.getRevealElement().appendChild(this.element);}configure(e,t){e.showNotes&&this.element.setAttribute("data-layout","string"==typeof e.showNotes?e.showNotes:"inline");}update(){this.Reveal.getConfig().showNotes&&this.element&&this.Reveal.getCurrentSlide()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()&&(this.element.innerHTML=this.getSlideNotes()||'<span class="notes-placeholder">No notes on this slide.</span>');}updateVisibility(){this.Reveal.getConfig().showNotes&&this.hasNotes()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()?this.Reveal.getRevealElement().classList.add("show-notes"):this.Reveal.getRevealElement().classList.remove("show-notes");}hasNotes(){return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length>0}isSpeakerNotesWindow(){return !!window.location.search.match(/receiver/gi)}getSlideNotes(e=this.Reveal.getCurrentSlide()){if(e.hasAttribute("data-notes"))return e.getAttribute("data-notes");let t=e.querySelectorAll("aside.notes");return t?Array.from(t).map((e=>e.innerHTML)).join("\n"):null}destroy(){this.element.remove();}}class V{constructor(e,t){this.diameter=100,this.diameter2=this.diameter/2,this.thickness=6,this.playing=false,this.progress=0,this.progressOffset=1,this.container=e,this.progressCheck=t,this.canvas=document.createElement("canvas"),this.canvas.className="playback",this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.canvas.style.width=this.diameter2+"px",this.canvas.style.height=this.diameter2+"px",this.context=this.canvas.getContext("2d"),this.container.appendChild(this.canvas),this.render();}setPlaying(e){const t=this.playing;this.playing=e,!t&&this.playing?this.animate():this.render();}animate(){const e=this.progress;this.progress=this.progressCheck(),e>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&requestAnimationFrame(this.animate.bind(this));}render(){let e=this.playing?this.progress:0,t=this.diameter2-this.thickness,i=this.diameter2,s=this.diameter2,a=28;this.progressOffset+=.1*(1-this.progressOffset);const n=-Math.PI/2+e*(2*Math.PI),r=-Math.PI/2+this.progressOffset*(2*Math.PI);this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(i,s,t+4,0,2*Math.PI,false),this.context.fillStyle="rgba( 0, 0, 0, 0.4 )",this.context.fill(),this.context.beginPath(),this.context.arc(i,s,t,0,2*Math.PI,false),this.context.lineWidth=this.thickness,this.context.strokeStyle="rgba( 255, 255, 255, 0.2 )",this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(i,s,t,r,n,false),this.context.lineWidth=this.thickness,this.context.strokeStyle="#fff",this.context.stroke()),this.context.translate(i-14,s-14),this.playing?(this.context.fillStyle="#fff",this.context.fillRect(0,0,10,a),this.context.fillRect(18,0,10,a)):(this.context.beginPath(),this.context.translate(4,0),this.context.moveTo(0,0),this.context.lineTo(24,14),this.context.lineTo(0,a),this.context.fillStyle="#fff",this.context.fill()),this.context.restore();}on(e,t){this.canvas.addEventListener(e,t,false);}off(e,t){this.canvas.removeEventListener(e,t,false);}destroy(){this.playing=false,this.canvas.parentNode&&this.container.removeChild(this.canvas);}}var j={width:960,height:700,margin:.04,minScale:.2,maxScale:2,controls:true,controlsTutorial:true,controlsLayout:"bottom-right",controlsBackArrows:"faded",progress:true,slideNumber:false,showSlideNumber:"all",hashOneBasedIndex:false,hash:false,respondToHashChanges:true,jumpToSlide:true,history:false,keyboard:true,keyboardCondition:null,disableLayout:false,overview:true,center:true,touch:true,loop:false,rtl:false,navigationMode:"default",shuffle:false,fragments:true,fragmentInURL:true,embedded:false,help:true,pause:true,showNotes:false,showHiddenSlides:false,autoPlayMedia:null,preloadIframes:null,autoAnimate:true,autoAnimateMatcher:null,autoAnimateEasing:"ease",autoAnimateDuration:1,autoAnimateUnmatched:true,autoAnimateStyles:["opacity","color","background-color","padding","font-size","line-height","letter-spacing","border-width","border-color","border-radius","outline","outline-offset"],autoSlide:0,autoSlideStoppable:true,autoSlideMethod:null,defaultTiming:null,mouseWheel:false,previewLinks:false,postMessage:true,postMessageEvents:false,focusBodyOnPageVisibilityChange:true,transition:"slide",transitionSpeed:"default",backgroundTransition:"fade",parallaxBackgroundImage:"",parallaxBackgroundSize:"",parallaxBackgroundRepeat:"",parallaxBackgroundPosition:"",parallaxBackgroundHorizontal:null,parallaxBackgroundVertical:null,view:null,scrollLayout:"full",scrollSnap:"mandatory",scrollProgress:"auto",scrollActivationWidth:435,pdfMaxPagesPerSlide:Number.POSITIVE_INFINITY,pdfSeparateFragments:true,pdfPageHeightOffset:-1,viewDistance:3,mobileViewDistance:2,display:"block",hideInactiveCursor:true,hideCursorTime:5e3,sortFragmentsOnSync:true,dependencies:[],plugins:[]};const K="5.1.0";function $$1(n,o){arguments.length<2&&(o=arguments[0],n=document.querySelector(".reveal"));const l={};let c,h,g,p,w,A={},k=false,D=false,q={hasNavigatedHorizontally:false,hasNavigatedVertically:false},O=[],$=1,X={layout:"",overview:""},Y={},_="idle",J=0,G=0,Q=-1,Z=false,ee=new v$1(l),te=new E$1(l),ie=new S$1(l),se=new L$1(l),ae=new R$1(l),ne=new C$1(l),re=new x$1(l),oe=new P$1(l),le=new T$1(l),de=new N$1(l),ce=new M$1(l),he=new I$1(l),ue=new B(l),ge=new H(l),pe=new F(l),ve=new W(l),me=new z$1(l),fe=new U(l);function ye(){D=true,A.showHiddenSlides||t$1(Y.wrapper,'section[data-visibility="hidden"]').forEach((e=>{const t=e.parentNode;1===t.childElementCount&&/section/i.test(t.nodeName)?t.remove():e.remove();})),function(){Y.slides.classList.add("no-transition"),u$1?Y.wrapper.classList.add("no-hover"):Y.wrapper.classList.remove("no-hover");ae.render(),te.render(),ie.render(),he.render(),ue.render(),fe.render(),Y.pauseOverlay=((e,t,i,s="")=>{let a=e.querySelectorAll("."+i);for(let t=0;t<a.length;t++){let i=a[t];if(i.parentNode===e)return i}let n=document.createElement(t);return n.className=i,n.innerHTML=s,e.appendChild(n),n})(Y.wrapper,"div","pause-overlay",A.controls?'<button class="resume-button">Resume presentation</button>':null),Y.statusElement=function(){let e=Y.wrapper.querySelector(".aria-status");e||(e=document.createElement("div"),e.style.position="absolute",e.style.height="1px",e.style.width="1px",e.style.overflow="hidden",e.style.clip="rect( 1px, 1px, 1px, 1px )",e.classList.add("aria-status"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-atomic","true"),Y.wrapper.appendChild(e));return e}(),Y.wrapper.setAttribute("role","application");}(),A.postMessage&&window.addEventListener("message",At,false),setInterval((()=>{(!ne.isActive()&&0!==Y.wrapper.scrollTop||0!==Y.wrapper.scrollLeft)&&(Y.wrapper.scrollTop=0,Y.wrapper.scrollLeft=0);}),1e3),document.addEventListener("fullscreenchange",xt),document.addEventListener("webkitfullscreenchange",xt),rt().forEach((e=>{t$1(e,"section").forEach(((e,t)=>{t>0&&(e.classList.remove("present"),e.classList.remove("past"),e.classList.add("future"),e.setAttribute("aria-hidden","true"));}));})),Ee(),ae.update(true),function(){const e="print"===A.view,t="scroll"===A.view||"reader"===A.view;(e||t)&&(e?Ae():me.unbind(),Y.viewport.classList.add("loading-scroll-mode"),e?"complete"===document.readyState?re.activate():window.addEventListener("load",(()=>re.activate())):ne.activate());}(),ce.readURL(),setTimeout((()=>{Y.slides.classList.remove("no-transition"),Y.wrapper.classList.add("ready"),Ce({type:"ready",data:{indexh:c,indexv:h,currentSlide:p}});}),1);}function be(e){Y.statusElement.textContent=e;}function we(e){let t="";if(3===e.nodeType)t+=e.textContent;else if(1===e.nodeType){let i=e.getAttribute("aria-hidden"),s="none"===window.getComputedStyle(e).display;"true"===i||s||Array.from(e.childNodes).forEach((e=>{t+=we(e);}));}return t=t.trim(),""===t?"":t+" "}function Ee(t){const s={...A};if("object"==typeof t&&e$1(A,t),false===l.isReady())return;const a=Y.wrapper.querySelectorAll(m$1).length;Y.wrapper.classList.remove(s.transition),Y.wrapper.classList.add(A.transition),Y.wrapper.setAttribute("data-transition-speed",A.transitionSpeed),Y.wrapper.setAttribute("data-background-transition",A.backgroundTransition),Y.viewport.style.setProperty("--slide-width","string"==typeof A.width?A.width:A.width+"px"),Y.viewport.style.setProperty("--slide-height","string"==typeof A.height?A.height:A.height+"px"),A.shuffle&&Ge(),i$1(Y.wrapper,"embedded",A.embedded),i$1(Y.wrapper,"rtl",A.rtl),i$1(Y.wrapper,"center",A.center),false===A.pause&&Ke(),A.previewLinks?(Te(),Ne("[data-preview-link=false]")):(Ne(),Te("[data-preview-link]:not([data-preview-link=false])")),se.reset(),w&&(w.destroy(),w=null),a>1&&A.autoSlide&&A.autoSlideStoppable&&(w=new V(Y.wrapper,(()=>Math.min(Math.max((Date.now()-Q)/J,0),1))),w.on("click",Tt),Z=false),"default"!==A.navigationMode?Y.wrapper.setAttribute("data-navigation-mode",A.navigationMode):Y.wrapper.removeAttribute("data-navigation-mode"),fe.configure(A,s),ve.configure(A,s),ge.configure(A,s),he.configure(A,s),ue.configure(A,s),de.configure(A,s),oe.configure(A,s),te.configure(A,s),Je();}function Se(){window.addEventListener("resize",Lt,false),A.touch&&me.bind(),A.keyboard&&de.bind(),A.progress&&ue.bind(),A.respondToHashChanges&&ce.bind(),he.bind(),ve.bind(),Y.slides.addEventListener("click",kt,false),Y.slides.addEventListener("transitionend",Rt,false),Y.pauseOverlay.addEventListener("click",Ke,false),A.focusBodyOnPageVisibilityChange&&document.addEventListener("visibilitychange",Ct,false);}function Ae(){me.unbind(),ve.unbind(),de.unbind(),he.unbind(),ue.unbind(),ce.unbind(),window.removeEventListener("resize",Lt,false),Y.slides.removeEventListener("click",kt,false),Y.slides.removeEventListener("transitionend",Rt,false),Y.pauseOverlay.removeEventListener("click",Ke,false);}function Re(e,t,i){n.addEventListener(e,t,i);}function ke(e,t,i){n.removeEventListener(e,t,i);}function Le(e){"string"==typeof e.layout&&(X.layout=e.layout),"string"==typeof e.overview&&(X.overview=e.overview),X.layout?a$1(Y.slides,X.layout+" "+X.overview):a$1(Y.slides,X.overview);}function Ce({target:t=Y.wrapper,type:i,data:s,bubbles:a=true}){let n=document.createEvent("HTMLEvents",1,2);return n.initEvent(i,a,true),e$1(n,s),t.dispatchEvent(n),t===Y.wrapper&&Pe(i),n}function xe(e){Ce({type:"slidechanged",data:{indexh:c,indexv:h,previousSlide:g,currentSlide:p,origin:e}});}function Pe(t,i){if(A.postMessageEvents&&window.parent!==window.self){let s={namespace:"reveal",eventName:t,state:ut()};e$1(s,i),window.parent.postMessage(JSON.stringify(s),"*");}}function Te(e="a"){Array.from(Y.wrapper.querySelectorAll(e)).forEach((e=>{/^(http|www)/gi.test(e.getAttribute("href"))&&e.addEventListener("click",Pt,false);}));}function Ne(e="a"){Array.from(Y.wrapper.querySelectorAll(e)).forEach((e=>{/^(http|www)/gi.test(e.getAttribute("href"))&&e.removeEventListener("click",Pt,false);}));}function Me(e){Be(),Y.overlay=document.createElement("div"),Y.overlay.classList.add("overlay"),Y.overlay.classList.add("overlay-preview"),Y.wrapper.appendChild(Y.overlay),Y.overlay.innerHTML=`<header>\n\t\t\t\t<a class="close" href="#"><span class="icon"></span></a>\n\t\t\t\t<a class="external" href="${e}" target="_blank"><span class="icon"></span></a>\n\t\t\t</header>\n\t\t\t<div class="spinner"></div>\n\t\t\t<div class="viewport">\n\t\t\t\t<iframe src="${e}"></iframe>\n\t\t\t\t<small class="viewport-inner">\n\t\t\t\t\t<span class="x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>\n\t\t\t\t</small>\n\t\t\t</div>`,Y.overlay.querySelector("iframe").addEventListener("load",(e=>{Y.overlay.classList.add("loaded");}),false),Y.overlay.querySelector(".close").addEventListener("click",(e=>{Be(),e.preventDefault();}),false),Y.overlay.querySelector(".external").addEventListener("click",(e=>{Be();}),false);}function Ie(){if(A.help){Be(),Y.overlay=document.createElement("div"),Y.overlay.classList.add("overlay"),Y.overlay.classList.add("overlay-help"),Y.wrapper.appendChild(Y.overlay);let e='<p class="title">Keyboard Shortcuts</p><br/>',t=de.getShortcuts(),i=de.getBindings();e+="<table><th>KEY</th><th>ACTION</th>";for(let i in t)e+=`<tr><td>${i}</td><td>${t[i]}</td></tr>`;for(let t in i)i[t].key&&i[t].description&&(e+=`<tr><td>${i[t].key}</td><td>${i[t].description}</td></tr>`);e+="</table>",Y.overlay.innerHTML=`\n\t\t\t\t<header>\n\t\t\t\t\t<a class="close" href="#"><span class="icon"></span></a>\n\t\t\t\t</header>\n\t\t\t\t<div class="viewport">\n\t\t\t\t\t<div class="viewport-inner">${e}</div>\n\t\t\t\t</div>\n\t\t\t`,Y.overlay.querySelector(".close").addEventListener("click",(e=>{Be(),e.preventDefault();}),false);}}function Be(){return !!Y.overlay&&(Y.overlay.parentNode.removeChild(Y.overlay),Y.overlay=null,true)}function He(){if(Y.wrapper&&!re.isActive()){const e=Y.viewport.offsetWidth,t=Y.viewport.offsetHeight;if(!A.disableLayout){u$1&&!A.embedded&&document.documentElement.style.setProperty("--vh",.01*window.innerHeight+"px");const i=ne.isActive()?Fe(e,t):Fe(),s=$;De(A.width,A.height),Y.slides.style.width=i.width+"px",Y.slides.style.height=i.height+"px",$=Math.min(i.presentationWidth/i.width,i.presentationHeight/i.height),$=Math.max($,A.minScale),$=Math.min($,A.maxScale),1===$||ne.isActive()?(Y.slides.style.zoom="",Y.slides.style.left="",Y.slides.style.top="",Y.slides.style.bottom="",Y.slides.style.right="",Le({layout:""})):(Y.slides.style.zoom="",Y.slides.style.left="50%",Y.slides.style.top="50%",Y.slides.style.bottom="auto",Y.slides.style.right="auto",Le({layout:"translate(-50%, -50%) scale("+$+")"}));const a=Array.from(Y.wrapper.querySelectorAll(m$1));for(let e=0,t=a.length;e<t;e++){const t=a[e];"none"!==t.style.display&&(A.center||t.classList.contains("center")?t.classList.contains("stack")?t.style.top=0:t.style.top=Math.max((i.height-t.scrollHeight)/2,0)+"px":t.style.top="");}s!==$&&Ce({type:"resize",data:{oldScale:s,scale:$,size:i}});}!function(){if(Y.wrapper&&!A.disableLayout&&!re.isActive()&&"number"==typeof A.scrollActivationWidth&&"scroll"!==A.view){const e=Fe();e.presentationWidth>0&&e.presentationWidth<=A.scrollActivationWidth?ne.isActive()||(ae.create(),ne.activate()):ne.isActive()&&ne.deactivate();}}(),Y.viewport.style.setProperty("--slide-scale",$),Y.viewport.style.setProperty("--viewport-width",e+"px"),Y.viewport.style.setProperty("--viewport-height",t+"px"),ne.layout(),ue.update(),ae.updateParallax(),le.isActive()&&le.update();}}function De(e,i){t$1(Y.slides,"section > .stretch, section > .r-stretch").forEach((t=>{let s=((e,t=0)=>{if(e){let i,s=e.style.height;return e.style.height="0px",e.parentNode.style.height="auto",i=t-e.parentNode.offsetHeight,e.style.height=s+"px",e.parentNode.style.removeProperty("height"),i}return t})(t,i);if(/(img|video)/gi.test(t.nodeName)){const i=t.naturalWidth||t.videoWidth,a=t.naturalHeight||t.videoHeight,n=Math.min(e/i,s/a);t.style.width=i*n+"px",t.style.height=a*n+"px";}else t.style.width=e+"px",t.style.height=s+"px";}));}function Fe(e,t){let i=A.width,s=A.height;A.disableLayout&&(i=Y.slides.offsetWidth,s=Y.slides.offsetHeight);const a={width:i,height:s,presentationWidth:e||Y.wrapper.offsetWidth,presentationHeight:t||Y.wrapper.offsetHeight};return a.presentationWidth-=a.presentationWidth*A.margin,a.presentationHeight-=a.presentationHeight*A.margin,"string"==typeof a.width&&/%$/.test(a.width)&&(a.width=parseInt(a.width,10)/100*a.presentationWidth),"string"==typeof a.height&&/%$/.test(a.height)&&(a.height=parseInt(a.height,10)/100*a.presentationHeight),a}function ze(e,t){"object"==typeof e&&"function"==typeof e.setAttribute&&e.setAttribute("data-previous-indexv",t||0);}function qe(e){if("object"==typeof e&&"function"==typeof e.setAttribute&&e.classList.contains("stack")){const t=e.hasAttribute("data-start-indexv")?"data-start-indexv":"data-previous-indexv";return parseInt(e.getAttribute(t)||0,10)}return 0}function Oe(e=p){return e&&e.parentNode&&!!e.parentNode.nodeName.match(/section/i)}function We(){return !(!p||!Oe(p))&&!p.nextElementSibling}function Ue(){return 0===c&&0===h}function Ve(){return !!p&&(!p.nextElementSibling&&(!Oe(p)||!p.parentNode.nextElementSibling))}function je(){if(A.pause){const e=Y.wrapper.classList.contains("paused");pt(),Y.wrapper.classList.add("paused"),false===e&&Ce({type:"paused"});}}function Ke(){const e=Y.wrapper.classList.contains("paused");Y.wrapper.classList.remove("paused"),gt(),e&&Ce({type:"resumed"});}function $e(e){"boolean"==typeof e?e?je():Ke():Xe()?Ke():je();}function Xe(){return Y.wrapper.classList.contains("paused")}function Ye(e,i,s,a){if(Ce({type:"beforeslidechange",data:{indexh:void 0===e?c:e,indexv:void 0===i?h:i,origin:a}}).defaultPrevented)return;g=p;const r=Y.wrapper.querySelectorAll(f$1);if(ne.isActive()){const t=ne.getSlideByIndices(e,i);return void(t&&ne.scrollToSlide(t))}if(0===r.length)return;void 0!==i||le.isActive()||(i=qe(r[e])),g&&g.parentNode&&g.parentNode.classList.contains("stack")&&ze(g.parentNode,h);const o=O.concat();O.length=0;let l=c||0,d=h||0;c=Qe(f$1,void 0===e?c:e),h=Qe(y$1,void 0===i?h:i);let u=c!==l||h!==d;u||(g=null);let v=r[c],m=v.querySelectorAll("section");n.classList.toggle("is-vertical-slide",m.length>1),p=m[h]||v;let b=false;u&&g&&p&&!le.isActive()&&(_="running",b=_e(g,p,l,d),b&&Y.slides.classList.add("disable-slide-transitions")),tt(),He(),le.isActive()&&le.update(),void 0!==s&&oe.goto(s),g&&g!==p&&(g.classList.remove("present"),g.setAttribute("aria-hidden","true"),Ue()&&setTimeout((()=>{t$1(Y.wrapper,f$1+".stack").forEach((e=>{ze(e,0);}));}),0));e:for(let e=0,t=O.length;e<t;e++){for(let t=0;t<o.length;t++)if(o[t]===O[e]){o.splice(t,1);continue e}Y.viewport.classList.add(O[e]),Ce({type:O[e]});}for(;o.length;)Y.viewport.classList.remove(o.pop());u&&xe(a),!u&&g||(ee.stopEmbeddedContent(g),ee.startEmbeddedContent(p)),requestAnimationFrame((()=>{be(we(p));})),ue.update(),he.update(),fe.update(),ae.update(),ae.updateParallax(),te.update(),oe.update(),ce.writeURL(),gt(),b&&(setTimeout((()=>{Y.slides.classList.remove("disable-slide-transitions");}),0),A.autoAnimate&&se.run(g,p));}function _e(e,t,i,s){return e.hasAttribute("data-auto-animate")&&t.hasAttribute("data-auto-animate")&&e.getAttribute("data-auto-animate-id")===t.getAttribute("data-auto-animate-id")&&!(c>i||h>s?t:e).hasAttribute("data-auto-animate-restart")}function Je(){Ae(),Se(),He(),J=A.autoSlide,gt(),ae.create(),ce.writeURL(),true===A.sortFragmentsOnSync&&oe.sortAll(),he.update(),ue.update(),tt(),fe.update(),fe.updateVisibility(),ae.update(true),te.update(),ee.formatEmbeddedContent(),false===A.autoPlayMedia?ee.stopEmbeddedContent(p,{unloadIframes:false}):ee.startEmbeddedContent(p),le.isActive()&&le.layout();}function Ge(e=rt()){e.forEach(((t,i)=>{let s=e[Math.floor(Math.random()*e.length)];s.parentNode===t.parentNode&&t.parentNode.insertBefore(t,s);let a=t.querySelectorAll("section");a.length&&Ge(a);}));}function Qe(e,i){let s=t$1(Y.wrapper,e),a=s.length,n=ne.isActive()||re.isActive(),r=false,o=false;if(a){A.loop&&(i>=a&&(r=true),(i%=a)<0&&(i=a+i,o=true)),i=Math.max(Math.min(i,a-1),0);for(let e=0;e<a;e++){let t=s[e],a=A.rtl&&!Oe(t);t.classList.remove("past"),t.classList.remove("present"),t.classList.remove("future"),t.setAttribute("hidden",""),t.setAttribute("aria-hidden","true"),t.querySelector("section")&&t.classList.add("stack"),n?t.classList.add("present"):e<i?(t.classList.add(a?"future":"past"),A.fragments&&Ze(t)):e>i?(t.classList.add(a?"past":"future"),A.fragments&&et(t)):e===i&&A.fragments&&(r?et(t):o&&Ze(t));}let e=s[i],t=e.classList.contains("present");e.classList.add("present"),e.removeAttribute("hidden"),e.removeAttribute("aria-hidden"),t||Ce({target:e,type:"visible",bubbles:false});let l=e.getAttribute("data-state");l&&(O=O.concat(l.split(" ")));}else i=0;return i}function Ze(e){t$1(e,".fragment").forEach((e=>{e.classList.add("visible"),e.classList.remove("current-fragment");}));}function et(e){t$1(e,".fragment.visible").forEach((e=>{e.classList.remove("visible","current-fragment");}));}function tt(){let e,i,s=rt(),a=s.length;if(a&&void 0!==c){let n=le.isActive()?10:A.viewDistance;u$1&&(n=le.isActive()?6:A.mobileViewDistance),re.isActive()&&(n=Number.MAX_VALUE);for(let r=0;r<a;r++){let o=s[r],l=t$1(o,"section"),d=l.length;if(e=Math.abs((c||0)-r)||0,A.loop&&(e=Math.abs(((c||0)-r)%(a-n))||0),e<n?ee.load(o):ee.unload(o),d){let t=qe(o);for(let s=0;s<d;s++){let a=l[s];i=r===(c||0)?Math.abs((h||0)-s):Math.abs(s-t),e+i<n?ee.load(a):ee.unload(a);}}}dt()?Y.wrapper.classList.add("has-vertical-slides"):Y.wrapper.classList.remove("has-vertical-slides"),lt()?Y.wrapper.classList.add("has-horizontal-slides"):Y.wrapper.classList.remove("has-horizontal-slides");}}function it({includeFragments:e=false}={}){let t=Y.wrapper.querySelectorAll(f$1),i=Y.wrapper.querySelectorAll(y$1),s={left:c>0,right:c<t.length-1,up:h>0,down:h<i.length-1};if(A.loop&&(t.length>1&&(s.left=true,s.right=true),i.length>1&&(s.up=true,s.down=true)),t.length>1&&"linear"===A.navigationMode&&(s.right=s.right||s.down,s.left=s.left||s.up),true===e){let e=oe.availableRoutes();s.left=s.left||e.prev,s.up=s.up||e.prev,s.down=s.down||e.next,s.right=s.right||e.next;}if(A.rtl){let e=s.left;s.left=s.right,s.right=e;}return s}function st(e=p){let t=rt(),i=0;e:for(let s=0;s<t.length;s++){let a=t[s],n=a.querySelectorAll("section");for(let t=0;t<n.length;t++){if(n[t]===e)break e;"uncounted"!==n[t].dataset.visibility&&i++;}if(a===e)break;false===a.classList.contains("stack")&&"uncounted"!==a.dataset.visibility&&i++;}return i}function at(e){let i,s=c,a=h;if(e)if(ne.isActive())s=parseInt(e.getAttribute("data-index-h"),10),e.getAttribute("data-index-v")&&(a=parseInt(e.getAttribute("data-index-v"),10));else {let i=Oe(e),n=i?e.parentNode:e,r=rt();s=Math.max(r.indexOf(n),0),a=void 0,i&&(a=Math.max(t$1(e.parentNode,"section").indexOf(e),0));}if(!e&&p){if(p.querySelectorAll(".fragment").length>0){let e=p.querySelector(".current-fragment");i=e&&e.hasAttribute("data-fragment-index")?parseInt(e.getAttribute("data-fragment-index"),10):p.querySelectorAll(".fragment.visible").length-1;}}return {h:s,v:a,f:i}}function nt(){return t$1(Y.wrapper,m$1+':not(.stack):not([data-visibility="uncounted"])')}function rt(){return t$1(Y.wrapper,f$1)}function ot(){return t$1(Y.wrapper,".slides>section>section")}function lt(){return rt().length>1}function dt(){return ot().length>1}function ct(){return nt().length}function ht(e,t){let i=rt()[e],s=i&&i.querySelectorAll("section");return s&&s.length&&"number"==typeof t?s?s[t]:void 0:i}function ut(){let e=at();return {indexh:e.h,indexv:e.v,indexf:e.f,paused:Xe(),overview:le.isActive()}}function gt(){if(pt(),p&&false!==A.autoSlide){let e=p.querySelector(".current-fragment[data-autoslide]"),i=e?e.getAttribute("data-autoslide"):null,s=p.parentNode?p.parentNode.getAttribute("data-autoslide"):null,a=p.getAttribute("data-autoslide");i?J=parseInt(i,10):a?J=parseInt(a,10):s?J=parseInt(s,10):(J=A.autoSlide,0===p.querySelectorAll(".fragment").length&&t$1(p,"video, audio").forEach((e=>{e.hasAttribute("data-autoplay")&&J&&1e3*e.duration/e.playbackRate>J&&(J=1e3*e.duration/e.playbackRate+1e3);}))),!J||Z||Xe()||le.isActive()||Ve()&&!oe.availableRoutes().next&&true!==A.loop||(G=setTimeout((()=>{"function"==typeof A.autoSlideMethod?A.autoSlideMethod():St(),gt();}),J),Q=Date.now()),w&&w.setPlaying(-1!==G);}}function pt(){clearTimeout(G),G=-1;}function vt(){J&&!Z&&(Z=true,Ce({type:"autoslidepaused"}),clearTimeout(G),w&&w.setPlaying(false));}function mt(){J&&Z&&(Z=false,Ce({type:"autoslideresumed"}),gt());}function ft({skipFragments:e=false}={}){if(q.hasNavigatedHorizontally=true,ne.isActive())return ne.prev();A.rtl?(le.isActive()||e||false===oe.next())&&it().left&&Ye(c+1,"grid"===A.navigationMode?h:void 0):(le.isActive()||e||false===oe.prev())&&it().left&&Ye(c-1,"grid"===A.navigationMode?h:void 0);}function yt({skipFragments:e=false}={}){if(q.hasNavigatedHorizontally=true,ne.isActive())return ne.next();A.rtl?(le.isActive()||e||false===oe.prev())&&it().right&&Ye(c-1,"grid"===A.navigationMode?h:void 0):(le.isActive()||e||false===oe.next())&&it().right&&Ye(c+1,"grid"===A.navigationMode?h:void 0);}function bt({skipFragments:e=false}={}){if(ne.isActive())return ne.prev();(le.isActive()||e||false===oe.prev())&&it().up&&Ye(c,h-1);}function wt({skipFragments:e=false}={}){if(q.hasNavigatedVertically=true,ne.isActive())return ne.next();(le.isActive()||e||false===oe.next())&&it().down&&Ye(c,h+1);}function Et({skipFragments:e=false}={}){if(ne.isActive())return ne.prev();if(e||false===oe.prev())if(it().up)bt({skipFragments:e});else {let i;if(i=A.rtl?t$1(Y.wrapper,f$1+".future").pop():t$1(Y.wrapper,f$1+".past").pop(),i&&i.classList.contains("stack")){let e=i.querySelectorAll("section").length-1||void 0;Ye(c-1,e);}else A.rtl?yt({skipFragments:e}):ft({skipFragments:e});}}function St({skipFragments:e=false}={}){if(q.hasNavigatedHorizontally=true,q.hasNavigatedVertically=true,ne.isActive())return ne.next();if(e||false===oe.next()){let t=it();t.down&&t.right&&A.loop&&We()&&(t.down=false),t.down?wt({skipFragments:e}):A.rtl?ft({skipFragments:e}):yt({skipFragments:e});}}function At(e){let t=e.data;if("string"==typeof t&&"{"===t.charAt(0)&&"}"===t.charAt(t.length-1)&&(t=JSON.parse(t),t.method&&"function"==typeof l[t.method]))if(false===b$1.test(t.method)){const e=l[t.method].apply(l,t.args);Pe("callback",{method:t.method,result:e});}else console.warn('reveal.js: "'+t.method+'" is is blacklisted from the postMessage API');}function Rt(e){"running"===_&&/section/gi.test(e.target.nodeName)&&(_="idle",Ce({type:"slidetransitionend",data:{indexh:c,indexv:h,previousSlide:g,currentSlide:p}}));}function kt(e){const t=r$1(e.target,'a[href^="#"]');if(t){const i=t.getAttribute("href"),s=ce.getIndicesFromHash(i);s&&(l.slide(s.h,s.v,s.f),e.preventDefault());}}function Lt(e){He();}function Ct(e){ false===document.hidden&&document.activeElement!==document.body&&("function"==typeof document.activeElement.blur&&document.activeElement.blur(),document.body.focus());}function xt(e){(document.fullscreenElement||document.webkitFullscreenElement)===Y.wrapper&&(e.stopImmediatePropagation(),setTimeout((()=>{l.layout(),l.focus.focus();}),1));}function Pt(e){if(e.currentTarget&&e.currentTarget.hasAttribute("href")){let t=e.currentTarget.getAttribute("href");t&&(Me(t),e.preventDefault());}}function Tt(e){Ve()&&false===A.loop?(Ye(0,0),mt()):Z?mt():vt();}const Nt={VERSION:K,initialize:function(e){if(!n)throw 'Unable to find presentation root (<div class="reveal">).';if(k=true,Y.wrapper=n,Y.slides=n.querySelector(".slides"),!Y.slides)throw 'Unable to find slides container (<div class="slides">).';return A={...j,...A,...o,...e,...d$1()},/print-pdf/gi.test(window.location.search)&&(A.view="print"),function(){ true===A.embedded?Y.viewport=r$1(n,".reveal-viewport")||n:(Y.viewport=document.body,document.documentElement.classList.add("reveal-full-page"));Y.viewport.classList.add("reveal-viewport");}(),window.addEventListener("load",He,false),pe.load(A.plugins,A.dependencies).then(ye),new Promise((e=>l.on("ready",e)))},configure:Ee,destroy:function(){ false!==k&&(Ae(),pt(),Ne(),fe.destroy(),ve.destroy(),pe.destroy(),ge.destroy(),he.destroy(),ue.destroy(),ae.destroy(),te.destroy(),ie.destroy(),document.removeEventListener("fullscreenchange",xt),document.removeEventListener("webkitfullscreenchange",xt),document.removeEventListener("visibilitychange",Ct,false),window.removeEventListener("message",At,false),window.removeEventListener("load",He,false),Y.pauseOverlay&&Y.pauseOverlay.remove(),Y.statusElement&&Y.statusElement.remove(),document.documentElement.classList.remove("reveal-full-page"),Y.wrapper.classList.remove("ready","center","has-horizontal-slides","has-vertical-slides"),Y.wrapper.removeAttribute("data-transition-speed"),Y.wrapper.removeAttribute("data-background-transition"),Y.viewport.classList.remove("reveal-viewport"),Y.viewport.style.removeProperty("--slide-width"),Y.viewport.style.removeProperty("--slide-height"),Y.slides.style.removeProperty("width"),Y.slides.style.removeProperty("height"),Y.slides.style.removeProperty("zoom"),Y.slides.style.removeProperty("left"),Y.slides.style.removeProperty("top"),Y.slides.style.removeProperty("bottom"),Y.slides.style.removeProperty("right"),Y.slides.style.removeProperty("transform"),Array.from(Y.wrapper.querySelectorAll(m$1)).forEach((e=>{e.style.removeProperty("display"),e.style.removeProperty("top"),e.removeAttribute("hidden"),e.removeAttribute("aria-hidden");})));},sync:Je,syncSlide:function(e=p){ae.sync(e),oe.sync(e),ee.load(e),ae.update(),fe.update();},syncFragments:oe.sync.bind(oe),slide:Ye,left:ft,right:yt,up:bt,down:wt,prev:Et,next:St,navigateLeft:ft,navigateRight:yt,navigateUp:bt,navigateDown:wt,navigatePrev:Et,navigateNext:St,navigateFragment:oe.goto.bind(oe),prevFragment:oe.prev.bind(oe),nextFragment:oe.next.bind(oe),on:Re,off:ke,addEventListener:Re,removeEventListener:ke,layout:He,shuffle:Ge,availableRoutes:it,availableFragments:oe.availableRoutes.bind(oe),toggleHelp:function(e){"boolean"==typeof e?e?Ie():Be():Y.overlay?Be():Ie();},toggleOverview:le.toggle.bind(le),toggleScrollView:ne.toggle.bind(ne),togglePause:$e,toggleAutoSlide:function(e){"boolean"==typeof e?e?mt():vt():Z?mt():vt();},toggleJumpToSlide:function(e){"boolean"==typeof e?e?ie.show():ie.hide():ie.isVisible()?ie.hide():ie.show();},isFirstSlide:Ue,isLastSlide:Ve,isLastVerticalSlide:We,isVerticalSlide:Oe,isVerticalStack:function(e=p){return e.classList.contains(".stack")||null!==e.querySelector("section")},isPaused:Xe,isAutoSliding:function(){return !(!J||Z)},isSpeakerNotes:fe.isSpeakerNotesWindow.bind(fe),isOverview:le.isActive.bind(le),isFocused:ve.isFocused.bind(ve),isScrollView:ne.isActive.bind(ne),isPrintView:re.isActive.bind(re),isReady:()=>D,loadSlide:ee.load.bind(ee),unloadSlide:ee.unload.bind(ee),startEmbeddedContent:()=>ee.startEmbeddedContent(p),stopEmbeddedContent:()=>ee.stopEmbeddedContent(p,{unloadIframes:false}),showPreview:Me,hidePreview:Be,addEventListeners:Se,removeEventListeners:Ae,dispatchEvent:Ce,getState:ut,setState:function(e){if("object"==typeof e){Ye(s$1(e.indexh),s$1(e.indexv),s$1(e.indexf));let t=s$1(e.paused),i=s$1(e.overview);"boolean"==typeof t&&t!==Xe()&&$e(t),"boolean"==typeof i&&i!==le.isActive()&&le.toggle(i);}},getProgress:function(){let e=ct(),t=st();if(p){let e=p.querySelectorAll(".fragment");if(e.length>0){let i=.9;t+=p.querySelectorAll(".fragment.visible").length/e.length*i;}}return Math.min(t/(e-1),1)},getIndices:at,getSlidesAttributes:function(){return nt().map((e=>{let t={};for(let i=0;i<e.attributes.length;i++){let s=e.attributes[i];t[s.name]=s.value;}return t}))},getSlidePastCount:st,getTotalSlides:ct,getSlide:ht,getPreviousSlide:()=>g,getCurrentSlide:()=>p,getSlideBackground:function(e,t){let i="number"==typeof e?ht(e,t):e;if(i)return i.slideBackgroundElement},getSlideNotes:fe.getSlideNotes.bind(fe),getSlides:nt,getHorizontalSlides:rt,getVerticalSlides:ot,hasHorizontalSlides:lt,hasVerticalSlides:dt,hasNavigatedHorizontally:()=>q.hasNavigatedHorizontally,hasNavigatedVertically:()=>q.hasNavigatedVertically,shouldAutoAnimateBetween:_e,addKeyBinding:de.addKeyBinding.bind(de),removeKeyBinding:de.removeKeyBinding.bind(de),triggerKey:de.triggerKey.bind(de),registerKeyboardShortcut:de.registerKeyboardShortcut.bind(de),getComputedSlideSize:Fe,setCurrentScrollPage:function(e,t,i){let s=c||0;c=t,h=i;const a=p!==e;g=p,p=e,p&&g&&A.autoAnimate&&_e(g,p,s,h)&&se.run(g,p),a&&(g&&(ee.stopEmbeddedContent(g),ee.stopEmbeddedContent(g.slideBackgroundElement)),ee.startEmbeddedContent(p),ee.startEmbeddedContent(p.slideBackgroundElement)),requestAnimationFrame((()=>{be(we(p));})),xe();},getScale:()=>$,getConfig:()=>A,getQueryHash:d$1,getSlidePath:ce.getHash.bind(ce),getRevealElement:()=>n,getSlidesElement:()=>Y.slides,getViewportElement:()=>Y.viewport,getBackgroundsElement:()=>ae.element,registerPlugin:pe.registerPlugin.bind(pe),hasPlugin:pe.hasPlugin.bind(pe),getPlugin:pe.getPlugin.bind(pe),getPlugins:pe.getRegisteredPlugins.bind(pe)};return e$1(l,{...Nt,announceStatus:be,getStatusText:we,focus:ve,scroll:ne,progress:ue,controls:he,location:ce,overview:le,fragments:oe,backgrounds:ae,slideContent:ee,slideNumber:te,onUserInput:function(e){A.autoSlideStoppable&&vt();},closeOverlay:Be,updateSlidesVisibility:tt,layoutSlideContents:De,transformSlides:Le,cueAutoSlide:gt,cancelAutoSlide:pt}),Nt}let X=$$1,Y=[];X.initialize=e=>(Object.assign(X,new $$1(document.querySelector(".reveal"),e)),Y.map((e=>e(X))),X.initialize()),["configure","on","off","addEventListener","removeEventListener","registerPlugin"].forEach((e=>{X[e]=(...t)=>{Y.push((i=>i[e].call(null,...t)));};})),X.isReady=()=>false,X.VERSION=K;

	function t(){return {async:false,baseUrl:null,breaks:false,extensions:null,gfm:true,headerIds:true,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:true,pedantic:false,renderer:null,sanitize:false,sanitizer:null,silent:false,smartypants:false,tokenizer:null,walkTokens:null,xhtml:false}}let e={async:false,baseUrl:null,breaks:false,extensions:null,gfm:true,headerIds:true,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:true,pedantic:false,renderer:null,sanitize:false,sanitizer:null,silent:false,smartypants:false,tokenizer:null,walkTokens:null,xhtml:false};const n=/[&<>"']/,i=new RegExp(n.source,"g"),s=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,r=new RegExp(s.source,"g"),a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},o=t=>a[t];function l(t,e){if(e){if(n.test(t))return t.replace(i,o)}else if(s.test(t))return t.replace(r,o);return t}const c=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function p(t){return t.replace(c,((t,e)=>"colon"===(e=e.toLowerCase())?":":"#"===e.charAt(0)?"x"===e.charAt(1)?String.fromCharCode(parseInt(e.substring(2),16)):String.fromCharCode(+e.substring(1)):""))}const u=/(^|[^\[])\^/g;function d(t,e){t="string"==typeof t?t:t.source,e=e||"";const n={replace:(e,i)=>(i=(i=i.source||i).replace(u,"$1"),t=t.replace(e,i),n),getRegex:()=>new RegExp(t,e)};return n}const h=/[^\w:]/g,g=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function m(t,e,n){if(t){let t;try{t=decodeURIComponent(p(n)).replace(h,"").toLowerCase();}catch(t){return null}if(0===t.indexOf("javascript:")||0===t.indexOf("vbscript:")||0===t.indexOf("data:"))return null}e&&!g.test(n)&&(n=function(t,e){f[" "+t]||(k.test(t)?f[" "+t]=t+"/":f[" "+t]=v(t,"/",true));t=f[" "+t];const n=-1===t.indexOf(":");return "//"===e.substring(0,2)?n?e:t.replace(w,"$1")+e:"/"===e.charAt(0)?n?e:t.replace(x,"$1")+e:t+e}(e,n));try{n=encodeURI(n).replace(/%25/g,"%");}catch(t){return null}return n}const f={},k=/^[^:]+:\/*[^/]*$/,w=/^([^:]+:)[\s\S]*$/,x=/^([^:]+:\/*[^/]*)[\s\S]*$/;const b={exec:function(){}};function y(t,e){const n=t.replace(/\|/g,((t,e,n)=>{let i=false,s=e;for(;--s>=0&&"\\"===n[s];)i=!i;return i?"|":" |"})).split(/ \|/);let i=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(/\\\|/g,"|");return n}function v(t,e,n){const i=t.length;if(0===i)return "";let s=0;for(;s<i;){const r=t.charAt(i-s-1);if(r!==e||n){if(r===e||!n)break;s++;}else s++;}return t.slice(0,i-s)}function S(t,e){if(e<1)return "";let n="";for(;e>1;)1&e&&(n+=t),e>>=1,t+=t;return n+t}function T(t,e,n,i){const s=e.href,r=e.title?l(e.title):null,a=t[1].replace(/\\([\[\]])/g,"$1");if("!"!==t[0].charAt(0)){i.state.inLink=true;const t={type:"link",raw:n,href:s,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=false,t}return {type:"image",raw:n,href:s,title:r,text:l(a)}}class _{constructor(t){this.options=t||e;}space(t){const e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return {type:"space",raw:e[0]}}code(t){const e=this.rules.block.code.exec(t);if(e){const t=e[0].replace(/^ {1,4}/gm,"");return {type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:v(t,"\n")}}}fences(t){const e=this.rules.block.fences.exec(t);if(e){const t=e[0],n=function(t,e){const n=t.match(/^(\s+)(?:```)/);if(null===n)return e;const i=n[1];return e.split("\n").map((t=>{const e=t.match(/^\s+/);if(null===e)return t;const[n]=e;return n.length>=i.length?t.slice(i.length):t})).join("\n")}(t,e[3]||"");return {type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline._escapes,"$1"):e[2],text:n}}}heading(t){const e=this.rules.block.heading.exec(t);if(e){let t=e[2].trim();if(/#$/.test(t)){const e=v(t,"#");this.options.pedantic?t=e.trim():e&&!/ $/.test(e)||(t=e.trim());}return {type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(t){const e=this.rules.block.hr.exec(t);if(e)return {type:"hr",raw:e[0]}}blockquote(t){const e=this.rules.block.blockquote.exec(t);if(e){const t=e[0].replace(/^ *>[ \t]?/gm,""),n=this.lexer.state.top;this.lexer.state.top=true;const i=this.lexer.blockTokens(t);return this.lexer.state.top=n,{type:"blockquote",raw:e[0],tokens:i,text:t}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n,i,s,r,a,o,l,c,p,u,d,h,g=e[1].trim();const m=g.length>1,f={type:"list",raw:"",ordered:m,start:m?+g.slice(0,-1):"",loose:false,items:[]};g=m?`\\d{1,9}\\${g.slice(-1)}`:`\\${g}`,this.options.pedantic&&(g=m?g:"[*+-]");const k=new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`);for(;t&&(h=false,e=k.exec(t))&&!this.rules.block.hr.test(t);){if(n=e[0],t=t.substring(n.length),c=e[2].split("\n",1)[0].replace(/^\t+/,(t=>" ".repeat(3*t.length))),p=t.split("\n",1)[0],this.options.pedantic?(r=2,d=c.trimLeft()):(r=e[2].search(/[^ ]/),r=r>4?1:r,d=c.slice(r),r+=e[1].length),o=false,!c&&/^ *$/.test(p)&&(n+=p+"\n",t=t.substring(p.length+1),h=true),!h){const e=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),i=new RegExp(`^ {0,${Math.min(3,r-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),s=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:\`\`\`|~~~)`),a=new RegExp(`^ {0,${Math.min(3,r-1)}}#`);for(;t&&(u=t.split("\n",1)[0],p=u,this.options.pedantic&&(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!s.test(p))&&!a.test(p)&&!e.test(p)&&!i.test(t);){if(p.search(/[^ ]/)>=r||!p.trim())d+="\n"+p.slice(r);else {if(o)break;if(c.search(/[^ ]/)>=4)break;if(s.test(c))break;if(a.test(c))break;if(i.test(c))break;d+="\n"+p;}o||p.trim()||(o=true),n+=u+"\n",t=t.substring(u.length+1),c=p.slice(r);}}f.loose||(l?f.loose=true:/\n *\n *$/.test(n)&&(l=true)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(d),i&&(s="[ ] "!==i[0],d=d.replace(/^\[[ xX]\] +/,""))),f.items.push({type:"list_item",raw:n,task:!!i,checked:s,loose:false,text:d}),f.raw+=n;}f.items[f.items.length-1].raw=n.trimRight(),f.items[f.items.length-1].text=d.trimRight(),f.raw=f.raw.trimRight();const w=f.items.length;for(a=0;a<w;a++)if(this.lexer.state.top=false,f.items[a].tokens=this.lexer.blockTokens(f.items[a].text,[]),!f.loose){const t=f.items[a].tokens.filter((t=>"space"===t.type)),e=t.length>0&&t.some((t=>/\n.*\n/.test(t.raw)));f.loose=e;}if(f.loose)for(a=0;a<w;a++)f.items[a].loose=true;return f}}html(t){const e=this.rules.block.html.exec(t);if(e){const t={type:"html",raw:e[0],pre:!this.options.sanitizer&&("pre"===e[1]||"script"===e[1]||"style"===e[1]),text:e[0]};if(this.options.sanitize){const n=this.options.sanitizer?this.options.sanitizer(e[0]):l(e[0]);t.type="paragraph",t.text=n,t.tokens=this.lexer.inline(n);}return t}}def(t){const e=this.rules.block.def.exec(t);if(e){const t=e[1].toLowerCase().replace(/\s+/g," "),n=e[2]?e[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",i=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline._escapes,"$1"):e[3];return {type:"def",tag:t,raw:e[0],href:n,title:i}}}table(t){const e=this.rules.block.table.exec(t);if(e){const t={type:"table",header:y(e[1]).map((t=>({text:t}))),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:e[3]&&e[3].trim()?e[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(t.header.length===t.align.length){t.raw=e[0];let n,i,s,r,a=t.align.length;for(n=0;n<a;n++)/^ *-+: *$/.test(t.align[n])?t.align[n]="right":/^ *:-+: *$/.test(t.align[n])?t.align[n]="center":/^ *:-+ *$/.test(t.align[n])?t.align[n]="left":t.align[n]=null;for(a=t.rows.length,n=0;n<a;n++)t.rows[n]=y(t.rows[n],t.header.length).map((t=>({text:t})));for(a=t.header.length,i=0;i<a;i++)t.header[i].tokens=this.lexer.inline(t.header[i].text);for(a=t.rows.length,i=0;i<a;i++)for(r=t.rows[i],s=0;s<r.length;s++)r[s].tokens=this.lexer.inline(r[s].text);return t}}}lheading(t){const e=this.rules.block.lheading.exec(t);if(e)return {type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){const e=this.rules.block.paragraph.exec(t);if(e){const t="\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1];return {type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(t){const e=this.rules.block.text.exec(t);if(e)return {type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){const e=this.rules.inline.escape.exec(t);if(e)return {type:"escape",raw:e[0],text:l(e[1])}}tag(t){const e=this.rules.inline.tag.exec(t);if(e)return !this.lexer.state.inLink&&/^<a /i.test(e[0])?this.lexer.state.inLink=true:this.lexer.state.inLink&&/^<\/a>/i.test(e[0])&&(this.lexer.state.inLink=false),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?this.lexer.state.inRawBlock=true:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(this.lexer.state.inRawBlock=false),{type:this.options.sanitize?"text":"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):l(e[0]):e[0]}}link(t){const e=this.rules.inline.link.exec(t);if(e){const t=e[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;const e=v(t.slice(0,-1),"\\");if((t.length-e.length)%2==0)return}else {const t=function(t,e){if(-1===t.indexOf(e[1]))return  -1;const n=t.length;let i=0,s=0;for(;s<n;s++)if("\\"===t[s])s++;else if(t[s]===e[0])i++;else if(t[s]===e[1]&&(i--,i<0))return s;return  -1}(e[2],"()");if(t>-1){const n=(0===e[0].indexOf("!")?5:4)+e[1].length+t;e[2]=e[2].substring(0,t),e[0]=e[0].substring(0,n).trim(),e[3]="";}}let n=e[2],i="";if(this.options.pedantic){const t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);t&&(n=t[1],i=t[3]);}else i=e[3]?e[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(n=this.options.pedantic&&!/>$/.test(t)?n.slice(1):n.slice(1,-1)),T(e,{href:n?n.replace(this.rules.inline._escapes,"$1"):n,title:i?i.replace(this.rules.inline._escapes,"$1"):i},e[0],this.lexer)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){let t=(n[2]||n[1]).replace(/\s+/g," ");if(t=e[t.toLowerCase()],!t){const t=n[0].charAt(0);return {type:"text",raw:t,text:t}}return T(n,t,n[0],this.lexer)}}emStrong(t,e,n=""){let i=this.rules.inline.emStrong.lDelim.exec(t);if(!i)return;if(i[3]&&n.match(/[\p{L}\p{N}]/u))return;const s=i[1]||i[2]||"";if(!s||s&&(""===n||this.rules.inline.punctuation.exec(n))){const n=i[0].length-1;let s,r,a=n,o=0;const l="*"===i[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(l.lastIndex=0,e=e.slice(-1*t.length+n);null!=(i=l.exec(e));){if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!s)continue;if(r=s.length,i[3]||i[4]){a+=r;continue}if((i[5]||i[6])&&n%3&&!((n+r)%3)){o+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+o);const e=t.slice(0,n+i.index+(i[0].length-s.length)+r);if(Math.min(n,r)%2){const t=e.slice(1,-1);return {type:"em",raw:e,text:t,tokens:this.lexer.inlineTokens(t)}}const l=e.slice(2,-2);return {type:"strong",raw:e,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(t){const e=this.rules.inline.code.exec(t);if(e){let t=e[2].replace(/\n/g," ");const n=/[^ ]/.test(t),i=/^ /.test(t)&&/ $/.test(t);return n&&i&&(t=t.substring(1,t.length-1)),t=l(t,true),{type:"codespan",raw:e[0],text:t}}}br(t){const e=this.rules.inline.br.exec(t);if(e)return {type:"br",raw:e[0]}}del(t){const e=this.rules.inline.del.exec(t);if(e)return {type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t,e){const n=this.rules.inline.autolink.exec(t);if(n){let t,i;return "@"===n[2]?(t=l(this.options.mangle?e(n[1]):n[1]),i="mailto:"+t):(t=l(n[1]),i=t),{type:"link",raw:n[0],text:t,href:i,tokens:[{type:"text",raw:t,text:t}]}}}url(t,e){let n;if(n=this.rules.inline.url.exec(t)){let t,i;if("@"===n[2])t=l(this.options.mangle?e(n[0]):n[0]),i="mailto:"+t;else {let e;do{e=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0];}while(e!==n[0]);t=l(n[0]),i="www."===n[1]?"http://"+n[0]:n[0];}return {type:"link",raw:n[0],text:t,href:i,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(t,e){const n=this.rules.inline.text.exec(t);if(n){let t;return t=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):l(n[0]):n[0]:l(this.options.smartypants?e(n[0]):n[0]),{type:"text",raw:n[0],text:t}}}}const z={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:b,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};z.def=d(z.def).replace("label",z._label).replace("title",z._title).getRegex(),z.bullet=/(?:[*+-]|\d{1,9}[.)])/,z.listItemStart=d(/^( *)(bull) */).replace("bull",z.bullet).getRegex(),z.list=d(z.list).replace(/bull/g,z.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+z.def.source+")").getRegex(),z._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",z._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,z.html=d(z.html,"i").replace("comment",z._comment).replace("tag",z._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),z.paragraph=d(z._paragraph).replace("hr",z.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",z._tag).getRegex(),z.blockquote=d(z.blockquote).replace("paragraph",z.paragraph).getRegex(),z.normal={...z},z.gfm={...z.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"},z.gfm.table=d(z.gfm.table).replace("hr",z.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",z._tag).getRegex(),z.gfm.paragraph=d(z._paragraph).replace("hr",z.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",z.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",z._tag).getRegex(),z.pedantic={...z.normal,html:d("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",z._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:b,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:d(z.normal._paragraph).replace("hr",z.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",z.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const $={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:b,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:b,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function E(t){return t.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function A(t){let e,n,i="";const s=t.length;for(e=0;e<s;e++)n=t.charCodeAt(e),Math.random()>.5&&(n="x"+n.toString(16)),i+="&#"+n+";";return i}$._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",$.punctuation=d($.punctuation).replace(/punctuation/g,$._punctuation).getRegex(),$.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,$.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,$._comment=d(z._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),$.emStrong.lDelim=d($.emStrong.lDelim).replace(/punct/g,$._punctuation).getRegex(),$.emStrong.rDelimAst=d($.emStrong.rDelimAst,"g").replace(/punct/g,$._punctuation).getRegex(),$.emStrong.rDelimUnd=d($.emStrong.rDelimUnd,"g").replace(/punct/g,$._punctuation).getRegex(),$._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,$._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,$._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,$.autolink=d($.autolink).replace("scheme",$._scheme).replace("email",$._email).getRegex(),$._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,$.tag=d($.tag).replace("comment",$._comment).replace("attribute",$._attribute).getRegex(),$._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,$._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,$._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,$.link=d($.link).replace("label",$._label).replace("href",$._href).replace("title",$._title).getRegex(),$.reflink=d($.reflink).replace("label",$._label).replace("ref",z._label).getRegex(),$.nolink=d($.nolink).replace("ref",z._label).getRegex(),$.reflinkSearch=d($.reflinkSearch,"g").replace("reflink",$.reflink).replace("nolink",$.nolink).getRegex(),$.normal={...$},$.pedantic={...$.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",$._label).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$._label).getRegex()},$.gfm={...$.normal,escape:d($.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},$.gfm.url=d($.gfm.url,"i").replace("email",$.gfm._extended_email).getRegex(),$.breaks={...$.gfm,br:d($.br).replace("{2,}","*").getRegex(),text:d($.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};class R{constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||e,this.options.tokenizer=this.options.tokenizer||new _,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:false,inRawBlock:false,top:true};const n={block:z.normal,inline:$.normal};this.options.pedantic?(n.block=z.pedantic,n.inline=$.pedantic):this.options.gfm&&(n.block=z.gfm,this.options.breaks?n.inline=$.breaks:n.inline=$.gfm),this.tokenizer.rules=n;}static get rules(){return {block:z,inline:$}}static lex(t,e){return new R(e).lex(t)}static lexInline(t,e){return new R(e).inlineTokens(t)}lex(t){let e;for(t=t.replace(/\r\n|\r/g,"\n"),this.blockTokens(t,this.tokens);e=this.inlineQueue.shift();)this.inlineTokens(e.src,e.tokens);return this.tokens}blockTokens(t,e=[]){let n,i,s,r;for(t=this.options.pedantic?t.replace(/\t/g,"    ").replace(/^ +$/gm,""):t.replace(/^( *)(\t+)/gm,((t,e,n)=>e+"    ".repeat(n.length)));t;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((i=>!!(n=i.call({lexer:this},t,e))&&(t=t.substring(n.raw.length),e.push(n),true)))))if(n=this.tokenizer.space(t))t=t.substring(n.raw.length),1===n.raw.length&&e.length>0?e[e.length-1].raw+="\n":e.push(n);else if(n=this.tokenizer.code(t))t=t.substring(n.raw.length),i=e[e.length-1],!i||"paragraph"!==i.type&&"text"!==i.type?e.push(n):(i.raw+="\n"+n.raw,i.text+="\n"+n.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text);else if(n=this.tokenizer.fences(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.heading(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.hr(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.blockquote(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.list(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.html(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.def(t))t=t.substring(n.raw.length),i=e[e.length-1],!i||"paragraph"!==i.type&&"text"!==i.type?this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title}):(i.raw+="\n"+n.raw,i.text+="\n"+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text);else if(n=this.tokenizer.table(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.lheading(t))t=t.substring(n.raw.length),e.push(n);else {if(s=t,this.options.extensions&&this.options.extensions.startBlock){let e=1/0;const n=t.slice(1);let i;this.options.extensions.startBlock.forEach((function(t){i=t.call({lexer:this},n),"number"==typeof i&&i>=0&&(e=Math.min(e,i));})),e<1/0&&e>=0&&(s=t.substring(0,e+1));}if(this.state.top&&(n=this.tokenizer.paragraph(s)))i=e[e.length-1],r&&"paragraph"===i.type?(i.raw+="\n"+n.raw,i.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):e.push(n),r=s.length!==t.length,t=t.substring(n.raw.length);else if(n=this.tokenizer.text(t))t=t.substring(n.raw.length),i=e[e.length-1],i&&"text"===i.type?(i.raw+="\n"+n.raw,i.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):e.push(n);else if(t){const e="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(e);break}throw new Error(e)}}return this.state.top=true,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){let n,i,s,r,a,o,l=t;if(this.tokens.links){const t=Object.keys(this.tokens.links);if(t.length>0)for(;null!=(r=this.tokenizer.rules.inline.reflinkSearch.exec(l));)t.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,r.index)+"["+S("a",r[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));}for(;null!=(r=this.tokenizer.rules.inline.blockSkip.exec(l));)l=l.slice(0,r.index)+"["+S("a",r[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(r=this.tokenizer.rules.inline.escapedEmSt.exec(l));)l=l.slice(0,r.index+r[0].length-2)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;t;)if(a||(o=""),a=false,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((i=>!!(n=i.call({lexer:this},t,e))&&(t=t.substring(n.raw.length),e.push(n),true)))))if(n=this.tokenizer.escape(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.tag(t))t=t.substring(n.raw.length),i=e[e.length-1],i&&"text"===n.type&&"text"===i.type?(i.raw+=n.raw,i.text+=n.text):e.push(n);else if(n=this.tokenizer.link(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.reflink(t,this.tokens.links))t=t.substring(n.raw.length),i=e[e.length-1],i&&"text"===n.type&&"text"===i.type?(i.raw+=n.raw,i.text+=n.text):e.push(n);else if(n=this.tokenizer.emStrong(t,l,o))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.codespan(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.br(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.del(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.autolink(t,A))t=t.substring(n.raw.length),e.push(n);else if(this.state.inLink||!(n=this.tokenizer.url(t,A))){if(s=t,this.options.extensions&&this.options.extensions.startInline){let e=1/0;const n=t.slice(1);let i;this.options.extensions.startInline.forEach((function(t){i=t.call({lexer:this},n),"number"==typeof i&&i>=0&&(e=Math.min(e,i));})),e<1/0&&e>=0&&(s=t.substring(0,e+1));}if(n=this.tokenizer.inlineText(s,E))t=t.substring(n.raw.length),"_"!==n.raw.slice(-1)&&(o=n.raw.slice(-1)),a=true,i=e[e.length-1],i&&"text"===i.type?(i.raw+=n.raw,i.text+=n.text):e.push(n);else if(t){const e="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(e);break}throw new Error(e)}}else t=t.substring(n.raw.length),e.push(n);return e}}class L{constructor(t){this.options=t||e;}code(t,e,n){const i=(e||"").match(/\S*/)[0];if(this.options.highlight){const e=this.options.highlight(t,i);null!=e&&e!==t&&(n=true,t=e);}return t=t.replace(/\n$/,"")+"\n",i?'<pre><code class="'+this.options.langPrefix+l(i)+'">'+(n?t:l(t,true))+"</code></pre>\n":"<pre><code>"+(n?t:l(t,true))+"</code></pre>\n"}blockquote(t){return `<blockquote>\n${t}</blockquote>\n`}html(t){return t}heading(t,e,n,i){if(this.options.headerIds){return `<h${e} id="${this.options.headerPrefix+i.slug(n)}">${t}</h${e}>\n`}return `<h${e}>${t}</h${e}>\n`}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(t,e,n){const i=e?"ol":"ul";return "<"+i+(e&&1!==n?' start="'+n+'"':"")+">\n"+t+"</"+i+">\n"}listitem(t){return `<li>${t}</li>\n`}checkbox(t){return "<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(t){return `<p>${t}</p>\n`}table(t,e){return e&&(e=`<tbody>${e}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+e+"</table>\n"}tablerow(t){return `<tr>\n${t}</tr>\n`}tablecell(t,e){const n=e.header?"th":"td";return (e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>\n`}strong(t){return `<strong>${t}</strong>`}em(t){return `<em>${t}</em>`}codespan(t){return `<code>${t}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(t){return `<del>${t}</del>`}link(t,e,n){if(null===(t=m(this.options.sanitize,this.options.baseUrl,t)))return n;let i='<a href="'+t+'"';return e&&(i+=' title="'+e+'"'),i+=">"+n+"</a>",i}image(t,e,n){if(null===(t=m(this.options.sanitize,this.options.baseUrl,t)))return n;let i=`<img src="${t}" alt="${n}"`;return e&&(i+=` title="${e}"`),i+=this.options.xhtml?"/>":">",i}text(t){return t}}class I{strong(t){return t}em(t){return t}codespan(t){return t}del(t){return t}html(t){return t}text(t){return t}link(t,e,n){return ""+n}image(t,e,n){return ""+n}br(){return ""}}class M{constructor(){this.seen={};}serialize(t){return t.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(t,e){let n=t,i=0;if(this.seen.hasOwnProperty(n)){i=this.seen[t];do{i++,n=t+"-"+i;}while(this.seen.hasOwnProperty(n))}return e||(this.seen[t]=i,this.seen[n]=0),n}slug(t,e={}){const n=this.serialize(t);return this.getNextSafeSlug(n,e.dryrun)}}class C{constructor(t){this.options=t||e,this.options.renderer=this.options.renderer||new L,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new I,this.slugger=new M;}static parse(t,e){return new C(e).parse(t)}static parseInline(t,e){return new C(e).parseInline(t)}parse(t,e=true){let n,i,s,r,a,o,l,c,u,d,h,g,m,f,k,w,x,b,y,v="";const S=t.length;for(n=0;n<S;n++)if(d=t[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[d.type]&&(y=this.options.extensions.renderers[d.type].call({parser:this},d),false!==y||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)))v+=y||"";else switch(d.type){case "space":continue;case "hr":v+=this.renderer.hr();continue;case "heading":v+=this.renderer.heading(this.parseInline(d.tokens),d.depth,p(this.parseInline(d.tokens,this.textRenderer)),this.slugger);continue;case "code":v+=this.renderer.code(d.text,d.lang,d.escaped);continue;case "table":for(c="",l="",r=d.header.length,i=0;i<r;i++)l+=this.renderer.tablecell(this.parseInline(d.header[i].tokens),{header:true,align:d.align[i]});for(c+=this.renderer.tablerow(l),u="",r=d.rows.length,i=0;i<r;i++){for(o=d.rows[i],l="",a=o.length,s=0;s<a;s++)l+=this.renderer.tablecell(this.parseInline(o[s].tokens),{header:false,align:d.align[s]});u+=this.renderer.tablerow(l);}v+=this.renderer.table(c,u);continue;case "blockquote":u=this.parse(d.tokens),v+=this.renderer.blockquote(u);continue;case "list":for(h=d.ordered,g=d.start,m=d.loose,r=d.items.length,u="",i=0;i<r;i++)k=d.items[i],w=k.checked,x=k.task,f="",k.task&&(b=this.renderer.checkbox(w),m?k.tokens.length>0&&"paragraph"===k.tokens[0].type?(k.tokens[0].text=b+" "+k.tokens[0].text,k.tokens[0].tokens&&k.tokens[0].tokens.length>0&&"text"===k.tokens[0].tokens[0].type&&(k.tokens[0].tokens[0].text=b+" "+k.tokens[0].tokens[0].text)):k.tokens.unshift({type:"text",text:b}):f+=b),f+=this.parse(k.tokens,m),u+=this.renderer.listitem(f,x,w);v+=this.renderer.list(u,h,g);continue;case "html":v+=this.renderer.html(d.text);continue;case "paragraph":v+=this.renderer.paragraph(this.parseInline(d.tokens));continue;case "text":for(u=d.tokens?this.parseInline(d.tokens):d.text;n+1<S&&"text"===t[n+1].type;)d=t[++n],u+="\n"+(d.tokens?this.parseInline(d.tokens):d.text);v+=e?this.renderer.paragraph(u):u;continue;default:{const t='Token with "'+d.type+'" type was not found.';if(this.options.silent)return void console.error(t);throw new Error(t)}}return v}parseInline(t,e){e=e||this.renderer;let n,i,s,r="";const a=t.length;for(n=0;n<a;n++)if(i=t[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]&&(s=this.options.extensions.renderers[i.type].call({parser:this},i),false!==s||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)))r+=s||"";else switch(i.type){case "escape":case "text":r+=e.text(i.text);break;case "html":r+=e.html(i.text);break;case "link":r+=e.link(i.href,i.title,this.parseInline(i.tokens,e));break;case "image":r+=e.image(i.href,i.title,i.text);break;case "strong":r+=e.strong(this.parseInline(i.tokens,e));break;case "em":r+=e.em(this.parseInline(i.tokens,e));break;case "codespan":r+=e.codespan(i.text);break;case "br":r+=e.br();break;case "del":r+=e.del(this.parseInline(i.tokens,e));break;default:{const t='Token with "'+i.type+'" type was not found.';if(this.options.silent)return void console.error(t);throw new Error(t)}}return r}}class q{constructor(t){this.options=t||e;}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(t){return t}postprocess(t){return t}}function P(t,e){return (n,i,s)=>{"function"==typeof i&&(s=i,i=null);const r={...i},a=function(t,e,n){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",t){const t="<p>An error occurred:</p><pre>"+l(i.message+"",true)+"</pre>";return e?Promise.resolve(t):n?void n(null,t):t}if(e)return Promise.reject(i);if(!n)throw i;n(i);}}((i={...O.defaults,...r}).silent,i.async,s);if(null==n)return a(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof n)return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(function(t){t&&t.sanitize&&!t.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");}(i),i.hooks&&(i.hooks.options=i),s){const r=i.highlight;let o;try{i.hooks&&(n=i.hooks.preprocess(n)),o=t(n,i);}catch(t){return a(t)}const l=function(t){let n;if(!t)try{i.walkTokens&&O.walkTokens(o,i.walkTokens),n=e(o,i),i.hooks&&(n=i.hooks.postprocess(n));}catch(e){t=e;}return i.highlight=r,t?a(t):s(null,n)};if(!r||r.length<3)return l();if(delete i.highlight,!o.length)return l();let c=0;return O.walkTokens(o,(function(t){"code"===t.type&&(c++,setTimeout((()=>{r(t.text,t.lang,(function(e,n){if(e)return l(e);null!=n&&n!==t.text&&(t.text=n,t.escaped=true),c--,0===c&&l();}));}),0));})),void(0===c&&l())}if(i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then((e=>t(e,i))).then((t=>i.walkTokens?Promise.all(O.walkTokens(t,i.walkTokens)).then((()=>t)):t)).then((t=>e(t,i))).then((t=>i.hooks?i.hooks.postprocess(t):t)).catch(a);try{i.hooks&&(n=i.hooks.preprocess(n));const s=t(n,i);i.walkTokens&&O.walkTokens(s,i.walkTokens);let r=e(s,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(t){return a(t)}}}function O(t,e,n){return P(R.lex,C.parse)(t,e,n)}O.options=O.setOptions=function(t){var n;return O.defaults={...O.defaults,...t},n=O.defaults,e=n,O},O.getDefaults=t,O.defaults=e,O.use=function(...t){const e=O.defaults.extensions||{renderers:{},childTokens:{}};t.forEach((t=>{const n={...t};if(n.async=O.defaults.async||n.async||false,t.extensions&&(t.extensions.forEach((t=>{if(!t.name)throw new Error("extension name required");if(t.renderer){const n=e.renderers[t.name];e.renderers[t.name]=n?function(...e){let i=t.renderer.apply(this,e);return  false===i&&(i=n.apply(this,e)),i}:t.renderer;}if(t.tokenizer){if(!t.level||"block"!==t.level&&"inline"!==t.level)throw new Error("extension level must be 'block' or 'inline'");e[t.level]?e[t.level].unshift(t.tokenizer):e[t.level]=[t.tokenizer],t.start&&("block"===t.level?e.startBlock?e.startBlock.push(t.start):e.startBlock=[t.start]:"inline"===t.level&&(e.startInline?e.startInline.push(t.start):e.startInline=[t.start]));}t.childTokens&&(e.childTokens[t.name]=t.childTokens);})),n.extensions=e),t.renderer){const e=O.defaults.renderer||new L;for(const n in t.renderer){const i=e[n];e[n]=(...s)=>{let r=t.renderer[n].apply(e,s);return  false===r&&(r=i.apply(e,s)),r};}n.renderer=e;}if(t.tokenizer){const e=O.defaults.tokenizer||new _;for(const n in t.tokenizer){const i=e[n];e[n]=(...s)=>{let r=t.tokenizer[n].apply(e,s);return  false===r&&(r=i.apply(e,s)),r};}n.tokenizer=e;}if(t.hooks){const e=O.defaults.hooks||new q;for(const n in t.hooks){const i=e[n];q.passThroughHooks.has(n)?e[n]=s=>{if(O.defaults.async)return Promise.resolve(t.hooks[n].call(e,s)).then((t=>i.call(e,t)));const r=t.hooks[n].call(e,s);return i.call(e,r)}:e[n]=(...s)=>{let r=t.hooks[n].apply(e,s);return  false===r&&(r=i.apply(e,s)),r};}n.hooks=e;}if(t.walkTokens){const e=O.defaults.walkTokens;n.walkTokens=function(n){let i=[];return i.push(t.walkTokens.call(this,n)),e&&(i=i.concat(e.call(this,n))),i};}O.setOptions(n);}));},O.walkTokens=function(t,e){let n=[];for(const i of t)switch(n=n.concat(e.call(O,i)),i.type){case "table":for(const t of i.header)n=n.concat(O.walkTokens(t.tokens,e));for(const t of i.rows)for(const i of t)n=n.concat(O.walkTokens(i.tokens,e));break;case "list":n=n.concat(O.walkTokens(i.items,e));break;default:O.defaults.extensions&&O.defaults.extensions.childTokens&&O.defaults.extensions.childTokens[i.type]?O.defaults.extensions.childTokens[i.type].forEach((function(t){n=n.concat(O.walkTokens(i[t],e));})):i.tokens&&(n=n.concat(O.walkTokens(i.tokens,e)));}return n},O.parseInline=P(R.lexInline,C.parseInline),O.Parser=C,O.parser=C.parse,O.Renderer=L,O.TextRenderer=I,O.Lexer=R,O.lexer=R.lex,O.Tokenizer=_,O.Slugger=M,O.Hooks=q,O.parse=O,O.options,O.setOptions,O.use,O.walkTokens,O.parseInline,C.parse,R.lex;const N=()=>{let t,e,n=null;function i(){if(n&&!n.closed)n.focus();else {if(n=window.open("about:blank","reveal.js - Notes","width=1100,height=700"),n.marked=O,n.document.write("\x3c!--\n\tNOTE: You need to build the notes plugin after making changes to this file.\n--\x3e\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\">\n\n\t\t<title>reveal.js - Speaker View</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: Helvetica;\n\t\t\t\tfont-size: 18px;\n\t\t\t}\n\n\t\t\t#current-slide,\n\t\t\t#upcoming-slide,\n\t\t\t#speaker-controls {\n\t\t\t\tpadding: 6px;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\t-moz-box-sizing: border-box;\n\t\t\t}\n\n\t\t\t#current-slide iframe,\n\t\t\t#upcoming-slide iframe {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tborder: 1px solid #ddd;\n\t\t\t}\n\n\t\t\t#current-slide .label,\n\t\t\t#upcoming-slide .label {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 10px;\n\t\t\t\tleft: 10px;\n\t\t\t\tz-index: 2;\n\t\t\t}\n\n\t\t\t#connection-status {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tz-index: 20;\n\t\t\t\tpadding: 30% 20% 20% 20%;\n\t\t\t\tfont-size: 18px;\n\t\t\t\tcolor: #222;\n\t\t\t\tbackground: #fff;\n\t\t\t\ttext-align: center;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tline-height: 1.4;\n\t\t\t}\n\n\t\t\t.overlay-element {\n\t\t\t\theight: 34px;\n\t\t\t\tline-height: 34px;\n\t\t\t\tpadding: 0 10px;\n\t\t\t\ttext-shadow: none;\n\t\t\t\tbackground: rgba( 220, 220, 220, 0.8 );\n\t\t\t\tcolor: #222;\n\t\t\t\tfont-size: 14px;\n\t\t\t}\n\n\t\t\t.overlay-element.interactive:hover {\n\t\t\t\tbackground: rgba( 220, 220, 220, 1 );\n\t\t\t}\n\n\t\t\t#current-slide {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 60%;\n\t\t\t\theight: 100%;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tpadding-right: 0;\n\t\t\t}\n\n\t\t\t#upcoming-slide {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 40%;\n\t\t\t\theight: 40%;\n\t\t\t\tright: 0;\n\t\t\t\ttop: 0;\n\t\t\t}\n\n\t\t\t/* Speaker controls */\n\t\t\t#speaker-controls {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 40%;\n\t\t\t\tright: 0;\n\t\t\t\twidth: 40%;\n\t\t\t\theight: 60%;\n\t\t\t\toverflow: auto;\n\t\t\t\tfont-size: 18px;\n\t\t\t}\n\n\t\t\t\t.speaker-controls-time.hidden,\n\t\t\t\t.speaker-controls-notes.hidden {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .label,\n\t\t\t\t.speaker-controls-pace .label,\n\t\t\t\t.speaker-controls-notes .label {\n\t\t\t\t\ttext-transform: uppercase;\n\t\t\t\t\tfont-weight: normal;\n\t\t\t\t\tfont-size: 0.66em;\n\t\t\t\t\tcolor: #666;\n\t\t\t\t\tmargin: 0;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time, .speaker-controls-pace {\n\t\t\t\t\tborder-bottom: 1px solid rgba( 200, 200, 200, 0.5 );\n\t\t\t\t\tmargin-bottom: 10px;\n\t\t\t\t\tpadding: 10px 16px;\n\t\t\t\t\tpadding-bottom: 20px;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .reset-button {\n\t\t\t\t\topacity: 0;\n\t\t\t\t\tfloat: right;\n\t\t\t\t\tcolor: #666;\n\t\t\t\t\ttext-decoration: none;\n\t\t\t\t}\n\t\t\t\t.speaker-controls-time:hover .reset-button {\n\t\t\t\t\topacity: 1;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .timer,\n\t\t\t\t.speaker-controls-time .clock {\n\t\t\t\t\twidth: 50%;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .timer,\n\t\t\t\t.speaker-controls-time .clock,\n\t\t\t\t.speaker-controls-time .pacing .hours-value,\n\t\t\t\t.speaker-controls-time .pacing .minutes-value,\n\t\t\t\t.speaker-controls-time .pacing .seconds-value {\n\t\t\t\t\tfont-size: 1.9em;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .timer {\n\t\t\t\t\tfloat: left;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .clock {\n\t\t\t\t\tfloat: right;\n\t\t\t\t\ttext-align: right;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time span.mute {\n\t\t\t\t\topacity: 0.3;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing-title {\n\t\t\t\t\tmargin-top: 5px;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing.ahead {\n\t\t\t\t\tcolor: blue;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing.on-track {\n\t\t\t\t\tcolor: green;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing.behind {\n\t\t\t\t\tcolor: red;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-notes {\n\t\t\t\t\tpadding: 10px 16px;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-notes .value {\n\t\t\t\t\tmargin-top: 5px;\n\t\t\t\t\tline-height: 1.4;\n\t\t\t\t\tfont-size: 1.2em;\n\t\t\t\t}\n\n\t\t\t/* Layout selector */\n\t\t\t#speaker-layout {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 10px;\n\t\t\t\tright: 10px;\n\t\t\t\tcolor: #222;\n\t\t\t\tz-index: 10;\n\t\t\t}\n\t\t\t\t#speaker-layout select {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tborder: 0;\n\t\t\t\t\tbox-shadow: 0;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\topacity: 0;\n\n\t\t\t\t\tfont-size: 1em;\n\t\t\t\t\tbackground-color: transparent;\n\n\t\t\t\t\t-moz-appearance: none;\n\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\t\t\t\t}\n\n\t\t\t\t#speaker-layout select:focus {\n\t\t\t\t\toutline: none;\n\t\t\t\t\tbox-shadow: none;\n\t\t\t\t}\n\n\t\t\t.clear {\n\t\t\t\tclear: both;\n\t\t\t}\n\n\t\t\t/* Speaker layout: Wide */\n\t\t\tbody[data-speaker-layout=\"wide\"] #current-slide,\n\t\t\tbody[data-speaker-layout=\"wide\"] #upcoming-slide {\n\t\t\t\twidth: 50%;\n\t\t\t\theight: 45%;\n\t\t\t\tpadding: 6px;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"wide\"] #current-slide {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"wide\"] #upcoming-slide {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 50%;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"wide\"] #speaker-controls {\n\t\t\t\ttop: 45%;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 50%;\n\t\t\t\tfont-size: 1.25em;\n\t\t\t}\n\n\t\t\t/* Speaker layout: Tall */\n\t\t\tbody[data-speaker-layout=\"tall\"] #current-slide,\n\t\t\tbody[data-speaker-layout=\"tall\"] #upcoming-slide {\n\t\t\t\twidth: 45%;\n\t\t\t\theight: 50%;\n\t\t\t\tpadding: 6px;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"tall\"] #current-slide {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"tall\"] #upcoming-slide {\n\t\t\t\ttop: 50%;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"tall\"] #speaker-controls {\n\t\t\t\tpadding-top: 40px;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 45%;\n\t\t\t\twidth: 55%;\n\t\t\t\theight: 100%;\n\t\t\t\tfont-size: 1.25em;\n\t\t\t}\n\n\t\t\t/* Speaker layout: Notes only */\n\t\t\tbody[data-speaker-layout=\"notes-only\"] #current-slide,\n\t\t\tbody[data-speaker-layout=\"notes-only\"] #upcoming-slide {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"notes-only\"] #speaker-controls {\n\t\t\t\tpadding-top: 40px;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tfont-size: 1.25em;\n\t\t\t}\n\n\t\t\t@media screen and (max-width: 1080px) {\n\t\t\t\tbody[data-speaker-layout=\"default\"] #speaker-controls {\n\t\t\t\t\tfont-size: 16px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t@media screen and (max-width: 900px) {\n\t\t\t\tbody[data-speaker-layout=\"default\"] #speaker-controls {\n\t\t\t\t\tfont-size: 14px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t@media screen and (max-width: 800px) {\n\t\t\t\tbody[data-speaker-layout=\"default\"] #speaker-controls {\n\t\t\t\t\tfont-size: 12px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t</style>\n\t</head>\n\n\t<body>\n\n\t\t<div id=\"connection-status\">Loading speaker view...</div>\n\n\t\t<div id=\"current-slide\"></div>\n\t\t<div id=\"upcoming-slide\"><span class=\"overlay-element label\">Upcoming</span></div>\n\t\t<div id=\"speaker-controls\">\n\t\t\t<div class=\"speaker-controls-time\">\n\t\t\t\t<h4 class=\"label\">Time <span class=\"reset-button\">Click to Reset</span></h4>\n\t\t\t\t<div class=\"clock\">\n\t\t\t\t\t<span class=\"clock-value\">0:00 AM</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"timer\">\n\t\t\t\t\t<span class=\"hours-value\">00</span><span class=\"minutes-value\">:00</span><span class=\"seconds-value\">:00</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"clear\"></div>\n\n\t\t\t\t<h4 class=\"label pacing-title\" style=\"display: none\">Pacing – Time to finish current slide</h4>\n\t\t\t\t<div class=\"pacing\" style=\"display: none\">\n\t\t\t\t\t<span class=\"hours-value\">00</span><span class=\"minutes-value\">:00</span><span class=\"seconds-value\">:00</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"speaker-controls-notes hidden\">\n\t\t\t\t<h4 class=\"label\">Notes</h4>\n\t\t\t\t<div class=\"value\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=\"speaker-layout\" class=\"overlay-element interactive\">\n\t\t\t<span class=\"speaker-layout-label\"></span>\n\t\t\t<select class=\"speaker-layout-dropdown\"></select>\n\t\t</div>\n\n\t\t<script>\n\n\t\t\t(function() {\n\n\t\t\t\tvar notes,\n\t\t\t\t\tnotesValue,\n\t\t\t\t\tcurrentState,\n\t\t\t\t\tcurrentSlide,\n\t\t\t\t\tupcomingSlide,\n\t\t\t\t\tlayoutLabel,\n\t\t\t\t\tlayoutDropdown,\n\t\t\t\t\tpendingCalls = {},\n\t\t\t\t\tlastRevealApiCallId = 0,\n\t\t\t\t\tconnected = false\n\n\t\t\t\tvar connectionStatus = document.querySelector( '#connection-status' );\n\n\t\t\t\tvar SPEAKER_LAYOUTS = {\n\t\t\t\t\t'default': 'Default',\n\t\t\t\t\t'wide': 'Wide',\n\t\t\t\t\t'tall': 'Tall',\n\t\t\t\t\t'notes-only': 'Notes only'\n\t\t\t\t};\n\n\t\t\t\tsetupLayout();\n\n\t\t\t\tlet openerOrigin;\n\n\t\t\t\ttry {\n\t\t\t\t\topenerOrigin = window.opener.location.origin;\n\t\t\t\t}\n\t\t\t\tcatch ( error ) { console.warn( error ) }\n\n\t\t\t\t// In order to prevent XSS, the speaker view will only run if its\n\t\t\t\t// opener has the same origin as itself\n\t\t\t\tif( window.location.origin !== openerOrigin ) {\n\t\t\t\t\tconnectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tvar connectionTimeout = setTimeout( function() {\n\t\t\t\t\tconnectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';\n\t\t\t\t}, 5000 );\n\n\t\t\t\twindow.addEventListener( 'message', function( event ) {\n\n\t\t\t\t\t// Validate the origin of all messages to avoid parsing messages\n\t\t\t\t\t// that aren't meant for us. Ignore when running off file:// so\n\t\t\t\t\t// that the speaker view continues to work without a web server.\n\t\t\t\t\tif( window.location.origin !== event.origin && window.location.origin !== 'file://' ) {\n\t\t\t\t\t\treturn\n\t\t\t\t\t}\n\n\t\t\t\t\tclearTimeout( connectionTimeout );\n\t\t\t\t\tconnectionStatus.style.display = 'none';\n\n\t\t\t\t\tvar data = JSON.parse( event.data );\n\n\t\t\t\t\t// The overview mode is only useful to the reveal.js instance\n\t\t\t\t\t// where navigation occurs so we don't sync it\n\t\t\t\t\tif( data.state ) delete data.state.overview;\n\n\t\t\t\t\t// Messages sent by the notes plugin inside of the main window\n\t\t\t\t\tif( data && data.namespace === 'reveal-notes' ) {\n\t\t\t\t\t\tif( data.type === 'connect' ) {\n\t\t\t\t\t\t\thandleConnectMessage( data );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if( data.type === 'state' ) {\n\t\t\t\t\t\t\thandleStateMessage( data );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if( data.type === 'return' ) {\n\t\t\t\t\t\t\tpendingCalls[data.callId](data.result);\n\t\t\t\t\t\t\tdelete pendingCalls[data.callId];\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t// Messages sent by the reveal.js inside of the current slide preview\n\t\t\t\t\telse if( data && data.namespace === 'reveal' ) {\n\t\t\t\t\t\tif( /ready/.test( data.eventName ) ) {\n\t\t\t\t\t\t\t// Send a message back to notify that the handshake is complete\n\t\t\t\t\t\t\twindow.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if( /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {\n\n\t\t\t\t\t\t\tdispatchStateToMainWindow( data.state );\n\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t} );\n\n\t\t\t\t/**\n\t\t\t\t * Updates the presentation in the main window to match the state\n\t\t\t\t * of the presentation in the notes window.\n\t\t\t\t */\n\t\t\t\tconst dispatchStateToMainWindow = debounce(( state ) => {\n\t\t\t\t\twindow.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );\n\t\t\t\t}, 500);\n\n\t\t\t\t/**\n\t\t\t\t * Asynchronously calls the Reveal.js API of the main frame.\n\t\t\t\t */\n\t\t\t\tfunction callRevealApi( methodName, methodArguments, callback ) {\n\n\t\t\t\t\tvar callId = ++lastRevealApiCallId;\n\t\t\t\t\tpendingCalls[callId] = callback;\n\t\t\t\t\twindow.opener.postMessage( JSON.stringify( {\n\t\t\t\t\t\tnamespace: 'reveal-notes',\n\t\t\t\t\t\ttype: 'call',\n\t\t\t\t\t\tcallId: callId,\n\t\t\t\t\t\tmethodName: methodName,\n\t\t\t\t\t\targuments: methodArguments\n\t\t\t\t\t} ), '*' );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Called when the main window is trying to establish a\n\t\t\t\t * connection.\n\t\t\t\t */\n\t\t\t\tfunction handleConnectMessage( data ) {\n\n\t\t\t\t\tif( connected === false ) {\n\t\t\t\t\t\tconnected = true;\n\n\t\t\t\t\t\tsetupIframes( data );\n\t\t\t\t\t\tsetupKeyboard();\n\t\t\t\t\t\tsetupNotes();\n\t\t\t\t\t\tsetupTimer();\n\t\t\t\t\t\tsetupHeartbeat();\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Called when the main window sends an updated state.\n\t\t\t\t */\n\t\t\t\tfunction handleStateMessage( data ) {\n\n\t\t\t\t\t// Store the most recently set state to avoid circular loops\n\t\t\t\t\t// applying the same state\n\t\t\t\t\tcurrentState = JSON.stringify( data.state );\n\n\t\t\t\t\t// No need for updating the notes in case of fragment changes\n\t\t\t\t\tif ( data.notes ) {\n\t\t\t\t\t\tnotes.classList.remove( 'hidden' );\n\t\t\t\t\t\tnotesValue.style.whiteSpace = data.whitespace;\n\t\t\t\t\t\tif( data.markdown ) {\n\t\t\t\t\t\t\tnotesValue.innerHTML = marked( data.notes );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tnotesValue.innerHTML = data.notes;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tnotes.classList.add( 'hidden' );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Update the note slides\n\t\t\t\t\tcurrentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );\n\t\t\t\t\tupcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );\n\t\t\t\t\tupcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );\n\n\t\t\t\t}\n\n\t\t\t\t// Limit to max one state update per X ms\n\t\t\t\thandleStateMessage = debounce( handleStateMessage, 200 );\n\n\t\t\t\t/**\n\t\t\t\t * Forward keyboard events to the current slide window.\n\t\t\t\t * This enables keyboard events to work even if focus\n\t\t\t\t * isn't set on the current slide iframe.\n\t\t\t\t *\n\t\t\t\t * Block F5 default handling, it reloads and disconnects\n\t\t\t\t * the speaker notes window.\n\t\t\t\t */\n\t\t\t\tfunction setupKeyboard() {\n\n\t\t\t\t\tdocument.addEventListener( 'keydown', function( event ) {\n\t\t\t\t\t\tif( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {\n\t\t\t\t\t\t\tevent.preventDefault();\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcurrentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );\n\t\t\t\t\t} );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Creates the preview iframes.\n\t\t\t\t */\n\t\t\t\tfunction setupIframes( data ) {\n\n\t\t\t\t\tvar params = [\n\t\t\t\t\t\t'receiver',\n\t\t\t\t\t\t'progress=false',\n\t\t\t\t\t\t'history=false',\n\t\t\t\t\t\t'transition=none',\n\t\t\t\t\t\t'autoSlide=0',\n\t\t\t\t\t\t'backgroundTransition=none'\n\t\t\t\t\t].join( '&' );\n\n\t\t\t\t\tvar urlSeparator = /\\?/.test(data.url) ? '&' : '?';\n\t\t\t\t\tvar hash = '#/' + data.state.indexh + '/' + data.state.indexv;\n\t\t\t\t\tvar currentURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&postMessageEvents=true' + hash;\n\t\t\t\t\tvar upcomingURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&controls=false' + hash;\n\n\t\t\t\t\tcurrentSlide = document.createElement( 'iframe' );\n\t\t\t\t\tcurrentSlide.setAttribute( 'width', 1280 );\n\t\t\t\t\tcurrentSlide.setAttribute( 'height', 1024 );\n\t\t\t\t\tcurrentSlide.setAttribute( 'src', currentURL );\n\t\t\t\t\tdocument.querySelector( '#current-slide' ).appendChild( currentSlide );\n\n\t\t\t\t\tupcomingSlide = document.createElement( 'iframe' );\n\t\t\t\t\tupcomingSlide.setAttribute( 'width', 640 );\n\t\t\t\t\tupcomingSlide.setAttribute( 'height', 512 );\n\t\t\t\t\tupcomingSlide.setAttribute( 'src', upcomingURL );\n\t\t\t\t\tdocument.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Setup the notes UI.\n\t\t\t\t */\n\t\t\t\tfunction setupNotes() {\n\n\t\t\t\t\tnotes = document.querySelector( '.speaker-controls-notes' );\n\t\t\t\t\tnotesValue = document.querySelector( '.speaker-controls-notes .value' );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * We send out a heartbeat at all times to ensure we can\n\t\t\t\t * reconnect with the main presentation window after reloads.\n\t\t\t\t */\n\t\t\t\tfunction setupHeartbeat() {\n\n\t\t\t\t\tsetInterval( () => {\n\t\t\t\t\t\twindow.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );\n\t\t\t\t\t}, 1000 );\n\n\t\t\t\t}\n\n\t\t\t\tfunction getTimings( callback ) {\n\n\t\t\t\t\tcallRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {\n\t\t\t\t\t\tcallRevealApi( 'getConfig', [], function ( config ) {\n\t\t\t\t\t\t\tvar totalTime = config.totalTime;\n\t\t\t\t\t\t\tvar minTimePerSlide = config.minimumTimePerSlide || 0;\n\t\t\t\t\t\t\tvar defaultTiming = config.defaultTiming;\n\t\t\t\t\t\t\tif ((defaultTiming == null) && (totalTime == null)) {\n\t\t\t\t\t\t\t\tcallback(null);\n\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t// Setting totalTime overrides defaultTiming\n\t\t\t\t\t\t\tif (totalTime) {\n\t\t\t\t\t\t\t\tdefaultTiming = 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tvar timings = [];\n\t\t\t\t\t\t\tfor ( var i in slideAttributes ) {\n\t\t\t\t\t\t\t\tvar slide = slideAttributes[ i ];\n\t\t\t\t\t\t\t\tvar timing = defaultTiming;\n\t\t\t\t\t\t\t\tif( slide.hasOwnProperty( 'data-timing' )) {\n\t\t\t\t\t\t\t\t\tvar t = slide[ 'data-timing' ];\n\t\t\t\t\t\t\t\t\ttiming = parseInt(t);\n\t\t\t\t\t\t\t\t\tif( isNaN(timing) ) {\n\t\t\t\t\t\t\t\t\t\tconsole.warn(\"Could not parse timing '\" + t + \"' of slide \" + i + \"; using default of \" + defaultTiming);\n\t\t\t\t\t\t\t\t\t\ttiming = defaultTiming;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\ttimings.push(timing);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif ( totalTime ) {\n\t\t\t\t\t\t\t\t// After we've allocated time to individual slides, we summarize it and\n\t\t\t\t\t\t\t\t// subtract it from the total time\n\t\t\t\t\t\t\t\tvar remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );\n\t\t\t\t\t\t\t\t// The remaining time is divided by the number of slides that have 0 seconds\n\t\t\t\t\t\t\t\t// allocated at the moment, giving the average time-per-slide on the remaining slides\n\t\t\t\t\t\t\t\tvar remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length\n\t\t\t\t\t\t\t\tvar timePerSlide = Math.round( remainingTime / remainingSlides, 0 )\n\t\t\t\t\t\t\t\t// And now we replace every zero-value timing with that average\n\t\t\t\t\t\t\t\ttimings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tvar slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length\n\t\t\t\t\t\t\tif ( slidesUnderMinimum ) {\n\t\t\t\t\t\t\t\tmessage = \"The pacing time for \" + slidesUnderMinimum + \" slide(s) is under the configured minimum of \" + minTimePerSlide + \" seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).\";\n\t\t\t\t\t\t\t\talert(message);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcallback( timings );\n\t\t\t\t\t\t} );\n\t\t\t\t\t} );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Return the number of seconds allocated for presenting\n\t\t\t\t * all slides up to and including this one.\n\t\t\t\t */\n\t\t\t\tfunction getTimeAllocated( timings, callback ) {\n\n\t\t\t\t\tcallRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {\n\t\t\t\t\t\tvar allocated = 0;\n\t\t\t\t\t\tfor (var i in timings.slice(0, currentSlide + 1)) {\n\t\t\t\t\t\t\tallocated += timings[i];\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcallback( allocated );\n\t\t\t\t\t} );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Create the timer and clock and start updating them\n\t\t\t\t * at an interval.\n\t\t\t\t */\n\t\t\t\tfunction setupTimer() {\n\n\t\t\t\t\tvar start = new Date(),\n\t\t\t\t\ttimeEl = document.querySelector( '.speaker-controls-time' ),\n\t\t\t\t\tclockEl = timeEl.querySelector( '.clock-value' ),\n\t\t\t\t\thoursEl = timeEl.querySelector( '.hours-value' ),\n\t\t\t\t\tminutesEl = timeEl.querySelector( '.minutes-value' ),\n\t\t\t\t\tsecondsEl = timeEl.querySelector( '.seconds-value' ),\n\t\t\t\t\tpacingTitleEl = timeEl.querySelector( '.pacing-title' ),\n\t\t\t\t\tpacingEl = timeEl.querySelector( '.pacing' ),\n\t\t\t\t\tpacingHoursEl = pacingEl.querySelector( '.hours-value' ),\n\t\t\t\t\tpacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),\n\t\t\t\t\tpacingSecondsEl = pacingEl.querySelector( '.seconds-value' );\n\n\t\t\t\t\tvar timings = null;\n\t\t\t\t\tgetTimings( function ( _timings ) {\n\n\t\t\t\t\t\ttimings = _timings;\n\t\t\t\t\t\tif (_timings !== null) {\n\t\t\t\t\t\t\tpacingTitleEl.style.removeProperty('display');\n\t\t\t\t\t\t\tpacingEl.style.removeProperty('display');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Update once directly\n\t\t\t\t\t\t_updateTimer();\n\n\t\t\t\t\t\t// Then update every second\n\t\t\t\t\t\tsetInterval( _updateTimer, 1000 );\n\n\t\t\t\t\t} );\n\n\n\t\t\t\t\tfunction _resetTimer() {\n\n\t\t\t\t\t\tif (timings == null) {\n\t\t\t\t\t\t\tstart = new Date();\n\t\t\t\t\t\t\t_updateTimer();\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t// Reset timer to beginning of current slide\n\t\t\t\t\t\t\tgetTimeAllocated( timings, function ( slideEndTimingSeconds ) {\n\t\t\t\t\t\t\t\tvar slideEndTiming = slideEndTimingSeconds * 1000;\n\t\t\t\t\t\t\t\tcallRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {\n\t\t\t\t\t\t\t\t\tvar currentSlideTiming = timings[currentSlide] * 1000;\n\t\t\t\t\t\t\t\t\tvar previousSlidesTiming = slideEndTiming - currentSlideTiming;\n\t\t\t\t\t\t\t\t\tvar now = new Date();\n\t\t\t\t\t\t\t\t\tstart = new Date(now.getTime() - previousSlidesTiming);\n\t\t\t\t\t\t\t\t\t_updateTimer();\n\t\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\ttimeEl.addEventListener( 'click', function() {\n\t\t\t\t\t\t_resetTimer();\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t} );\n\n\t\t\t\t\tfunction _displayTime( hrEl, minEl, secEl, time) {\n\n\t\t\t\t\t\tvar sign = Math.sign(time) == -1 ? \"-\" : \"\";\n\t\t\t\t\t\ttime = Math.abs(Math.round(time / 1000));\n\t\t\t\t\t\tvar seconds = time % 60;\n\t\t\t\t\t\tvar minutes = Math.floor( time / 60 ) % 60 ;\n\t\t\t\t\t\tvar hours = Math.floor( time / ( 60 * 60 )) ;\n\t\t\t\t\t\thrEl.innerHTML = sign + zeroPadInteger( hours );\n\t\t\t\t\t\tif (hours == 0) {\n\t\t\t\t\t\t\thrEl.classList.add( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\thrEl.classList.remove( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\tminEl.innerHTML = ':' + zeroPadInteger( minutes );\n\t\t\t\t\t\tif (hours == 0 && minutes == 0) {\n\t\t\t\t\t\t\tminEl.classList.add( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tminEl.classList.remove( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsecEl.innerHTML = ':' + zeroPadInteger( seconds );\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction _updateTimer() {\n\n\t\t\t\t\t\tvar diff, hours, minutes, seconds,\n\t\t\t\t\t\tnow = new Date();\n\n\t\t\t\t\t\tdiff = now.getTime() - start.getTime();\n\n\t\t\t\t\t\tclockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );\n\t\t\t\t\t\t_displayTime( hoursEl, minutesEl, secondsEl, diff );\n\t\t\t\t\t\tif (timings !== null) {\n\t\t\t\t\t\t\t_updatePacing(diff);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction _updatePacing(diff) {\n\n\t\t\t\t\t\tgetTimeAllocated( timings, function ( slideEndTimingSeconds ) {\n\t\t\t\t\t\t\tvar slideEndTiming = slideEndTimingSeconds * 1000;\n\n\t\t\t\t\t\t\tcallRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {\n\t\t\t\t\t\t\t\tvar currentSlideTiming = timings[currentSlide] * 1000;\n\t\t\t\t\t\t\t\tvar timeLeftCurrentSlide = slideEndTiming - diff;\n\t\t\t\t\t\t\t\tif (timeLeftCurrentSlide < 0) {\n\t\t\t\t\t\t\t\t\tpacingEl.className = 'pacing behind';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\telse if (timeLeftCurrentSlide < currentSlideTiming) {\n\t\t\t\t\t\t\t\t\tpacingEl.className = 'pacing on-track';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\tpacingEl.className = 'pacing ahead';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t} );\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Sets up the speaker view layout and layout selector.\n\t\t\t\t */\n\t\t\t\tfunction setupLayout() {\n\n\t\t\t\t\tlayoutDropdown = document.querySelector( '.speaker-layout-dropdown' );\n\t\t\t\t\tlayoutLabel = document.querySelector( '.speaker-layout-label' );\n\n\t\t\t\t\t// Render the list of available layouts\n\t\t\t\t\tfor( var id in SPEAKER_LAYOUTS ) {\n\t\t\t\t\t\tvar option = document.createElement( 'option' );\n\t\t\t\t\t\toption.setAttribute( 'value', id );\n\t\t\t\t\t\toption.textContent = SPEAKER_LAYOUTS[ id ];\n\t\t\t\t\t\tlayoutDropdown.appendChild( option );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Monitor the dropdown for changes\n\t\t\t\t\tlayoutDropdown.addEventListener( 'change', function( event ) {\n\n\t\t\t\t\t\tsetLayout( layoutDropdown.value );\n\n\t\t\t\t\t}, false );\n\n\t\t\t\t\t// Restore any currently persisted layout\n\t\t\t\t\tsetLayout( getLayout() );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Sets a new speaker view layout. The layout is persisted\n\t\t\t\t * in local storage.\n\t\t\t\t */\n\t\t\t\tfunction setLayout( value ) {\n\n\t\t\t\t\tvar title = SPEAKER_LAYOUTS[ value ];\n\n\t\t\t\t\tlayoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );\n\t\t\t\t\tlayoutDropdown.value = value;\n\n\t\t\t\t\tdocument.body.setAttribute( 'data-speaker-layout', value );\n\n\t\t\t\t\t// Persist locally\n\t\t\t\t\tif( supportsLocalStorage() ) {\n\t\t\t\t\t\twindow.localStorage.setItem( 'reveal-speaker-layout', value );\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Returns the ID of the most recently set speaker layout\n\t\t\t\t * or our default layout if none has been set.\n\t\t\t\t */\n\t\t\t\tfunction getLayout() {\n\n\t\t\t\t\tif( supportsLocalStorage() ) {\n\t\t\t\t\t\tvar layout = window.localStorage.getItem( 'reveal-speaker-layout' );\n\t\t\t\t\t\tif( layout ) {\n\t\t\t\t\t\t\treturn layout;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Default to the first record in the layouts hash\n\t\t\t\t\tfor( var id in SPEAKER_LAYOUTS ) {\n\t\t\t\t\t\treturn id;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tfunction supportsLocalStorage() {\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tlocalStorage.setItem('test', 'test');\n\t\t\t\t\t\tlocalStorage.removeItem('test');\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t\tcatch( e ) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tfunction zeroPadInteger( num ) {\n\n\t\t\t\t\tvar str = '00' + parseInt( num );\n\t\t\t\t\treturn str.substring( str.length - 2 );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Limits the frequency at which a function can be called.\n\t\t\t\t */\n\t\t\t\tfunction debounce( fn, ms ) {\n\n\t\t\t\t\tvar lastTime = 0,\n\t\t\t\t\t\ttimeout;\n\n\t\t\t\t\treturn function() {\n\n\t\t\t\t\t\tvar args = arguments;\n\t\t\t\t\t\tvar context = this;\n\n\t\t\t\t\t\tclearTimeout( timeout );\n\n\t\t\t\t\t\tvar timeSinceLastCall = Date.now() - lastTime;\n\t\t\t\t\t\tif( timeSinceLastCall > ms ) {\n\t\t\t\t\t\t\tfn.apply( context, args );\n\t\t\t\t\t\t\tlastTime = Date.now();\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\ttimeout = setTimeout( function() {\n\t\t\t\t\t\t\t\tfn.apply( context, args );\n\t\t\t\t\t\t\t\tlastTime = Date.now();\n\t\t\t\t\t\t\t}, ms - timeSinceLastCall );\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t})();\n\n\t\t<\/script>\n\t</body>\n</html>"),!n)return void alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");!function(){const i=e.getConfig().url,s="string"==typeof i?i:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search;t=setInterval((function(){n.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",state:e.getState(),url:s}),"*");}),500),window.addEventListener("message",r);}();}}function s(t){let i=e.getCurrentSlide(),s=i.querySelectorAll("aside.notes"),r=i.querySelector(".current-fragment"),a={namespace:"reveal-notes",type:"state",notes:"",markdown:false,whitespace:"normal",state:e.getState()};if(i.hasAttribute("data-notes")&&(a.notes=i.getAttribute("data-notes"),a.whitespace="pre-wrap"),r){let t=r.querySelector("aside.notes");t?(a.notes=t.innerHTML,a.markdown="string"==typeof t.getAttribute("data-markdown"),s=null):r.hasAttribute("data-notes")&&(a.notes=r.getAttribute("data-notes"),a.whitespace="pre-wrap",s=null);}s&&s.length&&(s=Array.from(s).filter((t=>null===t.closest(".fragment"))),a.notes=s.map((t=>t.innerHTML)).join("\n"),a.markdown=s[0]&&"string"==typeof s[0].getAttribute("data-markdown")),n.postMessage(JSON.stringify(a),"*");}function r(i){if(function(t){try{return window.location.origin===t.source.location.origin}catch(t){return  false}}(i))try{let s=JSON.parse(i.data);s&&"reveal-notes"===s.namespace&&"connected"===s.type?(clearInterval(t),a()):s&&"reveal-notes"===s.namespace&&"call"===s.type&&function(t,i,s){let r=e[t].apply(e,i);n.postMessage(JSON.stringify({namespace:"reveal-notes",type:"return",result:r,callId:s}),"*");}(s.methodName,s.arguments,s.callId);}catch(t){}}function a(){e.on("slidechanged",s),e.on("fragmentshown",s),e.on("fragmenthidden",s),e.on("overviewhidden",s),e.on("overviewshown",s),e.on("paused",s),e.on("resumed",s),s();}return {id:"notes",init:function(t){e=t,/receiver/i.test(window.location.search)||(null!==window.location.search.match(/(\?|\&)notes/gi)?i():window.addEventListener("message",(t=>{if(!n&&"string"==typeof t.data){let i;try{i=JSON.parse(t.data);}catch(t){}i&&"reveal-notes"===i.namespace&&"heartbeat"===i.type&&(e=t.source,n&&!n.closed?n.focus():(n=e,window.addEventListener("message",r),a()));}var e;})),e.addKeyBinding({keyCode:83,key:"S",description:"Speaker notes view"},(function(){i();})));},open:i}};

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

	    injectBoundaryStyles();
	    liveRegion = createLiveRegion();

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
	 *     role: 'student',              // 'student' | 'instructor'
	 *     deckId: '2d-arrays',          // optional logical deck id
	 *     hostOrigin: '*',              // recommended: exact host origin in production
	 *     allowedOrigins: ['*'],        // origins accepted for inbound commands
	 *   }
	 * });
	 * </script>
	 */

	(function () {
	  const IFRAME_SYNC_VERSION = '2.0.0';
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
	      trigger: slide.getAttribute('data-activity-trigger') || 'slide-enter',
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
	            emitActivityRequestForCurrentSlide(ctx);
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
	      },
	    };

	    debugLog(() => ['init', {
	      role: ctx.state.role,
	      deckId: config.deckId || null,
	      hostOrigin: config.hostOrigin,
	    }]);

	    wireDeckEvents(ctx);
	    wireWindowMessageListener(ctx);
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
	      setRole: (role) => {
	        if (role === 'instructor' || role === 'student') {
	          if (ctx.state.standaloneControlRefreshTimer) {
	            clearTimeout(ctx.state.standaloneControlRefreshTimer);
	            ctx.state.standaloneControlRefreshTimer = null;
	          }
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
	          emitActivityRequestForCurrentSlide(ctx);
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
	  if (N && !N.id) {
	    N.id = 'notes';
	  }
	  window.Reveal = window.Reveal || X;
	  window.RevealNotes = window.RevealNotes || N;
	}

})();
