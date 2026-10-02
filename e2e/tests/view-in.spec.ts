import { test, expect } from '../support/test';
import {
  GROUP_EXPENSE,
  GROUP_EXPENSE_ID,
  GROUP_ID,
  QUICK_SPLIT_EXPENSE,
  QUICK_SPLIT_EXPENSE_ID,
} from '../support/constants';

test.describe('a share on the Personal page links to where it came from', () => {
  test('group share: View in group opens the group at the expense', async ({
    app,
    page,
  }) => {
    await app.openPersonal();
    await page.getByText(GROUP_EXPENSE, { exact: true }).click();
    await page.getByRole('button', { name: 'View in group' }).click();

    await app.expectPath(`/shared/${GROUP_ID}/expenses`);
    expect(new URL(page.url()).searchParams.get('jumpTo')).toBeTruthy();
    await expect(app.expenseRow(GROUP_EXPENSE_ID)).toBeVisible();

    await app.back();
    await app.expectPath('/personal');
  });

  test('quick split share: View in Quick splits opens Quick splits at the expense', async ({
    app,
    page,
  }) => {
    await app.openPersonal();
    await page.getByText(QUICK_SPLIT_EXPENSE, { exact: true }).click();
    await page.getByRole('button', { name: 'View in Quick splits' }).click();

    await app.expectPath('/shared/nongroup/expenses');
    expect(new URL(page.url()).searchParams.get('jumpTo')).toBeTruthy();
    await expect(app.expenseRow(QUICK_SPLIT_EXPENSE_ID)).toBeVisible();
  });
});
