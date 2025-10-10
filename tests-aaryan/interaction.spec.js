import { test } from '@playwright/test';

test('Interacting with form elements', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_forms.asp');

  await page.getByText('Try it Yourself').click();

  const frame = page.frameLocator('iframe[name="iframeResult"]');

  await frame.locator('input[name="fname"]').fill('Aaryan');
  await frame.locator('input[name="lname"]').fill('Kumar');
  await frame.locator('input[type="submit"]').click();
});
