/**
 * @prettier
 */
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import {expect} from 'chai';
import {ANIMATION_DURATION} from '../../src/js/config';

const {TEST_URL, TEST_PASSWORD} = process.env;

describe('Modal', () => {
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

        await page.goto(`${TEST_URL}pages/consultation`);

        if (!page.url().includes('password')) {
            return;
        }

        await page.waitForSelector('#Password');
        await page.type('#Password', TEST_PASSWORD);
        await page.$eval('#login_form', $el => $el.submit());
        await page.waitFor(ANIMATION_DURATION);
        await page.goto(`${TEST_URL}pages/consultation`);
    });

    afterEach(() => browser.close());

    it('Is hidden by default', async () => {
        const modalSelector = '.js-modal[data-modal="consultation"]';

        await page.waitForSelector(modalSelector);

        const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('Is shown when triggered by click', async () => {
        const ctaSelector = '.js-modal-open[data-modal="consultation"]';
        const modalSelector = '.js-modal[data-modal="consultation"]';

        await page.waitForSelector(ctaSelector);
        await page.click(ctaSelector);
        await page.waitForSelector(modalSelector);

        const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
        const expected = false;

        expect(actual).to.equal(expected);
    });

    it('Can be closed by clicking the `x` button', async () => {
        const ctaSelector = '.js-modal-open[data-modal="consultation"]';
        const closeSelector = '.js-modal-close[data-modal="consultation"]';
        const modalSelector = '.js-modal[data-modal="consultation"]';

        await page.waitForSelector(ctaSelector);
        await page.click(ctaSelector);
        await page.waitForSelector(modalSelector);
        await page.waitForSelector(closeSelector);
        await page.click(closeSelector);
        await page.waitFor(ANIMATION_DURATION * 2);

        const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('Can be closed by pressing the `ESC` key', async () => {
        const ctaSelector = '.js-modal-open[data-modal="consultation"]';
        const modalSelector = '.js-modal[data-modal="consultation"]';

        await page.waitForSelector(ctaSelector);
        await page.click(ctaSelector);
        await page.waitForSelector(modalSelector);
        await page.keyboard.press('Escape');
        await page.waitFor(ANIMATION_DURATION * 2);

        const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
        const expected = true;

        expect(actual).to.equal(expected);
    });
});
