import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {ApplicationUrl} from "../Enums/ApplicationUrl";
import * as assert from "assert";

export class BasePage {
    constructor(public page: Page) {
        this.page = page;
    }

    public async goTotUrl(appUrl: ApplicationUrl) {
        await this.page.goto(appUrl.valueOf());
    }

    public async fillText(el: string, text: string) {
        await this.page.locator(el).fill(text);
    }

    public async clickElement(el: string) {
        await this.page.waitForSelector(el);
        await this.page.locator(el).click();
    }

    public async hover(el: string) {
        await this.page.locator(el).hover();
    }

    public async wait(mills: number) {
        await this.page.waitForTimeout(mills);
    }

    public async alertAccept() {
        await this.page.on('dialog', dialog => {
            dialog.accept();
        });
    }

    public async alertDismiss() {
        await this.page.on('dialog', dialog => {
            dialog.dismiss();
        });
    }

    public async alertGetText() {
        await this.page.on('dialog', dialog => {
            dialog.message();

        });
    }

    public async alertGetTextAndAccept(text: string) {
        await this.page.on('dialog', dialog => {
            const message = dialog.message();
            expect(message).toBe(text);
            dialog.accept()
        });
    }

    public async handleAlert(text:string) {
        await this.page.on('dialog',dialog => {
            assert(dialog.message() === text);
            dialog.accept();

        })
    }

    public async getInnerText(element: string) {
        const el = await this.page.locator(element);
        return await el.innerText();
    }

    public async selectItemByIndex(item: string, index: number) {
        const itemLocator = await this.page.locator(item);
        await itemLocator.nth(index).click();
    }

    public validateActualResultAsExpected(expectedResult: string, actualResult: string) {
        expect(actualResult).toBe(expectedResult)
    }

    public async validateElementVisible(el:string,element:boolean = true) {
        const isVisible = await this.page.isVisible(el);
        if (isVisible && element) {
            await this.clickElement(el);
        }
    }

    public async waitForSelector(selector:string) {
        await this.page.waitForSelector(selector);
    }
}
