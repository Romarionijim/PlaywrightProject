import {PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {

    use: {
        browserName:'chromium',
        trace:'off',
        screenshot: 'on',

        video: {
            mode:'on'
        },
        contextOptions: {},
        //Browser options
        launchOptions: {
            channel:'chrome',
            headless:true,
            slowMo:500,
        }
    }
}

export default config;