import type { Page } from '@playwright/test'

export class LoginPage {
  constructor(readonly page: Page) {}
}
