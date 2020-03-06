/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {mount} from 'enzyme';
import Consultation from '../../src/js/components/react/Consultation';
import {questions} from '../stubs/consultation';

const TIMEOUT = 800;

describe('Component: <Consultation />', () => {
    let selector;

    beforeEach(() => {
        selector = stub(document, 'querySelector');

        selector.returns({
            blur: () => {},
            value: 'Foo bar baz'
        });
    });

    afterEach(() => selector.restore());

    it('renders a wrapper', () => {
        const wrapper = mount(<Consultation questions={questions} />);
        const actual = wrapper.find('.c-chat').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders the first question as a message on mount', done => {
        const wrapper = mount(<Consultation questions={questions} />);

        setTimeout(() => {
            wrapper.update();

            const actual = wrapper
                .find('.c-chat__message')
                .first()
                .text();
            const expected = questions[0].question;

            expect(actual).to.equal(expected);
            done();
        }, TIMEOUT);
    });

    /**
     * This behaviour is currently disabled because of a bug on iOS Safari.
     */
    it.skip('updates the value of an answer when its text changes', done => {
        const wrapper = mount(<Consultation questions={questions} />);

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'foo bar'}});

            setTimeout(() => {
                wrapper.update();

                const actual = wrapper.find('.c-chat__input').prop('value');
                const expected = 'foo bar';

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT);
        }, TIMEOUT);
    });

    it('renders the answer for the first question as a message when submitted', done => {
        const wrapper = mount(<Consultation questions={questions} />);

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'Foo bar baz'}});
            wrapper.find('.c-chat').simulate('submit');

            setTimeout(() => {
                wrapper.update();

                const actual = wrapper
                    .find('.c-chat__message--answer')
                    .first()
                    .text();
                const expected = 'Foo bar baz';

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT);
        }, TIMEOUT);
    });

    it('renders the next question after an answer has been submitted', done => {
        const wrapper = mount(<Consultation questions={questions} />);

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'foo bar'}});
            wrapper.find('.c-chat').simulate('submit');

            setTimeout(() => {
                wrapper.update();

                const actual = wrapper.state().currentQuestion.id;
                const expected = 2;

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT * 1.5);
        }, TIMEOUT);
    }).timeout(TIMEOUT * 3);

    it('skips a question if it is disabled when progressing through questions', done => {
        const wrapper = mount(<Consultation questions={questions} />);

        wrapper.setState({disabledQuestions: [2]});

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'foo bar'}});
            wrapper.find('.c-chat').simulate('submit');

            setTimeout(() => {
                wrapper.update();

                const actual = wrapper.state().currentQuestion.id;
                const expected = 3;

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT * 1.5);
        }, TIMEOUT);
    }).timeout(TIMEOUT * 3);

    it('renders a "sorry" message if a submitted answer ends the quiz', done => {
        const wrapper = mount(<Consultation questions={[questions[4]]} />);

        setTimeout(() => {
            wrapper.instance().handleAnswerSubmit(null, {
                endsQuiz: true,
                value: 'foo'
            });

            setTimeout(() => {
                const actual = wrapper
                    .state()
                    .messages[wrapper.state().messages.length - 1].text.includes(
                        "Our system currently isn't suitable for your hair"
                    );
                const expected = true;

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT * 1.5);
        }, TIMEOUT);
    }).timeout(TIMEOUT * 3);

    /**
     * Disabled because of bug with setting window location in redirect.
     * TODO: Fix!
     */
    it.skip('renders a thank you message when the final question has been completed', done => {
        const wrapper = mount(<Consultation questions={[questions[3]]} />);

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'foo bar'}});
            wrapper.find('.c-chat').simulate('submit');

            setTimeout(() => {
                const actual = wrapper.state().messages[wrapper.state().messages.length - 1].text;
                const expected =
                    "That's it, all done! We're redirecting you to your results now...";

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT * 1.5);
        }, TIMEOUT);
    });
    // }).timeout((TIMEOUT * 3));

    it('unsubscribes a user from mailchimp once they opt in to emails, so they do not see an error page when the form is submitted', done => {
        const wrapper = mount(<Consultation questions={[questions[0], questions[1]]} />);

        setTimeout(() => {
            const unsubscribeSpy = spy(wrapper.instance(), 'unsubscribeEmail');

            wrapper.instance().handleAnswerSubmit(null, {
                name: 'EMAIL',
                nextQuestion: 2,
                value: 'foo@bar.com'
            });

            setTimeout(() => {
                const actual = unsubscribeSpy.calledWith('foo@bar.com');
                const expected = true;

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT * 1.5);
        }, TIMEOUT);
    }).timeout(TIMEOUT * 3);

    it('renders multiple messages for a question if its text is an array', done => {
        const wrapper = mount(
            <Consultation
                questions={[
                    {
                        id: 1,
                        question: ['foo', 'bar']
                    }
                ]}
            />
        );

        setTimeout(() => {
            const actual = wrapper.state().messages;
            const expected = [{text: 'foo', type: 'question'}, {text: 'bar', type: 'question'}];

            expect(actual).to.deep.equal(expected);
            done();
        }, TIMEOUT * 2);
    });

    it('renders a tip as a message if a question has one', done => {
        const wrapper = mount(
            <Consultation
                questions={[
                    {
                        id: 1,
                        question: 'foo',
                        tip: {text: 'foo bar'}
                    }
                ]}
            />
        );

        setTimeout(() => {
            const actual = wrapper.state().messages[wrapper.state().messages.length - 1].text;
            const expected = 'foo bar';

            expect(actual).to.equal(expected);
            done();
        }, TIMEOUT * 2);
    });

    it.skip('handles answers submitted via text field', done => {
        const wrapper = mount(<Consultation questions={questions} />);

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'foo bar'}});
            wrapper.find('.c-chat').simulate('submit');

            setTimeout(() => {
                const actual = wrapper.state().answers[0];
                const expected = {
                    questionId: questions[0].id,
                    name: questions[0].name,
                    value: 'foo bar'
                };

                expect(actual).to.deep.equal(expected);
                done();
            }, TIMEOUT);
        }, TIMEOUT);
    });

    it.skip('modifies the answer to email questions so they are in lowercase', done => {
        const wrapper = mount(
            <Consultation
                questions={[
                    {
                        answer: {type: 'text'},
                        id: 1,
                        name: 'EMAIL',
                        question: 'Please enter your email address'
                    }
                ]}
            />
        );

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'Foo@BAR.com'}});
            wrapper.find('.c-chat').simulate('submit');

            setTimeout(() => {
                const actual = wrapper.state().answers[0].value;
                const expected = 'foo@bar.com';

                expect(actual).to.equal(expected);
                done();
            }, TIMEOUT);
        }, TIMEOUT);
    });

    it('handles answers submitted via radio options', done => {
        const wrapper = mount(<Consultation questions={[questions[2], questions[3]]} />);

        setTimeout(() => {
            wrapper.update();
            wrapper
                .find('.c-chat__input-option')
                .at(2)
                .simulate('click');

            setTimeout(() => {
                const actual = wrapper.state().answers[0];
                const expected = {
                    questionId: questions[2].id,
                    name: questions[2].name,
                    value: questions[2].answer.options[2].value
                };

                expect(actual).to.deep.equal(expected);
                done();
            }, TIMEOUT);
        }, TIMEOUT);
    });

    it('handles validation for text input answers', done => {
        const wrapper = mount(
            <Consultation
                questions={[
                    {
                        answer: {
                            nextQuestion: 2,
                            type: 'text',
                            validator: 'isEmail'
                        },
                        id: 1,
                        name: 'foo'
                    }
                ]}
            />
        );

        setTimeout(() => {
            wrapper.find('.c-chat__input').simulate('change', {target: {value: 'foo'}});
            wrapper.find('.c-chat').simulate('submit');

            const actual = wrapper.state().textInput;
            const expected = {
                isDisabled: true,
                isValid: false
            };

            expect(actual).to.deep.include(expected);
            done();
        }, TIMEOUT);
    });

    it('displays the answer input if the consultation is not complete', () => {
        const wrapper = mount(<Consultation questions={questions} />);
        const actual = wrapper
            .find('.c-chat__input-container')
            .prop('className')
            .includes('u-hide');
        const expected = false;

        expect(actual).to.equal(expected);
    });

    it('does not display the answer input if the consultation is complete', () => {
        const wrapper = mount(<Consultation questions={questions} />);

        wrapper.setState({isComplete: true});

        /**
         * Not sure why newly-added class is returned properly -- bug?
         */
        const actual = wrapper
            .find('.c-chat__input-container')
            .render()[0]
            .attribs.class.includes('c-chat__input-container--hidden');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('renders a form field for each answer', () => {
        const answers = [
            {
                name: 'foo',
                value: 'Foo bar baz'
            },
            {
                name: 'bar',
                value: 'Bar foo 2112'
            }
        ];
        const questions = [];
        const wrapper = mount(<Consultation questions={questions} />);

        wrapper.setState({answers});

        const actual = wrapper.find('.js-form-field').length;
        const expected = 2;

        expect(actual).to.equal(expected);
    });

    it("renders each answer's question as the form field name", () => {
        const answers = [
            {
                name: 'foo',
                value: 'Foo bar baz'
            }
        ];
        const questions = [];
        const wrapper = mount(<Consultation questions={questions} />);

        wrapper.setState({answers});

        const actual = wrapper
            .find('.js-form-field')
            .first()
            .prop('name');
        const expected = 'foo';

        expect(actual).to.equal(expected);
    });

    it('renders each answer as the form field value', () => {
        const answers = [
            {
                name: 'foo',
                value: 'Foo bar baz'
            }
        ];
        const questions = [];
        const wrapper = mount(<Consultation questions={questions} />);

        wrapper.setState({answers});

        const actual = wrapper
            .find('.js-form-field')
            .first()
            .prop('value');
        const expected = 'Foo bar baz';

        expect(actual).to.equal(expected);
    });
});
