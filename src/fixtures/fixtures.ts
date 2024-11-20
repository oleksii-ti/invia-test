import { test as base } from '@playwright/test'
import { HomePage } from '../pages/home-page'
import { LoginPage } from '../pages/login-page'

type PageFixturtes = {
  homePage: HomePage
  loginPage: LoginPage
}

export const test = base.extend<PageFixturtes>({
  page: async ({ page }, use) => {
    const cookies = [
      {
        name: 'CookieConsent',
        value:
          "{stamp:'iL9j4mDoKjmdTEMc6g2QNUq9m+hHNOH8YNUmGK7dARZB46f21jlWeA==',necessary:true,preferences:false,statistics:false,marketing:false,method:'explicit',ver:7,utc:1731969341591,region:'de'}",
        domain: 'www.ab-in-den-urlaub.de',
        path: '/',
        httpOnly: false,
        secure: true,
      },
    ]
    await page.context().addCookies(cookies)
    await use(page)
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
})

export { expect } from '@playwright/test'
