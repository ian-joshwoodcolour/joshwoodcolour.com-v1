/**
 * @prettier
 * @flow
 */
import React, {Component} from 'react';
import eq from 'lodash/eq';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import includes from 'lodash/includes';
import last from 'lodash/last';
import map from 'lodash/map';
import toLower from 'lodash/toLower';
import isAlpha from 'validator/lib/isAlpha';
import isEmail from 'validator/lib/isEmail';
import {API_URL, CONSULTATION_RESULTS_URL, CONSULTATION_STORAGE_KEY} from '../../config';
import consultationResults from '../consultation-results';
import ConsultationAnswerInput from './ConsultationAnswerInput';
import ConsultationMessages from './ConsultationMessages';

type Props = {
    questions: Array<JWCConsultationQuestion>
};
type State = {
    answers: Array<JWCConsultationAnswer>,
    currentQuestion: JWCConsultationQuestion | null,
    disabledQuestions: Array<number>,
    isComplete: boolean,
    messages: Array<JWCConsultationMessage>,
    questions: Array<JWCConsultationQuestion>,
    textInput: {
        feedback: string,
        isDisabled: boolean,
        isValid: boolean,
        value: string
    }
};

const MAILCHIMP_URL =
    '//joshwoodcolour.us16.list-manage.com/subscribe/post?u=cbb553c91d2a08849b8a53ad2&amp;id=a80cd71903';
const MAILCHIMP_ID = 'e74e829818e7dec368daef13080f59c10319aae2:MTUxMjgyNTI2NS45NDcz"';
const MESSAGE_TIMEOUT = 800;
const VALIDATORS = {isAlpha, isEmail};

class ConsultationNew extends Component<Props, State> {
    $formElement: ?HTMLFormElement;

    constructor(props?: Props) {
        super(props);

        this.state = {
            answers: [],
            currentQuestion: null,
            disabledQuestions: [],
            isComplete: false,
            messages: [],
            questions: this.props.questions,
            textInput: {
                feedback: '',
                isDisabled: true,
                isValid: true,
                value: ''
            }
        };

        (this: any).handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
        (this: any).handleCompletedRedirect = this.handleCompletedRedirect.bind(this);
        (this: any).handleInputChange = this.handleInputChange.bind(this);
        (this: any).handleOptionSelect = this.handleOptionSelect.bind(this);
    }

    componentDidMount() {
        this.startChat();
    }

    trackEvent(options: Object) {
        if (window.ga) {
            /**
             * V2 differentiates the consultation from the first iteration that used a
             * different setup
             */
            window.ga('send', 'event', {
                ...{
                    eventCategory: 'Consultation Tool v3',
                    eventAction: 'click'
                },
                ...options
            });
        }
    }

    startChat() {
        if (this.state.questions.length) {
            setTimeout(() => {
                /**
                 * The questions and IDs have moved around, we so we can't assume the first question
                 * has ID of 1...
                 */
                const firstQuestionId = get(head(this.state.questions), 'id');

                this.updateNextQuestion(firstQuestionId);
            }, MESSAGE_TIMEOUT / 2);
        }

        this.trackEvent({eventLabel: 'Open'});
    }

