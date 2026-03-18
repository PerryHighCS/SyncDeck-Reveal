import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import { startStaticServer } from '../support/static-server.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

test.describe('iframe host relay behavior', () => {
  let server;

  test.beforeAll(async () => {
    server = await startStaticServer(rootDir);
  });

  test.afterAll(async () => {
    await server?.close();
  });

  async function gotoHost(page) {
    await page.goto(`${server.baseUrl}/test/fixtures/iframe-host.html`);
    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      return typeof frame?.contentWindow?.RevealIframeSyncAPI?.getStatus === 'function';
    });
  }

  async function hostMessages(page) {
    return page.evaluate(() => window.__hostHarness.getMessages());
  }

  async function clearHostMessages(page) {
    await page.evaluate(() => window.__hostHarness.clearMessages());
  }

  function findMessage(messages, action) {
    return messages.find((entry) => entry.data?.action === action);
  }

  async function postCommand(page, name, payload = {}) {
    await page.evaluate(
      ({ commandName, commandPayload }) => {
        window.__hostHarness.postCommand(commandName, commandPayload);
      },
      { commandName: name, commandPayload: payload },
    );
  }

  test('host receives role and storyboard state messages from the iframe', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);

    await postCommand(page, 'setRole', { role: 'student' });

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'roleChanged')
        && messages.some((entry) => entry.data?.action === 'ready');
    });

    let messages = await hostMessages(page);
    const roleChanged = findMessage(messages, 'roleChanged');
    const ready = findMessage(messages, 'ready');
    expect(roleChanged.data.role).toBe('student');
    expect(roleChanged.data.payload).toEqual({ role: 'student' });
    expect(ready.data.payload.role).toBe('student');
    expect(ready.data.payload.reason).toBe('roleChanged');

    await clearHostMessages(page);

    await postCommand(page, 'showOverview');

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.payload?.reason === 'storyboardChanged'));

    messages = await hostMessages(page);
    const state = findMessage(messages, 'state');
    expect(state.data.role).toBe('student');
    expect(state.data.payload.reason).toBe('storyboardChanged');
    expect(state.data.payload.overview).toBe(true);
  });

  test('host requestState receives full iframe status payload', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);

    await postCommand(page, 'setRole', { role: 'student' });
    await postCommand(page, 'setStudentBoundary', {
      indices: { h: 1, v: 0, f: -1 },
      releaseStartH: 0,
    });
    await postCommand(page, 'setState', {
      state: { indexh: 1, indexv: 0, indexf: -1 },
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      return frame?.contentWindow?.RevealIframeSyncAPI?.getStatus()?.indices?.h === 1;
    });

    await clearHostMessages(page);
    await page.evaluate(() => window.__hostHarness.requestState());

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.payload?.reason === 'requestState'));

    const messages = await hostMessages(page);
    const response = findMessage(messages, 'state');
    expect(response.data.role).toBe('student');
    expect(response.data.payload.reason).toBe('requestState');
    expect(response.data.payload.indices).toEqual({ h: 1, v: 0, f: -1 });
    expect(response.data.payload.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
    expect(response.data.payload.releasedRegion).toEqual({ startH: 0, endH: 1 });
  });

  test('host receives activityRequest for an activity-anchored flat slide', async ({ page }) => {
    await gotoHost(page);

    await postCommand(page, 'setRole', { role: 'instructor' });
    await clearHostMessages(page);

    await postCommand(page, 'slide', { h: 2, v: 0, f: 0 });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'activityRequest'));

    const messages = await hostMessages(page);
    const activityRequest = findMessage(messages, 'activityRequest');
    expect(activityRequest?.data?.role).toBe('instructor');
    expect(activityRequest?.data?.payload).toEqual({
      activityId: 'quiz-check',
      indices: { h: 2, v: 0, f: 0 },
      instanceKey: 'quiz-check:2:0',
      activityOptions: { attempt: 'warmup' },
      trigger: 'slide-enter',
    });
  });

  test('host receives stack activityRequest payloads for vertical activity slides', async ({ page }) => {
    await gotoHost(page);

    await postCommand(page, 'setRole', { role: 'instructor' });
    await clearHostMessages(page);

    await postCommand(page, 'slide', { h: 1, v: 0, f: -1 });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'activityRequest'));

    const messages = await hostMessages(page);
    const activityRequest = findMessage(messages, 'activityRequest');
    expect(activityRequest?.data?.payload).toEqual({
      activityId: 'video-sync',
      indices: { h: 1, v: 0, f: -1 },
      instanceKey: 'video-sync:1:0',
      activityOptions: { mode: 'conversion-smoke' },
      trigger: 'slide-enter',
      stackRequests: [
        {
          activityId: 'raffle',
          indices: { h: 1, v: 1, f: -1 },
          instanceKey: 'raffle:1:1',
          activityOptions: { cohort: 'b' },
          trigger: 'slide-enter',
        },
      ],
    });
  });

  test('syncToInstructor snaps student to supplied state and restores follow-instructor mode', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);

    await postCommand(page, 'setRole', { role: 'student' });
    await postCommand(page, 'setStudentBoundary', {
      indices: { h: 2, v: 0, f: -1 },
      releaseStartH: 0,
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.studentBoundary?.h === 2
        && status?.indices?.h === 0;
    });

    await clearHostMessages(page);
    await postCommand(page, 'syncToInstructor', {
      state: { indexh: 1, indexv: 0, indexf: -1 },
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.indices?.h === 1
        && status?.indices?.v === 0
        && status?.indices?.f === -1
        && status?.studentBoundary?.h === 1
        && status?.releasedRegion?.startH === 1
        && status?.releasedRegion?.endH === 1;
    });

    const frameStatus = await page.evaluate(() => {
      const frame = document.getElementById('deck-frame');
      return frame.contentWindow.RevealIframeSyncAPI.getStatus();
    });
    expect(frameStatus.indices).toEqual({ h: 1, v: 0, f: -1 });
    expect(frameStatus.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
    expect(frameStatus.releasedRegion).toEqual({ startH: 1, endH: 1 });

    let messages = await hostMessages(page);
    expect(messages.some((entry) => entry.data?.action === 'studentBoundaryChanged')).toBe(false);

    await clearHostMessages(page);
    await page.evaluate(() => window.__hostHarness.requestState());

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.payload?.reason === 'requestState'));

    messages = await hostMessages(page);
    const requestedState = findMessage(messages, 'state');
    expect(requestedState?.data?.payload?.indices).toEqual({ h: 1, v: 0, f: -1 });
    expect(requestedState?.data?.payload?.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  });

  test('syncToInstructor snaps exactly to the supplied instructor stack position', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'student' });
    await postCommand(page, 'setStudentBoundary', {
      indices: { h: 1, v: 0, f: 0 },
      releaseStartH: 0,
    });

    await postCommand(page, 'setState', {
      state: { indexh: 1, indexv: 1, indexf: -1 },
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.indices?.h === 1
        && status?.indices?.v === 1
        && status?.studentBoundary?.h === 1;
    });

    await postCommand(page, 'syncToInstructor', {
      state: { indexh: 1, indexv: 0, indexf: 0 },
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.indices?.h === 1
        && status?.indices?.v === 0
        && status?.indices?.f === 0
        && status?.studentBoundary?.h === 1;
    });

    const frameStatus = await page.evaluate(() => {
      const frame = document.getElementById('deck-frame');
      return frame.contentWindow.RevealIframeSyncAPI.getStatus();
    });
    expect(frameStatus.indices).toEqual({ h: 1, v: 0, f: 0 });
    expect(frameStatus.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
  });

  test('syncToInstructor restores continuing follow-instructor navigation after the snap', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'student' });
    await postCommand(page, 'setStudentBoundary', {
      indices: { h: 2, v: 0, f: -1 },
      releaseStartH: 0,
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.studentBoundary?.h === 2
        && status?.indices?.h === 0;
    });

    await postCommand(page, 'syncToInstructor', {
      state: { indexh: 0, indexv: 0, indexf: -1 },
    });

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.indices?.h === 0
        && status?.studentBoundary?.h === 0;
    });

    await postCommand(page, 'next');

    await page.waitForFunction(() => {
      const frame = document.getElementById('deck-frame');
      const status = frame?.contentWindow?.RevealIframeSyncAPI?.getStatus?.();
      return status?.indices?.h === 1
        && status?.indices?.v === 0
        && status?.indices?.f === -1
        && status?.studentBoundary?.h === 1;
    });

    const frameStatus = await page.evaluate(() => {
      const frame = document.getElementById('deck-frame');
      return frame.contentWindow.RevealIframeSyncAPI.getStatus();
    });
    expect(frameStatus.indices).toEqual({ h: 1, v: 0, f: -1 });
    expect(frameStatus.studentBoundary).toEqual({ h: 1, v: 0, f: -1 });
    expect(frameStatus.releasedRegion).toEqual({ startH: 1, endH: 1 });
  });

  test('host receives instructor boundary changes from storyboard actions', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'instructor' });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'ready'));

    await clearHostMessages(page);

    await page.frameLocator('#deck-frame').locator('#storyboard-track .story-thumb-wrap').nth(2).locator('.story-boundary-btn').click();

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'studentBoundaryChanged');
    });

    let messages = await hostMessages(page);
    let boundaryChanged = findMessage(messages, 'studentBoundaryChanged');
    expect(boundaryChanged.data.role).toBe('instructor');
    expect(boundaryChanged.data.payload).toEqual({
      reason: 'instructorSet',
      studentBoundary: { h: 2, v: 0, f: -1 },
    });

    await clearHostMessages(page);

    await page.frameLocator('#deck-frame').locator('#storyboard-track .story-thumb-wrap').nth(2).locator('.story-boundary-btn').click();

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'studentBoundaryChanged');
    });

    messages = await hostMessages(page);
    boundaryChanged = findMessage(messages, 'studentBoundaryChanged');
    expect(boundaryChanged.data.role).toBe('instructor');
    expect(boundaryChanged.data.payload).toEqual({
      reason: 'instructorCleared',
      studentBoundary: null,
    });
  });

  test('host receives pong, warning, and storyboard state when setState carries overview', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'student' });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'ready'));

    await clearHostMessages(page);
    await postCommand(page, 'ping');
    await postCommand(page, 'notARealCommand');
    await postCommand(page, 'setState', {
      state: { indexh: 1, indexv: 1, indexf: -1, overview: true },
    });

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'pong')
        && messages.some((entry) => entry.data?.action === 'warn')
        && messages.some((entry) => entry.data?.action === 'state' && entry.data?.payload?.reason === 'storyboardChanged');
    });

    const messages = await hostMessages(page);
    const pong = findMessage(messages, 'pong');
    const warn = findMessage(messages, 'warn');
    const storyboardState = messages.find((entry) => entry.data?.action === 'state' && entry.data?.payload?.reason === 'storyboardChanged');

    expect(pong.data.payload).toEqual({ ok: true });
    expect(warn.data.payload).toEqual({ message: 'Unknown command: notARealCommand' });
    expect(storyboardState.data.payload.overview).toBe(true);
    expect(storyboardState.data.payload.indices).toEqual({ h: 1, v: 1, f: -1 });
  });

  test('host receives paused and resumed state from instructor local actions', async ({ page }) => {
    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'instructor' });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'ready'));

    await clearHostMessages(page);

    await page.frameLocator('#deck-frame').locator('body').evaluate(() => {
      window.Reveal.togglePause(true);
    });

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'state' && entry.data?.payload?.paused === true);
    });

    let messages = await hostMessages(page);
    let pausedState = messages.find((entry) => entry.data?.action === 'state' && entry.data?.payload?.paused === true);
    expect(pausedState.data.role).toBe('instructor');
    expect(pausedState.data.payload.reason).toBe('stateChanged');
    expect(pausedState.data.payload.paused).toBe(true);

    await clearHostMessages(page);

    await page.frameLocator('#deck-frame').locator('body').evaluate(() => {
      window.Reveal.togglePause(false);
    });

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'state' && entry.data?.payload?.paused === false);
    });

    messages = await hostMessages(page);
    const resumedState = messages.find((entry) => entry.data?.action === 'state' && entry.data?.payload?.paused === false);
    expect(resumedState.data.role).toBe('instructor');
    expect(resumedState.data.payload.reason).toBe('stateChanged');
    expect(resumedState.data.payload.paused).toBe(false);
  });

  test('host receives chalkboard sync events from instructor iframe', async ({ page }) => {
    await page.addInitScript(() => {
      const chalkboardCalls = [];
      window.__chalkboardCalls = chalkboardCalls;
      window.RevealChalkboard = {
        getData() {
          chalkboardCalls.push({ method: 'getData' });
          return { board: 'snapshot' };
        },
      };
    });

    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'instructor' });

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'chalkboardState');
    });

    let messages = await hostMessages(page);
    const initialState = findMessage(messages, 'chalkboardState');
    expect(initialState.data.payload.storage).toEqual({ board: 'snapshot' });

    await clearHostMessages(page);

    await page.frameLocator('#deck-frame').locator('body').evaluate(() => {
      const event = new CustomEvent('broadcast');
      event.content = {
        sender: 'chalkboard-plugin',
        type: 'draw',
        mode: 1,
        board: 0,
        fromX: 10,
        fromY: 12,
        toX: 18,
        toY: 20,
        color: 2,
        timestamp: 88,
      };
      document.dispatchEvent(event);
    });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'chalkboardStroke'));

    messages = await hostMessages(page);
    const stroke = findMessage(messages, 'chalkboardStroke');
    expect(stroke.data.payload).toEqual({
      mode: 1,
      slide: { h: 0, v: 0, f: -1 },
      event: { type: 'draw', x1: 10, y1: 12, x2: 18, y2: 20, color: 2, board: 0, time: 88 },
    });

    await clearHostMessages(page);
    await postCommand(page, 'requestChalkboardState');

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'chalkboardState'));

    messages = await hostMessages(page);
    const requestedState = findMessage(messages, 'chalkboardState');
    expect(requestedState.data.payload.storage).toEqual({ board: 'snapshot' });
  });

  test('host receives chalkboard erase strokes and slide-change snapshots from instructor iframe', async ({ page }) => {
    await page.addInitScript(() => {
      const snapshots = [{ board: 'initial' }, { board: 'after-slide-change' }];
      window.RevealChalkboard = {
        getData() {
          return snapshots.shift() || { board: 'exhausted' };
        },
      };
    });

    await gotoHost(page);

    await clearHostMessages(page);
    await postCommand(page, 'setRole', { role: 'instructor' });

    await page.waitForFunction(() => window.__hostHarness.getMessages().some((entry) => entry.data?.action === 'chalkboardState'));

    await clearHostMessages(page);

    await page.frameLocator('#deck-frame').locator('body').evaluate(() => {
      const eraseEvent = new CustomEvent('broadcast');
      eraseEvent.content = {
        sender: 'chalkboard-plugin',
        type: 'erase',
        mode: 2,
        board: 1,
        x: 55,
        y: 89,
        timestamp: 144,
      };
      document.dispatchEvent(eraseEvent);
      window.Reveal.next();
    });

    await page.waitForFunction(() => {
      const messages = window.__hostHarness.getMessages();
      return messages.some((entry) => entry.data?.action === 'chalkboardStroke')
        && messages.some((entry) => entry.data?.action === 'chalkboardState');
    });

    const messages = await hostMessages(page);
    const eraseStroke = findMessage(messages, 'chalkboardStroke');
    const flushedState = findMessage(messages, 'chalkboardState');

    expect(eraseStroke.data.payload).toEqual({
      mode: 2,
      slide: { h: 0, v: 0, f: -1 },
      event: { type: 'erase', x: 55, y: 89, board: 1, time: 144 },
    });
    expect(flushedState.data.payload.storage).toEqual({ board: 'after-slide-change' });
  });
});
