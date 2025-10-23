// tests/login.spec.js
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test, expect } from "../fixtures/customFixtures.js";

test.describe.parallel("Login Page Tests (POM + Fixture)", () => {
  test("login-page-1load", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.verifyPageTitle();
  });

  test("login-page-2elementsVisible", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.verifyLoginElementsVisible();
  });

  test("login-page-3loginWithoutInputs", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.clickLogin();
    await loginPage.expectMessage("Please enter both username and password.");
  });

  test("login-page-4loginWithoutUname", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterPassword(process.env.TS1_PASSWORD);
    await loginPage.clickLogin();
    await loginPage.expectMessage("Please enter both username and password.");
  });

  test("login-page-5loginWithoutPass", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername(process.env.TS1_USERNAME);
    await loginPage.clickLogin();
    await loginPage.expectMessage("Please enter both username and password.");
  });

  test("login-page-6wrongUnamePass", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername("wrongUser");
    await loginPage.enterPassword("wrongPass");
    await loginPage.clickLogin();
    await loginPage.expectMessage("Invalid credentials.");
  });

  test("login-page-7correctUnamePass", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername(process.env.TS1_USERNAME);
    await loginPage.enterPassword(process.env.TS1_PASSWORD);
    await loginPage.clickLogin();
    await loginPage.expectMessage("Login successful!");
  });

  test("login-page-8unameCaseSensitivity", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername(process.env.TS1_USERNAME.toUpperCase());
    await loginPage.enterPassword(process.env.TS1_PASSWORD);
    await loginPage.clickLogin();
    await loginPage.expectMessage("Invalid credentials.");
  });

  test("login-page-9checkRedirect", async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.enterUsername(process.env.TS1_USERNAME);
    await loginPage.enterPassword(process.env.TS1_PASSWORD);
    await Promise.all([page.waitForURL(/index\.html/), loginPage.clickLogin()]);
    await expect(page).toHaveURL(/index\.html/);
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toContain("Bipi");
    expect(bodyText).toContain("Email: bipi@example.com");
  });
});
