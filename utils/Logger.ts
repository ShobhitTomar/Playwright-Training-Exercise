/**
 * Custom logger utility for test execution
 * Provides structured logging for better debugging and traceability
 */
export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  /**
   * Log info level message
   */
  static info(message: string): void {
    console.log(this.formatMessage('INFO', message));
  }

  /**
   * Log error level message
   */
  static error(message: string, error?: Error): void {
    console.error(this.formatMessage('ERROR', message));
    if (error) {
      console.error('Stack trace:', error.stack);
    }
  }

  /**
   * Log warning level message
   */
  static warn(message: string): void {
    console.warn(this.formatMessage('WARN', message));
  }

  /**
   * Log debug level message
   */
  static debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.debug(this.formatMessage('DEBUG', message));
    }
  }

  /**
   * Log test step
   */
  static step(stepName: string): void {
    console.log(this.formatMessage('STEP', `Executing: ${stepName}`));
  }
}