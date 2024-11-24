import { expect, test } from '../src/fixtures/fixtures'

// Implement the login process using incorrect credentials. The following
// cases are covered:
// • Invalid email
// • incorrect email and password
// • Existing email and wrong password
test.describe('Login with incorrect credentials', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show invalid email error when email is invalid ', async ({ homePage, loginPopup }) => {
    await homePage.myAccountIcon().hover()
    await homePage.loginButton().click()
    await loginPopup.emailField().fill('invalid_email')
    await loginPopup.passwordField().fill('password')
    await loginPopup.loginSubmit().click()
    expect(loginPopup.incorrectEmail()).toBeVisible()
    expect(loginPopup.incorrectPassword()).not.toBeVisible()
    expect(loginPopup.incorrectEmailOrPassword()).not.toBeVisible()
  })

  test('should show incorrect email or password error', async ({ homePage, loginPopup }) => {
    await homePage.myAccountIcon().hover()
    await homePage.loginButton().click()
    await loginPopup.emailField().fill('invalid_email@gmail.com')
    await loginPopup.passwordField().fill('password')
    await loginPopup.loginSubmit().click()
    await loginPopup.waitForSubmit()
    expect(loginPopup.incorrectEmail()).toBeVisible()
    expect(loginPopup.incorrectPassword()).toBeVisible()
    expect(loginPopup.incorrectEmailOrPassword()).toBeVisible()
  })

  test('should show incorrect email or password error for existing user with wrong password', async ({
    homePage,
    loginPopup,
  }) => {
    await homePage.myAccountIcon().hover()
    await homePage.loginButton().click()
    await loginPopup.emailField().fill('oleksii.ti@gmail.com')
    await loginPopup.passwordField().fill('password')
    await loginPopup.loginSubmit().click()
    await loginPopup.waitForSubmit()
    expect(loginPopup.incorrectEmail()).toBeVisible()
    expect(loginPopup.incorrectPassword()).toBeVisible()
    expect(loginPopup.incorrectEmailOrPassword()).toBeVisible()
  })
})
