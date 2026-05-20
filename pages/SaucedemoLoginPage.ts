import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Login Page Object implementing Page Object Model pattern
 * Encapsulates saucedemo.com login page elements and actions
 */
export class SaucedemoLoginPage extends BasePage {
  // Page elements (locators) - Using actual saucedemo.com selectors
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/');
    
    // Initialize locators with saucedemo.com specific selectors
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Perform login with username and password
   * @param username - Username for login
   * @param password - Password for login
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Get error message text
   * @returns Error message displayed on the page
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if login button is enabled
   * @returns Boolean indicating if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  /**
   * Check if error message is displayed
   * @returns Boolean indicating if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Clear login form
   */
  async clearForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
