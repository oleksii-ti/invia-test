import type { Locator, Page } from '@playwright/test'

export class HomePage {
  constructor(readonly page: Page) {}

  myAccountIcon(): Locator {
    return this.page.locator(`[data-test-id="shared-header-headercontrol-burgermenu"] a`)
  }
  departureAirport(): Locator {
    return this.page.locator(`[data-testid="airports-field"]`)
  }
}
