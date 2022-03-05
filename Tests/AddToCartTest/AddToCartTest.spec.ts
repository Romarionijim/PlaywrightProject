import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ProductPage} from "../../Pageobjects/ProductPage/ProductPage";
import {CartPage} from "../../Pageobjects/CartPage/CartPage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('this test is to add a product to cart and validate product details in cart page', async () => {
    let basePage: BasePage;
    let homePage: HomePage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await basePage.goTotUrl(ApplicationUrl.DEMOBLAZE_WEBSITE);
    });

    test.afterEach(async ({context}) => {
        await context.clearCookies();
    });

    test('add a product to cart and validate product title and total amount', async () => {
        await test.step('in homepage choose a product and click on it',async () => {
            await homePage.chooseProductFromList('Sony xperia z5');
        });

        await test.step('add product to cart get alert text and accept alert',async () => {
            await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to cart and validate product title in cart page',async () => {
            await homePage.goToCart();
            await cartPage.validateProductTitle(1,'Sony xperia z5');
        });

        await test.step('validate total amount',async () => {
            await cartPage.validateTotalAmount('320');
        });

        await test.step('go back to homepage and add another product to cart',async () => {
            await homePage.clickOnHomeMenuButton();
            await homePage.chooseProductFromList('Nexus 6');
        })

        await test.step('add item to cart',async () => {
           await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to cart and validate total price changed',async () => {
            await homePage.goToCart();
            await cartPage.validateTotalAmount('970');
        });
    });
});