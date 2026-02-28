import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/runtime-harness.html');
const fixtureUrl = new URL(`file://${fixturePath}`);

async function configureHarness(page, config) {
  await page.addInitScript((value) => {
    window.__syncHarnessConfig = value;
  }, config);
}

async function sendCommand(page, name, payload = {}) {
  await page.evaluate(
    ({ commandName, commandPayload }) => {
      window.postMessage({
        type: 'reveal-sync',
        action: 'command',
        deckId: 'fixture-deck',
        payload: {
          name: commandName,
          payload: commandPayload,
        },
      }, '*');
    },
    { commandName: name, commandPayload: payload },
  );
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

test('student direct API bypass snaps back to explicit boundary and exact pullback lock', async ({ page }) => {
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
    window.Reveal.slide(3, 0, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });

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
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.maxIndices).toEqual({ h: 1, v: 0, f: -1 });
});

test('same-h fragment pullback exact-locks to the requested fragment and clears on boundary replacement', async ({ page }) => {
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
    window.Reveal.next();
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

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForTimeout(50);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });
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

test('same-h vertical pullback exact-locks to the requested stack child', async ({ page }) => {
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
    window.Reveal.next();
    window.Reveal.next();
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
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.canGoDown).toBe(false);
  expect(status.navigation.canGoForward).toBe(false);

  await page.evaluate(() => {
    window.Reveal.next();
  });

  await page.waitForTimeout(50);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });
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
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 0 && status.indices.f === -1;
  });

  await page.evaluate(() => {
    window.Reveal.next();
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

  await page.waitForTimeout(50);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: 0 });
  expect(status.navigation.canGoBack).toBe(false);

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

  await page.waitForTimeout(50);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.navigation.current).toEqual({ h: 1, v: 1, f: -1 });
  expect(status.navigation.canGoUp).toBe(false);
  expect(status.navigation.canGoBack).toBe(false);
});

test('student keyboard map enables only allowed directions and blocks overview keys', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  let config = await latestDeckConfig(page);
  expect(config.overview).toBe(false);
  expect(config.touch).toBe(false);
  expect(config.keyboard[27]).toBe('null');
  expect(config.keyboard[79]).toBe('null');
  expect(config.keyboard[70]).toBe('null');
  expect(config.keyboard[39]).toBeUndefined();
  expect(config.keyboard[76]).toBeUndefined();
  expect(config.keyboard[34]).toBeUndefined();
  expect(config.keyboard[32]).toBeUndefined();

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  config = await latestDeckConfig(page);
  expect(config.overview).toBe(false);
  expect(config.touch).toBe(true);
  expect(config.keyboard[27]).toBe('null');
  expect(config.keyboard[79]).toBe('null');
  expect(config.keyboard[70]).toBe('null');
  expect(config.keyboard[37]).toBe('left');
  expect(config.keyboard[72]).toBe('left');
  expect(config.keyboard[33]).toBe('prev');
  expect(config.keyboard[34]).toBe('next');
  expect(config.keyboard[32]).toBe('next');
  expect(config.keyboard[40]).toBe('down');
  expect(config.keyboard[39]).toBeUndefined();
  expect(config.keyboard[76]).toBeUndefined();

  await page.evaluate(() => {
    window.Reveal.slide(1, 1, -1);
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.indices.h === 1 && status.indices.v === 1;
  });

  config = await latestDeckConfig(page);
  expect(config.keyboard[38]).toBe('up');
  expect(config.keyboard[37]).toBe('left');
  expect(config.keyboard[39]).toBeUndefined();
});

test('student touch swipe uses fragments within the boundary and blocks horizontal escape', async ({ page }) => {
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

  async function swipeLeft() {
    return page.evaluate(() => {
      const startEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [new Touch({
          identifier: 1,
          target: document.body,
          clientX: 200,
          clientY: 100,
        })],
      });

      const moveEvent = new TouchEvent('touchmove', {
        bubbles: true,
        cancelable: true,
        touches: [new Touch({
          identifier: 1,
          target: document.body,
          clientX: 150,
          clientY: 100,
        })],
      });

      const endEvent = new TouchEvent('touchend', {
        bubbles: true,
        cancelable: true,
        changedTouches: [new Touch({
          identifier: 1,
          target: document.body,
          clientX: 150,
          clientY: 100,
        })],
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

  await page.waitForTimeout(50);

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
