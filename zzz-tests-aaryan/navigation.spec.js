import { test, expect } from '@playwright/test';

test('Navigation and waits', async ({ page }) => {
  await page.goto('https://example.com');
  await page.waitForLoadState('networkidle');

  await page.goto('https://playwright.dev');
  await page.waitForSelector('text=Get Started');

  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Get Started').click()
  ]);

  await expect(page).toHaveURL(/docs/);
});
