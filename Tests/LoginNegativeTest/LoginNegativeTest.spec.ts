import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this is a test for negative login scenarios', async () => {
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

    test('login with invalid username', async () => {
        await test.step('click on login menu tab and fill an invalid username and a valid password and validate alert text', async () => {
            await homePage.login('noUserName', '123');
            await basePage.alertGetTextAndAccept('User does not exist.');
        });
    })

    test('login with invalid password', async () => {
        await test.step('click on login menu tab and fill an invalid password and a valid password and validate alert text', async () => {
           await homePage.login('QA_test','noSuchPassword');
           await basePage.alertGetTextAndAccept('Wrong password.');
        });
    });

    test('login without filling a username',async () => {
        await test.step('click on login menu tab and fill only a password and click on login',async () => {
           await homePage.login('','123');
           await basePage.alertGetTextAndAccept('Please fill out Username and Password.');
        });
    });

    test('login without filling a password',async () => {
        await test.step('click on login menu tab and fill only a username and click on login',async () => {
           await homePage.login('QA_test','');
           await basePage.alertGetTextAndAccept('Please fill out Username and Password.');
        });
    });

    test('login without filling anything',async () => {
        await test.step('click on login menu tab and dont fill anything in the login dialog',async () => {
            await homePage.login('','');
            await basePage.alertGetTextAndAccept('Please fill out Username and Password.');
        })
    });
});