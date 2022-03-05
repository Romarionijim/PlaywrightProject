import {BasePage} from "../BasePage/BasePage";
import {expect} from "@playwright/test";

require('dotenv').config();

export enum Credentials {
    CORRECT,
    INCORRECT
}

export class HomePage extends BasePage {

    private productStoreHomeLogoLocator = '#narvbarx #nava';
    private homeMenuButton = '[class="nav-item active"]>a';
    private signUpMenuLocator = '#signin2';
    private usernameLocator = '#sign-username';
    private passwordLocator = '#sign-password';
    //this locator is the same primary element in all the dialogs
    private dialogPrimaryButtonLocator = '[class="modal fade show"] [class="btn btn-primary"]';
    private dialogCloseButton = '[class="modal fade show"] [class="btn btn-secondary"]';
    private loginMenuLocator = '#login2';
    private loginDialogUsernameField = '#loginusername';
    private loginDialogPasswordField = '#loginpassword';
    private logoutButtonLocator = '#logout2';
    private nameOfUserLocator = '#nameofuser';
    private aboutUsMenuTabLocator = '[data-target="#videoModal"]';
    private aboutUsDialogPlayButton = '[class="vjs-big-play-button"]';
    private aboutUsDialogVolumeControlPanel = '[class="vjs-volume-panel vjs-control vjs-volume-panel-horizontal"]';
    private aboutUsVolumeSliderLocator = '[class="vjs-volume-control vjs-control vjs-volume-horizontal"] [class="vjs-volume-level"]';
    private aboutUsDialogVideoFullScreenLocator = '[class="vjs-fullscreen-control vjs-control vjs-button"]';
    private aboutUsVideoSliderLocator = '[class="vjs-play-progress vjs-slider-bar"]';
    private playPauseButton = '[class="vjs-play-control vjs-control vjs-button vjs-paused"] >> visible=true';
    private cartMenuLocator = '[class="nav-item"] #cartur';
    private contactMenuTabLocator = '[data-target="#exampleModal"]';
    private contactMenuDialogEmailField = '#recipient-email';
    private contactMenuDialogNameField = '#recipient-name';
    private contactMenuDialogMessageField = '#message-text';
    private menuList = '[class="nav-link"]';
    private homePageProductsList = '[class="hrefch"]';
    private homePageCategoriesOptions = '[class="list-group-item"]';
    private homeScreenPhotoNextSliderArrow = '[class="carousel-control-next-icon"]';
    private homeScreenPhotoPreviousSliderArrow = '[class="carousel-control-prev-icon"]';
    private nextButtonLocator = '[class="pagination"] #next2';
    private previousButtonLocator = '[class="pagination"] #prev2';


    public async signup(username: string, password: string, message: string) {
        await this.clickElement(this.signUpMenuLocator);
        await this.fillText(this.usernameLocator, username);
        await this.fillText(this.passwordLocator, password);
        await this.page.waitForTimeout(1500);
        await this.clickElement(this.dialogPrimaryButtonLocator);
        await this.alertGetTextAndAccept(message);

    }

    /**@description this function is a login function that logs in to DemoBlaze website with the correct credentials by default
     * @param credentials are the username and password that are called from the dotenv file
     */
    public async login(username: string, password: string) {
        await this.clickElement(this.loginMenuLocator);
        await this.fillText(this.loginDialogUsernameField, username);
        await this.fillText(this.loginDialogPasswordField, password);
        await this.clickElement(this.dialogPrimaryButtonLocator);
    }

    /**@description this function validates the name of the user in the upper tab menu after logging in
     * @param nameOfUser the name of the user in the upper menu tab
     */
    public async validateNameOfUserAfterLogin(nameOfUser: string) {
        await this.wait(1000);
        const nameOfUserDisplay = await this.page.locator(this.nameOfUserLocator);
        expect(await nameOfUserDisplay.innerText()).toBe(nameOfUser);
    }

    public async logout() {
        await this.clickElement(this.logoutButtonLocator);
    }

    public async validateLoginMenuIsDisplayedAfterLogout(loginMenuText: string) {
        const loginMenu = await this.page.locator(this.loginMenuLocator);
        if (await loginMenu.isVisible() === true) {
            expect(await loginMenu.innerText()).toBe(loginMenuText);
        } else {
            console.log('the user is still logged in');
        }


    }

