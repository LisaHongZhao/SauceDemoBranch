import { Locator,Page, expect} from '@playwright/test'

export class LoginPage {
    //declaration of locators
    readonly page: Page
    readonly userNameInput: Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    readonly errorMessage: Locator;
    readonly productPageTitle: Locator;

    //construnctor
    constructor(page: Page){
        this.page = page;
        this.userNameInput = page.locator('[data-test="username"]')     //css
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        this.errorMessage = page.locator('[data-test="error"]')
        this.productPageTitle =page.getByText('Products')
    }
    //reused methods
    async navigationToLoginPage(url:string): Promise<void> {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
    }
    async enterUserName(username: string): Promise<void> {
        await this.userNameInput.fill(username);
    }
    async enterPassword(password:string):Promise<void>{
        await this.passwordInput.fill(password);
    }
    async clickLoginButton():Promise<void>{
        await this.loginButton.click();
    }
    async performLogin(username: string,password:string):Promise<void>{
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
    async getErrorText(): Promise<string> {
        return this.errorMessage.innerText();
    }
    async validateLandingPage(): Promise<boolean> {
       return this.productPageTitle.isVisible();
    }
}