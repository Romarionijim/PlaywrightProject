import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('This is a login test for DemoBlaze website', async () => {
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

    test('login with an existing username and password', async () => {
        await test.step('click on login menu tab and fill in your login details', async () => {
            await homePage.login('QA_test', '123');
        });

        await test.step('validate name of user after logging in', async () => {
            await homePage.validateNameOfUserAfterLogin('Welcome QA_test');
        });
    });
});