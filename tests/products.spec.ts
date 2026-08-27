import { test, expect } from '../fixtures/products.fixture'
import { ExcelReader } from '../utils/excelReader'

let productcases = ExcelReader.read('Products')
console.log(JSON.stringify(productcases))
console.log(ExcelReader.read('Products', 'SauceDemoTestData.xlsx'))

console.log("===================")
console.log(ExcelReader.getRowByTestCaseId('Products', 'PROD-01', 'SauceDemoTestData.xlsx'))
// console.log(ExcelReader.getRowByTestCaseId<any>('Products','PROD-01','SauceDemoTestData.xlsx')?.ProductsCount)
console.log((ExcelReader.getCellValue('Products', 'PROD-01', 'ProductsCount', 'SauceDemoTestData.xlsx')))


test.describe('SauceDemo Product Scenarios', () => {
      test('PROD-01 - Verify products page is display and products count',async({productsPage})=>{
      await productsPage.verifyPageLoaded();
      let expectProductsCount = Number(ExcelReader.getCellValue('Products','PROD-01','ProductsCount'));
      let actualProductsCount = await productsPage.getProductsCount();
      console.log(`expected count from excel: ${expectProductsCount}
                  Actual count from application: ${actualProductsCount}`)

      expect(actualProductsCount).toBe(expectProductsCount);
        })

    test('PROD-04 - have a valid non-negative price for each product', async ({ productsPage }) => {
        await productsPage.verifyPageLoaded();
        let productNames = await productsPage.getAllProductNames();
        for (let productName of productNames) {
            let productsPrice = await productsPage.inventoryItems.filter({ hasText: productName }).locator("//div[contains(@class,'inventory_item_name')]/ancestor::div[contains(@class,'inventory_item_description')]//div[contains(@class,'inventory_item_price')]").allTextContents();
            console.log(`productName: ${productName} productPrice: ${productsPrice}`)
        }
    })
//  add ticket 20260826
})
