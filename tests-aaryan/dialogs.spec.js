import { test } from '@playwright/test';

test('Handle alerts, confirms, and prompts', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    if (dialog.type() === 'prompt') {
      await dialog.accept('Aaryan');
    } else {
      await dialog.accept();
    }
  });

  await page.click('text=Click for JS Alert');
  await page.click('text=Click for JS Confirm');
  await page.click('text=Click for JS Prompt');
});
