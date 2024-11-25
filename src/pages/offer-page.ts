import type { Locator, Page } from '@playwright/test'

export class OfferPage {
  constructor(readonly page: Page) {}

  // Click Confir offer button and wait for corresponding responce and ensure
  // spinner is not visible
  async clickConfirmOfferButton(number: number) {
    const buttonLocator = `div:has([data-testid="find-offerlist-offerbox"]):nth-child(${number}) + div div button[data-testid="find-offerlist-offerbox-cta"]`
    await this.page.locator(buttonLocator).first().scrollIntoViewIfNeeded()
    await Promise.all([
      this.page.waitForResponse('**/find-api/v1/availability**'),
      this.page.locator(buttonLocator).first().click(),
    ])
    await this.page.waitForSelector('[data-status="loading"]', { state: 'hidden' })
  }

  async getOfferStatus(number: number) {
    return await this.page
      .locator(`div:has([data-testid="find-offerlist-offerbox"]):nth-child(${number}) + div div`)
      .first()
      .getAttribute('data-status')
  }

  async countConfirmedOffers() {
    await this.page.waitForSelector('[data-status="loading"]', { state: 'hidden' })
    return await this.page
      .locator('[data-testid="find-offerlist-offerbox"]:has(a[data-testid="find-offerlist-offerbox-cta"])')
      .count()
  }

  async offerBox() {
    this.page.locator('[data-testid="find-offerlist-offerbox" and data-status="neutral"]')
  }

  hotelName(): Locator {
    return this.page.locator('[data-testid="find-offerlist-hotel-name"]')
  }

  hotelRegion(): Locator {
    return this.page.locator('[data-testid="find-offerlist-hotel-region"]')
  }

  hotelRating(): Locator {
    return this.page.locator('[data-testid="find-offerlist-hotel-rating"]')
  }

  hotelRecommendation(): Locator {
    return this.page.locator('div:has(> div[data-testid="find-offerlist-hotel-rating"]) + div strong')
  }
}
