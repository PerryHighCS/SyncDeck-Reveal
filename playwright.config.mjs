import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/integration',
  timeout: 30000,
  fullyParallel: true,
  reporter: 'list',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        hasTouch: true,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: true,
        hasTouch: true,
      },
    },
  ],
});
