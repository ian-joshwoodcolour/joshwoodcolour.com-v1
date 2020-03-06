/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import ConsultationMessageAnswer from '../../src/js/components/react/ConsultationMessageAnswer';

describe('Component: <ConsultationMessageAnswer />', () => {
    it('renders a wrapper', () => {
        const wrapper = shallow(
            <ConsultationMessageAnswer
                message={{
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--answer').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("renders the message's text", () => {
        const wrapper = shallow(
            <ConsultationMessageAnswer
                message={{
                    text: 'Foo bar baz'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__bubble--answer').text();
        const expected = 'Foo bar baz';

        expect(actual).to.equal(expected);
    });
});
