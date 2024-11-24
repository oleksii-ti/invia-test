import { expect, test } from '../src/fixtures/fixtures'
import { Assertions } from '../src/actions/assertions'

// Basic functionalities check on the Homepage:
// • Navigate to the homepage for each site.
// • Verify the presence of the following elements: o Destination, date,
//   transportation, and passenger selectors
// • Login button
// • Top destinations, Current offers, Articles sections
test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should contain tours search form', async ({ homePage }) => {
    expect(homePage.departureAirport()).toBeVisible()
    expect(homePage.datesField()).toBeVisible()
    expect(homePage.destinationFields()).toBeVisible()
    expect(homePage.travellersField()).toBeVisible()
    expect(homePage.searchButton()).toBeVisible()
  })

  test('should contain login link in My Account menu', async ({ homePage }) => {
    expect(homePage.myAccountIcon()).toBeVisible()
    await homePage.myAccountIcon().hover()
    expect(homePage.datesField()).toBeVisible()
  })

  test('should contain Top destinations, Current offers, Articles sections', async ({ homePage }) => {
    Assertions.verifyHomePageSections(homePage)
  })
})
