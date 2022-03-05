import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('This TC is to test the homepage screen crousel control functionality', async () => {
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

    test('move crousel control slider 3 times to the giht then 3 times to the left', async () => {
        await test.step('in homepage screen click on the next arrow slider 3 times (right arrow)', async () => {
            await homePage.clickOnHomePageCarouselControlNextArrow();
        });

        await test.step('in homepage screen click on the previous arrow slider 3 times (left arrow)', async () => {
            await homePage.clickOnHomePageCarouselControlPreviousArrow();
        });
    });
});