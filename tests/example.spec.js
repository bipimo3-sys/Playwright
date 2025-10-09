import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Resume/index.html");

  await expect(page).toHaveTitle("Resume - Bipi");
});

test("login", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Resume/index.html");

  await page.fill("#name", "admin");
  await page.fill("#password", "admin123");
  page.once("dialog", async (dialog) => {
    console.log("alert message", dialog.message());
    expect(dialog.message()).toBe("Login success");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Login" }).click();
});

test.only("add task", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Resume/index.html");

  await page.fill("#task", "Task 1");
  await page.getByRole("button", { name: "Add New Task" }).click();
  //await page.press("#task", "Enter");
});
