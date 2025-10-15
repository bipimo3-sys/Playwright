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

async function iframeTest(page, testInfo, deviceTestInfo) {
  try {
    const filePath = path.join(__dirname, "../ProjectTSApp/TS1_HTMLPlayground.html"); 
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    console.log("device test started- ", `${deviceTestInfo} - ${timestamp}`);

    await page.goto(`file://${filePath}`);

    const htmlInput = `<p><b><i>Hello world!</i></b></p>`;
    await page.waitForSelector("#textareaCode");
    const textarea = page.locator("#textareaCode");
    await expect(textarea).toHaveValue("<p>Hello Playwright!</p>");
    await page.screenshot({
      path: `screenshots/page1-${deviceTestInfo}-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot

    await textarea.fill(htmlInput);
    await page.locator("#runbtn").click();

    const frame = page.frameLocator("#iframeResult");
    await expect(frame.locator("body")).toContainText("Hello world!");

    await page.screenshot({
      path: `screenshots/page2-${deviceTestInfo}-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot
  } catch (err) {
    if (!page.isClosed()) {
      await testInfo.attach(
        `screenshots/error-${deviceTestInfo}-${timestamp}`,
        {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        }
      );
    }
    throw err; // rethrow so the test fails
  }
}

const deviceList = [
  {
    name: "Desktop",
    viewport: { width: 1024, height: 768 },
    userAgent: "Custom-Desktop",
  },
  {
    name: "Mobile",
    viewport: { width: 375, height: 667 },
    userAgent: "Custom-Mobile",
  },
  { name: "Pixel 5", device: devices["Pixel 5"] },
];

//teh below tests run in parallel
test.describe.parallel("Iframe tests", () => {
  for (const browserType of [chromium, firefox, webkit]) {
    for (const device of deviceList) {
      // Skip devices with isMobile for Firefox, it is creating errors
      if (browserType.name() === "firefox" && device.device?.isMobile) continue;

      test(`${
        device.name
      } test in ${browserType.name()}`, async ({}, testInfo) => {
        const browser = await browserType.launch();

        // If using a device preset like Pixel 5
        const context = device.device
          ? await browser.newContext(device.device)
          : await browser.newContext({
              viewport: device.viewport,
              userAgent: device.userAgent,
            });

        const page = await context.newPage();

        // Run your reusable iframe test
        await iframeTest(
          page,
          testInfo,
          `${device.name} test in ${browserType.name()}`
        );

        await browser.close();
      });
    }
  }
});
