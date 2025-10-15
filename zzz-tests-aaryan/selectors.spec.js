import { test } from '@playwright/test';

test('Selectors examples', async ({ page }) => {
  await page.goto('https://example.com');

  // CSS selector
  await page.locator('a').click();

  // XPath selector
  await page.locator('//a[contains(text(),"More information")]').click();

  // Text selector
  await page.locator('text=More information').click();

  // Role selector
  await page.locator('role=link[name="More information"]').click();
});
