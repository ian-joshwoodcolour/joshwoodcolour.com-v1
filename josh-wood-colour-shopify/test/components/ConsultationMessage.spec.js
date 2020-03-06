/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import ConsultationMessage from '../../src/js/components/react/ConsultationMessage';

describe('Component: <ConsultationMessage />', () => {
    it('renders a wrapper', () => {
        const wrapper = mount(
            <ConsultationMessage
                message={{
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__message').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a wrapper with the message type as a modifier class', () => {
        const wrapper = mount(
            <ConsultationMessage
                message={{
                    text: 'Foo bar baz',
                    type: 'tip'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__message.c-chat__message--tip').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a question', () => {
        const wrapper = mount(
            <ConsultationMessage
                message={{
                    text: 'Foo bar baz',
                    type: 'question'
                }}
            />
        );
        const actual = wrapper.find('ConsultationMessageQuestion').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a tip', () => {
        const wrapper = mount(
            <ConsultationMessage
                message={{
                    text: 'Foo bar baz',
                    type: 'tip'
                }}
            />
        );
        const actual = wrapper.find('ConsultationMessageTip').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders an answer', () => {
        const wrapper = mount(
            <ConsultationMessage
                message={{
                    text: 'Foo bar baz',
                    type: 'answer'
                }}
            />
        );
        const actual = wrapper.find('ConsultationMessageAnswer').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders an animated wrapper for showing the message', () => {
        const wrapper = mount(
            <ConsultationMessage
                message={{
                    text: 'Foo bar baz',
                    type: 'answer'
                }}
            />
        );

        const actual = Object.keys(
            wrapper
                .find('.c-chat__message div')
                .first()
                .prop('style')
        );
        const expected = [
            'opacity',
            'transform',
            'transformOrigin',
            'WebkitTransform',
            'WebkitTransformOrigin',
            'WebkitPerspective'
        ];

        expect(actual).to.include.members(expected);
    });
});
