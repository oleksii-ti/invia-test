import { expect, test } from '../src/fixtures/fixtures'
import { OfferPage } from '../src/pages/offer-page'

// Test Search result page
test.describe('Tour Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // Input a test destination (e.g., "Egypt") in the search bar.
  // Select a travel date range using the date picker.
  // Submit the search form and wait for the results page to load.
  test('should open search results page', async ({ homePage, page }) => {
    await homePage.destinationFields().click()
    await homePage.destinationFields().fill('Egy')
    await homePage.autoconmpleteItem(0).click()
    await homePage.datesField().click()
    await homePage.setDate('2025-07-02', '2025-07-12')
    await homePage.clickSearchButton()
    expect(page.url()).toContain('/find/hotels')
  })

  // Navigate to the second page of search results.
  // Select any offer.
  // Verify the text on offer page correspond to offer informaion from search list
  test('should open second search page and verify offer information', async ({ homePage, searchResultPage }) => {
    await homePage.destinationFields().click()
    await homePage.destinationFields().fill('Egy')
    await homePage.autoconmpleteItem(0).click()
    await homePage.datesField().click()
    await homePage.setDate('2025-07-02', '2025-07-12')
    await homePage.clickSearchButton()
    const offerInfo = await searchResultPage.getOfferInformation(2)
    const offerTab = await searchResultPage.goToOffer(2)
    const offerPage = new OfferPage(offerTab)
    expect((await offerPage.hotelRegion().innerText()).trim()).toEqual(offerInfo.region)
    expect((await offerPage.hotelName().innerText()).trim()).toEqual(offerInfo.name)
    expect((await offerPage.hotelRating().innerText()).trim()).toEqual(offerInfo.rating)
    expect((await offerPage.hotelRecommendation().innerText()).trim()).toEqual(offerInfo.recommendation)
  })


  // Navigate to the second page of search results.
  // Select any offer.
  // Confirm the selection by clicking on the offer box.
  test('should open second search page and open any hotel info box', async ({ homePage, searchResultPage }) => {
    await homePage.destinationFields().click()
    await homePage.destinationFields().fill('Egy')
    await homePage.autoconmpleteItem(0).click()
    await homePage.datesField().click()
    await homePage.setDate('2025-07-02', '2025-07-12')
    await homePage.clickSearchButton()
    const offerInfo = await searchResultPage.getOfferInformation(2)
    
    const offerTab = await searchResultPage.goToOffer(2)
    const offerPage = new OfferPage(offerTab)
    const counfirmedOffers = await offerPage.countConfirmedOffers()

    // Confirm first unconfimed offer
    const testOfferNumber = counfirmedOffers + 1
    expect(await offerPage.getOfferStatus(testOfferNumber)).toEqual('neutral')
    const offer = await offerPage.clickConfirmOfferButton(testOfferNumber)
    expect(await offerPage.getOfferStatus(testOfferNumber)).toEqual('success')
  })
})
