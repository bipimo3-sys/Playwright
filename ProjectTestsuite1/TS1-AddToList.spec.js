import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test, expect } from "@playwright/test";

test.describe.parallel("AddToList Page Parallel Tests", () => {
  test("addtolist-page-1InputFieldAvailable", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      //await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html1");
      await page.waitForLoadState("networkidle");

      const inputField = page.locator("#itemInput");
      await expect(inputField).toBeVisible();
      await expect(inputField).toBeEnabled();

      //await page.pause();

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

  test("addtolist-page-2AddToListButtonAvailable", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      const addButton = page.locator("#addBtn");
      await expect(addButton).toBeVisible();
      await expect(addButton).toBeEnabled();

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

  test("addtolist-page-3AddSingleItemToList", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      await page.fill("#itemInput", "saddfg");
      await page.click("#addBtn");
      const listItem = page.locator("#itemList li").first();
      await expect(listItem).toHaveText("saddfg");

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

  test("addtolist-page-4AddMultipleItemsToList", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      const items = ["Item 1", "Item 2", "Item 3"];
      for (const item of items) {
        await page.fill("#itemInput", item);
        await page.click("#addBtn");
        await page.waitForTimeout(100);
      }

      const listItems = page.locator("#itemList li");
      await expect(listItems).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(listItems.nth(i)).toHaveText(items[i]);
      }

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

  test("addtolist-page-5EmptyInputShowsError", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      await page.fill("#itemInput", "");
      await page.click("#addBtn");
      const errorMessage = page.locator("#message");
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("Please enter a value.");

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

  test("addtolist-page-6InputClearedAfterAdd", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      await page.fill("#itemInput", "asadasd");
      await page.click("#addBtn");
      const inputValue = await page.locator("#itemInput").inputValue();
      expect(inputValue).toBe("");
      const listItem = page.locator("#itemList li").last();
      await expect(listItem).toHaveText("asadasd");

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

  test("addtolist-page-7MessageHiddenAfterValidAdd", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      const message = page.locator("#message");
      const input = page.locator("#itemInput");
      const addButton = page.locator("#addBtn");

      await addButton.click();
      await expect(message).toBeVisible();
      await expect(message).toHaveText("Please enter a value.");

      await input.fill("1234324");
      await addButton.click();
      await expect(message).toHaveJSProperty("style.display", "none");
      const listItem = page.locator("#itemList li").last();
      await expect(listItem).toHaveText("1234324");

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

  test("addtolist-page-8ListItemsTextMatchesInput", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      const items = ["sdasd", "fsdfs", "fgd"];
      const input = page.locator("#itemInput");
      const addButton = page.locator("#addBtn");
      const listItems = page.locator("#itemList li");

      for (const item of items) {
        await input.fill(item);
        await addButton.click();
        await page.waitForTimeout(250);
      }
      for (let i = 0; i < items.length; i++) {
        await expect(listItems.nth(i)).toHaveText(items[i]);
      }

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

  test("addtolist-page-9FocusReturnsToInputAfterAdd", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      const input = page.locator("#itemInput");
      const addButton = page.locator("#addBtn");
      await input.fill("dsagfafg");
      await addButton.click();

      const isFocused = await input.evaluate(
        (el) => el === document.activeElement
      );
      expect(isFocused).toBe(true);

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

  test("addtolist-page-10NoDuplicateRestrictions", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
      await page.waitForLoadState("networkidle");

      const input = page.locator("#itemInput");
      const addButton = page.locator("#addBtn");
      const listItems = page.locator("#itemList li");

      const sampleItem = "Duplicate Item";

      await input.fill(sampleItem);
      await addButton.click();
      await input.fill(sampleItem);
      await addButton.click();

      const count = await listItems.count();
      expect(count).toBe(2);

      await expect(listItems.nth(0)).toHaveText(sampleItem);
      await expect(listItems.nth(1)).toHaveText(sampleItem);

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