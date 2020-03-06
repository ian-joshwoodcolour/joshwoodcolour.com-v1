/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import ConsultationAnswerInput from '../../src/js/components/react/ConsultationAnswerInput';

describe('Component: <ConsultationAnswerInput />', () => {
    it('renders a text field for free text entry', () => {
        const wrapper = mount(
            <ConsultationAnswerInput
                question={{
                    nextQuestion: 2,
                    type: 'text'
                }}
            />
        );
        const actual = wrapper.find('.c-chat__input').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders radio buttons for options', () => {
        const wrapper = mount(
            <ConsultationAnswerInput
                question={{
                    answer: {
                        options: [
                            {
                                value: 'foo',
                                nextQuestion: 2
                            }
                        ],
                        type: 'select'
                    }
                }}
            />
        );
        const actual = wrapper.find('.c-chat__input-option').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders radio buttons with the selected option highlighted', () => {
        const wrapper = mount(
            <ConsultationAnswerInput
                answers={[
                    {
                        questionId: 1,
                        value: 'foo'
                    }
                ]}
                question={{
                    answer: {
                        options: [
                            {
                                value: 'foo',
                                nextQuestion: 2
                            },
                            {
                                value: 'bar',
                                nextQuestion: 2
                            }
                        ],
                        type: 'select'
                    },
                    id: 1
                }}
            />
        );
        const actual = wrapper.find('ConsultationAnswerInputRadio').prop('selected');
        const expected = 'foo';

        expect(actual).to.equal(expected);
    });

    it('renders an option if it has an answer-based condition which passes', () => {
        const wrapper = mount(
            <ConsultationAnswerInput
                answers={[
                    {
                        questionId: 1,
                        value: 'foo'
                    }
                ]}
                question={{
                    answer: {
                        options: [
                            {
                                condition: {
                                    questionId: 1,
                                    answers: ['foo']
                                },
                                value: 'foo',
                                nextQuestion: 2
                            },
                            {
                                value: 'bar',
                                nextQuestion: 3
                            }
                        ],
                        type: 'select'
                    }
                }}
            />
        );
        const actual = wrapper.find('.c-chat__input-option').length;
        const expected = 2;

        expect(actual).to.equal(expected);
    });

    it('does not render an option if it has an answer-based condition which fails', () => {
        const wrapper = mount(
            <ConsultationAnswerInput
                answers={[
                    {
                        questionId: 1,
                        value: 'foo'
                    }
                ]}
                question={{
                    answer: {
                        options: [
                            {
                                condition: {
                                    questionId: 1,
                                    answers: ['bar']
                                },
                                value: 'foo',
                                nextQuestion: 2
                            },
                            {
                                value: 'bar',
                                nextQuestion: 3
                            }
                        ],
                        type: 'select'
                    }
                }}
            />
        );
        const actual = wrapper.find('.c-chat__input-option').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });
});
