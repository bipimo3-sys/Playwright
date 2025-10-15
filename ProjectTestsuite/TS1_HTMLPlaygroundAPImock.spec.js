import { test, expect } from "@playwright/test";
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

test.describe("Iframe2 API Mock Test", () => {
  test("should load mock API data and populate iframe", async ({
    page,
  }, testInfo) => {
    // Go to your locally served HTML page
    const pagelink = "http://localhost:3000/ProjectTSApp/TS1_HTMLPlaygroundAPImock.html";
    await page.goto(pagelink);

    const textarea = page.locator("#textareaCode");

    // Wait until the textarea value contains either "Mock User" or "Test User"
    await expect(textarea).toHaveValue(/Mock User|Test User/, {
      timeout: 10000,
    });

    await page.screenshot({
      path: `screenshots/page-iframeAPImock1${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot

    await page.reload();
    await page.waitForSelector("#textareaCode");

    // Intercept /api/users and return mock response
    await page.route("**/api/users", async (route) => {
      const fakeResponse = {
        users: [
          { id: 101, name: "Test User 1" },
          { id: 102, name: "Test User 2" },
        ],
      };
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeResponse),
      });
    });

    // Go to your locally served HTML page
    await page.goto(pagelink);

    // Click the PopulateIframe button
    const runButton = page.locator("#populateBtn");
    await runButton.click();

    // Verify the iframe contains the expected text
    const frame = page.frameLocator("#iframeResult");
    await expect(frame.locator("body")).toContainText("Test User");

    await page.screenshot({
      path: `screenshots/page-iframeAPImock2${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot

    // Attach screenshot for CI reports
    await testInfo.attach("iframe-populated", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });
});
