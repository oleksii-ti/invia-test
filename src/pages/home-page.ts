import type { Locator, Page } from '@playwright/test'

export class HomePage {
  constructor(readonly page: Page) {}

  // My Account 
  myAccountIcon(): Locator {
    return this.page.locator('[data-testid="shared-header-headercontrol-login"]')
  }

  loginButton(): Locator {
    return this.page.locator('[data-testid="shared-header-headercontrol-login"] a')
  }

  // Search Form
  departureAirport(): Locator {
    return this.page.locator('[data-testid="airports-field"]')
  }

  datesField(): Locator {
    return this.page.locator('[data-testid="travel-period-field"]')
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
