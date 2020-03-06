/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import ConsultationMessageQuestion from '../../src/js/components/react/ConsultationMessageQuestion';

describe('Component: <ConsultationMessageQuestion />', () => {
    it('renders a wrapper', () => {
        const wrapper = mount(
            <ConsultationMessageQuestion
                answers={[]}
                message={{
                    text: ''
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--question').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("renders a message's text", () => {
        const wrapper = mount(
            <ConsultationMessageQuestion
                answers={[]}
                message={{
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--question').text();
        const expected = 'Foo bar baz';

        expect(actual).to.equal(expected);
    });

    it('renders the value of an answer in a question variable tag', () => {
        const wrapper = mount(
            <ConsultationMessageQuestion
                answers={[
                    {
                        name: 'foo',
                        value: 'bar'
                    }
                ]}
                message={{
                    text: 'Foo bar baz {foo}'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--question').text();
        const expected = 'Foo bar baz bar';

        expect(actual).to.equal(expected);
    });

    it('renders a link', () => {
        const wrapper = mount(
            <ConsultationMessageQuestion
                answers={[]}
                message={{
                    text: 'Foo bar baz <a href="http://www.foo.com">foo</a>'
                }}
            />
        );
        const actual = wrapper
            .render()
            .find('a')
            .prop('href');
        const expected = 'http://www.foo.com';

        expect(actual).to.equal(expected);
    });
});
