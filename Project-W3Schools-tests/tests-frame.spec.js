require("dotenv").config({ quiet: true });
import { test, expect } from "@playwright/test";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

test("iframe", async ({ page }, testInfo) => {
  try {
    const filePath = path.join(__dirname, "../App01/iframe.html");

    await page.goto(`file://${filePath}`);

    const htmlInput = `<p><b><i>Hello world!</i></b></p>`;
    await page.waitForSelector("#textareaCode");
    const textarea = page.locator("#textareaCode");
    await expect(textarea).toHaveValue("<p>Hello Playwright!</p>");
    await page.screenshot({
      path: `screenshots/page-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot

    await textarea.fill(htmlInput);

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
