import type { Locator, Page } from '@playwright/test'
export class HomePage {
  constructor(readonly page: Page) {}

  // My Account
  myAccountIcon(): Locator {
    return this.page.locator('[data-testid="shared-header-headercontrol-login"]')
  }

  loginButton(): Locator {
    return this.page.locator('[data-testid="shared-header-headercontrol-burgermenu"] a:first-child')
  }

  // Search Form
  departureAirport(): Locator {
    return this.page.locator('[data-testid="airports-field"]')
  }

  datesField(): Locator {
    return this.page.locator('[data-testid="shared-searchForm-travel-period"]')
  }

  destinationFields(): Locator {
    return this.page.locator('[data-testid="destination-field"]')
  }

  travellersField(): Locator {
    return this.page.locator('[data-testid="travellers-field-multiroom"]')
  }

  searchButton(): Locator {
    return this.page.locator('[data-testid="submit"]')
  }

  async clickSearchButton() {
    await Promise.all([
      this.page.waitForResponse('**/search-api/keywords/**'),
      this.page.waitForURL('**/find/hotels**'), 
      this.searchButton().click()
    ])
  }

  autoconmpleteItem(number: number): Locator {
    return this.page.locator('ul[id*=-menu] > li[id*=item-] > div').nth(number)
  }

  // Calendar
  /**
   * Function set end and strt dates in calendar and  click Next and Accept buttons
   * @param startDate start date in the format '2025-07-12'
   * @param endDatestart end date in the format '2025-07-22'
   */
  async setDate(startDate: string, endDate: string) {
    await this.page.click(`[data-date="${startDate}"]`)
    await this.page.click(`[data-date="${endDate}"]`)
    await this.page.click('button [data-testid="IconArrowForward"]')
    await this.page.click('[data-testid="travel-period-widget"] button')
  }

  // Sections
  topDestinationsSection(): Locator {
    return this.page.locator('[data-cy="home-popularDestinations"]')
  }

  currentOffersSection(): Locator {
    return this.page.locator('[data-cy="search-seomulti-main-currentOffers"]')
  }

  articlesSection(): Locator {
    return this.page.locator('[data-cy="search-seomulti-main-magazineArticles"]')
  }
}
