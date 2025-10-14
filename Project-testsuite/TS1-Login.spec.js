import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test, expect } from "@playwright/test";

test.describe.parallel("Login Page Serial Tests", () => {
  test("login-page-load", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const title = await page.title();
      await expect(title).toBe("Login Page");
      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("login-page-unameAndPassVisible", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const usernameField = await page.locator("#username");
      const passwordField = await page.locator("#password");
      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("login-page-loginBtnVisible", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const loginButton = await page.locator("#loginBtn");
      await expect(loginButton).toBeVisible();
      await expect(loginButton).toBeEnabled();
      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });
});

/*




    
    await loginButton.click();

    const dropdown = page.locator("#tnb-login-dropdown-loginForm").first();
    await expect(dropdown).toBeVisible({ timeout: 500 });


    const email = process.env.W3S_LOGINEMAIL;
    const password = process.env.W3S_PASSWORD;
    await page.locator("input[type='email']").fill(email);
    await page.locator("input[type='password']").fill(password);
    await page.locator("button:has-text('Sign In')").click();

    await expect(page).toHaveURL("https://pathfinder.w3schools.com/", {
      timeout: 40000,
    });

    await page.waitForSelector(
      'section[role="dialog"] button[aria-label="Close"]'
    );

    const modalCloseBtn = page.locator(
      'section[role="dialog"] button[aria-label="Close"]'
    );

    if (await modalCloseBtn.isVisible({ timeout: 3000 })) {
      // wait max 3s
      await modalCloseBtn.click();
    }
    await page.screenshot({
      path: `screenshots/page-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot
    //const userTxt = await page.locator("p", { hasText: "Bipi Moh" }); //only expect creates screenshots on failure
    const userTxt = await page.locator("p", { hasText: "Bipi Mo" }); //only expect creates screenshots on failure

    await expect(userTxt).toBeVisible({ timeout: 10000 });

*/
