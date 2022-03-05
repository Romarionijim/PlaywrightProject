import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ProductPage} from "../../Pageobjects/ProductPage/ProductPage";
import {CartPage} from "../../Pageobjects/CartPage/CartPage";
import {PlaceOrderDialogPage} from "../../Pageobjects/PlaceOrderDialogPage/PlaceOrderDialogPage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this test is an e2e test from placing an order and finishing transaction', async () => {
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

    test('add product to cart and place the order', async () => {
        await test.step('add item to cart', async () => {
            await homePage.chooseProductFromList('HTC One M9');
            await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to cart and validate product title and total amount', async () => {
            await homePage.goToCart();
            await cartPage.validateProductDetails(0, 'HTC One M9','700');
            await cartPage.validateTotalAmount('700');
        });

        await test.step('click on place order', async () => {
            await cartPage.clickOnPlaceOrder();
        });

        await test.step('fill order details and click on purchase', async () => {
            await placeOrderDialogPage.placeOrderAndFillDetails('James', 'USA', 'NY', '12345', '3', '2022');
        });

        await test.step('validate order confirmation header message and close dialog', async () => {
            await placeOrderDialogPage.validateOrderConfirmationMessage('Thank you for your purchase!');
        });
    });
});