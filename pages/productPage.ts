import {Locator, expect,Page} from '@playwright/test'

export class ProductsPage{
    //declaration of locators
    readonly page:Page;
    readonly pageTitle:Locator;
    readonly sortDropdown:Locator;
    readonly inventoryItems:Locator;
    readonly shoppingCartButton: Locator;

    //constructor
    constructor(page:Page){
        this.page = page;
        this.pageTitle = page.getByText('Products');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    }
    //methods
    async verifyPageLoaded(){
      await expect(this.pageTitle).toBeVisible();
    }
    async sortBy(optionValue:string){
       await this.sortDropdown.selectOption(optionValue);
    }
    async addItemToCart(){
    let itemCard=this.inventoryItems.filter({hasText:'itemName'})
    await itemCard.getByRole('button',{name:'Add to Cart'}).click();
    }
    async removeItemFromCart(){
    let itemCard=this.inventoryItems.filter({hasText:'itemName'})
    await itemCard.getByRole('button',{name:'Remove'}).click();
    }
    async openItemDetails(itemName:string){
    let itemCard=this.inventoryItems.filter({hasText:itemName})
    await itemCard.locator('[data-test="inventory-item-name"]').click();
    }
    
    async getAllProductNames(){
    return await this.inventoryItems.locator('[data-test="inventory-item-name"]').allInnerTexts();
    }
    async getAllProductCards(){
    // return await this.inventoryItems.all();
    }
    async openCart(){
    await this.shoppingCartButton.click();
    }
    async getProductsCount(){
        return await this.inventoryItems.count();
    }
}
