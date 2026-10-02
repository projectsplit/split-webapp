import { test, expect } from '../support/test';
import {
  GROUP_ID,
  GUEST_MEMBER_ID,
  MY_MEMBER_ID,
  ME_ID,
  SAM_ID,
} from '../support/constants';

test.describe('saving closes the form and stays on the page', () => {
  test.afterEach(async ({ app }) => {
    await app.expectNoHistoryEntriesAddedDuringBack();
  });

  test('Quick splits: new expense shared with someone', async ({
    app,
    api,
    page,
  }) => {
    await app.openQuickSplitsFromHome();
    await app.quickAction('Expense');
    await app.enterAmount('5');
    await app.descriptionInput.fill('Lunch');
    await app.sharedWithButton.click();
    await expect(app.splitWith).toBeVisible();
    await page.getByText('sam', { exact: true }).first().click();
    await app.doneButton.click();
    await expect(app.splitWith).toHaveCount(0);

    const pushesBefore = await app.historyPushes();
    await app.submitButton.click();

    await expect(app.expenseFormTitle).toHaveCount(0);
    await app.expectPath('/shared/nongroup/expenses');
    expect(await app.historyPushes(), 'no navigation after saving').toBe(
      pushesBefore
    );

    const [body] = api.bodiesOf('POST', '/expenses/create-non-group');
    expect(JSON.stringify(body)).toContain(ME_ID);
    expect(JSON.stringify(body)).toContain(SAM_ID);

    await app.back();
    await app.expectPath('/');
  });

  test('group: new expense', async ({ app, api }) => {
    await app.openGroup();
    await app.quickAction('Expense');
    await app.enterAmount('10');
    await app.descriptionInput.fill('Snacks');

    const pushesBefore = await app.historyPushes();
    await app.submitButton.click();

    await expect(app.expenseFormTitle).toHaveCount(0);
    await app.expectPath(`/shared/${GROUP_ID}/expenses`);
    expect(await app.historyPushes(), 'no navigation after saving').toBe(
      pushesBefore
    );

    const [body] = api.bodiesOf('POST', '/expenses/create');
    const sent = JSON.stringify(body);
    expect(sent).toContain(GROUP_ID);
    expect(sent).toContain(MY_MEMBER_ID);
    expect(sent).toContain(GUEST_MEMBER_ID);
  });
});
