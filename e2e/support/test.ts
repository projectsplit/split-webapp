import { test as base, expect } from '@playwright/test';
import { API_ORIGIN } from './constants';
import { fakeAccessToken } from './auth';
import { MockApi } from './mockApi';
import { App } from './app';

const installBrowserGuards = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);

  const hideRenderProbeOverlay = () => {
    const style = document.createElement('style');
    style.textContent =
      '[data-react-scan], #react-scan-root, #react-scan-toolbar-root, body > canvas { display: none !important; }';
    document.head.appendChild(style);
  };
  if (document.head) hideRenderProbeOverlay();
  else
    document.addEventListener('DOMContentLoaded', hideRenderProbeOverlay, {
      once: true,
    });

  const log = { pushes: 0, pushesDuringTraversal: 0, traversals: 0 };
  let handlingTraversal = false;

  window.addEventListener(
    'popstate',
    () => {
      log.traversals += 1;
      handlingTraversal = true;
      setTimeout(() => {
        handlingTraversal = false;
      }, 0);
    },
    true
  );

  const pushState = history.pushState.bind(history);
  history.pushState = (...args: Parameters<History['pushState']>) => {
    log.pushes += 1;
    if (handlingTraversal) log.pushesDuringTraversal += 1;
    return pushState(...args);
  };

  (window as unknown as { __historyLog: typeof log }).__historyLog = log;
};

export const test = base.extend<{ api: MockApi; app: App }>({
  api: async ({ page }, provide) => {
    const api = new MockApi();
    await api.install(page);
    await provide(api);
    expect(api.unhandled, 'API requests with no mock').toEqual([]);
  },

  app: async ({ page, api, baseURL }, provide) => {
    const appOrigin = new URL(baseURL ?? 'http://localhost').origin;
    await page.context().route(
      (url) =>
        url.protocol.startsWith('http') &&
        url.origin !== appOrigin &&
        url.origin !== API_ORIGIN,
      (route) => route.abort()
    );
    await page.addInitScript(installBrowserGuards, fakeAccessToken());
    await provide(new App(page, api));
  },
});

export { expect };
