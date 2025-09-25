import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  timeout: 30 * 1000,
  retries: 2,
  reporter: [['html', { outputFolder: 'report' }], ['list']],
  use: {
    baseURL: 'https://www.americanas.com.br',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  outputDir: 'test-results',
  preserveOutput: 'always',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
      },
    },
  ],
});