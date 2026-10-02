import { test, expect } from '../support/test';

test.describe('forms start empty every time they open', () => {
  test('expense form forgets the amount and description after closing', async ({
    app,
  }) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await app.enterAmount('42');
    await app.descriptionInput.fill('Lunch');
    await app.closeExpenseForm();
    await expect(app.expenseFormTitle).toHaveCount(0);

    await app.quickAction('Expense');
    await expect(app.expenseFormTitle).toBeVisible();
    await expect(app.amountInput).toHaveValue('');
    await expect(app.descriptionInput).toHaveValue('');
  });

  test('transfer form forgets the amount after closing with back', async ({
    app,
  }) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Transfer');
    await expect(app.transferFormTitle).toBeVisible();
    await app.enterAmount('7');
    await app.back();
    await expect(app.transferFormTitle).toHaveCount(0);

    await app.quickAction('Transfer');
    await expect(app.transferFormTitle).toBeVisible();
    await expect(app.amountInput).toHaveValue('');
  });
});
