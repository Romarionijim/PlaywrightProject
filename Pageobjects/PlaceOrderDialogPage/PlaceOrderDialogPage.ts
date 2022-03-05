import {CartPage} from "../CartPage/CartPage";
import {expect} from "@playwright/test";
import {HomePage} from "../HomePage/HomePage";

export class PlaceOrderDialogPage extends HomePage {

    private nameFieldLocator = '#name >> visible=true';
    private countryFieldLocator = '#country';
    private cityFieldLocator = '#city';
    private creditCardFieldLocator = '#card';
    private monthFieldLocator = '#month';
    private yearFieldLocator = '#year';
    private orderConfirmationDialogHeaderMessage = '[class="sweet-alert  showSweetAlert visible"] h2';
    private orderConfirmationDialogOkButton = '[class="confirm btn btn-lg btn-primary"]';

    public async placeOrderAndFillDetails(name:string,country:string,city:string,creditCardNum:string,month:string,year:string) {
        await this.page.waitForTimeout(2000);
        await this.fillText(this.nameFieldLocator,name);
        await this.fillText(this.countryFieldLocator,country);
        await this.fillText(this.cityFieldLocator,city);
        await this.fillText(this.creditCardFieldLocator,creditCardNum);
        await this.fillText(this.monthFieldLocator,month);
        await this.fillText(this.yearFieldLocator,year);
        await this.clickOnPrimaryDialogButton();
    }

    public async validateOrderConfirmationMessage(orderHeaderMessage:string) {
        const confirmationHeaderMessage = await this.page.locator(this.orderConfirmationDialogHeaderMessage);
        expect(await confirmationHeaderMessage.innerText()).toBe(orderHeaderMessage);
        await this.clickElement(this.orderConfirmationDialogOkButton);
    }
}