require("dotenv").config();
import { test, expect } from "@playwright/test";

test.only("login", async ({ page }, testInfo) => {
  try {
    await page.goto("https://www.w3schools.com");
    await page.waitForLoadState("networkidle");
    const loginButton = page.locator("#tnb-login-btn");
    await loginButton.click();

    const dropdown = page.locator("#tnb-login-dropdown-loginForm").first();
    await expect(dropdown).toBeVisible({ timeout: 500 });

    //const googleBtn = page.locator(".social-button.google");
    //await googleBtn.click();

    const [popup] = await Promise.all([
      page.waitForEvent("popup"), // wait for the new window
      page.locator(".social-button.google").click(), // click that opens it
    ]);

    await popup.waitForLoadState();

    const email = process.env.GOOGLE_EMAIL;
    const password = process.env.GOOGLE_PASSWORD;
    await popup.locator("input[type='email']").fill(email);
    await popup.locator("button:has-text('Next')").click();
    //await expect(popup.locator("input[type='password']")).toBeVisible({ timeout: 1000 });
    await popup.waitForLoadState("networkidle");
    await popup.waitForSelector("input[type='password']");
    await popup.locator("input[type='password']").fill(password);
    await popup.locator("button:has-text('Next')").click();

    await expect(page).toHaveURL("https://pathfinder.w3schools.com/", { timeout: 20000 });

    //await page.keyboard.press("Escape");
    //await page.pause(); //will only work on headed mode
    await popup.waitForLoadState("networkidle");
    await popup.waitForSelector('section[role="dialog"] button[aria-label="Close"]');

    const modalCloseBtn = page.locator('section[role="dialog"] button[aria-label="Close"]');

    if (await modalCloseBtn.isVisible({ timeout: 3000 })) {
      // wait max 3s
      await modalCloseBtn.click();
    }
    //await popup.waitForSelector("p", { hasText: "Bipi Moh" });
    const userTxt = await page.locator("p", { hasText: "Bipi Moh" }); //only expect creates screenshots on failure

    await expect(userTxt).toBeVisible({ timeout: 10000 });
  } catch (err) {
    // Take a screenshot safely, if page is still open
    console.log("error=========>", err);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    if (!page.isClosed()) {
      await testInfo.attach(`screenshot-${timestamp}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
    throw err; // rethrow so the test fails
  }
});
