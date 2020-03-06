/**
 * @prettier
 */
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import {expect} from 'chai';
import {ANIMATION_DURATION} from '../../src/js/config';

const {TEST_URL, TEST_PASSWORD} = process.env;

describe('Permanent products', () => {
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

        await page.goto(`${TEST_URL}products/permanent-colour-9-0-lightest-blonde`);

        if (!page.url().includes('password')) {
            return;
        }

        await page.waitForSelector('#Password');
        await page.type('#Password', TEST_PASSWORD);
        await page.$eval('#login_form', $el => $el.submit());
        await page.waitFor(ANIMATION_DURATION);
        await page.goto(`${TEST_URL}products/permanent-colour-9-0-lightest-blonde`);
    });

    afterEach(() => browser.close());

    describe('Changing a product variant', () => {
        it("updates the product title to the new variant's title", async () => {
            const dropdownSelector = '.js-associated-products-dropdown';
            const newProductId = '4417277427741'; // Permanent Colour 2.0 - Darkest Brown
            const titleSelector = '.js-product-name';

            await page.waitForSelector(dropdownSelector);
            await page.select(dropdownSelector, newProductId);

            const actual = await page.$eval(titleSelector, $el => $el.innerText);
            const expected = 'Permanent Colour 2.0 - Darkest Brown';

            expect(actual).to.equal(expected);
        });

        it("updates the product image to the new variant's image", async () => {
            const dropdownSelector = '.js-associated-products-dropdown';
            const newProductId = '4417277427741'; // Permanent Colour 2.0 - Darkest Brown
            const imageSelector = '.js-product-image';

            await page.waitForSelector(imageSelector);

            const currentImage = await page.$eval(imageSelector, $el => $el.style.backgroundImage);

            await page.waitForSelector(dropdownSelector);
            await page.select(dropdownSelector, newProductId);
            await page.waitForSelector(imageSelector);

            const newImage = await page.$eval(imageSelector, $el => $el.style.backgroundImage);
            const actual = currentImage !== newImage;
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it("updates the hair image to the new variant's image", async () => {
            const dropdownSelector = '.js-associated-products-dropdown';
            const newProductId = '4417277427741'; // Permanent Colour 2.0 - Darkest Brown
            const imageSelector = '.js-hair-image';

            await page.waitForSelector(imageSelector);

            const currentImage = await page.$eval(imageSelector, $el => $el.style.backgroundImage);

            await page.waitForSelector(dropdownSelector);
            await page.select(dropdownSelector, newProductId);
            await page.waitForSelector(imageSelector);

            const newImage = await page.$eval(imageSelector, $el => $el.style.backgroundImage);
            const actual = currentImage !== newImage;
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it("updates the recommended products new variant's recommended products", async () => {
            const dropdownSelector = '.js-associated-products-dropdown';
            const newProductId = '4417277427741'; // Permanent Colour 2.0 - Darkest Brown
            const recommendation1Selector = '.js-recommendation-1 .js-title';
            const recommendation2Selector = '.js-recommendation-2 .js-title';

            await page.waitForSelector(recommendation1Selector);
            await page.waitForSelector(recommendation2Selector);

            const currentRecommendation1Title = await page.$eval(
                recommendation1Selector,
                $el => $el.innerText
            );
            const currentRecommendation2Title = await page.$eval(
                recommendation2Selector,
                $el => $el.innerText
            );

            await page.waitForSelector(dropdownSelector);
            await page.select(dropdownSelector, newProductId);
            await page.waitForSelector(recommendation1Selector);
            await page.waitForSelector(recommendation2Selector);

            const newRecommendation1Title = await page.$eval(
                recommendation1Selector,
                $el => $el.innerText
            );
            const newRecommendation2Title = await page.$eval(
                recommendation2Selector,
                $el => $el.innerText
            );
            const actual =
                currentRecommendation1Title !== newRecommendation1Title &&
                currentRecommendation2Title !== newRecommendation2Title;
            const expected = true;

            expect(actual).to.equal(expected);
        });
    });

    describe('Adding a product to the cart', () => {
        it('Updates without leaving the page', async () => {
            const buttonSelector = '.c-product .js-add';
            const quantitySelector = '.js-cart-count';
            const currentQuantity = await page.$eval(quantitySelector, $el =>
                parseInt($el.innerText)
            );

            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);
            /**
             * TODO: Find a way to wait for XHR requests to complete
             */
            await page.waitFor(ANIMATION_DURATION / 2);

            const actual = await page.$eval(quantitySelector, $el => parseInt($el.innerText));
            const expected = currentQuantity + 1;

            expect(actual).to.equal(expected);
        });

        it('Automatically opens the cart `summary` modal', async () => {
            const buttonSelector = '.c-product .js-add';
            const modalSelector = '.js-modal[data-modal="cart-summary"]';

            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);
            await page.waitFor(ANIMATION_DURATION * 2);
            await page.waitForSelector(modalSelector);

            const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
            const expected = false;

            expect(actual).to.equal(expected);
        });

        it('Adds the product to the cart `summary` list of products', async () => {
            const buttonSelector = '.c-product .js-add';
            const summaryItemSelector = '.js-cart-summary-modal-items .js-cart-item';

            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);
            await page.waitFor(ANIMATION_DURATION * 3);

            const actual = await page.$$eval(summaryItemSelector, $els => $els.length);
            const expected = 1;

            expect(actual).to.equal(expected);
        });
    });

    it('The "Match your shade" CTA opens a modal when clicked', async () => {
        const buttonSelector = '.js-modal-open[data-modal="shade-comparison"]';
        const modalSelector = '.js-modal[data-modal="shade-comparison"]';

        await page.waitForSelector(buttonSelector);
        await page.click(buttonSelector);
        await page.waitForSelector(modalSelector);

        const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
        const expected = false;

        expect(actual).to.equal(expected);
    });
});
