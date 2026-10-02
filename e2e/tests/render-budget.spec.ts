import { test, expect } from '../support/test';
import { expectWithinRenderBudget, measureRenders } from '../support/renderBudget';

test.describe.configure({ mode: 'default' });

test.describe('render budgets', () => {
  test('Quick splits: open the expense form', async ({ app, page }, testInfo) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await expect(app.expenseFormTitle).toBeVisible();
    await app.back();
    await expect(app.expenseFormTitle).toHaveCount(0);
    await app.openQuickActions();

    const report = await measureRenders(page, 'quick-splits:open-expense-form', async () => {
      await app.quickActionItems.filter({ hasText: 'Expense' }).click();
      await expect(app.expenseFormTitle).toBeVisible();
    });
    await expectWithinRenderBudget(report, testInfo);
  });

  test('Quick splits: type an amount', async ({ app, page }, testInfo) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await expect(app.expenseFormTitle).toBeVisible();

    const report = await measureRenders(page, 'quick-splits:type-amount', async () => {
      await app.amountInput.pressSequentially('123');
    });
    await expectWithinRenderBudget(report, testInfo);
  });

  test('Quick splits: open Split with over the form', async ({ app, page }, testInfo) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await app.enterAmount('5');
    await app.sharedWithButton.click();
    await expect(app.splitWith).toBeVisible();
    await app.back();
    await expect(app.splitWith).toHaveCount(0);

    const report = await measureRenders(page, 'quick-splits:open-split-with', async () => {
      await app.sharedWithButton.click();
      await expect(app.splitWith).toBeVisible();
    });
    await expectWithinRenderBudget(report, testInfo);
  });

  test('Quick splits: close Split with and the form with back', async ({ app, page }, testInfo) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await app.enterAmount('5');
    await app.sharedWithButton.click();
    await expect(app.splitWith).toBeVisible();

    const report = await measureRenders(page, 'quick-splits:close-with-back', async () => {
      await app.back();
      await expect(app.splitWith).toHaveCount(0);
      await app.back();
      await expect(app.expenseFormTitle).toHaveCount(0);
    });
    await expectWithinRenderBudget(report, testInfo);
  });

  test('group: open the expense form', async ({ app, page }, testInfo) => {
    await app.openGroup();
    await app.quickAction('Expense');
    await expect(app.expenseFormTitle).toBeVisible();
    await app.back();
    await expect(app.expenseFormTitle).toHaveCount(0);
    await app.openQuickActions();

    const report = await measureRenders(page, 'group:open-expense-form', async () => {
      await app.quickActionItems.filter({ hasText: 'Expense' }).click();
      await expect(app.expenseFormTitle).toBeVisible();
    });
    await expectWithinRenderBudget(report, testInfo);
  });

  test('group: background refetch while the expense form is open', async ({ app, page }, testInfo) => {
    await app.openGroup();
    await app.quickAction('Expense');
    await app.enterAmount('10');

    const report = await measureRenders(page, 'group:refetch-with-form-open', async () => {
      await app.refetchAllData();
    });
    await expectWithinRenderBudget(report, testInfo);
  });
});
