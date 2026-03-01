import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/runtime-harness.html');
const fixtureUrl = pathToFileURL(fixturePath);

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

test('student explicit boundary updates status, navigation, and released storyboard region', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.role === 'student'
      && document.querySelectorAll('#storyboard-track .story-thumb-wrap').length === 1
      && document.querySelectorAll('#storyboard-track .story-thumb-locked').length === 1;
  });

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('student');
  expect(status.studentBoundary).toEqual({ h: 0, v: 0, f: -1 });
  expect(status.releasedRegion).toBeNull();
  expect(status.navigation.maxIndices).toEqual({ h: 0, v: 0, f: -1 });
  expect(status.navigation.canGoRight).toBe(false);
  expect(status.navigation.canGoForward).toBe(false);

  await sendCommand(page, 'setStudentBoundary', {
    indices: { h: 1, v: 0, f: -1 },
    releaseStartH: 0,
    syncToBoundary: true,
  });

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    const wraps = Array.from(document.querySelectorAll('#storyboard-track .story-thumb-wrap'));
    const locked = document.querySelectorAll('#storyboard-track .story-thumb-locked').length;
    return status.studentBoundary?.h === 1
      && status.indices.h === 1
      && wraps.length === 2
      && locked === 1
      && wraps[0]?.classList.contains('story-thumb-released')
      && wraps[0]?.classList.contains('story-thumb-release-start')
      && wraps[1]?.classList.contains('story-thumb-boundary')
      && wraps[1]?.classList.contains('story-thumb-released')
      && wraps[1]?.classList.contains('story-thumb-release-end');
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.releasedRegion).toEqual({ startH: 0, endH: 1 });
  expect(status.navigation.current).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.maxIndices).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.navigation.canGoRight).toBe(false);
  expect(status.navigation.canGoForward).toBe(true);
  expect(status.navigation.canGoDown).toBe(true);

  const storyboardState = await page.evaluate(() => Array.from(document.querySelectorAll('#storyboard-track .story-thumb-wrap')).map((wrap) => ({
    slide: wrap.getAttribute('data-slide'),
    className: wrap.className,
  })));
  expect(storyboardState).toEqual([
    expect.objectContaining({
      slide: '0',
      className: expect.stringContaining('story-thumb-released'),
    }),
    expect.objectContaining({
      slide: '1',
      className: expect.stringContaining('story-thumb-boundary'),
    }),
  ]);
  expect(storyboardState[0].className).toContain('story-thumb-release-start');
  expect(storyboardState[1].className).toContain('story-thumb-released');
  expect(storyboardState[1].className).toContain('story-thumb-release-end');
});

test('standalone and instructor roles do not show a phantom boundary marker', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('standalone');
  expect(status.studentBoundary).toBeNull();
  expect(status.releasedRegion).toBeNull();

  await expect(page.locator('#storyboard-track .story-thumb-boundary')).toHaveCount(0);
  await expect(page.locator('#storyboard-track .story-thumb-locked')).toHaveCount(0);

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
  });

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('instructor');
  expect(status.studentBoundary).toBeNull();
  expect(status.releasedRegion).toBeNull();
  expect(status.boundaryIsLocal).toBe(false);

  await expect(page.locator('#storyboard-track .story-thumb-boundary')).toHaveCount(0);
  await expect(page.locator('#storyboard-track .story-thumb-locked')).toHaveCount(0);
  await expect(page.locator('#storyboard-track .story-boundary-btn')).toHaveCount(4);
});

test('instructor storyboard boundary announcements do not duplicate on rerender', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
    const liveRegion = document.querySelector('[role="status"]');
    window.__liveRegionMutations = [];
    const observer = new MutationObserver(() => {
      window.__liveRegionMutations.push(liveRegion?.textContent || '');
    });
    observer.observe(liveRegion, { childList: true, characterData: true, subtree: true });
    window.__liveRegionObserver = observer;
  });

  await expect(page.locator('#storyboard-track .story-boundary-btn')).toHaveCount(4);

  await page.locator('#storyboard-track .story-thumb-wrap').nth(1).locator('.story-boundary-btn').click();

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary?.h === 1);

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('instructor');
  expect(status.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  expect(status.releasedRegion).toEqual({ startH: 0, endH: 1 });
  expect(status.boundaryIsLocal).toBe(true);

  let announcements = await page.evaluate(() => window.__liveRegionMutations.slice());
  expect(announcements).toEqual(['Student boundary set to slide 2']);

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('reveal-iframesync-status'));
  });

  announcements = await page.evaluate(() => window.__liveRegionMutations.slice());
  expect(announcements).toEqual(['Student boundary set to slide 2']);

  await page.locator('#storyboard-track .story-thumb-wrap').nth(1).locator('.story-boundary-btn').click();

  await page.waitForFunction(() => window.RevealIframeSyncAPI.getStatus().studentBoundary === null);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.studentBoundary).toBeNull();
  expect(status.releasedRegion).toBeNull();
  expect(status.boundaryIsLocal).toBe(false);

  announcements = await page.evaluate(() => window.__liveRegionMutations.slice());
  expect(announcements).toEqual([
    'Student boundary set to slide 2',
    'Student boundary cleared',
  ]);
});

test('storyboard refreshes boundary controls correctly across role changes', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await expect(page.locator('#storyboard-track .story-boundary-btn')).toHaveCount(0);

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
  });

  await expect(page.locator('#storyboard-track .story-boundary-btn')).toHaveCount(4);

  await page.locator('#storyboard-track .story-thumb-wrap').nth(2).locator('.story-boundary-btn').click();

  await page.waitForFunction(() => {
    const status = window.RevealIframeSyncAPI.getStatus();
    return status.role === 'instructor' && status.studentBoundary?.h === 2;
  });

  await expect(page.locator('#storyboard-track .story-thumb-boundary')).toHaveCount(1);
  await expect(page.locator('#storyboard-track .story-thumb-wrap').nth(2)).toHaveClass(/story-thumb-boundary/);

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('student');
  });

  await expect(page.locator('#storyboard-track .story-boundary-btn')).toHaveCount(0);
  await expect(page.locator('#storyboard-track .story-thumb-boundary')).toHaveCount(1);

  let status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('student');
  expect(status.studentBoundary).toEqual({ h: 0, v: 0, f: -1 });

  await page.evaluate(() => {
    window.RevealIframeSyncAPI.setRole('instructor');
  });

  await expect(page.locator('#storyboard-track .story-boundary-btn')).toHaveCount(4);
  await expect(page.locator('#storyboard-track .story-thumb-boundary')).toHaveCount(0);

  status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('instructor');
  expect(status.studentBoundary).toBeNull();
});
