import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import { startStaticServer } from '../support/static-server.mjs';
import { sendCommand } from '../support/iframe-sync-helpers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

async function waitForStudentRole(page) {
  await page.waitForFunction(
    () => window.RevealIframeSyncAPI.getStatus().role === 'student',
    undefined,
    { polling: 50 },
  );
}

async function waitForStudentBoundary(page, h) {
  await page.waitForFunction(
    ({ boundaryH }) => {
      const status = window.RevealIframeSyncAPI.getStatus();
      return status.studentBoundary?.h === boundaryH;
    },
    { boundaryH: h },
    { polling: 50 },
  );
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

  test('storyboard preview is non-interactive and drag mode is enabled', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 700 });
    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('reveal-storyboard-set', {
        detail: { open: true },
      }));
    });

    const track = page.locator('#storyboard-track');
    await expect(track).toBeVisible();
    await expect(page.locator('#storyboard-track .story-preview').first()).toBeVisible();

    const beforeDrag = await page.evaluate(() => {
      const preview = document.querySelector('#storyboard-track .story-preview');
      const trackEl = document.getElementById('storyboard-track');
      return {
        previewPointerEvents: preview ? getComputedStyle(preview).pointerEvents : '',
        draggableClassApplied: !!trackEl?.classList.contains('storyboard-draggable'),
      };
    });

    expect(beforeDrag.previewPointerEvents).toBe('none');
    expect(beforeDrag.draggableClassApplied).toBe(true);
  });

  test('top stack boundary slide lets the student rewind off slide 5 and return to released fragments', async ({ page }) => {
    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.RevealIframeSyncAPI.setRole('student');
    });
    await waitForStudentRole(page);

    await sendCommand(page, 'clearBoundary', {}, 'manual-regression-lab');
    await page.waitForFunction(
      () => window.RevealIframeSyncAPI.getStatus().studentBoundary === null,
      undefined,
      { polling: 50 },
    );

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
      }, fragmentIndex, { polling: 50 });

      const rewindSteps = fragmentIndex + 2;
      for (let step = 0; step < rewindSteps; step += 1) {
        await page.evaluate(() => {
          window.Reveal.prev();
        });
      }

      await page.waitForFunction(() => {
        const status = window.RevealIframeSyncAPI.getStatus();
        return status.navigation.current.h === 3
          && status.navigation.current.v === 0
          && status.navigation.current.f === -1
          && status.navigation.canGoForward === true;
      }, undefined, { polling: 50 });

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
      }, fragmentIndex, { polling: 50 });
    }
  });

  test('lower child in the boundary stack exposes its full fragment rail when synced there', async ({ page }) => {
    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.RevealIframeSyncAPI.setRole('student');
    });
    await waitForStudentRole(page);

    await sendCommand(page, 'clearBoundary', {}, 'manual-regression-lab');
    await page.waitForFunction(
      () => window.RevealIframeSyncAPI.getStatus().studentBoundary === null,
      undefined,
      { polling: 50 },
    );

    await sendCommand(page, 'setState', {
      state: { indexh: 4, indexv: 1, indexf: 2 },
    }, 'manual-regression-lab');

    await page.waitForFunction(
      () => {
        const status = window.RevealIframeSyncAPI.getStatus();
        return status.indices.h === 4
          && status.indices.v === 1
          && status.indices.f === 2;
      },
      undefined,
      { polling: 50 },
    );

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
    await page.goto(`${server.baseUrl}/test/manual-regression-lab.html`);

    await page.evaluate(() => {
      window.RevealIframeSyncAPI.setRole('student');
    });
    await waitForStudentRole(page);

    await sendCommand(page, 'setStudentBoundary', {
      indices: { h: 4, v: 0, f: 0 },
      releaseStartH: 0,
    }, 'manual-regression-lab');
    await waitForStudentBoundary(page, 4);

    await sendCommand(page, 'setState', {
      state: { indexh: 4, indexv: 1, indexf: 2 },
    }, 'manual-regression-lab');

    await page.waitForFunction(() => {
      const status = window.RevealIframeSyncAPI.getStatus();
      return status.indices.h === 4
        && status.indices.v === 1
        && status.indices.f === 2;
    }, undefined, { polling: 50 });

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
    }, undefined, { polling: 50 });
  });

});
