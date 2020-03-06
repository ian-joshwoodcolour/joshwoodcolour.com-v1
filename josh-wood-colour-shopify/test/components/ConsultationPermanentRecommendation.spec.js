/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {mount, shallow} from 'enzyme';
import ConsultationPermanentRecommendation from '../../src/js/components/react/ConsultationPermanentRecommendation';
import {permanentProducts} from '../stubs/consultation-products';

describe('Component: <ConsultationPermanentRecommendation />', () => {
    it('renders a product title', () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = shallow(
            <ConsultationPermanentRecommendation
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = wrapper.find('.qa-title').text();
        const expected = 'Permanent Colour 2.0 - Darkest Brown';

        expect(actual).to.equal(expected);
    });

    it("renders a product's price", () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = shallow(
            <ConsultationPermanentRecommendation
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = wrapper.find('.qa-price').text();
        const expected = '£10';

        expect(actual).to.equal(expected);
    });

    /* Temporarily disabled 
    it("renders a product's Add to Cart button with the product's variant id", () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = shallow(
            <ConsultationPermanentRecommendation
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = wrapper.find('AddToCartButton').prop('variantId');
        const expected = '4417277427741';

        expect(actual).to.equal(expected);
    });
    */

    it('renders the reason for the recommendation', () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = shallow(
            <ConsultationPermanentRecommendation
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = wrapper.find('.qa-reason').text();
        const expected = reason;

        expect(actual).to.equal(expected);
    });

    it('renders the box image for the product', () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = shallow(
            <ConsultationPermanentRecommendation
                boxImage="foo-bar.jpg"
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = wrapper.find('.qa-image').prop('src');
        const expected = 'foo-bar.jpg';

        expect(actual).to.equal(expected);
    });

    it('renders the details URL for the product', () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = shallow(
            <ConsultationPermanentRecommendation
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = wrapper.find('.qa-url').prop('href');
        const expected = `/products/${product.key}`;

        expect(actual).to.equal(expected);
    });

    it('renders an animated shade number of the product', () => {
        const product = permanentProducts[0];
        const reason = 'Foo bar baz';
        const handleClick = () => {};
        const wrapper = mount(
            <ConsultationPermanentRecommendation
                handleClick={handleClick}
                reason={reason}
                product={product}
            />
        );
        const actual = Object.keys(wrapper.find('.qa-shade').prop('style'));
        const expected = ['opacity', 'transform'];

        expect(actual).to.have.members(expected);
    });
});
