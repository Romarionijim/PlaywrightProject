import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this TC is about testing the next and previous buttons on the end of the page',async () => {
    let basePage: BasePage;
    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
       basePage = new BasePage(page);
       homePage = new HomePage(page);
       await basePage.goTotUrl(ApplicationUrl.DEMOBLAZE_WEBSITE);
    });

    test.afterEach(async ({context}) => {
        await context.clearCookies();
    })

    test('test the next and previous button functionality',async () => {
        await test.step('click on next button then click on previous button',async () => {
           await homePage.clickOnNextButton();
           await homePage.clickOnPreviousButton();
        });
    });
});