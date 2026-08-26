import {test as base, expect} from '@playwright/test'
import{LoginPage} from '../pages/loginPage'
import {ProductsPage} from '../pages/productPage'
import dotenv from 'dotenv' 
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../test.env')})

//declaration of fictures

export type ProductsPageFixture = {
    productsPage: ProductsPage
}

export let test= base.extend<ProductsPageFixture>({
    productsPage: async ({ page }, use) => {
        const baseUrl = process.env.SAUCEDEMO_url;
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        if (!baseUrl || !username || !password) {
            throw new Error('Missing required env vars in test.env: SAUCEDEMO_url, USERNAME, PASSWORD');
        }

        let loginPage = new LoginPage(page);
        await loginPage.navigationToLoginPage(baseUrl);
        await loginPage.performLogin(username, password);

        let productsPage = new ProductsPage(page)
        await productsPage.verifyPageLoaded();

        await use(productsPage)
        
        console.log('this is teardown')
    }
})
export{expect}