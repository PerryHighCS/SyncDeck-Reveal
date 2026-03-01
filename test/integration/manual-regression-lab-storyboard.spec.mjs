import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import { startStaticServer } from '../support/static-server.mjs';

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

test.describe('manual regression lab storyboard thumbnails', () => {
  let server;

  test.beforeAll(async () => {
    server = await startStaticServer(rootDir);
  });

  test.afterAll(async () => {
    await server?.close();
  });

  test('renders fixed-size storyboard thumbnails for the manual lab deck', async ({ page }) => {
    await page.route('https://unpkg.com/reveal.js@5.1.0/dist/reveal.js', async (route) => {
      await route.fulfill({
        contentType: 'text/javascript; charset=utf-8',
        body: revealScript,
      });
    });

    await page.route('https://unpkg.com/reveal.js@5.1.0/dist/reveal.css', async (route) => {
      await route.fulfill({
        contentType: 'text/css; charset=utf-8',
        body: revealCss,
      });
    });

    await page.route('https://unpkg.com/reveal.js@5.1.0/plugin/notes/notes.js', async (route) => {
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
        captionText: caption?.textContent?.trim() ?? '',
        storyboardHeight: storyboardRect?.height ?? 0,
      };
    });

    expect(metrics.thumbCount).toBe(metrics.topLevelSlides);
    expect(metrics.stackBadgeCount).toBe(2);
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
    expect(metrics.captionText.length).toBeGreaterThan(0);
    expect(metrics.storyboardHeight).toBeGreaterThan(170);
  });
});
