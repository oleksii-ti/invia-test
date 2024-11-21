import { expect, test } from '../src/fixtures/fixtures'

// Test Destination and Date selection:
// • Input a test destination (e.g., "Egypt") in the search bar.
// • Select a travel date range using the date picker.
// • Submit the search form and wait for the results page to load.
test.describe('Tour Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.only('should open search results page', async ({ homePage, searchResultPage, page }) => {
    await homePage.destinationFields().click()
    await homePage.destinationFields().fill('Egy')
    await homePage.autoconmpleteItem(0).click()
    await homePage.datesField().click()
    await homePage.setDate('2025-07-02', '2025-07-12')
    await homePage.searchButton().click()
    await page.waitForURL('/find/hotels**')
  })
})
