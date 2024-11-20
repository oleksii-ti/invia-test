import type { Locator, Page } from '@playwright/test'

export class LoginPopup {
  constructor(readonly page: Page) {}

  // Login Form
  emailField(): Locator {
    return this.page.locator('[data-testid="shared-authentication-signinWidget-emailAddress-textfield"]')
  }

  passwordField(): Locator {
    return this.page.locator('[data-testid="shared-authentication-signinWidget-currentPassword-textfield"]')
  }

  loginSubmit(): Locator {
    return this.page.locator('[data-testid="shared-authentication-signinWidget-submit-button"]')
  }

  // Error Messages
  incorrectEmailOrPassword(): Locator {
    return this.page.locator('[data-testid="shared-authentication-signinWidget-unverified-error-alert"]')
  }

  incorrectEmail(): Locator {
    return this.page.locator(
      'div:has(input[data-testid="shared-authentication-signinWidget-emailAddress-textfield"]) > span[data-testid="message"]'
    )
  }

  incorrectPassword(): Locator {
    return this.page.locator(
      'div:has(input[data-testid="shared-authentication-signinWidget-currentPassword-textfield"]) > span[data-testid="message"]'
    )
  }

  async waitForSubmit(): Promise<void> {
    await this.page.waitForResponse('**/post-api/account/login/traditional')
  }
}
