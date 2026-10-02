import { test, expect } from '../support/test';
import {
  GROUP_EXPENSE,
  GROUP_ID,
  RECURRING_EXPENSE,
} from '../support/constants';

test.describe('back closes only the top overlay', () => {
  test.afterEach(async ({ app }) => {
    await app.expectNoHistoryEntriesAddedDuringBack();
  });

  test('Quick splits: Split with over the expense form, then back to Home', async ({
    app,
  }) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await app.enterAmount('5');
    await app.sharedWithButton.click();
    await expect(app.splitWith).toBeVisible();

    await app.back();
    await expect(app.splitWith).toHaveCount(0);
    await expect(app.expenseFormTitle).toBeVisible();

    await app.back();
    await expect(app.expenseFormTitle).toHaveCount(0);
    await app.expectPath('/shared/nongroup/expenses');

    await app.back();
    await app.expectPath('/');
  });

  test('closing overlays with their own buttons removes their history entries', async ({
    app,
  }) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await app.enterAmount('5');
    await app.sharedWithButton.click();
    await expect(app.splitWith).toBeVisible();

    await app.doneButton.click();
    await expect(app.splitWith).toHaveCount(0);
    await app.closeExpenseForm();
    await expect(app.expenseFormTitle).toHaveCount(0);

    await app.back();
    await app.expectPath('/');
  });

  test('group: Split screen over the expense form', async ({ app }) => {
    await app.openGroup();
    await app.quickAction('Expense');
    await app.enterAmount('10');
    await app.splitRow.click();
    await expect(app.splitScreen).toBeVisible();

    await app.back();
    await expect(app.splitScreen).toBeHidden();
    await expect(app.expenseFormTitle).toBeVisible();

    await app.back();
    await expect(app.expenseFormTitle).toHaveCount(0);
    await app.expectPath(`/shared/${GROUP_ID}/expenses`);
  });

  test('group: expense detail, then its edit form', async ({ app, page }) => {
    await app.openGroup();
    await page.getByText(GROUP_EXPENSE, { exact: true }).click();
    await expect(app.expenseDetail).toBeVisible();
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(app.editFormTitle).toBeVisible();

    await app.back();
    await expect(app.editFormTitle).toHaveCount(0);
    await expect(app.expenseDetail).toBeVisible();

    await app.back();
    await expect(app.expenseDetail).toHaveCount(0);
    await app.expectPath(`/shared/${GROUP_ID}/expenses`);
  });

  test('group: member sheet over the transfer form', async ({ app, page }) => {
    await app.openGroup();
    await app.quickAction('Transfer');
    await expect(app.transferFormTitle).toBeVisible();
    await page.getByText('Choose', { exact: true }).first().click();
    await expect(app.memberSheetTitle).toBeVisible();

    await app.back();
    await expect(app.memberSheetTitle).toHaveCount(0);
    await expect(app.transferFormTitle).toBeVisible();

    await app.back();
    await expect(app.transferFormTitle).toHaveCount(0);
    await app.expectPath(`/shared/${GROUP_ID}/expenses`);
  });

  test('recurring: edit form and delete confirmation', async ({ app, page }) => {
    await app.openRecurring();

    await page.getByText(RECURRING_EXPENSE, { exact: true }).click();
    await page.getByText('Edit', { exact: true }).click();
    await expect(app.recurringEditTitle).toBeVisible();
    await app.back();
    await expect(app.recurringEditTitle).toHaveCount(0);
    await app.expectPath('/recurring-expenses');

    await page.getByText(RECURRING_EXPENSE, { exact: true }).click();
    await page.getByText('Delete', { exact: true }).click();
    await expect(app.recurringDeleteTitle).toBeVisible();
    await app.back();
    await expect(app.recurringDeleteTitle).toHaveCount(0);
    await app.expectPath('/recurring-expenses');
    await expect(
      page.getByText(RECURRING_EXPENSE, { exact: true })
    ).toBeVisible();
  });
});
