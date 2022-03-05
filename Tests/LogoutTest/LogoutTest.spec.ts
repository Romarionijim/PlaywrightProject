import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('This is a logout test - logout from the user',async () => {
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

   test('Login then logout',async () => {
         await test.step('login to demoblaze with an existimg username and password',async () => {
            await homePage.login('QA_test','123');
         });

         await test.step('validate name of user after logging in',async () => {
            await homePage.validateNameOfUserAfterLogin('Welcome QA_test');
         });

         await test.step('logout from this user',async () => {
            await homePage.logout();
         });

         await test.step('validate that login menu is displayed after logging out',async () => {
            await homePage.validateLoginMenuIsDisplayedAfterLogout('Log in');
         });
   });
});