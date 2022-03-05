import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('send contact information via contact menu option',async () => {
    let basePage: BasePage;
    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
       basePage = new BasePage(page);
       homePage = new HomePage(page);
       await homePage.goTotUrl(ApplicationUrl.DEMOBLAZE_WEBSITE);
    });

    test.afterEach(async ({context}) => {
        await context.clearCookies();
    });

    test('clicking on contact and sending contact information',async () => {
        await test.step('click on contacts menu fill and send contact info then accept alert and get alert text',async () => {
            await homePage.fillContactInfo('random@random.com','James','This is a test message','Thanks for the message!!');
        })
    })
});