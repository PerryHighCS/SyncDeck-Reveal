import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { expect, test } from '@playwright/test';
import { sendCommand } from '../support/iframe-sync-helpers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/runtime-harness.html');
const fixtureUrl = pathToFileURL(fixturePath);

async function configureHarness(page, config) {
  await page.addInitScript((value) => {
    window.__syncHarnessConfig = value;
  }, config);
}

async function latestDeckConfig(page) {
  return page.evaluate(() => {
    const configs = window.Reveal.__debug.configured;
    return configs[configs.length - 1];
  });
}

test('student pause lock keeps the deck paused, hides storyboard, and blocks local unpause', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
    window.dispatchEvent(new CustomEvent('reveal-storyboard-set', {
      detail: { open: true },
    }));
  });

  await expect(page.locator('body')).toHaveClass(/storyboard-open/);

  await sendCommand(page, 'pause');

  await expect(page.locator('[data-reveal-sync-pause-overlay="true"]')).toBeVisible();
  await expect(page.locator('body')).not.toHaveClass(/storyboard-open/);

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.paused).toBe(true);
  expect(status.role).toBe('student');

  await page.evaluate(() => {
    window.Reveal.togglePause(false);
  });

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().paused === true);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.paused).toBe(true);

  await sendCommand(page, 'resume');

  await expect(page.locator('[data-reveal-sync-pause-overlay="true"]')).toBeHidden();

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.paused).toBe(false);
});

test('student follow-instructor mode auto-captures boundary from synced state after clearBoundary', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 1, indexv: 1, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.studentBoundary?.h === 1;
  });

  const status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.releasedRegion).toEqual({ startH: 1, endH: 1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.maxIndices).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.canGoForward).toBe(false);
  expect(status.navigation.canGoRight).toBe(false);
  expect(status.navigation.canGoDown).toBe(false);
});

test('follow mode with studentCanNavigateForward enabled does not exact-lock the top boundary slide', async ({ page }) => {
  await configureHarness(page, {
    revealOptions: {
      iframeSync: {
        studentCanNavigateForward: true,
      },
    },
  });

  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 1, indexv: 0, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === -1
      && status.navigation.canGoForward === false
      && status.navigation.canGoDown === true;
  });

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoDown === true;
  });
});

test('student follow-instructor mode exact-locks flat boundary slides before and after the first fragment', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1
      && status.navigation.canGoForward === false;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.canGoForward).toBe(false);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: 0 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoForward === false;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 2, v: 0, f: 0 });
  expect(status.navigation.canGoForward).toBe(false);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: 1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1;
  });

  await page.evaluate(() => {
    window.Reveal.prev();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoForward === true;
  });

  await page.evaluate(() => {
    window.Reveal.right();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: 2 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 2
      && status.navigation.canGoForward === false;
  });

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 2;
  });
});

test('student can rewind off a flat boundary slide and return to the instructor revealed fragment', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: 1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });

  await page.evaluate(() => {
    window.Reveal.prev();
    window.Reveal.prev();
    window.Reveal.prev();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.navigation.canGoForward === true;
  });

  await page.evaluate(() => {
    window.Reveal.next();
    window.Reveal.next();
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });
});

test('student keeps local stack position when instructor moves within the same released stack', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 1, indexv: 1, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.studentBoundary?.h === 1;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 1, indexv: 0, indexf: 0 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.studentBoundary?.h === 1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoUp).toBe(true);
  expect(status.navigation.canGoForward).toBe(false);

  await page.evaluate(() => {
    window.Reveal.slide(1, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === -1
      && status.navigation.canGoForward === true
      && status.navigation.canGoDown === true;
  });

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoDown === true;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1;
  });
});

test('student stays on the top child when instructor moves deeper within the same released stack', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 1, indexv: 0, indexf: 0 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.studentBoundary?.h === 1;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 1, indexv: 1, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.studentBoundary?.h === 1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: 0 });
  expect(status.navigation.canGoDown).toBe(true);

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: -1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1;
  });
});

test('student can rewind off an explicit-boundary flat slide and return to the latest instructor fragment', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 2, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1;
  });

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: 1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });

  await page.evaluate(() => {
    window.Reveal.prev();
    window.Reveal.prev();
    window.Reveal.prev();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.navigation.canGoForward === true;
  });

  await page.evaluate(() => {
    window.Reveal.next();
    window.Reveal.next();
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });
});

