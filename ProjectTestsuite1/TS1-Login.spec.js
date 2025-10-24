import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test, expect } from "@playwright/test";

test.describe.parallel("Login Page Parallel Tests", () => {
  test("login-page-1load", async ({ page }, testInfo) => {
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

  test("login-page-2unameAndPassVisible", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const usernameField = page.locator("#username");
      const passwordField = page.locator("#password");
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

  test("login-page-3loginBtnVisible", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const loginButton = page.locator("#loginBtn");
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

  test("login-page-4loginWithoutInputs", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const loginButton = page.locator("#loginBtn");
      await loginButton.click();
      const message = page.locator("#message");
      await expect(message).toBeVisible();
      await expect(message).toHaveText(
        "Please enter both username and password."
      );

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

  test("login-page-5loginWithoutUname", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");

      const pass = process.env.TS1_PASSWORD;
      await page.fill("#password", pass);

      const loginButton = page.locator("#loginBtn");
      await loginButton.click();
      const message = page.locator("#message");
      await expect(message).toBeVisible();
      await expect(message).toHaveText(
        "Please enter both username and password."
      );

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

  test("login-page-6loginWithoutPass", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const uname = process.env.TS1_USERNAME;
      await page.fill("#username", uname);

      const loginButton = page.locator("#loginBtn");
      await loginButton.click();
      const message = page.locator("#message");
      await expect(message).toBeVisible();
      await expect(message).toHaveText(
        "Please enter both username and password."
      );

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

  test("login-page-7wrongUnamePass", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      await page.fill("#username", "asdad");
      await page.fill("#password", "asdasf");

      const loginButton = page.locator("#loginBtn");
      await loginButton.click();
      const message = page.locator("#message");
      await expect(message).toBeVisible();
      await expect(message).toHaveText("Invalid credentials.");

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

  test("login-page-8correctUnamePass", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const uname = process.env.TS1_USERNAME;
      const pass = process.env.TS1_PASSWORD;
      await page.fill("#username", uname);
      await page.fill("#password", pass);

      const loginButton = page.locator("#loginBtn");
      await loginButton.click();
      const message = page.locator("#message");
      await expect(message).toBeVisible();
      await expect(message).toHaveText("Login successful!");

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

  test("login-page-9unameCaseSensitivity", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const uname = process.env.TS1_USERNAME;
      const pass = process.env.TS1_PASSWORD;
      await page.fill("#username", uname.toUpperCase());
      await page.fill("#password", pass);

      const loginButton = page.locator("#loginBtn");
      await loginButton.click();
      const message = page.locator("#message");
      await expect(message).toBeVisible();
      await expect(message).toHaveText("Invalid credentials.");

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

  test("login-page-10checkRedirect", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
      await page.waitForLoadState("networkidle");
      const uname = process.env.TS1_USERNAME;
      const pass = process.env.TS1_PASSWORD;
      await page.fill("#username", uname);
      await page.fill("#password", pass);
      const loginButton = page.locator("#loginBtn");
      await loginButton.click();

      await Promise.all([
        page.waitForNavigation(), // waits for the redirect to index.html
        page.click("#loginBtn"),
      ]);

      expect(page.url()).toContain("index.html");
      const pageText = await page.locator("body").textContent();
      expect(pageText).toContain("Bipi");
      expect(pageText).toContain("Email: bipi@example.com");

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
