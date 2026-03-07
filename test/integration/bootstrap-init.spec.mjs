import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/bootstrap-harness.html');
const fixtureUrl = pathToFileURL(fixturePath);

test('bundle exposes the public SyncDeck runtime globals', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const globals = await page.evaluate(() => ({
    revealLoaded: typeof window.Reveal?.initialize === 'function',
    revealNotesId: window.RevealNotes?.id ?? null,
    chalkboardId: window.RevealChalkboard?.id ?? null,
    iframeSyncId: window.RevealIframeSync?.id ?? null,
    storyboardInitType: typeof window.initRevealStoryboard,
    bootstrapInitType: typeof window.initSyncDeckReveal,
  }));

  expect(globals.revealLoaded).toBe(true);
  expect(globals.revealNotesId).toBe('notes');
  expect(globals.chalkboardId).toBe('RevealChalkboard');
  expect(globals.iframeSyncId).toBe('RevealIframeSync');
  expect(globals.storyboardInitType).toBe('function');
  expect(globals.bootstrapInitType).toBe('function');
});

test('preserves custom plugins while appending required SyncDeck plugins', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    includeCustomPlugins: true,
  }));

  expect(result.pluginIds).toContain('CustomFixturePlugin');
  expect(result.pluginIds).toContain('RevealNotes');
  expect(result.pluginIds).toContain('RevealChalkboard');
  expect(result.pluginIds).toContain('RevealIframeSync');
  expect(result.pluginIds.filter((id) => id === 'RevealIframeSync')).toHaveLength(1);
  expect(result.customPluginInits).toBe(1);
  expect(result.storyboardThumbs).toBe(4);
});

test('keeps custom plugins whose ids overlap Object.prototype keys', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    includeCustomPlugins: true,
    customPluginId: 'toString',
  }));

  expect(result.pluginIds).toContain('toString');
  expect(result.customPluginInits).toBe(1);
});

test('required plugins win when a custom plugin reuses a required plugin id', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    includeCustomPlugins: true,
    includeRequiredInCustomPlugins: false,
    customPluginId: 'RevealIframeSync',
  }));

  expect(result.customPluginInits).toBe(0);
  expect(result.pluginIds.filter((id) => id === 'RevealIframeSync')).toHaveLength(1);
});

test('runs afterInit after asynchronous Reveal.initialize resolves', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    asyncInitDelay: 25,
  }));

  expect(result.afterInitRan).toBe(true);
  expect(result.events).toEqual([
    'initialize-start',
    'initialize-resolved',
    'after-init',
  ]);
});

test('handles rejected Reveal.initialize without floating afterInit promise errors', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    asyncInitDelay: 5,
    rejectInit: true,
  }));

  expect(result.initRejected).toBe(true);
  expect(result.afterInitRan).toBe(false);
  expect(result.errors.some((line) => line.includes('Reveal.initialize failed before afterInit'))).toBe(true);
});

test('logs a distinct error when afterInit callback throws', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    asyncInitDelay: 5,
    afterInitThrows: true,
  }));

  expect(result.initRejected).toBe(false);
  expect(result.afterInitRan).toBe(false);
  expect(result.errors.some((line) => line.includes('afterInit callback failed'))).toBe(true);
  expect(result.errors.some((line) => line.includes('Reveal.initialize failed before afterInit'))).toBe(false);
});

test('logs and contains async afterInit callback rejections', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    asyncInitDelay: 5,
    afterInitRejects: true,
  }));

  expect(result.initRejected).toBe(false);
  expect(result.errors.some((line) => line.includes('afterInit callback failed'))).toBe(true);
});

test('strips chalkboard storage and emits an explicit warning', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  const result = await page.evaluate(() => window.runBootstrapHarness({
    chalkboardOverrides: {
      storage: 'legacy-session-key',
    },
  }));

  expect(result.initConfig.chalkboard.storage).toBeUndefined();
  expect(result.warnings.some((line) => line.includes('Ignoring chalkboard.storage'))).toBe(true);
});
