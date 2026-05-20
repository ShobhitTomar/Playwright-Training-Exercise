/**
 * Test data management utility
 * Centralizes test data for maintainability and reusability
 */
export class TestData {
  // Saucedemo credentials
  static readonly SAUCEDEMO_USER = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  // Test URLs
  static readonly URLS = {
    saucedemo: 'https://www.saucedemo.com/'
  };

  // Expected messages
  static readonly MESSAGES = {
    saucedemoProductsTitle: 'Products'
  };

  // Timeouts
  static readonly TIMEOUTS = {
    short: 5000,
    medium: 10000,
    long: 30000
  };
}