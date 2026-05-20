import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../pages/SaucedemoLoginPage';
import { SaucedemoProductsPage } from '../pages/SaucedemoProductsPage';
import { TestData } from '../utils/TestData';
import { Logger } from '../utils/Logger';

/**
 * Saucedemo Login Test Suite
 * Validates login functionality for https://www.saucedemo.com/
 * Assessment Criteria:
 * - Correct usage of Playwright's selectors and assertions
 * - Handling navigation and synchronization effectively
 * - Usage of Playwright's built-in test runner and reporting features
 * - Code readability and maintainability
 */
test.describe('Saucedemo Login Functionality', () => {
  let saucedemoLoginPage: SaucedemoLoginPage;
  let saucedemoProductsPage: SaucedemoProductsPage;

  test.beforeEach(async ({ page }) => {
    Logger.info('Setting up Saucedemo test - Initializing page objects');
    saucedemoLoginPage = new SaucedemoLoginPage(page);
    saucedemoProductsPage = new SaucedemoProductsPage(page);
  });

  test('TC_SAUCEDEMO_001 - Validate successful login to saucedemo.com', async ({ page }) => {
    Logger.step('Step 1: Navigate to https://www.saucedemo.com/');
    await saucedemoLoginPage.navigate();
    Logger.info('Successfully navigated to saucedemo.com');

    Logger.step('Step 2: Enter username as "standard_user"');
    Logger.step('Step 3: Enter password as "secret_sauce"');
    Logger.step('Step 4: Click the Login button');
    await saucedemoLoginPage.login(
      TestData.SAUCEDEMO_USER.username,
      TestData.SAUCEDEMO_USER.password
    );
    Logger.info('Login credentials entered and login button clicked');

    Logger.step('Step 5: Verify successful login by checking products page');
    
    // Wait for navigation to products page
    await saucedemoProductsPage.waitForProductsPageLoad();
    Logger.info('Products page loaded successfully');

    // Verify products page is loaded
    const isProductsPageLoaded = await saucedemoProductsPage.isProductsPageLoaded();
    expect(isProductsPageLoaded, 'Products page should be loaded').toBeTruthy();
    Logger.info('✓ Products page inventory container is visible');

    // Verify user is logged in by checking for hamburger menu
    const isLoggedIn = await saucedemoProductsPage.isUserLoggedIn();
    expect(isLoggedIn, 'User should be logged in (hamburger menu visible)').toBeTruthy();
    Logger.info('✓ User is successfully logged in');

    // Verify page title is "Products"
    const pageTitle = await saucedemoProductsPage.getPageTitle();
    expect(pageTitle, 'Page title should be "Products"').toBe(TestData.MESSAGES.saucedemoProductsTitle);
    Logger.info(`✓ Page title verified: "${pageTitle}"`);

    // Verify current URL contains inventory
    const currentUrl = await saucedemoProductsPage.getCurrentUrl();
    expect(currentUrl, 'URL should contain inventory.html').toContain('inventory.html');
    Logger.info(`✓ Current URL verified: ${currentUrl}`);

    // Verify inventory items are displayed
    const itemCount = await saucedemoProductsPage.getInventoryItemCount();
    expect(itemCount, 'At least one product should be displayed').toBeGreaterThan(0);
    Logger.info(`✓ Products displayed: ${itemCount} items`);

    Logger.step('Step 6: Take screenshot after successful login');
    await saucedemoProductsPage.takeProductsPageScreenshot('saucedemo-login-success');
    Logger.info('✓ Screenshot captured: saucedemo-login-success.png');

    Logger.info('✅ Test TC_SAUCEDEMO_001 passed successfully - All assertions verified');
  });
});
