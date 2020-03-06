/**
 * @prettier
 */
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import {expect} from 'chai';
import {ANIMATION_DURATION} from '../../src/js/config';

const {TEST_URL, TEST_PASSWORD} = process.env;

describe('Cart', () => {
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

        await page.goto(`${TEST_URL}cart`);

        if (!page.url().includes('password')) {
            return;
        }

        await page.waitForSelector('#Password');
        await page.type('#Password', TEST_PASSWORD);
        await page.$eval('#login_form', $el => $el.submit());
        await page.waitFor(ANIMATION_DURATION);
    });

    afterEach(() => browser.close());

    describe('With products added', () => {
        let urls;

        beforeEach(async () => {
            urls = [
                `${TEST_URL}products/permanent-colour-4-0-mid-brown`,
                `${TEST_URL}products/fine-brunette-shampoo`,
                `${TEST_URL}products/darker-brown-root-marker`
            ];

            /**
             * `map` does not execute async
             */
            for (let i = 0; i < urls.length; i++) {
                await page.goto(urls[i]);
                await page.waitForSelector('.c-product .js-add');
                await page.click('.c-product .js-add');
                await page.waitFor(ANIMATION_DURATION / 3);
            }

            await page.goto(`${TEST_URL}cart`);
            await page.waitFor(ANIMATION_DURATION / 2);
        });

        it('Shows the products separated by each main collection', async () => {
            const collectionSelector = '.js-cart-collection';
            const count = await page.$$eval(collectionSelector, $els => parseInt($els.length));
            const actual = count === urls.length;
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it("Shows the main collection's titles if there is a product within it", async () => {
            const collectionSelector = '.js-cart-collection .js-heading';
            const count = await page.$$eval(collectionSelector, $els => {
                return Array.from($els).filter($el => !$el.classList.contains('u-hide')).length;
            });
            const actual = count === urls.length;
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('Updates without refreshing the page when a product quantity is changed', async () => {
            const quantitySelector = '.js-cart-count';
            const productQuantitySelector =
                '.js-cart-collection .js-cart-item:first-of-type .js-item-quantity';

            await page.waitForSelector(productQuantitySelector);
            await page.select(productQuantitySelector, '2');
            await page.waitFor(ANIMATION_DURATION / 2);

            const actual = await page.$eval(quantitySelector, $el => parseInt($el.innerText));
            const expected = urls.length + 1;

            expect(actual).to.equal(expected);
        });

        it('Asks for confirmation before a product is removed', () => {
            return new Promise(async resolve => {
                const quantitySelector = '.js-cart-count';
                const productRemoveSelector =
                    '.js-cart-collection .js-cart-item:first-of-type .js-remove';

                page.on('dialog', async dialog => {
                    const actual = dialog.type();
                    const expected = 'confirm';

                    expect(actual).to.equal(expected);
                    resolve();
                });

                await page.waitForSelector(productRemoveSelector);

                try {
                    await page.click(productRemoveSelector);
                } catch (e) {
                    // console.log(e);
                }
            });
        });

        it('Updates without refreshing the page when a product is removed', async () => {
            return new Promise(async resolve => {
                const quantitySelector = '.js-cart-count';
                const productRemoveSelector =
                    '.js-cart-collection .js-cart-item:first-of-type .js-remove';

                page.on('dialog', async dialog => {
                    await dialog.accept();
                    await page.waitFor(ANIMATION_DURATION);

                    const actual = await page.$eval(quantitySelector, $el =>
                        parseInt($el.innerText)
                    );
                    const expected = urls.length - 1;

                    expect(actual).to.equal(expected);
                    resolve();
                });

                await page.waitForSelector(productRemoveSelector);

                try {
                    await page.click(productRemoveSelector);
                } catch (e) {
                    // console.log(e);
                }
            });
        });

        it('Does not remove a product if the action is not confirmed', async () => {
            return new Promise(async resolve => {
                const quantitySelector = '.js-cart-count';
                const productRemoveSelector =
                    '.js-cart-collection .js-cart-item:first-of-type .js-remove';

                page.on('dialog', async dialog => {
                    await dialog.dismiss();

                    const actual = await page.$eval(quantitySelector, $el =>
                        parseInt($el.innerText)
                    );
                    const expected = urls.length;

                    expect(actual).to.equal(expected);
                    resolve();
                });

                await page.waitForSelector(productRemoveSelector);

                try {
                    await page.click(productRemoveSelector);
                } catch (e) {
                    // console.log(e);
                }
            });
        });

        it('Continues to checkout when the `Checkout` CTA is clicked', async () => {
            const ctaSelector = '.js-cart-submit';

            await page.waitForSelector(ctaSelector);
            await page.click(ctaSelector);
            await page.waitFor(ANIMATION_DURATION * 2);

            const actual = page.url().includes('/checkouts/');
            const expected = true;

            expect(actual).to.equal(expected);
        });
    });

    describe('When clicking the main navigation `Cart` link', () => {
        beforeEach(async () => {
            await page.goto(TEST_URL);
        });

        it('Shows a modal first', async () => {
            const linkSelector = '.js-cart-summary';
            const modalSelector = '.js-modal[data-modal="cart-summary"]';

            await page.waitForSelector(linkSelector);
            await page.click(linkSelector);
            await page.waitFor(ANIMATION_DURATION / 3);

            const actual = await page.$eval(modalSelector, $el => $el.classList.contains('u-hide'));
            const expected = false;

            expect(actual).to.equal(expected);
        });

        it('Redirects to the cart page when then clicking `View Cart`', async () => {
            const linkSelector = '.js-cart-summary';
            const modalSelector = '.js-modal[data-modal="cart-summary"]';
            const ctaSelector = '.c-modal__footer .c-button:nth-of-type(1)';

            await page.waitForSelector(linkSelector);
            await page.click(linkSelector);
            await page.waitForSelector(ctaSelector);
            await page.click(ctaSelector);

            const actual = await page.url();
            const expected = `${TEST_URL}cart`;

            expect(actual).to.equal(expected);
        });

        it('Stays on the current page when then clicking `Continue Browsing`', async () => {
            const linkSelector = '.js-cart-summary';
            const modalSelector = '.js-modal[data-modal="cart-summary"]';
            const ctaSelector = '.c-modal__footer .c-button:nth-of-type(2)';

            await page.waitForSelector(linkSelector);
            await page.click(linkSelector);
            await page.waitForSelector(ctaSelector);
            await page.click(ctaSelector);

            const actual = await page.url();
            const expected = TEST_URL;

            expect(actual).to.equal(expected);
        });
    });
});
