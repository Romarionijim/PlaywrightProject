import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('sign up negative test', async () => {
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

    test('sign up with an existing username',async () => {
       await test.step('click on sign up menu option and fill an existing username and password',async () =>{
           await homePage.signup('QA_test','123','This user already exist.');
       });
    });

    test('sign up without filling a username',async () => {
       await test.step('click on sign up menu option and fillOut only a password',async () => {
        await homePage.signup('','12345','Please fill out Username and Password.')
       });
    });

    test('sign up without filling a password',async () => {
       await test.step('click on sign up menu option and fillOut only a username',async () => {
          await homePage.signup('newUser00001','','Please fill out Username and Password.');
       });
    });

    test('sign up without filling anything',async () =>{
       await test.step('click on sign up menu option without filling anything in the dialog',async () => {
          await homePage.signup('','','Please fill out Username and Password.');
       });
    });
});