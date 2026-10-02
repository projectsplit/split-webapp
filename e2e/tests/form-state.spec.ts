import { test, expect } from '../support/test';
import { GROUP_EXPENSE, GROUP_ID, GUEST_NAME } from '../support/constants';

const SETTLE_MS = 500;

test.describe('form state survives page re-renders', () => {
  test('group expense form keeps a custom split through a background refetch', async ({
    app,
    api,
    page,
  }) => {
    await app.openGroup();
    await app.quickAction('Expense');
    await app.enterAmount('10');
    await expect(app.splitRow).toContainText('Equally between 2');

    await app.splitRow.click();
    await expect(app.splitScreen).toBeVisible();
    await app.toggleMember(GUEST_NAME);
    await app.doneButton.click();
    await expect(app.splitScreen).toBeHidden();

    const chosenSplit = await app.splitRow.innerText();
    expect(chosenSplit).not.toContain('Equally between 2');

    const groupFetches = api.count('GET', `/groups/${GROUP_ID}`);
    await app.refetchAllData();
    await expect
      .poll(() => api.count('GET', `/groups/${GROUP_ID}`))
      .toBeGreaterThan(groupFetches);
    await page.waitForTimeout(SETTLE_MS);

    expect(await app.splitRow.innerText()).toBe(chosenSplit);
  });

  test('expense edit form keeps unsaved split changes through a background refetch', async ({
    app,
    api,
    page,
  }) => {
    await app.openGroup();
    await page.getByText(GROUP_EXPENSE, { exact: true }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(app.editFormTitle).toBeVisible();
    await expect(app.splitRow).toContainText('Equally between 2');

    await app.splitRow.click();
    await expect(app.splitScreen).toBeVisible();
    await app.toggleMember(GUEST_NAME);

    const changedSplit = await app.splitRow.innerText();
    expect(changedSplit).not.toContain('Equally between 2');

    const expenseFetches = api.count('GET', '/expenses');
    await app.refetchAllData();
    await expect
      .poll(() => api.count('GET', '/expenses'))
      .toBeGreaterThan(expenseFetches);
    await page.waitForTimeout(SETTLE_MS);

    expect(await app.splitRow.innerText()).toBe(changedSplit);
  });
});
