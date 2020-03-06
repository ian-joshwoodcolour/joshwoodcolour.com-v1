/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import ConsultationMessageTip from '../../src/js/components/react/ConsultationMessageTip';

describe('Component: <ConsultationMessageTip />', () => {
    it('renders a wrapper', () => {
        const wrapper = mount(
            <ConsultationMessageTip
                message={{
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--tip').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("renders the message's text", () => {
        const wrapper = mount(
            <ConsultationMessageTip
                message={{
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper
            .find('.c-chat__bubble--tip')
            .text()
            .includes('Foo bar baz');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('renders a prefix', () => {
        const wrapper = mount(
            <ConsultationMessageTip
                message={{
                    text: 'Foo bar baz',
                    prefix: 'Baz'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--tip').text();
        const expected = 'Baz: Foo bar baz';

        expect(actual).to.equal(expected);
    });

    it('renders an optional image', () => {
        const wrapper = mount(
            <ConsultationMessageTip
                message={{
                    image: 'https://www.foo.com/bar.jpg',
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper
            .find('.c-chat__bubble--tip')
            .find('img')
            .prop('src');
        const expected = 'https://www.foo.com/bar.jpg';

        expect(actual).to.equal(expected);
    });
});
