# Playwright Test Automation Framework

## Overview
A robust, scalable, and maintainable test automation framework built with Playwright and TypeScript, implementing the Page Object Model (POM) design pattern.

## Features
- ✅ **Page Object Model (POM)** - Maintainable and reusable page objects
- ✅ **TypeScript** - Type-safe code with IntelliSense support
- ✅ **Multi-browser Support** - Chromium, Firefox, WebKit, and mobile viewports
- ✅ **Parallel Execution** - Fast test execution with parallel workers
- ✅ **Comprehensive Reporting** - Allure reports, HTML reports, JSON, and JUnit XML
- ✅ **Retry Mechanism** - Automatic retry for flaky tests
- ✅ **Screenshot & Video** - Capture on failure for debugging
- ✅ **Logging** - Structured logging for better traceability
- ✅ **Environment Configuration** - Flexible configuration management
- ✅ **CI/CD Ready** - Configured for continuous integration

## Project Structure
```
playwright-framework/
├── pages/                       # Page Object Model classes
│   ├── BasePage.ts             # Base page with common methods
│   ├── SaucedemoLoginPage.ts   # SauceDemo login page object
│   └── SaucedemoProductsPage.ts # SauceDemo products page object
├── tests/                      # Test specifications
│   └── login.spec.ts          # SauceDemo login test suite
├── utils/                      # Utility classes
│   ├── TestData.ts            # Test data management
│   ├── Logger.ts              # Custom logger
│   └── TestHelpers.ts         # Helper functions
├── test-results/              # Test execution results (generated)
├── playwright-report/         # HTML test reports (generated)
├── allure-results/            # Allure test results (generated)
├── allure-report/             # Allure HTML reports (generated)
├── screenshots/               # Test screenshots (generated)
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project dependencies
├── .env.example               # Environment variables template
├── FRAMEWORK_GUIDE.md         # Framework usage guide
├── SAUCEDEMO_TEST_GUIDE.md    # SauceDemo test execution guide
└── README.md                  # This file
```

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-framework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

### Debug tests
```bash
npx playwright test --debug
```

## Reporting

### View HTML Report
```bash
npx playwright show-report
```

### Generate Allure Report
```bash
# Generate and open Allure report
allure generate allure-results --clean -o allure-report
allure open allure-report
```

### View Test Results
- HTML Report: `playwright-report/index.html`
- Allure Report: `allure-report/index.html`
- JSON Results: `test-results/results.json`
- JUnit XML: `test-results/junit.xml`

## Writing Tests

### Create a new Page Object
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class YourPage extends BasePage {
  private readonly element: Locator;

  constructor(page: Page) {
    super(page, '/your-url');
    this.element = page.locator('#element-id');
  }

  async yourMethod(): Promise<void> {
    await this.click(this.element);
  }
}
```

### Create a new Test
```typescript
import { test, expect } from '@playwright/test';
import { YourPage } from '../pages/YourPage';
import { Logger } from '../utils/Logger';

test.describe('Your Test Suite', () => {
  test('Your test case', async ({ page }) => {
    Logger.step('Test step description');
    const yourPage = new YourPage(page);
    await yourPage.navigate();
    // Your test logic
  });
});
```

## Best Practices

1. **Page Object Model**
   - Keep page objects focused on a single page
   - Use descriptive names for locators and methods
   - Extend BasePage for common functionality

2. **Test Organization**
   - Group related tests in describe blocks
   - Use meaningful test names
   - Keep tests independent and isolated

3. **Locators**
   - Prefer user-facing attributes (text, role, label)
   - Use data-testid for stable selectors
   - Avoid CSS selectors that depend on implementation

4. **Assertions**
   - Use Playwright's auto-waiting assertions
   - Make assertions specific and meaningful
   - Add custom error messages for clarity

5. **Error Handling**
   - Use try-catch for expected failures
   - Log errors with context
   - Take screenshots on failure

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests are failing
- Check if browsers are installed: `npx playwright install`
- Verify environment variables in `.env`
- Run in headed mode to see what's happening: `npx playwright test --headed`
- Enable debug mode: `npx playwright test --debug`

### Slow test execution
- Reduce parallel workers in `playwright.config.ts`
- Disable video recording for faster execution
- Use `networkidle` wait strategy sparingly

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Support
For issues and questions, please create an issue in the repository.

## Author
QA Professional

---
**Happy Testing! 🚀**