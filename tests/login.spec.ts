import {test, expect } from '../fixtures/login.fixture'
import dotenv from 'dotenv'
import path from 'path'
import {JsonReader} from '../utils/jsonReader'

//tagging
//tracing

//reading the environment file
dotenv.config({path:path.resolve(__dirname,'../test.env')})
console.log(__dirname)
console.log(path.resolve(__dirname,'../test.env'))

let url=process.env.SAUCEDEMO_url as string
let username=process.env.USERNAME as string
let password=process.env.PASSWORD as string

//reading the data from json
let testdata =JsonReader.read<any>('sauceDemoData.json')
let lockedUser = testdata.credentials.lockedUser

// test.describe('SauceDemo Login tests',()=>{
//     test('login with valid credentials',async({loginPage,page})=>{
//         await loginPage.enterUserName(username)
//         await loginPage.enterPassword(password)
//         await loginPage.clickLoginButton()
//         //actions
//         //loginPage.performLogin('standard_user','secret_sauce');
//         //assertions
//          await expect(page).toHaveURL(/\/inventory\.html/);
//         // await expect(page.getByText('Products')).toBeVisible();
//         await expect(loginPage.productPageTitle).toBeVisible();
//     })
//     test('should not login with locked user',async({loginPage,page})=>{

//         loginPage.performLogin(lockedUser,password)
//         await expect(loginPage.errorMessage).toBeVisible();
//         await expect(loginPage.errorMessage).toHaveText(testdata.expectedMessages.lockedUser);

//     })
//     //complete login without username
//     //login without password
//     //incorrect password
// })