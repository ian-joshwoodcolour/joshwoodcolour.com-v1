/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import ConsultationAnswerInputText from '../../src/js/components/react/ConsultationAnswerInputText';

describe('Component: <ConsultationAnswerInputText />', () => {
    it('renders a text input', () => {
        const wrapper = shallow(
            <ConsultationAnswerInputText handleTextChange={() => {}} value="" />
        );
        const actual = wrapper.find('input[type="text"].c-chat__input').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders a value', () => {
        const wrapper = shallow(
            <ConsultationAnswerInputText handleTextChange={() => {}} value="foo bar" />
        );
        const actual = wrapper.find('input[type="text"]').prop('value');
        const expected = 'foo bar';

        expect(actual).to.equal(expected);
    });

    it('handles the change of a value', () => {
        const handler = spy();
        const wrapper = shallow(
            <ConsultationAnswerInputText handleTextChange={handler} value="foo bar" />
        );

        wrapper.find('input[type="text"]').simulate('change', 'foo bar baz');

        const actual = handler.calledWith('foo bar baz');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('renders an error state if the value is not valid', () => {
        const wrapper = shallow(<ConsultationAnswerInputText isValid={false} value="foo bar" />);
        const actual = wrapper.find('input[type="text"]').hasClass('has-error');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('prevents editing when the input is disabled', () => {
        const wrapper = shallow(<ConsultationAnswerInputText isDisabled={true} value="foo bar" />);
        const actual = wrapper.find('input[type="text"]').prop('disabled');
        const expected = 'disabled';

        expect(actual).to.equal(expected);
    });

    // it('renders a `submit` button to help return input on touch devices', () => {
    //     const wrapper = shallow(
    //         <ConsultationAnswerInputText
    //             isDisabled={true}
    //             value="foo bar"
    //         />
    //     );
    //     const actual = wrapper.find('.c-chat__input-submit').length;
    //     const expected = 1;

    //     expect(actual).to.equal(expected);
    // });

    // it('handles the submit button press', () => {
    //     const handler = spy();
    //     const wrapper = shallow(
    //         <ConsultationAnswerInputText
    //             handleTextSubmit={handler}
    //             isDisabled={true}
    //             value="foo bar"
    //         />
    //     );

    //     wrapper.find('.c-chat__input-submit')
    //         .simulate('click');

    //     const actual = handler.called;
    //     const expected = true;

    //     expect(actual).to.equal(expected);
    // });
});
