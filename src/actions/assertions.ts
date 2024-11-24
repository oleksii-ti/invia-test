import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home-page";

export class Assertions {

  static verifyHomePageSections(homePage: HomePage) {
    expect(homePage.topDestinationsSection()).toBeVisible()
    if (process.env.LOCALE === 'de') {
      expect(homePage.currentOffersSection()).toBeVisible()
      expect(homePage.articlesSection()).toBeVisible()
    }
  }
}