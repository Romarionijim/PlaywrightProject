import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

/**@Author Romario Nijim
 * @Link
 */

test.describe('this is a sign up test @Run', async () => {
    let basePage: BasePage;
    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        homePage = new HomePage(page)
        await basePage.goTotUrl(ApplicationUrl.DEMOBLAZE_WEBSITE);
    });

    test.afterEach(async ({context}) => {
        await context.clearCookies();
    })

    test('signup test', async () => {
       await test.step('click on signup menu button and fill your details',async () => {
            await homePage.signup('playwrightTest1','Qa123','Sign up successful.');
       });
    });

});