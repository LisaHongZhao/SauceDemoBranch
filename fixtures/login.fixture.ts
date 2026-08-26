import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
//declaration of fictures

export type LoginPageFixture = {
    loginPage: LoginPage
}
export let test = base.extend<LoginPageFixture>({

    loginPage: async ({ page }, use) => {

        let loginPage = new LoginPage(page)
        await loginPage.navigationToLoginPage('https://www.saucedemo.com/')
        await use(loginPage)
    }
})
export { expect }  