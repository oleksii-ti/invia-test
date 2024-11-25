import type { Locator, BrowserContext, Page } from '@playwright/test'

export class SearchResultPage {
  constructor(
    readonly page: Page,
    readonly context: BrowserContext
  ) {}

  async showMoreResults() {
    await Promise.all([
      this.page.waitForResponse('**/find-api/v1/hotels**'),
      this.page.waitForResponse('**/find-api/v1/images**'),
      this.page.click('[data-testid="find-hotellist-loadMoreButton"]'),
    ])
  }

  async goToOffer(number: number) {
    const [offerPagePromise] = await Promise.all([
      this.context.waitForEvent('page'),
      this.page.locator('[data-testid="find-hotellist-hotelbox-cta"]').nth(number).click(),
    ])
    const offerPage = await offerPagePromise

    await offerPage.waitForURL('/find/hotel/**')
    await offerPage.waitForResponse('**/find-api/v1/availability**')
    await offerPage.waitForLoadState('load')
    return offerPage
  }

  async getOfferInformation(number: number): Promise<Record<string, string>> {
    const mainSelector = '[data-testid="hotel-info"]'

    const getText = async (selector: string): Promise<string> => {
      const textContent = await this.page.locator(`${mainSelector} ${selector}`).nth(number).innerText()
      return textContent?.trim() || ''
    }
    let offerInfo = {
      region: await getText('div:has( > button[data-testid="find-hotellist-hotel-region"])'),
      name: await getText('[data-testid="find-hotellist-hotel-name"] a'),
      rating: await getText('[data-testid="find-hotellist-hotel-rating"]'),
      recommendation: await getText('div:has(> div[data-testid="find-hotellist-hotel-rating"]) + div strong'),
    }
    offerInfo.region = offerInfo.region.replace(`\n${offerInfo.name}`, '')
    return offerInfo
  }

  async openHotelBox(number: number) {
    await this.page.locator('[data-testid="find-hotellist-hotelbox"]').nth(number).scrollIntoViewIfNeeded()
    await Promise.all([
      this.page.waitForResponse('**/v1/ratings/hotel/**'),
      this.page.locator('[data-testid="find-hotellist-hotelbox"]').nth(number).click(),
    ])
  }

  hotelInfoPopup(): Locator {
    return this.page.locator('[data-state="open"] [role="dialog"]')
  }
}