test('student direct API bypass snaps back to explicit boundary and exact pullback lock', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === 0;
  });

  await page.evaluate(() => {
    window.Reveal.slide(3, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === 0;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: 0 });

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.indices.f === -1;
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: false,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.indices.f === -1;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.maxIndices).toEqual({ h: 1, v: 0, f: -1 });
});

test('same-h top-slide fragment pullback exact-locks fragments and clears on boundary replacement', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === 0;
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: false,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.canGoForward).toBe(false);
  expect(status.navigation.canGoDown).toBe(true);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.navigation.canGoForward === false;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoForward).toBe(false);

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 2, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: false,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.studentBoundary?.h === 2
      && status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === 0;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: 0 });
  expect(status.navigation.maxIndices).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.canGoForward).toBe(true);
});

test('explicit boundary exact-locks a flat slide to the instructor fragment position', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 2, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2 && status.indices.v === 0 && status.indices.f === -1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.maxIndices).toEqual({ h: 2, v: 0, f: -1 });
  expect(status.navigation.canGoForward).toBe(false);
  expect(status.navigation.canGoRight).toBe(false);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1
      && status.navigation.canGoForward === false;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 2, v: 0, f: -1 });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 2, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2 && status.indices.v === 0 && status.indices.f === 0;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 2, v: 0, f: 0 });
  expect(status.navigation.canGoForward).toBe(false);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoForward === false;
  });
});

test('same-h boundary reset leaves released stack children locally navigable', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.indices.f === -1;
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: false,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.indices.f === -1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoDown).toBe(false);
  expect(status.navigation.canGoForward).toBe(false);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.navigation.canGoDown === false
      && status.navigation.canGoForward === false;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoDown).toBe(false);
  expect(status.navigation.canGoForward).toBe(false);
});

test('no-back mode treats the boundary as both min and max and snaps back to the last allowed position', async ({ page }) => {
  await configureHarness(page, {
    revealOptions: {
      iframeSync: {
        studentCanNavigateBack: false,
      },
    },
  });

  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().indices.h === 1);

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.capabilities.canNavigateBack).toBe(false);
  expect(status.navigation.minIndices).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.maxIndices).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.canGoLeft).toBe(false);
  expect(status.navigation.canGoBack).toBe(false);
  expect(status.navigation.canGoDown).toBe(true);

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const next = window.RevealIframeSyncAPI.getStatus();
    return next.indices.h === 1 && next.indices.v === 1;
  });

  await page.evaluate(() => {
    window.Reveal.slide(0, 0, -1);
  });

  await page.waitForFunction(() => {
    const next = window.RevealIframeSyncAPI.getStatus();
    return next.indices.h === 1 && next.indices.v === 1;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.minIndices).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.canGoUp).toBe(false);
  expect(status.navigation.canGoLeft).toBe(false);
});

test('no-back mode blocks same-h fragment rewind and vertical up from the last allowed position', async ({ page }) => {
  await configureHarness(page, {
    revealOptions: {
      iframeSync: {
        studentCanNavigateBack: false,
      },
    },
  });

  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === 0;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: 0 });
  expect(status.navigation.canGoBack).toBe(false);
  expect(status.navigation.canGoUp).toBe(false);

  await page.evaluate(() => {
    window.Reveal.prev();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoBack === false;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: 0 });
  expect(status.navigation.canGoBack).toBe(false);
  expect(status.navigation.canGoLeft).toBe(false);

  await page.keyboard.press('ArrowLeft');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoLeft === false
      && status.navigation.canGoBack === false;
  });

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1 && status.indices.f === -1;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoUp).toBe(false);
  expect(status.navigation.canGoBack).toBe(false);

  await page.evaluate(() => {
    window.Reveal.prev();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1
      && status.navigation.canGoUp === false
      && status.navigation.canGoBack === false;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoUp).toBe(false);
  expect(status.navigation.canGoBack).toBe(false);
});

test('student keyboard handling enables only allowed directions and blocks overview keys', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  let config = await latestDeckConfig(page);
  expect(config.overview).toBe(false);
  expect(config.touch).toBe(false);
  expect(config.keyboard).toBe(false);

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  config = await latestDeckConfig(page);
  expect(config.overview).toBe(false);
  expect(config.touch).toBe(true);
  expect(config.keyboard).toBe(false);

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1;
  });

  config = await latestDeckConfig(page);
  expect(config.keyboard).toBe(false);
});

