import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(__dirname, '../fixtures/runtime-harness.html');
const fixtureUrl = new URL(`file://${fixturePath}`);

test('loads the iframe sync and storyboard runtimes into a fixture deck', async ({ page }) => {
  await page.goto(fixtureUrl.toString());

  await expect(page.locator('#storyboard-track .story-thumb')).toHaveCount(3);

  const status = await page.evaluate(() => window.RevealIframeSyncAPI.getStatus());
  expect(status.role).toBe('standalone');
  expect(status.indices.h).toBe(0);
  expect(status.navigation.current.h).toBe(0);
  expect(status.studentBoundary).toBeNull();

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('reveal-storyboard-set', {
      detail: { open: true },
    }));
  });

  await expect(page.locator('body')).toHaveClass(/storyboard-open/);
  await expect(page.locator('#storyboard-track .story-thumb').nth(0)).toHaveClass(/active/);
});
