import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this test navigates between categories side menu options', async () => {
    let basePage: BasePage;
    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        homePage = new HomePage(page);
        await basePage.goTotUrl(ApplicationUrl.DEMOBLAZE_WEBSITE);
    });

    test.afterEach(async ({context}) => {
        await context.clearCookies();
    });

    test('navigate between side menu categories', async () => {
        await test.step('navigate between the categories', async () => {
            await homePage.chooseCategoryFromCategorySideMenuList('Phones');
            await homePage.chooseCategoryFromCategorySideMenuList('Laptops');
            await homePage.chooseCategoryFromCategorySideMenuList('Monitors');
        });
    });
});