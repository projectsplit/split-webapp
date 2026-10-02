import { chromium, type FullConfig } from '@playwright/test';
import { API_ORIGIN } from './constants';
import { fakeAccessToken } from './auth';

const COMPILE_WAIT_MS = 6_000;

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL;
  if (!baseURL) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route(`${API_ORIGIN}/**`, (route) => route.abort());
  await page.addInitScript((token) => {
    localStorage.setItem('accessToken', token);
  }, fakeAccessToken());

  await page.goto(`${baseURL}/`);
  await page.waitForTimeout(COMPILE_WAIT_MS);
  await browser.close();
}
