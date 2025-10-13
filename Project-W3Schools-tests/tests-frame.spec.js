import dotenv from "dotenv";
dotenv.config({ quiet: true });
import path from "path";
import { fileURLToPath } from "url";
import {
  test,
  expect,
  chromium,
  firefox,
  webkit,
  devices,
} from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

async function iframeTest(page, testInfo) {
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
}

for (const browserType of [chromium, firefox, webkit]) {
  test(`iframe test in ${browserType.name()}`, async ({}, testInfo) => {
    const browser = await browserType.launch();
    const normalContext = await browser.newContext({
      viewport: { width: 1024, height: 768 },
      userAgent: "Custom-Desktop-User-Agent",
    });

    let page = await normalContext.newPage();
    await iframeTest(page, testInfo);

    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: "Custom-Mobile-User-Agent",
    });

    page = await mobileContext.newPage();
    await iframeTest(page, testInfo);

    await browser.close();
  });
}

const Pixel = devices["Pixel 5"];

test.use({
  ...Pixel,
});

test("iframe test in pixel", async ({ page }, testInfo) => {
  await iframeTest(page, testInfo);
});
