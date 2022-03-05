import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ProductPage} from "../../Pageobjects/ProductPage/ProductPage";
import {CartPage} from "../../Pageobjects/CartPage/CartPage";
import {PlaceOrderDialogPage} from "../../Pageobjects/PlaceOrderDialogPage/PlaceOrderDialogPage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('Place order negative test',async () => {
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

    test('place an order without filling anything',async () => {
        await test.step('choose a product from list',async () => {
            await homePage.chooseProductFromList('Sony xperia z5');
        });

        await test.step('add product to cart and validate alert text',async () => {
            await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to cart and click on place order',async () => {
           await productPage.goToCart();
           await cartPage.clickOnPlaceOrder();
        });

        await test.step('place an order without filling anything',async () => {
           await placeOrderDialogPage.placeOrderAndFillDetails('','','','','','');
        });

        await test.step('validate alert text',async () => {
            await placeOrderDialogPage.alertAccept();
        })
    })

    test('place an order with filling only name and credit card',async () => {
        await test.step('choose product from List',async () => {
           await homePage.chooseProductFromList('Nexus 6');
        });

        await test.step('add product to cart',async () => {
            await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to cart and place order',async () => {
           await productPage.goToCart();
           await cartPage.clickOnPlaceOrder();
        });

        await test.step('place order with filling only name and credit card fields',async () => {
            await placeOrderDialogPage.placeOrderAndFillDetails('James','','','12345','','');
        })

        await test.step('validate alert text and accept',async () => {
           await placeOrderDialogPage.alertGetTextAndAccept('all fields are mandatory');
        });
    })
})