    updateNextQuestion(questionId: number, answer?: JWCConsultationAnswerOption) {
        const nextQuestion = find(this.state.questions, {id: questionId});

        if (!nextQuestion) {
            return;
        }

        const isDisabled = includes(this.state.disabledQuestions, nextQuestion.id);

        /**
         * If this next question has been disabled due to a previous answer, skip to the next
         * question instead
         */
        if (isDisabled) {
            return this.updateNextQuestion(nextQuestion.id + 1);
        }

        /**
         * forces next question text to be set by previous answer's 'nextQuestionText' field
         */
        if (get(answer, 'nextQuestionText')) {
            nextQuestion.question = get(answer, 'nextQuestionText');
        }

        /**
         * Convert to or use the question text as an array. This allows us to output multiple
         * messages if required. E.g. "Hi", followed by "How are you?"
         */

        const textArray =
            nextQuestion.question instanceof Array
                ? nextQuestion.question
                : [nextQuestion.question];

        /**
         * Add each question text as a single item in the conversation collection. The timeout
         * delays the appearence on screen, mimicking a real life conversation. (This could be smarter, e.g.
         * the timeout is based on the length of text...)
         */

        textArray.map((text, index) =>
            setTimeout(() => {
                this.updateStateCollection('messages', {
                    text,
                    type: 'question'
                });
            }, MESSAGE_TIMEOUT * index)
        );

        this.setState({currentQuestion: nextQuestion});

        /**
         * After the latest question's message has been shown, we can allow the user to type
         */
        setTimeout(() => {
            this.updateStateCollection('textInput', {isDisabled: false});
        }, MESSAGE_TIMEOUT);

        /**
         * forces next question text to be set by previous answer's 'nextQuestionTip' field
         */
        if (get(answer, 'nextQuestionTip')) {
            nextQuestion.tip = {
                text: get(answer, 'nextQuestionTip'),
                prefix: `Josh's tip`
            };
        }

        /**
         * After all the question messages have been shown, show a tip if it has been defined
         */
        setTimeout(() => {
            if (nextQuestion.tip) {
                this.addTip(nextQuestion.tip);
            }
        }, MESSAGE_TIMEOUT * (textArray.length - 1));
    }

    addTip(tip: Object) {
        this.updateStateCollection('messages', {
            ...{
                image: null,
                prefix: null,
                text: '',
                type: 'tip'
            },
            ...tip
        });
    }

    updateStateCollection(key: string, data: Array<Object> | Object) {
        if (eq(key, 'textInput')) {
            /**
             * Merge a single object with a new key/value
             */
            this.setState({
                [key]: {
                    ...this.state[key],
                    ...data
                }
            });
        } else {
            /**
             * Merge an array with a new item
             */
            this.setState({
                [key]: [...this.state[key], ...[data]]
            });
        }
    }

    updateDisabledQuestions(questions: Array<number>) {
        this.setState({
            disabledQuestions: [...this.state.disabledQuestions, ...questions]
        });
    }

