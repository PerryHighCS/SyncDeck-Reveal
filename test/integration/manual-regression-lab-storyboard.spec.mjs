import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import { startStaticServer } from '../support/static-server.mjs';
import { sendCommand } from '../support/iframe-sync-helpers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const revealStubPath = path.resolve(__dirname, '../fixtures/helpers/reveal-stub.js');
const revealStubSource = readFileSync(revealStubPath, 'utf8');

const revealScript = `${revealStubSource}
(function () {
  function buildReveal(options = {}) {
    const api = window.createRevealStub(options);
    api.initialize = function initialize(nextOptions = {}) {
      const nextApi = buildReveal(nextOptions);
      window.Reveal = nextApi;
      const plugins = Array.isArray(nextOptions.plugins) ? nextOptions.plugins : [];
      plugins.forEach((plugin) => {
        if (plugin && typeof plugin.init === 'function') {
          plugin.init(nextApi);
        }
      });
      return Promise.resolve(nextApi);
    };
    return api;
  }

  window.Reveal = buildReveal();
})();`;

const revealCss = `
  html, body {
    margin: 0;
    min-height: 100%;
  }

  .reveal {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .reveal .slides {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .reveal .slides > section,
  .reveal .slides > section > section {
    position: absolute;
    inset: 0;
  }
`;

async function stubManualDeckAssets(page) {
  await page.route('https://unpkg.com/reveal.js@*/dist/reveal.js', async (route) => {
    await route.fulfill({
      contentType: 'text/javascript; charset=utf-8',
      body: revealScript,
    });
  });

  await page.route('https://unpkg.com/reveal.js@*/dist/reveal.css', async (route) => {
    await route.fulfill({
      contentType: 'text/css; charset=utf-8',
      body: revealCss,
    });
  });

  await page.route('https://unpkg.com/reveal.js@*/plugin/notes/notes.js', async (route) => {
    await route.fulfill({
      contentType: 'text/javascript; charset=utf-8',
      body: 'window.RevealNotes = { id: "RevealNotes", init() {} };',
    });
  });

  await page.route('**/chalkboard/chalkboard.js', async (route) => {
    await route.fulfill({
      contentType: 'text/javascript; charset=utf-8',
      body: `
        window.RevealChalkboard = {
          id: 'RevealChalkboard',
          init() {},
          configure() {},
          getData() { return null; }
        };
      `,
    });
  });
}

