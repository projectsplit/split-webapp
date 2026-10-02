import { test, expect } from '../support/test';
import {
  JO_ID,
  QUICK_SPLIT_EXPENSE,
  SAM_ID,
} from '../support/constants';

type RememberedPeople = { nonGroupUsers?: Array<{ userId: string }> };

test.describe('editing a quick split only involves its own people', () => {
  test('the People row lists only the people in the expense', async ({
    app,
    page,
  }) => {
    await app.openQuickSplitsFromHome();
    await page.getByText(QUICK_SPLIT_EXPENSE, { exact: true }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(app.editFormTitle).toBeVisible();

    await expect(app.peopleRow).toContainText('You and sam');
    await expect(app.peopleRow).not.toContainText('others');
  });

  test('saving the edit remembers only the people in the expense', async ({
    app,
    api,
    page,
  }) => {
    await app.openQuickSplitsFromHome();
    await page.getByText(QUICK_SPLIT_EXPENSE, { exact: true }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(app.editFormTitle).toBeVisible();

    await app.submitButton.click();
    await expect(app.editFormTitle).toHaveCount(0);
    expect(api.count('POST', '/expenses/edit-non-group')).toBe(1);

    const remembered = await page.evaluate(
      () =>
        JSON.parse(
          sessionStorage.getItem('submittedFromHomePersistData') ?? '{}'
        ) as RememberedPeople
    );
    const rememberedIds = (remembered.nonGroupUsers ?? []).map((u) => u.userId);
    expect(rememberedIds).toContain(SAM_ID);
    expect(rememberedIds).not.toContain(JO_ID);
  });
});
