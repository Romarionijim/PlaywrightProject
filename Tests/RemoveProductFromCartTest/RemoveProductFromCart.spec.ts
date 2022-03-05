import {test} from "@playwright/test";
import {BasePage} from "../../Pageobjects/BasePage/BasePage";
import {HomePage} from "../../Pageobjects/HomePage/HomePage";
import {ProductPage} from "../../Pageobjects/ProductPage/ProductPage";
import {CartPage} from "../../Pageobjects/CartPage/CartPage";
import {ApplicationUrl} from "../../Pageobjects/Enums/ApplicationUrl";

test.describe('Remove item from cart and validate total amount', async () => {
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

    test('remove one of the items from cart then validate total amount is changed', async () => {
        await test.step('add item to cart', async () => {
            await homePage.chooseProductFromList('Sony xperia z5');
            await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to homepage and add another item to cart', async () => {
            await productPage.clickOnHomeMenuButton();
            await homePage.chooseProductFromList('Nexus 6');
            await productPage.addProductToCartAndAcceptAlert('Product added');
        });

        await test.step('go to cart and validate total amount before removing an item', async () => {
            await homePage.goToCart();
            await cartPage.validateTotalAmount('970');
        });

        await test.step('remove one of the items from cart', async () => {
            await cartPage.deleteItemFromList(1,'Nexus 6','650');
        });

        await test.step('validate total amount changed after removing an item', async () => {
            await cartPage.validateTotalAmount('320');
        });
    });
});