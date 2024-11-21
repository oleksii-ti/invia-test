import { test as base } from '@playwright/test'
import { HomePage } from '../pages/home-page'
import { LoginPopup } from '../pages/login-popup'

type PageFixturtes = {
  homePage: HomePage
  loginPopup: LoginPopup
}

export const test = base.extend<PageFixturtes>({
  page: async ({ page }, use) => {
    const cookies = [
      {
        name: 'CookieConsent',
        value:
          "{stamp:'iL9j4mDoKjmdTEMc6g2QNUq9m+hHNOH8YNUmGK7dARZB46f21jlWeA==',necessary:true,preferences:false,statistics:false,marketing:false,method:'explicit',ver:7,utc:1731969341591,region:'de'}",
        domain: `www.ab-in-den-urlaub.${process.env.LOCALE}`,
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
  loginPopup: async ({ page }, use) => {
    await use(new LoginPopup(page))
  },
})

export { expect } from '@playwright/test'
