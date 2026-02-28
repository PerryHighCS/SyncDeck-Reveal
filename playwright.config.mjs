import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/integration',
  timeout: 30000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    headless: true,
  },
});
