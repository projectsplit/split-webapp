import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import { API_ORIGIN, E2E_PORT } from './support/constants';

const appRoot = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig({
  testDir: './tests',
  globalSetup: './support/global-setup.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    ...devices['Pixel 7'],
    baseURL: `http://localhost:${E2E_PORT}`,
    serviceWorkers: 'block',
    timezoneId: 'Europe/Athens',
    locale: 'en-GB',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'mobile-chromium' }],
  webServer: {
    command: `npx vite --config e2e/vite.e2e.config.ts --port ${E2E_PORT} --strictPort`,
    cwd: appRoot,
    url: `http://localhost:${E2E_PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      VITE_RENDER_PROBE: '1',
      VITE_SERVER_URL: API_ORIGIN,
    },
  },
});
