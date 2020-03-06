/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {ConsultationCareAndConcealerRecommendation} from '../../src/js/components/react/ConsultationCareAndConcealerRecommendation';
import {careProducts} from '../stubs/consultation-products';

describe('Component: <ConsultationCareAndConcealerRecommendation />', () => {
    it('renders a title for the collection', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper.find('.qa-title').text();
        const expected = title;

        expect(actual).to.equal(expected);
    });

    it('renders a subtitle for the collection', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const subtitle = 'Foo bar baz';
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                subtitle={subtitle}
                title={title}
            />
        );
        const actual = wrapper.find('.qa-subtitle').text();
        const expected = subtitle;

        expect(actual).to.equal(expected);
    });

    it('renders a reason for the recommendation', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper.find('.qa-reason').text();
        const expected = reason;

        expect(actual).to.equal(expected);
    });

    it('renders each product in a grid', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper.find('.o-layout__item').length;
        const expected = careProducts.length;

        expect(actual).to.equal(expected);
    });

    it("renders the product's title", () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper
            .find('.o-layout__item')
            .first()
            .find('.qa-heading2')
            .text();
        const expected = careProducts[0].title;

        expect(actual).to.equal(expected);
    });

    it("renders a product's price", () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper
            .find('.o-layout__item')
            .first()
            .find('.qa-price')
            .text();
        const expected = '£5';

        expect(actual).to.equal(expected);
    });

    it("renders a product's Add to Cart button with the product's variant id", () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper
            .find('.o-layout__item')
            .first()
            .find('AddToCartButton')
            .prop('variantId');
        const expected = careProducts[0].variantId;

        expect(actual).to.equal(expected);
    });

    it('renders no image for the product if it is not in the viewport', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper
            .find('.o-layout__item')
            .first()
            .find('.qa-image')
            .prop('style').backgroundImage;
        const expected = null;

        expect(actual).to.equal(expected);
    });

    it('renders the box image for the product if it is in the viewport', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = true;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper
            .find('.o-layout__item')
            .first()
            .find('.qa-image')
            .prop('style').backgroundImage;
        const expected = `url(${careProducts[0].image})`;

        expect(actual).to.equal(expected);
    });

    it('renders the details URL for the product', () => {
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const isInViewport = false;
        const stopWatcher = () => {};
        const title = 'Foo bar';
        const wrapper = shallow(
            <ConsultationCareAndConcealerRecommendation
                handleClick={handleClick}
                isInViewport={isInViewport}
                reason={reason}
                products={careProducts}
                stopWatcher={stopWatcher}
                title={title}
            />
        );
        const actual = wrapper
            .find('.o-layout__item')
            .first()
            .find('.qa-url')
            .prop('href');
        const expected = `/products/${careProducts[0].key}`;

        expect(actual).to.equal(expected);
    });
});
