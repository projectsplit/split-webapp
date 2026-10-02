import { test, expect } from '../support/test';

test('the currency menu opens scrolled to the selected currency', async ({
  app,
  api,
  page,
}) => {
  api.data.me.currency = 'ZAR';

  await app.openQuickSplitsFromHome();
  await app.quickAction('Expense');
  await expect(app.currencyButton).toContainText('ZAR');
  await app.currencyButton.click();

  await expect(page.getByText('Select currency', { exact: true })).toBeVisible();
  await expect(app.selectedCurrencyOption).toContainText('ZAR');
  await expect(app.selectedCurrencyOption).toBeInViewport();
});