test.describe('manual regression lab storyboard thumbnails', () => {
  let server;

  test.beforeAll(async () => {
    server = await startStaticServer(rootDir);
  });

  test.afterAll(async () => {
    await server?.close();
  });

  test('renders fixed-size storyboard thumbnails for the manual lab deck', async ({ page }) => {
    await stubManualDeckAssets(page);

    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.waitForFunction(() => {
      const topLevelSlides = document.querySelectorAll('body > .reveal > .slides > section').length;
      return topLevelSlides > 0
        && document.querySelectorAll('#storyboard-track .story-thumb').length === topLevelSlides;
    });

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('reveal-storyboard-set', {
        detail: { open: true },
      }));
    });

    await expect(page.locator('body')).toHaveClass(/storyboard-open/);

    const metrics = await page.evaluate(() => {
      const thumb = document.querySelector('#storyboard-track .story-thumb');
      const preview = thumb?.querySelector('.story-preview');
      const scene = preview?.querySelector('.story-scene');
      const caption = thumb?.querySelector('.story-caption');
      const thumbRect = thumb?.getBoundingClientRect();
      const previewRect = preview?.getBoundingClientRect();
      const storyboardRect = document.getElementById('storyboard')?.getBoundingClientRect();
      const reveal = document.querySelector('body > .reveal');
      const revealTransform = reveal ? getComputedStyle(reveal).transform : '';

      return {
        thumbCount: document.querySelectorAll('#storyboard-track .story-thumb').length,
        topLevelSlides: document.querySelectorAll('body > .reveal > .slides > section').length,
        stackBadgeCount: document.querySelectorAll('#storyboard-track .story-stack-badge').length,
        thumbWidth: thumbRect?.width ?? 0,
        thumbHeight: thumbRect?.height ?? 0,
        previewWidth: previewRect?.width ?? 0,
        previewHeight: previewRect?.height ?? 0,
        previewOverflow: preview ? getComputedStyle(preview).overflow : '',
        sceneTransform: scene ? getComputedStyle(scene).transform : '',
        sceneScaleX: scene ? new DOMMatrixReadOnly(getComputedStyle(scene).transform).a : 0,
        revealTranslateY: revealTransform && revealTransform !== 'none'
          ? new DOMMatrixReadOnly(revealTransform).m42
          : 0,
        captionText: caption?.textContent?.trim() ?? '',
        storyboardHeight: storyboardRect?.height ?? 0,
        openOffsetVar: getComputedStyle(document.documentElement).getPropertyValue('--storyboard-open-offset').trim(),
      };
    });

    expect(metrics.thumbCount).toBe(metrics.topLevelSlides);
    expect(metrics.stackBadgeCount).toBe(4);
    expect(metrics.thumbWidth).toBeGreaterThan(200);
    expect(metrics.thumbWidth).toBeLessThan(225);
    expect(metrics.thumbHeight).toBeGreaterThan(145);
    expect(metrics.thumbHeight).toBeLessThan(160);
    expect(metrics.previewWidth).toBeGreaterThan(185);
    expect(metrics.previewWidth).toBeLessThan(198);
    expect(metrics.previewHeight).toBeGreaterThan(104);
    expect(metrics.previewHeight).toBeLessThan(112);
    expect(metrics.previewOverflow).toBe('hidden');
    expect(metrics.sceneTransform).not.toBe('none');
    expect(metrics.sceneScaleX).toBeGreaterThan(0.11);
    expect(metrics.sceneScaleX).toBeLessThan(0.13);
    expect(metrics.captionText.length).toBeGreaterThan(0);
    expect(metrics.storyboardHeight).toBeGreaterThan(170);
    expect(metrics.openOffsetVar).toBe(`${Math.ceil(metrics.storyboardHeight)}px`);
    expect(Math.abs(metrics.revealTranslateY)).toBeGreaterThanOrEqual(Math.floor(metrics.storyboardHeight));
    expect(Math.abs(metrics.revealTranslateY)).toBeLessThanOrEqual(Math.ceil(metrics.storyboardHeight) + 1);
  });

  test('top stack boundary slide lets the student rewind off slide 5 and return to released fragments', async ({ page }) => {
    await stubManualDeckAssets(page);

    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.RevealIframeSyncAPI.setRole('student');
    });

    await sendCommand(page, 'clearBoundary', {}, 'manual-regression-lab');
    await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

    for (const fragmentIndex of [0, 1]) {
      await sendCommand(page, 'setState', {
        state: { indexh: 4, indexv: 0, indexf: fragmentIndex },
      }, 'manual-regression-lab');

      await page.waitForFunction((targetFragment) => {
        const status = window.RevealIframeSyncAPI.getStatus();
        return status.indices.h === 4
          && status.indices.v === 0
          && status.indices.f === targetFragment
          && status.navigation.canGoForward === false;
      }, fragmentIndex);

      const rewindSteps = fragmentIndex + 2;
      for (let step = 0; step < rewindSteps; step += 1) {
        await page.evaluate(() => {
          window.Reveal.prev();
        });
      }

      await page.waitForFunction(() => {
        const status = window.RevealIframeSyncAPI.getStatus();
        return status.indices.h === 3
          && status.indices.v === 0
          && status.indices.f === -1
          && status.navigation.canGoForward === true;
      });

      const returnSteps = fragmentIndex + 2;
      for (let step = 0; step < returnSteps; step += 1) {
        await page.evaluate(() => {
          window.Reveal.next();
        });
      }

      await page.waitForFunction((targetFragment) => {
        const status = window.RevealIframeSyncAPI.getStatus();
        return status.indices.h === 4
          && status.indices.v === 0
          && status.indices.f === targetFragment
          && status.navigation.canGoForward === false;
      }, fragmentIndex);
    }
  });

  test('lower child in the boundary stack exposes its full fragment rail when synced there', async ({ page }) => {
    await stubManualDeckAssets(page);

    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.RevealIframeSyncAPI.setRole('student');
    });

    await sendCommand(page, 'clearBoundary', {}, 'manual-regression-lab');
    await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

    await sendCommand(page, 'setState', {
      state: { indexh: 4, indexv: 1, indexf: 2 },
    }, 'manual-regression-lab');

    await page.waitForFunction(() => {
      const status = window.RevealIframeSyncAPI.getStatus();
      return status.indices.h === 4
        && status.indices.v === 1
        && status.indices.f === 2;
    });

    const lowerSlideMetrics = await page.evaluate(() => {
      const slide = document.querySelector('.slides > section:nth-of-type(5) > section:nth-of-type(2)');
      const fragments = Array.from(slide?.querySelectorAll('.fragment') || []);
      return {
        fragmentCount: fragments.length,
        visibleCount: fragments.filter((fragment) => fragment.classList.contains('visible')).length,
        labels: fragments.map((fragment) => fragment.textContent?.trim() || ''),
      };
    });

    expect(lowerSlideMetrics.fragmentCount).toBe(3);
    expect(lowerSlideMetrics.visibleCount).toBe(3);
    expect(lowerSlideMetrics.labels).toEqual([
      'Detail A: visible on entry',
      'Detail B: not instructor-gated',
      'Detail C: lower slide stays fully shown',
    ]);
  });

  test('student stays on the lower child when instructor moves down and back up within the boundary stack', async ({ page }) => {
    await stubManualDeckAssets(page);

    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.RevealIframeSyncAPI.setRole('student');
    });

    await sendCommand(page, 'setStudentBoundary', {
      indices: { h: 4, v: 0, f: 0 },
      releaseStartH: 0,
      syncToBoundary: true,
    }, 'manual-regression-lab');

    await sendCommand(page, 'setState', {
      state: { indexh: 4, indexv: 0, indexf: 0 },
    }, 'manual-regression-lab');

    await page.waitForFunction(() => {
      const status = window.RevealIframeSyncAPI.getStatus();
      return status.indices.h === 4
        && status.indices.v === 0
        && status.indices.f === 0;
    });

    await page.evaluate(() => {
      window.Reveal.down();
    });

    await page.waitForFunction(() => {
      const status = window.RevealIframeSyncAPI.getStatus();
      return status.indices.h === 4
        && status.indices.v === 1
        && status.indices.f === 2;
    });

    await sendCommand(page, 'setState', {
      state: { indexh: 4, indexv: 1, indexf: 2 },
    }, 'manual-regression-lab');

    await sendCommand(page, 'setState', {
      state: { indexh: 4, indexv: 0, indexf: 0 },
    }, 'manual-regression-lab');

    await page.waitForFunction(() => {
      const status = window.RevealIframeSyncAPI.getStatus();
      return status.indices.h === 4
        && status.indices.v === 1
        && status.indices.f === 2
        && status.navigation.canGoUp === true
        && status.navigation.canGoForward === false;
    });
  });
});