    unsubscribeEmail(email: string) {
        /**
         * This will unsubscribe an email from the MailChimp list, which lets us resubscribe them with
         * their latest answers without giving a MailChimp error
         */
        if (typeof fetch !== 'undefined') {
            fetch(`${API_URL}consultation/unsubscribe`, {
                body: JSON.stringify({email}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post'
            });
        }
    }

    getIncompatibleReason() {
        const hairType = find(this.state.answers, a => eq(a.name, 'HAIRTYPE'));
        const regrowthColour = find(this.state.answers, a => eq(a.name, 'REGROWTHCO'));
        const currentColour = find(this.state.answers, a => eq(a.name, 'CURCOLOUR'));
        const permAmbition = find(this.state.answers, a => eq(a.name, 'PERMAMBI'));
        const rootColour = find(this.state.answers, a => eq(a.name, 'ROOTCOLOUR'));
        const greyShadeAim = find(this.state.answers, a => eq(a.name, 'GREYSHADEAIM'));
        const hairColour = regrowthColour ? regrowthColour : currentColour;

        if (eq(get(hairType, 'value'), 'Henna')) {
            return {
                explanation: `We're really sorry - none of the products in our current range are suitable for henna treated hair. <a href="/" data-modal="consultation">Click here to exit the consultation.</a>`,
                reason: 'Henna hair type'
            };
        } else if (eq(get(hairType, 'value'), 'Bleach, highlights, balayage')) {
            return {
                explanation: `This is a bit trickier! To make sure we are giving you the most accurate recommendations possible, we would love for you to send us a photo of your hair roots and lengths, to  <a href="mailto:hello@joshwoodcolour.com">hello@joshwoodcolour.com</a>. One of our Expert Colourists will be in touch within one working day, to discuss your very own personalised system, tips and tricks`,
                reason: 'Bleached hair type'
            };
        } else if (eq(get(hairType, 'value'), `I'm not sure!`)) {
            return {
                explanation: `No problem! Our team of Expert Colourists are here to help. Please drop us an email at <a href="mailto:hello@joshwoodcolour.com">hello@joshwoodcolour.com</a>, attaching photos of your hair roots and lengths, and we will get back to you within one working day with your personal product recommendations, tips and tricks.`,
                reason: 'Not sure about hair type'
            };
        } else if (eq(get(hairColour, 'value'), 'Black')) {
            return {
                explanation: `Josh’s tip – Very few people have naturally jet black hair. Our darkest shades are almost black, so if you would like to <a href="mailto:hello@joshwoodcolour.com">upload a photo</a> our Experts can advise on a suitable shade just for you, along with extra tips and tricks.`,
                reason: `Black hair colour`
            };
        } else if (eq(get(hairColour, 'value'), 'Red')) {
            return {
                explanation: `Our system currently isn't suitable for red hair, however you can drop us an email on <a href="mailto:hello@joshwoodcolour.com">hello@joshwoodcolour.com</a> to get a recomendation from one of our experts, free of charge.`,
                reason: `Red hair colour`
            };
        } else if (eq(get(hairColour, 'value'), 'Other')) {
            return {
                explanation: `We don't have products that match your current shade, but Josh is always working on new products so please do watch this space.`,
                reason: `Red hair colour`
            };
        } else if (eq(get(permAmbition, 'value'), 'Other')) {
            return {
                explanation: `We don't have products that match your current shade, but Josh is always working on new products so please do watch this space.`,
                reason: `Red hair colour`
            };
        } else if (eq(get(rootColour, 'value'), `They're darker`)) {
            return {
                explanation: `Our Permanent Colour Kits are formulated to provide 100% grey coverage, but unfortunately won’t lighten your hair. Our Expert Colourists, however, are always here to help. Drop us a photo at <a href="mailto:hello@joshwoodcolour.com">hello@joshwoodcolour.com</a>, as well as some info on what you’re looking to achieve, for advice, tips & tricks.
                `,
                reason: `Darker root colour`
            };
        } else if (eq(get(greyShadeAim, 'value'), 'Lighter than your current colour')) {
            return {
                explanation: `Our system currently isn't able to cover grey hair with a lighter than your curret colour, however you can drop us an email on <a href="mailto:hello@joshwoodcolour.com">hello@joshwoodcolour.com</a> to get a recomendation from one of our experts, free of charge.`,
                reason: `darker root colour`
            };
        } else {
            return {
                explanation: `Our system currently isn't suitable for your hair. You can find out more information from our <a href="/pages/advice">Advice</a> page.`,
                reason: 'Other'
            };
        }
    }

    handleAnswerSubmit(event: UIEvent | null, answer: Object) {
        const {currentQuestion, textInput} = this.state;

        let isValid = true;

        if (!currentQuestion) {
            return;
        }

        /**
         * If the answer has been submitted via a form event – e.g. hitting 'return' in a text field – disable
         * the default behaviour
         */
        if (event) {
            event.preventDefault();
        }

        /**
         * Returns to previous question if question type is questionReset
         */
        if (get(answer, 'questionReset')) {
            this.resetQuestion();
            return setTimeout(() => this.updateNextQuestion(answer.nextQuestion), MESSAGE_TIMEOUT);
        }

        /**
         * If the answer was submitted via a radio button, the answer data will be provided in the event handler.
         * Otherwise if it's from the text input we'll need to retrieve it here
         */
        if (!answer) {
            /**
             * Due to a bug with rerendering the text input every time the value changes, we can't rely on the
             * state to get the input value right now. As a – bad, yes – workaround, when the form has been submitted
             * we have to query the input and get its value.
             */
            const $input = ((document.querySelector('.c-chat__input'): any): HTMLInputElement);
            const value = $input ? $input.value : '';

            answer = {
                name: currentQuestion.name,
                nextQuestion: currentQuestion.answer.nextQuestion,
                value
            };

            /**
             * Quickly hide the keyboard on touch devices
             */
            if ($input) {
                $input.blur();
            }
        }

        /**
         * We need to validate some of the text input questions. If the answer is not valid we will show
         * some validation feedback. The validator functions are defined at the top of this file.
         */
        if (currentQuestion.answer.validator) {
            if (!VALIDATORS[currentQuestion.answer.validator](answer.value)) {
                isValid = false;
            }
        }

        if (isValid) {
            if (eq(get(answer, 'name'), 'EMAIL') || eq(get(answer, 'name'), 'OTHEREMAIL')) {
                /**
                 * Ensure emails are stored in lowercase when posted to MailChimp as they are case insensitive.
                 */
                answer.value = answer.value.toLowerCase();
                /**
                 * Unsubscribe the user from the MailChimp list so we don't get any error screens.
                 */
                this.unsubscribeEmail(answer.value);
            }

            /**
             * The only text-based answers are for personal data, which we don't want to track. Otherwise,
             * we can track user's answers.
             */
            if (currentQuestion.answer.type !== 'text') {
                this.trackEvent({
                    eventAction: 'answer',
                    eventLabel: `${currentQuestion.name} - ${answer.value}`
                });
            }

            /**
             * This was method of updating the message collection was kept from the initial
             * proof of concept and never cleaned it up. Ideally we should update these all at once
             * as it will call `setState` three times (doesn't have any visually perceived problems though...).
             */
            this.updateStateCollection('messages', {
                type: 'answer',
                text: answer.value
            });
            this.updateStateCollection('answers', {
                questionId: currentQuestion.id,
                name: currentQuestion.name,
                value: answer.value
            });
            this.updateStateCollection('textInput', {
                isDisabled: true,
                value: ''
            });

            /**
             * If the selected answer will disable a future question we need to add it to the list of
             * questions to skip when we move questions
             */
            if (answer.disablesQuestions) {
                this.updateDisabledQuestions(answer.disablesQuestions);
            }

            if (answer.nextQuestion) {
                /**
                 * If this is not the last question, move to the next question
                 */
                setTimeout(
                    () => this.updateNextQuestion(answer.nextQuestion, answer),
                    MESSAGE_TIMEOUT
                );
            } else if (answer.endsQuiz) {
                /**
                 * If the selected answer is deemed incompatible for any JWC product, we need to end the consultation
                 */
                this.handleIncompatible();
            } else {
                /**
                 * Otherwise, we can finish the consultation and save the results
                 */
                this.handleCompleted();
            }
        } else {
            /**
             * If the text input was invalid, we need to replace the value with this error message and
             * prevent any editing until the error is removed
             */
            this.updateStateCollection('textInput', {
                feedback: 'Sorry, please check your answer and try again',
                isDisabled: true,
                isValid: false
            });

            setTimeout(() => {
                /**
                 * After enough time, remove the error message and allow the user to change their answer
                 */
                this.updateStateCollection('textInput', {
                    feedback: '',
                    isDisabled: false,
                    isValid: true
                });
            }, 2000);
        }
    }

    /**
     * Allows the option to go back to the previous question
     */
    resetQuestion() {
        const resetAnswers = [...this.state.answers];
        resetAnswers.pop();
        this.setState({answers: resetAnswers});
    }

    handleInputChange(event: SyntheticInputEvent<*>) {
        // this.updateStateCollection('textInput', {
        //     value: event.target.value
        // });
    }

    handleOptionSelect(option: Object) {
        this.handleAnswerSubmit(null, option);
    }

    handleIncompatible() {
        const {explanation, reason} = this.getIncompatibleReason();

        /**
         * When we have got the reason for being incompatible, add the reason text as a message in the conversation
         */
        this.updateStateCollection('messages', {
            type: 'question',
            text: explanation
        });

        /**
         * Then set the form as completed to remove the answer elements and prevent any further changes/
         */
        this.setState({isComplete: true});

        /**
         * Track the reasons, so we can build up an idea for product R&D, better advertising etc...
         */
        this.trackEvent({
            eventAction: 'incompatible',
            eventLabel: reason
        });
    }

    formatPersonalData(answers: Array<JWCConsultationAnswer>) {
        const hasSavedData = this.getAnswer('SAVECONSUL');

        /**
         * If the user has opted out of saving their data, we need remove any personally identifiable information
         */
        if (hasSavedData === 'No') {
            return map(answers, answer => {
                /**
                 * Only names and emails are asked, so let's scrub their values
                 */
                if (answer.name === 'NAME' || answer.name === 'EMAIL') {
                    return {
                        ...answer,
                        ...{value: ''}
                    };
                } else {
                    return answer;
                }
            });
        } else {
            return answers;
        }
    }

    handleCompleted() {
        const directEmailAnswers = new Array(this.getAnswer('OTHEREMAIL'));
        const hasDirectEmailAnswers =
            directEmailAnswers === undefined || directEmailAnswers.length == 0;

        /**
         * Sets email answer to match any the direct subscribe answers
         */
        if (hasDirectEmailAnswers) {
            for (let val of directEmailAnswers) {
                if (val) {
                    this.updateStateCollection('answers', {
                        name: 'EMAIL',
                        value: val,
                        questionId: 99
                    });
                    this.updateStateCollection('messages', {
                        type: 'question',
                        text: "Thanks! We'll keep you posted!"
                    });
                    break;
                }
            }
        } else {
            /**
             * Show the user a message to let them know we're done, while saving and submitting results...
             */
            this.updateStateCollection('messages', {
                type: 'question',
                text: "That's it, all done! Redirecting you to your results now..."
            });
        }

        this.setState({isComplete: true});

        /**
         * This _should_ be available as all supported browsers have it. There is no fallback support,
         * but I don't think there needs to be...
         */
        if (window.localStorage) {
            window.localStorage.setItem(
                CONSULTATION_STORAGE_KEY,
                JSON.stringify(this.formatPersonalData(this.state.answers))
            );

            setTimeout(() => {
                this.handleCompletedRedirect(hasDirectEmailAnswers);
            }, 1000);
        } else {
            alert('Sorry – there was an error saving your answers.');
        }
    }

    getAnswer(questionName: string) {
        return get(find(this.state.answers, a => eq(a.name, questionName)), 'value');
    }

    handleCompletedRedirect(hasDirectEmailAnswer: any) {
        /**
         * Handles completed form differently if they've been directed to a question that asks for their email directly
         */
        let saveValue = 'Yes';
        if (!hasDirectEmailAnswer) {
            saveValue = this.getAnswer('SAVECONSUL');
        }

        /**
         * If the user has opted to store their details with MailChimp we submit that form, otherwise we
         * can just redirect to the results page as the details were stored in localstorage
         */
        if (eq(saveValue, 'Yes') && this.$formElement) {
            this.$formElement.submit();
            if (hasDirectEmailAnswer) {
                window.stop();
            }
        } else if (window.location) {
            window.location = CONSULTATION_RESULTS_URL;
        }
    }

    render() {
        const {answers, currentQuestion, isComplete, messages, textInput} = this.state;
        return (
            <form
                action={MAILCHIMP_URL}
                className="c-chat"
                id="mailchimp-form"
                method="post"
                name="mc-embedded-subscribe-form"
                noValidate
                onSubmit={this.handleAnswerSubmit}
                ref={el => {
                    this.$formElement = el;
                }}
            >
                <ConsultationMessages
                    answers={answers}
                    currentQuestion={currentQuestion}
                    messages={messages}
                />
                <div
                    className={`c-chat__input-container ${
                        isComplete ? 'c-chat__input-container--hidden' : ''
                    } ${textInput.isDisabled ? 'c-chat__input-container--disabled' : ''}`}
                    data-question-name={get(currentQuestion, 'name')}
                    key={`question-${get(currentQuestion, 'id')}`}
                >
                    <div className="u-12/12">
                        <ConsultationAnswerInput
                            answers={answers}
                            feedback={textInput.feedback}
                            handleOptionSelect={this.handleOptionSelect}
                            handleTextChange={this.handleInputChange}
                            handleTextSubmit={this.handleAnswerSubmit}
                            isDisabled={textInput.isDisabled}
                            isValid={textInput.isValid}
                            previousAnswer={last(answers)}
                            question={currentQuestion}
                            value={textInput.value}
                        />
                        <p class="u-font-size-12 u-mt">
                            If you have highlights, balayage or bleached hair, we will need a little
                            more detail. Use our <b>Match My Shade</b> service by emailing a photo.
                        </p>
                    </div>
                </div>

                <div className="u-hide">
                    {answers.map((answer, index) => (
                        <input
                            className="js-form-field"
                            key={`answer-${index}`}
                            name={answer.name}
                            type="hidden"
                            value={answer.value}
                        />
                    ))}
                    <input type="hidden" name={MAILCHIMP_ID} tabIndex="-1" value="" />
                </div>
            </form>
        );
    }
}

export default ConsultationNew;
