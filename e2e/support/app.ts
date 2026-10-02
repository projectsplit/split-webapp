import { expect, type Page } from '@playwright/test';
import {
  GROUP_EXPENSE,
  GROUP_ID,
  QUICK_SPLIT_EXPENSE,
  RECURRING_EXPENSE,
} from './constants';
import type { MockApi } from './mockApi';

type HistoryLog = {
  pushes: number;
  pushesDuringTraversal: number;
  traversals: number;
};

export class App {
  constructor(
    readonly page: Page,
    readonly api: MockApi
  ) {}

  get homeQuickSplitsLink() {
    return this.page.locator('.destinationName', { hasText: /^Quick splits$/ });
  }

  get quickActionItems() {
    return this.page.locator('.new');
  }

  get amountInput() {
    return this.page.locator('input[placeholder="€0"]');
  }

  get expenseFormTitle() {
    return this.page.getByText('Create New Expense', { exact: true });
  }

  get editFormTitle() {
    return this.page.getByText('Edit Expense', { exact: true });
  }

  get transferFormTitle() {
    return this.page.getByText('New Transfer', { exact: true });
  }

  get sharedWithButton() {
    return this.page.locator('.shareExpenseOption .button');
  }

  get splitWith() {
    return this.page.getByText('Split with', { exact: true });
  }

  get splitRow() {
    return this.page
      .locator('.main')
      .filter({ has: this.page.locator('.rowLabel', { hasText: /^Split$/ }) });
  }

  get peopleRow() {
    return this.page.locator('.peopleRow');
  }

  expenseRow(expenseId: string) {
    return this.page.locator(`#expense-${expenseId}`);
  }

  get descriptionInput() {
    return this.page.getByPlaceholder('Description');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit', exact: true });
  }

  get currencyButton() {
    return this.page.locator('.currencySelector');
  }

  get selectedCurrencyOption() {
    return this.page.locator('.currencyOption.clicked');
  }

  get splitScreen() {
    return this.page.getByText(/^Split €[\d.,]+ by$/);
  }

  get doneButton() {
    return this.page.getByRole('button', { name: 'Done', exact: true });
  }

  get expenseDetail() {
    return this.page.getByText('Occurred', { exact: true });
  }

  get memberSheetTitle() {
    return this.page.getByText('Sent from', { exact: true });
  }

  get recurringEditTitle() {
    return this.page.getByText('Edit Recurring Expense', { exact: true });
  }

  get recurringDeleteTitle() {
    return this.page.getByText('Delete recurring expense', { exact: true });
  }

  async openHome() {
    await this.page.goto('/');
    await expect(this.homeQuickSplitsLink).toBeVisible();
  }

  async openQuickSplitsFromHome() {
    await this.openHome();
    await this.homeQuickSplitsLink.click();
    await this.expectPath('/shared/nongroup/expenses');
    await expect(
      this.page.getByText(QUICK_SPLIT_EXPENSE, { exact: true })
    ).toBeVisible();
  }

  async openGroup() {
    await this.page.goto(`/shared/${GROUP_ID}/expenses`);
    await expect(
      this.page.getByText(GROUP_EXPENSE, { exact: true })
    ).toBeVisible();
  }

  async openRecurring() {
    await this.page.goto('/recurring-expenses');
    await expect(
      this.page.getByText(RECURRING_EXPENSE, { exact: true })
    ).toBeVisible();
  }

  async openPersonal() {
    await this.page.goto('/personal');
    await expect(
      this.page.getByText(GROUP_EXPENSE, { exact: true })
    ).toBeVisible();
  }

  async goHomeFromBottomBar() {
    await this.page.locator('.bottomMainBar .home').click();
    await this.expectPath('/');
    await expect(this.homeQuickSplitsLink).toBeVisible();
  }

  async homeQuickAction(name: 'Expense' | 'Transfer') {
    await this.page.locator('.actions').click();
    await this.quickActionItems.filter({ hasText: name }).click();
  }

  async openQuickActions() {
    await this.page.locator('.bottomMainBar .add').click();
    await expect(this.quickActionItems.first()).toBeVisible();
  }

  async quickAction(name: 'Expense' | 'Transfer') {
    await this.openQuickActions();
    await this.quickActionItems.filter({ hasText: name }).click();
  }

  async enterAmount(value: string) {
    await this.amountInput.fill(value);
  }

  async toggleMember(name: string) {
    await this.page
      .locator('.textAndCheck', { hasText: name })
      .locator('.tick-cube')
      .click();
  }

  async closeExpenseForm() {
    await this.expenseFormTitle
      .locator('xpath=..')
      .locator('.closeButtonContainer')
      .click();
  }

  async historyPushes() {
    return (await this.historyLog())?.pushes ?? 0;
  }

  async back() {
    await this.page.goBack();
  }

  async expectPath(pathname: string) {
    await expect.poll(() => new URL(this.page.url()).pathname).toBe(pathname);
  }

  async historyLog(): Promise<HistoryLog | undefined> {
    return this.page.evaluate(
      () => (window as unknown as { __historyLog?: HistoryLog }).__historyLog
    );
  }

  async expectNoHistoryEntriesAddedDuringBack() {
    const log = await this.historyLog();
    if (!log) return;
    expect(
      log.pushesDuringTraversal,
      'history entries added while a back press was handled (Chrome then skips entries on back)'
    ).toBe(0);
  }

  async refetchAllData() {
    await this.page.evaluate(async () => {
      type Fiber = {
        child: Fiber | null;
        sibling: Fiber | null;
        memoizedProps?: {
          client?: { invalidateQueries: () => Promise<void> };
        };
      };
      const container = document.getElementById('root') as unknown as Record<
        string,
        { stateNode: { current: Fiber } }
      >;
      const key = Object.keys(container).find((k) =>
        k.startsWith('__reactContainer')
      );
      if (!key) throw new Error('React root not found');

      const stack: Fiber[] = [container[key].stateNode.current];
      while (stack.length) {
        const fiber = stack.pop() as Fiber;
        const client = fiber.memoizedProps?.client;
        if (client?.invalidateQueries) {
          await client.invalidateQueries();
          return;
        }
        if (fiber.sibling) stack.push(fiber.sibling);
        if (fiber.child) stack.push(fiber.child);
      }
      throw new Error('QueryClient not found');
    });
  }

  async throttleCpu(rate: number) {
    const cdp = await this.page.context().newCDPSession(this.page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
  }
}
