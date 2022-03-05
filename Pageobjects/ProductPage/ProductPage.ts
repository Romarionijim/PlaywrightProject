import {expect} from "@playwright/test";
import {HomePage} from "../HomePage/HomePage";

export class ProductPage extends HomePage {

    private productNameLocator = this.page.locator('[class="name"]');
    private productPriceLocator = this.page.locator('[class="price-container"]');
    private addToCartLocator = '[class="row"] [class="col-sm-12 col-md-6 col-lg-6"]>a';

    public async validateProductName(productName) {
        expect(await this.productNameLocator.innerText()).toBe(productName);
    }

    public async validateProductPrice(productPrice) {
        expect(await this.productPriceLocator.innerText()).toBe(productPrice);
    }

    public async addProductToCartAndAcceptAlert(alertBoxText:string) {
        await this.page.waitForTimeout(2000);
        await this.clickElement(this.addToCartLocator);
        await this.alertGetTextAndAccept(alertBoxText);
    }


}