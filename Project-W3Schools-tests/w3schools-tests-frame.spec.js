require("dotenv").config({ quiet: true });
import { test, expect } from "@playwright/test";
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

test("iframe", async ({ page }, testInfo) => {
  try {
    await page.goto(
      "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default"
    );
    //await page.waitForLoadState("networkidle");

    const htmlInput = `<p><b><i>Hello world!</i></b></p>`;
    //await page.waitForSelector("#textareaCode");
    const textarea = page.locator("#textareaCode");
    await textarea.fill(htmlInput);

    //await page.waitForSelector("#runbtn");
    await page.locator("#runbtn").click();

    //await page.waitForSelector("#iframeResult");
    const frame = page.frameLocator("#iframeResult");
    await expect(frame.locator("body")).toContainText("Hello world!");

    await page.screenshot({
      path: `screenshots/page-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot
  } catch (err) {

    if (!page.isClosed()) {
      await testInfo.attach(`screenshot-${timestamp}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
    throw err; // rethrow so the test fails
  }
});
