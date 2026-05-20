import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Products Page Object implementing Page Object Model pattern
 * Encapsulates saucedemo.com products page elements and actions
 */
export class SaucedemoProductsPage extends BasePage {
  // Page elements (locators) - Using actual saucedemo.com selectors
  private readonly pageTitle: Locator;
  private readonly inventoryContainer: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly hamburgerMenu: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/inventory.html');
    
    // Initialize locators with saucedemo.com specific selectors
    this.pageTitle = page.locator('.title');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
  }

  /**
   * Check if products page is loaded by verifying inventory container
   * @returns Boolean indicating if products page is loaded
   */
  async isProductsPageLoaded(): Promise<boolean> {
    return await this.isVisible(this.inventoryContainer);
  }

  /**
   * Get the page title text
   * @returns Page title text (should be "Products")
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Verify user is logged in by checking for hamburger menu presence
   * @returns Boolean indicating if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.hamburgerMenu);
  }

  /**
   * Get count of inventory items displayed
   * @returns Number of products displayed on the page
   */
  async getInventoryItemCount(): Promise<number> {
    // Wait for at least one inventory item to be visible (using .first() to avoid strict mode violation)
    await this.inventoryItems.first().waitFor({ state: 'visible', timeout: 10000 });
    return await this.inventoryItems.count();
  }

  /**
   * Take screenshot of the products page
   * @param screenshotName - Name for the screenshot file
   */
  async takeProductsPageScreenshot(screenshotName: string = 'products-page'): Promise<void> {
    await this.takeScreenshot(screenshotName);
  }

  /**
   * Wait for products page to load completely
   */
  async waitForProductsPageLoad(): Promise<void> {
    await this.waitForPageLoad();
    await this.waitForElement(this.inventoryContainer);
    await this.waitForElement(this.pageTitle);
  }
}
