import { test, expect } from "@playwright/test";

test.describe("Iframe2 API Mock Test", () => {
  test("should load mock API data and populate iframe", async ({ page }, testInfo) => {
    // Go to your locally served HTML page
    await page.goto("http://localhost:3000/App01/iframe2ApiMock.html");

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

    // Wait for textarea to be populated after the fetch
    const textarea = page.locator("#textareaCode");
    await expect(textarea).toHaveValue(/Mock User/, { timeout: 5000 });

    await page.screenshot({
      path: `screenshots/page-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot

    // Click the PopulateIframe button
    const runButton = page.locator("#populateBtn");
    await runButton.click();

    // Verify the iframe contains the expected text
    const frame = page.frameLocator("#iframeResult");
    await expect(frame.locator("body")).toContainText("Test User");

    await page.screenshot({
      path: `screenshots/page-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot

    // Attach screenshot for CI reports
    await testInfo.attach("iframe-populated", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });
});
