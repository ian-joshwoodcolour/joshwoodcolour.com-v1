/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import ConsultationAnswerInputRadio from '../../src/js/components/react/ConsultationAnswerInputRadio';
import {questions} from '../stubs/consultation';

describe('Component: <ConsultationAnswerInputRadio />', () => {
    it('renders a wrapper for options', () => {
        const wrapper = mount(
            <ConsultationAnswerInputRadio handleOptionSelect={() => {}} options={[]} />
        );
        const actual = wrapper.find('.c-chat__input-options').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a button for each option', () => {
        const wrapper = mount(
            <ConsultationAnswerInputRadio
                handleOptionSelect={() => {}}
                options={[{value: 'Foo'}, {value: 'Bar'}, {value: 'Baz'}]}
            />
        );
        const actual = wrapper.find('.c-chat__input-option').length;
        const expected = 3;

        expect(actual).to.equal(expected);
    });

    it("renders a the option's value as the button text", () => {
        const wrapper = mount(
            <ConsultationAnswerInputRadio
                handleOptionSelect={() => {}}
                options={[{value: 'Foo'}, {value: 'Bar'}, {value: 'Baz'}]}
            />
        );
        const actual = wrapper
            .find('.c-chat__input-option')
            .first()
            .text();
        const expected = 'Foo';

        expect(actual).to.equal(expected);
    });

    it('handles the click of a button', () => {
        const handler = spy();
        const wrapper = mount(
            <ConsultationAnswerInputRadio
                handleOptionSelect={handler}
                options={[{value: 'Foo'}, {value: 'Bar'}, {value: 'Baz'}]}
            />
        );

        wrapper
            .find('.c-chat__input-option')
            .first()
            .simulate('click');

        const actual = handler.calledWith({value: 'Foo'});
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('renders an active state after a button if it is selected', () => {
        const wrapper = mount(
            <ConsultationAnswerInputRadio
                handleOptionSelect={() => {}}
                options={[{value: 'Foo'}, {value: 'Bar'}, {value: 'Baz'}]}
                selected="Foo"
            />
        );

        const actual = wrapper
            .find('.c-chat__input-option')
            .first()
            .prop('className')
            .includes('c-chat__input-option--selected');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('renders an optional image instead of text', () => {
        const wrapper = mount(
            <ConsultationAnswerInputRadio
                handleOptionSelect={() => {}}
                options={[
                    {
                        image: 'https://www.foo.com/bar.jpg',
                        value: 'Foo'
                    }
                ]}
                selected="Foo"
            />
        );

        const actual = wrapper
            .find('.c-chat__input-option')
            .first()
            .find('img')
            .prop('src');
        const expected = 'https://www.foo.com/bar.jpg';

        expect(actual).to.equal(expected);
    });

    it('renders an animated entrance', () => {
        const wrapper = mount(
            <ConsultationAnswerInputRadio
                handleOptionSelect={() => {}}
                options={[
                    {
                        image: 'https://www.foo.com/bar.jpg',
                        value: 'Foo'
                    }
                ]}
                selected="Foo"
            />
        );

        const actual = Object.keys(
            wrapper
                .find('.c-chat__input-option')
                .first()
                .prop('style')
        );
        const expected = ['opacity', 'transform'];

        expect(actual).to.deep.equal(expected);
    });
});
