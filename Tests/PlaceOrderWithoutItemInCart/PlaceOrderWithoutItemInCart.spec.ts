import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ProductPage} from "../../Pageobjects/ProductPage/ProductPage";
import {CartPage} from "../../Pageobjects/CartPage/CartPage";
import {PlaceOrderDialogPage} from "../../Pageobjects/PlaceOrderDialogPage/PlaceOrderDialogPage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this test is to place an order without adding an item to cart', async () => {
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

    test('Place an order without an item in the cart',async () => {
        await test.step('go to cart',async () => {
            await homePage.goToCart();
        })

        await test.step('click on place order',async () => {
            await cartPage.clickOnPlaceOrder();
        });

        await test.step('fill all the details',async () => {
           await placeOrderDialogPage.placeOrderAndFillDetails('James','USA','NY','12345','5','2022');
        });

        await test.step('validate message after filling details in dialog',async () => {
           await placeOrderDialogPage.validateOrderConfirmationMessage('error! no item in order');
        });
    })
});