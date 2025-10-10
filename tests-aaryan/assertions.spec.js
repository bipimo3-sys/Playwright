import { test, expect } from '@playwright/test';

test('Assertions in Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev');

  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.locator('text=Fast')).toBeVisible();

  const heading = page.locator('h1');
  await expect(heading).toContainText('Playwright enables reliable end-to-end testing');
});
