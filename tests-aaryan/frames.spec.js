import { test } from '@playwright/test';

test('Working with frames and iframes', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe');

  const frame = page.frameLocator('iframe[name="iframeResult"]');
  const nestedFrame = frame.frameLocator('iframe');
  
  const text = await nestedFrame.locator('h1').textContent();
  console.log('Text inside nested iframe:', text);
});
