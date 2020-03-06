/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import ConsultationMessages from '../../src/js/components/react/ConsultationMessages';

describe('Component: <ConsultationMessages />', () => {
    it('renders a container', () => {
        const wrapper = mount(<ConsultationMessages messages={[]} />);
        const actual = wrapper.find('.c-chat__messages-container').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a wrapper', () => {
        const wrapper = mount(<ConsultationMessages messages={[]} />);
        const actual = wrapper.find('.c-chat__messages').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders each message', () => {
        const wrapper = mount(
            <ConsultationMessages
                messages={[
                    {
                        type: 'question',
                        text: 'foo'
                    },
                    {
                        type: 'answer',
                        text: 'bar'
                    }
                ]}
            />
        );
        const actual = wrapper.find('.c-chat__message').length;
        const expected = 2;

        expect(actual).to.equal(expected);
    });

    it('renders a question', () => {
        const wrapper = mount(
            <ConsultationMessages
                messages={[
                    {
                        type: 'question',
                        text: 'foo'
                    }
                ]}
            />
        );
        const actual = wrapper.find('ConsultationMessageQuestion').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders an answer', () => {
        const wrapper = mount(
            <ConsultationMessages
                messages={[
                    {
                        type: 'answer',
                        text: 'foo'
                    }
                ]}
            />
        );
        const actual = wrapper.find('ConsultationMessageAnswer').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a tip', () => {
        const wrapper = mount(
            <ConsultationMessages
                messages={[
                    {
                        type: 'tip',
                        text: 'foo'
                    }
                ]}
            />
        );
        const actual = wrapper.find('ConsultationMessageTip').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });
});
