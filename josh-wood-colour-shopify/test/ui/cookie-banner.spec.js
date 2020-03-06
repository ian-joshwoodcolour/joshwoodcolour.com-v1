/**
 * @prettier
 */
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import {expect} from 'chai';
import {ANIMATION_DURATION} from '../../src/js/config';

const {TEST_URL, TEST_PASSWORD} = process.env;

describe('Cookie banner', () => {
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

    it('Shows by default', async () => {
        const bannerSelector = '.js-cookie-banner';

        await page.waitForSelector(bannerSelector);

        const exists = await page.$eval(bannerSelector, $el => $el.innerText);
        const actual = exists !== '';
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('Sets a cookie when accepted', async () => {
        const ctaSelector = '.js-cookie-close';

        await page.waitForSelector(ctaSelector);
        await page.waitFor(ANIMATION_DURATION / 3);
        await page.click(ctaSelector);

        const allCookies = await page.cookies();
        const acceptedCookie = allCookies.filter(c => c.name === 'jwc-cookie-accept');
        const actual = acceptedCookie.length === 1;
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('Hides the banner when accepted', async () => {
        const bannerSelector = '.js-cookie-banner';
        const ctaSelector = '.js-cookie-close';

        await page.waitForSelector(ctaSelector);
        await page.waitFor(ANIMATION_DURATION / 3);
        await page.click(ctaSelector);
        await page.waitFor(bannerSelector);

        const transformStyle = await page.$eval(bannerSelector, $el => $el.style.transform);
        const actual =
            transformStyle.includes('translateY') && !transformStyle.includes('translateY(0)');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('Does not show the banner if cookies have been accepted', async () => {
        const bannerSelector = '.js-cookie-banner';
        const ctaSelector = '.js-cookie-close';

        await page.waitForSelector(ctaSelector);
        await page.waitFor(ANIMATION_DURATION / 3);
        await page.click(ctaSelector);
        await page.reload(0, {domcontentloaded: true});

        const exists = await page.$eval(bannerSelector, $el => $el.innerText);
        const actual = exists === '';
        const expected = true;

        expect(actual).to.equal(expected);
    });
});
