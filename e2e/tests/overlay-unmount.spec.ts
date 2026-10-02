import type { Locator } from '@playwright/test';
import { test, expect } from '../support/test';
import type { App } from '../support/app';

type Overlay = {
  name: string;
  open: (app: App) => Promise<void>;
  root: (app: App) => Locator;
};

const overlays: Overlay[] = [
  {
    name: 'quick actions',
    open: (app) => app.openQuickActions(),
    root: (app) => app.quickActionItems.first(),
  },
  {
    name: 'expense form',
    open: (app) => app.quickAction('Expense'),
    root: (app) => app.expenseFormTitle,
  },
  {
    name: 'transfer form',
    open: (app) => app.quickAction('Transfer'),
    root: (app) => app.transferFormTitle,
  },
  {
    name: 'Split with over the expense form',
    open: async (app) => {
      await app.quickAction('Expense');
      await app.enterAmount('5');
      await app.sharedWithButton.click();
    },
    root: (app) => app.splitWith,
  },
];

for (const cpuSlowdown of [1, 6]) {
  test.describe(
    cpuSlowdown === 1 ? 'overlays unmount after back' : `overlays unmount after back, CPU slowed ${cpuSlowdown}×`,
    () => {
      for (const overlay of overlays) {
        test(overlay.name, async ({ app }) => {
          if (cpuSlowdown > 1) await app.throttleCpu(cpuSlowdown);
          await app.openQuickSplitsFromHome();
          await overlay.open(app);
          await expect(overlay.root(app)).toBeVisible();

          await app.back();
          await expect(overlay.root(app)).toHaveCount(0);
          await app.expectNoHistoryEntriesAddedDuringBack();
        });
      }
    }
  );
}
