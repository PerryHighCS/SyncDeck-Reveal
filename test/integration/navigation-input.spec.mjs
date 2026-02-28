import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/runtime-harness.html');
const fixtureUrl = new URL(`file://${fixturePath}`);

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
