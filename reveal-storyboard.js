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

    function updateBoundaryMarker(index) {
      currentBoundaryIndex = (index != null && Number.isFinite(Number(index)))
        ? Number(index)
        : null;

      applyStoryboardRangeClasses();

      if (currentBoundaryIndex !== null && liveRegion) {
        liveRegion.textContent = `Student boundary set to slide ${currentBoundaryIndex + 1}`;
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
          const targetV = currentIndices.h === entry.h ? currentIndices.v : 0;
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
      if (currentBoundaryIndex !== null) updateBoundaryMarker(currentBoundaryIndex);
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
      const navBtns = Array.from(storyboardTrack.querySelectorAll('button.story-thumb'));
      const cur = navBtns.indexOf(document.activeElement);
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
