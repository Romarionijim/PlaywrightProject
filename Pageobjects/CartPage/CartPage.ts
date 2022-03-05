import {HomePage} from "../HomePage/HomePage";
import {expect} from "@playwright/test";

export class CartPage extends HomePage {

    private productDetails = '[class="success"]';
    private totalAmountLocator = '#totalp';
    private placeOrderButtonLocator = '[class="btn btn-success"]';
    private deleteItemFromCartLocator = '[class="success"] a >> nth=-1'


    public async validateProductTitle(index: number, productTitleText: string) {
        const productRow = await this.page.locator(this.productDetails).locator('td');
        const productTitle = productRow.nth(index);
        expect(await productTitle.innerText()).toBe(productTitleText);
    }

    public async validateTotalAmount(amount: string) {
        await this.wait(2000);
        const totalAmountText = this.page.locator(this.totalAmountLocator);
        expect(await totalAmountText.innerText()).toBe(amount);
    }

    public async clickOnPlaceOrder() {
        await this.clickElement(this.placeOrderButtonLocator);
    }

    public async deleteItemFromCart(deleteLocator: boolean = true) {
        const isVisible = await this.page.isVisible(this.deleteItemFromCartLocator);
        if (isVisible && deleteLocator) {
            await this.clickElement(this.deleteItemFromCartLocator);
        } else {
            console.log('element is not visible');
        }
    }


    public async validateProductDetails(index: number, title: string, price: string) {
        const itemRow = await this.page.locator(this.productDetails).nth(index);
        const itemTitle = itemRow.locator('td').nth(1);
        const itemPrice = itemRow.locator('td').nth(2);
        expect(await itemTitle.innerText()).toBe(title);
        expect(await itemPrice.innerText()).toBe(price);
    }

    /**@description this function goes over the product details array that is in the cart page then goes over the product details through a loop then validates the product details and clicks on the delete button to remove the item form cart
     * @param index
     * @param title
     * @param price
     */
    public async deleteItemFromList(index: number, title: string, price: string) {
        const productDetailsArray = [title, price];
        for (let i = 0; i < productDetailsArray.length; i++) {
            const itemRows = await this.page.locator(this.productDetails).nth(index);
            //only for i = 1 we jump over to third cell [2] and get the innerText
            if (i === 1) {
                const itemRowCellDetails = itemRows.locator('td').nth(i + 1);
                expect(await itemRowCellDetails.innerText()).toBe(productDetailsArray[i]);
                await this.deleteItemFromCart()
                continue;
            }
            // only for i = 0 we jump over to second [1] cell and get the innerText
            if (i === 0) {
                const itemRowCellDetails = itemRows.locator('td').nth(i + 1);
                expect(await itemRowCellDetails.innerText()).toBe(productDetailsArray[i]);
                await this.deleteItemFromCart();
                break;
            }
        }
    }
}