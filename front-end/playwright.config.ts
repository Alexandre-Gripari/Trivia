import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [
    ['json', {  outputFile: '/tests/playwright-report/test-results.json' }]
  ],
  timeout: 120000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
    launchOptions: {
      slowMo: 1000,
    }
  },
};

export default config;
