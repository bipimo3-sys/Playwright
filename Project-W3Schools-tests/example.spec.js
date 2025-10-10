import { test, expect } from "@playwright/test";


test.only("add task", async ({ page }) => {
  await page.goto("https://www.w3schools.com");
  await page.waitForLoadState('networkidle');
  const loginButton = await page.locator('#tnb-login-btn');
  await loginButton.click();

  //await page.fill("#task", "Task 1");
  //await page.getByRole("button", { name: "Add New Task" }).click();
  //await page.press("#task", "Enter");

  //const taskItem = page.locator("#tasklist li", { hasText: "Task 1" });
  //await expect(taskItem).toHaveCount(1);

  //await taskItem.getByRole("button", { name: "Complete" }).click();
  //await expect(taskItem).toHaveClass(/li-completed/);
});