test('right-arrow semantics fall back to next on fragment-only forward locks', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'clearBoundary');

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  await sendCommand(page, 'setState', {
    state: { indexh: 2, indexv: 0, indexf: 1 },
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false
      && status.navigation.canGoRight === false;
  });

  await page.evaluate(() => {
    window.Reveal.left();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoForward === true
      && status.navigation.canGoRight === false;
  });

  let config = await latestDeckConfig(page);
  expect(config.keyboard).toBe(false);
  await expect(page.locator('.reveal .controls .navigate-right')).toHaveAttribute('aria-disabled', 'false');

  await page.keyboard.press('ArrowRight');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === 1
      && status.navigation.canGoForward === false;
  });

  config = await latestDeckConfig(page);
  expect(config.keyboard).toBe(false);
});

test('right-arrow does not stand in for down when only stack descent is available', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoDown === true
      && status.navigation.canGoRight === false;
  });

  let config = await latestDeckConfig(page);
  expect(config.keyboard).toBe(false);
  await expect(page.locator('.reveal .controls .navigate-right')).toHaveAttribute('aria-disabled', 'true');

  await page.evaluate(() => {
    window.Reveal.right();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.keyboard.press('ArrowRight');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.locator('.reveal .controls .navigate-right').click({ force: true });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.evaluate(() => {
    window.Reveal.down();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  config = await latestDeckConfig(page);
  expect(config.keyboard).toBe(false);
});

test('instructor right-arrow and right control reveal fragments before horizontal moves and never descend a vertical stack', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
    window.Reveal.slide(1, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === -1;
  });

  await page.keyboard.press('ArrowRight');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.keyboard.press('ArrowRight');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === -1;
  });

  await page.locator('.reveal .controls .navigate-right').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.locator('.reveal .controls .navigate-right').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 2
      && status.indices.v === 0
      && status.indices.f === -1;
  });
});

test('up/down navigation stays vertical and does not consume fragments', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoDown === true;
  });

  await page.evaluate(() => {
    window.Reveal.down();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.up();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });
});

test('up/down control buttons stay vertical and do not consume fragments', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0
      && status.navigation.canGoDown === true;
  });

  await page.locator('.reveal .controls .navigate-down').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  await page.locator('.reveal .controls .navigate-up').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });
});

test('instructor up/down keys and controls stay vertical and do not consume fragments', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
    window.Reveal.slide(1, 0, 0);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.keyboard.press('ArrowDown');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  await page.keyboard.press('ArrowUp');

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 0, 0);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.locator('.reveal .controls .navigate-down').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  await page.locator('.reveal .controls .navigate-up').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });
});

