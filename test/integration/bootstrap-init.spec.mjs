import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/bootstrap-harness.html');
const fixtureUrl = pathToFileURL(fixturePath);

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
