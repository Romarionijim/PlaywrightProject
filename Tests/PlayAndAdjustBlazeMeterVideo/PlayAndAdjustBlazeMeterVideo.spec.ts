import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ProductPage} from "../../Pageobjects/ProductPage/ProductPage";
import {CartPage} from "../../Pageobjects/CartPage/CartPage";
import {PlaceOrderDialogPage} from "../../Pageobjects/PlaceOrderDialogPage/PlaceOrderDialogPage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this test clicks on about us menu button then plays and adjust the blaze meter video and closes it', async () => {
    let basePage: BasePage;
    let homePage: HomePage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let placeOrderDialogPage: PlaceOrderDialogPage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        placeOrderDialogPage = new PlaceOrderDialogPage(page);
        await basePage.goTotUrl(ApplicationUrl.DEMOBLAZE_WEBSITE);

    });

    test.afterEach(async ({context}) => {
        await context.clearCookies();
    });

    test('test blaze meter video functionality', async () => {
        await test.step('in homepage click on about us menu option then play and adjust video', async () => {
               await homePage.clickOnAboutUsMenuCategory_PlayAndAdjustVideo();
        });
    });
});