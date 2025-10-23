// fixtures/customFixtures.js
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

export const test = base.extend({
  loginPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);

    // Attach screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      await testInfo.attach(`failure-${timestamp}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
  },
});

export { expect } from "@playwright/test";