    public async clickOnUpperMenuCategoryOptions(menuCategoryName: string) {
        const menuListArray = await this.page.$$(this.menuList);
        for (let menuName of menuListArray) {
            const menuListText = await menuName.innerText();
            if (menuListText.trim() === menuCategoryName) {
                await menuName.click();
                return;
            }
        }
    }

    public async fillContactInfo(email: string, name: string, message: string, alertText: string) {
        await this.clickElement(this.contactMenuTabLocator);
        await this.fillText(this.contactMenuDialogEmailField, email);
        await this.fillText(this.contactMenuDialogNameField, name);
        await this.fillText(this.contactMenuDialogMessageField, message);
        await this.clickElement(this.dialogPrimaryButtonLocator);
        await this.alertGetTextAndAccept(alertText);
    }

    /**@description this function plays the video inside the about us menu category >> expands the video to full screen >> handles volume slider by lowering volume >> handles video slider as well by forwarding the video >> turns up the volume again >>exits full screen then close the dialog.
     */
    public async clickOnAboutUsMenuCategory_PlayAndAdjustVideo() {
        await this.clickElement(this.aboutUsMenuTabLocator);
        await this.clickElement(this.aboutUsDialogPlayButton);
        await this.clickElement(this.aboutUsDialogVideoFullScreenLocator);
        await this.hover(this.aboutUsDialogVolumeControlPanel);
        const volumeSlide = this.page.locator(this.aboutUsVolumeSliderLocator);
        let volumeSlider = await volumeSlide.boundingBox();
        await this.page.mouse.click(volumeSlider.x - 7, volumeSlider.y + 0);
        const videoSlide = await this.page.locator(this.aboutUsVideoSliderLocator);
        let videoSlider = await videoSlide.boundingBox();
        await this.page.mouse.click(videoSlider.x + 250, videoSlider.y + 0);
        await this.hover(this.aboutUsDialogVolumeControlPanel);
        await this.page.mouse.click(volumeSlider.x + 20, volumeSlider.y + 0);
        await this.clickElement(this.aboutUsDialogVideoFullScreenLocator);
        await this.page.waitForTimeout(7000);
        await this.clickElement(this.dialogCloseButton);
    }

    public async chooseProductFromList(productName: string) {
        await this.wait(2000);
        const productList = await this.page.$$(this.homePageProductsList);
        for (let product of productList) {
            const productText = await product.innerText();
            if (productText.trim() === productName) {
                await product.click();
                return;
            }
        }
    }

    public async chooseCategoryFromCategorySideMenuList(categoryName) {
        await this.wait(2000);
        const categoryList = await this.page.$$(this.homePageCategoriesOptions);
        for (let category of categoryList) {
            const categoryText = await category.innerText();
            if (categoryText.trim() === categoryName) {
                await category.click();
                return;
            }
        }
    }

    /**@description this function clicks on the next (right) arrow three times on the home page media images carousel control
     */
    public async clickOnHomePageCarouselControlNextArrow() {
        for (let i = 0; i < 3; i++) {
            await this.clickElement(this.homeScreenPhotoNextSliderArrow);
        }
    }

    /**@description this function clicks on the previous (left) arrow three times on the home page media images carousel control
     *
     */
    public async clickOnHomePageCarouselControlPreviousArrow() {
        for (let i = 0; i < 3; i++) {
            await this.clickElement(this.homeScreenPhotoPreviousSliderArrow);

        }
    }

    public async clickOnProductStoreHomeLogo() {
        await this.clickElement(this.productStoreHomeLogoLocator);
    }

    public async goToCart() {
        await this.clickElement(this.cartMenuLocator);
    }

    public async clickOnHomeMenuButton() {
        await this.clickElement(this.homeMenuButton);
    }

    public async clickOnPrimaryDialogButton() {
        await this.clickElement(this.dialogPrimaryButtonLocator);
    }

    public async clickOnDialogCloseButton() {
        await this.clickElement(this.dialogCloseButton);
    }

    public async clickOnNextButton() {
        await this.clickElement(this.nextButtonLocator);
    }

    public async clickOnPreviousButton() {
        await this.clickElement(this.previousButtonLocator);
    }
}