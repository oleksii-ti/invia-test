import { expect, test } from '../src/fixtures/fixtures'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test(`should contain search form`, async ({ homePage }) => {
    expect(homePage.departureAirport()).toBeVisible
  })
})