test('descending from a fragmented top stack slide suppresses unrevealed future fragments until return', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
    window.Reveal.slide(1, 0, 0);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  await page.evaluate(() => {
    window.Reveal.down();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  await page.evaluate(() => {
    const topSlide = document.querySelector('.reveal .slides > section:nth-of-type(2) > section:nth-of-type(1)');
    const extra = document.createElement('p');
    extra.className = 'fragment';
    extra.textContent = 'Hidden future fragment';
    topSlide.appendChild(extra);
    window.Reveal.slide(1, 0, 0);
    window.Reveal.down();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 1
      && status.indices.f === -1;
  });

  let suppressed = await page.evaluate(() => {
    const topSlide = document.querySelector('.reveal .slides > section:nth-of-type(2) > section:nth-of-type(1)');
    return Array.from(topSlide.querySelectorAll('.fragment')).map((fragment) => fragment.classList.contains('syncdeck-suppressed-future'));
  });
  expect(suppressed).toEqual([false, true]);

  await page.evaluate(() => {
    window.Reveal.up();
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  suppressed = await page.evaluate(() => {
    const topSlide = document.querySelector('.reveal .slides > section:nth-of-type(2) > section:nth-of-type(1)');
    return Array.from(topSlide.querySelectorAll('.fragment')).map((fragment) => fragment.classList.contains('syncdeck-suppressed-future'));
  });
  expect(suppressed).toEqual([false, false]);
});

test('student touch swipe uses top-slide fragments within the boundary and blocks horizontal escape', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: 0 },
    releaseStartH: 0,
    syncToBoundary: false,
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  async function swipeLeft() {
    return page.evaluate(() => {
      function touchPoint(clientX, clientY) {
        return {
          identifier: 1,
          target: document.body,
          clientX,
          clientY,
        };
      }

      function createTouchLikeEvent(type, { touches = [], changedTouches = [] } = {}) {
        const event = new Event(type, {
          bubbles: true,
          cancelable: true,
        });

        Object.defineProperties(event, {
          touches: { configurable: true, value: touches },
          changedTouches: { configurable: true, value: changedTouches },
        });

        return event;
      }

      const startEvent = createTouchLikeEvent('touchstart', {
        touches: [touchPoint(200, 100)],
      });

      const moveEvent = createTouchLikeEvent('touchmove', {
        touches: [touchPoint(150, 100)],
      });

      const endEvent = createTouchLikeEvent('touchend', {
        changedTouches: [touchPoint(150, 100)],
      });

      window.dispatchEvent(startEvent);
      const prevented = !window.dispatchEvent(moveEvent);
      window.dispatchEvent(endEvent);
      return {
        prevented,
        moveDefaultPrevented: moveEvent.defaultPrevented,
      };
    });
  }

  let swipe = await swipeLeft();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === 0;
  });

  expect(swipe.prevented).toBe(true);
  expect(swipe.moveDefaultPrevented).toBe(true);

  swipe = await swipeLeft();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1
      && status.indices.v === 0
      && status.indices.f === 0;
  });

  const status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.indices).toEqual({ h: 1, v: 0, f: 0 });
  expect(swipe.prevented).toBe(true);
  expect(swipe.moveDefaultPrevented).toBe(true);
});

test('chalkboard commands are routed to the chalkboard API and student role enables read-only mode', async ({ page }) => {
  await configureHarness(page, {
    chalkboardMock: true,
  });

  await page.addInitScript(() => {
    if (!window.__syncHarnessConfig?.chalkboardMock) return;
    const calls = [];
    window.__chalkboardCalls = calls;
    window.RevealChalkboard = {
      configure(...args) {
        calls.push({ method: 'configure', args });
      },
      toggleChalkboard(...args) {
        calls.push({ method: 'toggleChalkboard', args });
      },
      toggleNotesCanvas(...args) {
        calls.push({ method: 'toggleNotesCanvas', args });
      },
      clear(...args) {
        calls.push({ method: 'clear', args });
      },
      reset(...args) {
        calls.push({ method: 'reset', args });
      },
      replayStroke(...args) {
        calls.push({ method: 'replayStroke', args });
      },
      loadState(...args) {
        calls.push({ method: 'loadState', args });
      },
      getData() {
        calls.push({ method: 'getData', args: [] });
        return { board: 'snapshot' };
      },
    };
  });

  await page.goto(fixtureUrl.toString());

  await sendCommand(page, 'setRole', { role: 'student' });

  await sendCommand(page, 'toggleChalkboard');
  await sendCommand(page, 'toggleNotesCanvas');
  await sendCommand(page, 'clearChalkboard');
  await sendCommand(page, 'resetChalkboard');
  await sendCommand(page, 'chalkboardStroke', {
    mode: 1,
    slide: { h: 1, v: 0, f: -1 },
    event: { type: 'draw', x1: 10, y1: 12, x2: 18, y2: 20, color: 0, board: 0, time: 42 },
  });
  await sendCommand(page, 'chalkboardState', {
    storage: { board: 'restored' },
  });

  const calls = await page.evaluate(() => window.__chalkboardCalls);
  expect(calls).toEqual([
    { method: 'configure', args: [{ readOnly: true }] },
    { method: 'toggleChalkboard', args: [] },
    { method: 'toggleNotesCanvas', args: [] },
    { method: 'clear', args: [] },
    { method: 'reset', args: [] },
    {
      method: 'replayStroke',
      args: [
        1,
        { h: 1, v: 0, f: -1 },
        { type: 'draw', x1: 10, y1: 12, x2: 18, y2: 20, color: 0, board: 0, time: 42 },
      ],
    },
    { method: 'loadState', args: [{ board: 'restored' }] },
  ]);
});
