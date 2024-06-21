import { test, expect } from '@playwright/test';
import {homeUrl} from 'e2e/e2e.config';
import {HomeFixture} from "../../src/app/home/home-container/home-container.fixture";
import { UserListFixture } from 'src/app/users/user-navigate/user-navigatecomponent.fixture';
import {UserCardFixture} from "../../src/app/users/user/usercomponent.fixture";

// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
  test('Verify buttons are visible and clickable', async ({ page }) => {
    await page.goto(`${homeUrl}`);

    const HomeFixtureComponent = new HomeFixture(page);

    await HomeFixtureComponent.clickUserListeButton();

    const userList = await page.locator('.user');
    const userCount = await userList.count();

    const UserListFixtureComponent = new UserListFixture(page);

    const addButton = UserListFixtureComponent.getAddButton();
    await expect(addButton).toBeVisible();
    await UserListFixtureComponent.clickAddButton();

    await page.fill('#first_name', 'Ilias');
    await page.fill('#last_name', 'Moutaoukil');
    await page.fill('#birth_date', '2004-08-04');
    await page.fill('#alzheimerStage', '3');
    await page.click('button[type="submit"]');

    await page.reload();

    const newUserCount = await page.locator('.user').count();

    await expect(newUserCount).toBe(userCount + 1);

    const userList2 = await page.locator('.user');
    const user = userList2.nth(1);
    await user.hover();

    await page.getByRole('button', { name: 'MODIFIER' }).nth(1).click();

    await page.click('button[type="button"]');

    await page.reload();
  });
});
