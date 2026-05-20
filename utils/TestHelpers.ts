import { Page } from '@playwright/test';
import { Logger } from './Logger';

/**
 * Test helper utilities for common test operations
 * Provides reusable helper methods to reduce code duplication
 */
export class TestHelpers {
  /**
   * Wait for a specific amount of time
   */
  static async wait(milliseconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Generate random email address
   */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `testuser_${timestamp}_${random}@example.com`;
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Clear all cookies
   */
  static async clearCookies(page: Page): Promise<void> {
    Logger.info('Clearing all cookies');
    await page.context().clearCookies();
  }

  /**
   * Clear local storage
   */
  static async clearLocalStorage(page: Page): Promise<void> {
    Logger.info('Clearing local storage');
    await page.evaluate(() => localStorage.clear());
  }

  /**
   * Clear session storage
   */
  static async clearSessionStorage(page: Page): Promise<void> {
    Logger.info('Clearing session storage');
    await page.evaluate(() => sessionStorage.clear());
  }

  /**
   * Get current timestamp
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Retry function with exponential backoff
   */
  static async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        Logger.warn(`Attempt ${attempt + 1} failed: ${lastError.message}`);
        
        if (attempt < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, attempt);
          Logger.info(`Retrying in ${delay}ms...`);
          await this.wait(delay);
        }
      }
    }
    
    throw lastError;
  }
}