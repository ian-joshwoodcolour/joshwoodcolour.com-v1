/**
 * @prettier
 */
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import {expect} from 'chai';
import {ANIMATION_DURATION} from '../../src/js/config';

const {TEST_URL, TEST_PASSWORD} = process.env;

describe('Site furniture', () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        await page.setRequestInterception(true);

        page.on('request', request => {
            if (request.resourceType() === 'image') request.abort();
            else request.continue();
        });
        page.on('error', error => this.emit('error', error));
        page.on('pageerror', error => this.emit('error', error));

        await page.goto(TEST_URL);

        if (!page.url().includes('password')) {
            return;
        }

        await page.waitForSelector('#Password');
        await page.type('#Password', TEST_PASSWORD);
        await page.$eval('#login_form', $el => $el.submit());
        await page.waitFor(ANIMATION_DURATION);
        await page.goto(TEST_URL);
    });

    afterEach(() => browser.close());

    it('The hamburger button opens the overlay nav when clicked', async () => {
        await page.click('.js-overlay-nav-toggle');
        await page.waitForSelector('.c-hamburger--active');

        const $el = await page.$('.c-hamburger--active');
        const actual = $el !== null;
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('The hamburger button closes the overlay nav when clicked if it is already open', async () => {
        await page.click('.js-overlay-nav-toggle');
        await page.waitFor(ANIMATION_DURATION / 4);
        await page.click('.js-overlay-nav-toggle');
        await page.waitFor(ANIMATION_DURATION / 4);

        const $el = await page.$('.c-hamburger--active');
        const actual = $el === null;
        const expected = true;

        expect(actual).to.equal(expected);
    });
});
