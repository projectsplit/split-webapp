import type { Page, Route } from '@playwright/test';
import { API_ORIGIN, GROUP_ID } from './constants';
import { createMockData, type MockData } from './mockData';

type MockRequest = { url: URL; method: string; body: unknown };
type MockResponse = { status?: number; json?: unknown; text?: string };
type Handler = (request: MockRequest) => MockResponse;
type Entry = { method: string; path: string | RegExp; handler: Handler };

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type',
};

export class MockApi {
  readonly data: MockData = createMockData();
  readonly calls: string[] = [];
  readonly unhandled: string[] = [];
  readonly requests: Array<{ method: string; path: string; body: unknown }> =
    [];
  private readonly entries: Entry[] = [];

  constructor() {
    this.registerDefaults();
  }

  on(method: string, path: string | RegExp, handler: Handler) {
    this.entries.unshift({ method, path, handler });
  }

  bodiesOf(method: string, path: string) {
    return this.requests
      .filter((r) => r.method === method && r.path === path)
      .map((r) => r.body);
  }

  count(method: string, path: string) {
    return this.calls.filter((call) => call === `${method} ${path}`).length;
  }

  async install(page: Page) {
    await page.route(`${API_ORIGIN}/**`, (route) => this.handle(route));
  }

  private find(method: string, pathname: string) {
    const candidates = this.entries.filter((e) => e.method === method);
    return (
      candidates.find((e) => e.path === pathname) ??
      candidates.find((e) => e.path instanceof RegExp && e.path.test(pathname))
    );
  }

  private async handle(route: Route) {
    const request = route.request();
    const method = request.method();

    if (method === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }

    const url = new URL(request.url());
    const key = `${method} ${url.pathname}`;
    this.calls.push(key);

    const entry = this.find(method, url.pathname);
    if (!entry) {
      this.unhandled.push(`${key}${url.search}`);
      await route.fulfill({
        status: 501,
        headers: corsHeaders,
        body: `No mock for ${key}`,
      });
      return;
    }

    let body: unknown = null;
    try {
      body = request.postDataJSON();
    } catch {
      body = request.postData();
    }

    this.requests.push({ method, path: url.pathname, body });
    const response = entry.handler({ url, method, body });
    const isText = response.text !== undefined;
    await route.fulfill({
      status: response.status ?? 200,
      headers: {
        ...corsHeaders,
        'content-type': isText ? 'text/plain' : 'application/json',
      },
      body: isText ? response.text : JSON.stringify(response.json ?? {}),
    });
  }

  private registerDefaults() {
    const d = this.data;
    const page = <T>(key: string, items: T[]) => ({
      json: { [key]: items, next: null, previous: null },
    });

    this.on('GET', '/users/me', () => ({ json: d.me }));
    this.on('GET', '/budgets/get-active', () => ({
      status: 400,
      text: 'No active budget found',
    }));
    this.on('GET', '/groups/all-balances', () => ({ json: d.allBalances }));
    this.on('GET', '/groups/details', () => ({
      json: { groups: [d.groupDetails], next: null },
    }));
    this.on('GET', '/groups/search', () => ({
      json: { groups: [d.groupSearchItem], next: null },
    }));
    this.on('GET', /^\/groups\/[^/]+$/, ({ url }) =>
      url.pathname === `/groups/${GROUP_ID}`
        ? { json: d.group }
        : { status: 404, text: 'Group not found' }
    );

    this.on('GET', '/users/user-group-labels', () => ({ json: { labels: [] } }));
    this.on('GET', '/users/user-labels', () => ({ json: { labels: [] } }));
    this.on('GET', '/expenses/labels', () => ({ json: { labels: [] } }));

    this.on('GET', '/users/search-all-users', () => ({
      json: { users: [d.users.sam, d.users.jo], next: null },
    }));
    this.on('GET', '/users/search-non-group-expense-users', () => ({
      json: { users: [d.users.sam, d.users.jo] },
    }));
    this.on('GET', '/users/search-non-group-transfer-users', () => ({
      json: { users: [{ userId: d.me.userId, username: d.me.username }, d.users.sam] },
    }));
    this.on('GET', '/connections/statuses', ({ url }) => ({
      json: {
        statuses: url.searchParams.getAll('userIds').map((userId) => ({
          userId,
          status: userId === d.users.sam.userId ? 'connected' : 'none',
          connectionId:
            userId === d.users.sam.userId
              ? '60000000-0000-4000-8000-000000000001'
              : null,
        })),
      },
    }));

    this.on('GET', '/expenses', () => page('expenses', d.groupExpenses));
    this.on('GET', '/transfers', () => ({
      json: { transfers: d.groupTransfers, next: null },
    }));
    this.on('GET', '/debts', () => ({ json: d.groupDebts }));

    this.on('GET', '/expenses/non-group', () =>
      page('expenses', d.quickSplitExpenses)
    );
    this.on('GET', '/transfers/non-group', () => ({
      json: { transfers: d.quickSplitTransfers, next: null },
    }));
    this.on('GET', '/debts/non-group', () => ({ json: d.quickSplitDebts }));

    this.on('GET', '/recurring-expenses', () => ({
      json: { recurringExpenses: d.recurringExpenses },
    }));

    this.on('GET', '/expenses/personal', () =>
      page('expenses', d.personalExpenses)
    );

    this.on('POST', '/expenses/create', () => ({ text: '' }));
    this.on('POST', '/expenses/create-non-group', () => ({ text: '' }));
    this.on('POST', '/expenses/edit-non-group', () => ({ text: '' }));
    this.on('PUT', '/users/activity/recent-context', () => ({ text: '' }));
  }
}
