// pages/LoginPage.js
import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#loginBtn");
    this.message = page.locator("#message");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
    await this.page.waitForLoadState("networkidle");
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle("Login Page");
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getMessageText() {
    return await this.message.textContent();
  }

  async expectMessage(expectedText) {
    await expect(this.message).toBeVisible();
    await expect(this.message).toHaveText(expectedText);
  }

  async verifyLoginElementsVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
