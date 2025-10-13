require("dotenv").config({ quiet: true });
import { test, expect } from "@playwright/test";
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

test.skip("login", async ({ page }, testInfo) => {
  try {
    await page.goto("https://www.w3schools.com");
    await page.waitForLoadState("networkidle");
    const loginButton = page.locator("#tnb-login-btn");
    await loginButton.click();

    const dropdown = page.locator("#tnb-login-dropdown-loginForm").first();
    await expect(dropdown).toBeVisible({ timeout: 500 });
    
    /* //google login not possible on github, asks for verification code
    const [popup] = await Promise.all([
      page.waitForEvent("popup"), // wait for the new window
      page.locator(".social-button.google").click(), // click that opens it
    ]);

    await popup.waitForLoadState();

    const email = process.env.GOOGLE_EMAIL;
    const password = process.env.GOOGLE_PASSWORD;
    await popup.locator("input[type='email']").fill(email);
    await popup.locator("button:has-text('Next')").click();
    await popup.waitForLoadState("networkidle");
    await popup.waitForSelector("input[type='password']");
    await popup.locator("input[type='password']").fill(password);
    await popup.locator("button:has-text('Next')").click();
    */

    const email = process.env.W3S_LOGINEMAIL;
    const password = process.env.W3S_PASSWORD;
    await page.locator("input[type='email']").fill(email);
    await page.locator("input[type='password']").fill(password);
    await page.locator("button:has-text('Sign In')").click();

    await expect(page).toHaveURL("https://pathfinder.w3schools.com/", { timeout: 40000 });

    await page.waitForSelector('section[role="dialog"] button[aria-label="Close"]');

    const modalCloseBtn = page.locator('section[role="dialog"] button[aria-label="Close"]');

    if (await modalCloseBtn.isVisible({ timeout: 3000 })) {
      // wait max 3s
      await modalCloseBtn.click();
    }
    await page.screenshot({ path: `screenshots/page-${timestamp}.png`, fullPage: true }); //explicit screenshot
    //const userTxt = await page.locator("p", { hasText: "Bipi Moh" }); //only expect creates screenshots on failure
    const userTxt = await page.locator("p", { hasText: "Bipi Mo" }); //only expect creates screenshots on failure

    await expect(userTxt).toBeVisible({ timeout: 10000 }); 
  } catch (err) {
    // Take a screenshot safely, if page is still open
    //console.log("error=========>", err);

    if (!page.isClosed()) {
      await testInfo.attach(`screenshot-${timestamp}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
    throw err; // rethrow so the test fails
  }
});
