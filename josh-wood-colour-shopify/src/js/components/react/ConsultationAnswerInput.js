/**
 * @prettier
 * @flow
 */
import React, {Component} from 'react';
import get from 'lodash/get';
import has from 'lodash/has';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import throttle from 'lodash/throttle';
import ConsultationAnswerInputRadio from './ConsultationAnswerInputRadio';
import ConsultationAnswerInputText from './ConsultationAnswerInputText';

type Props = {
    answers: Array<JWCConsultationAnswer>,
    feedback: string,
    handleOptionSelect: Function,
    handleTextChange: Function,
    handleTextSubmit: Function,
    isDisabled: boolean,
    isValid: boolean,
    previousAnswer: JWCConsultationAnswer | null,
    question: JWCConsultationQuestion | null,
    value: string
};

type State = {
    options: Array<*>,
    selectedOption: string | null,
    scrollEvents: Array<string>,
    swipeClasses: Object,
    type: string
};

const CHAT_IMAGE_SIZE = 250;
const SCROLL_OFFSET_BUFFER = 30;

const optionMeetsCondition = (
    option: JWCConsultationAnswerOption,
    answers: Array<JWCConsultationAnswer>
) => {
    if (option.condition) {
        /**
         * If the option has a condition to meet based on a previous answer, find that answer so we can
         * then filter against it if it matches or not
         */
        const answer = find(answers, {questionId: option.condition.questionId});

        return answer && option.condition
            ? includes(option.condition.answers, answer.value)
            : false;
    }

    return true;
};

const hasSwatches = (question: JWCConsultationQuestion | null): boolean => {
    return ['CURCOLOURSELECT', 'PERMAMBISELECT', 'AMBICOLOURSELECT'].includes(
        get(question, 'name')
    );
};

class ConsultationAnswerInput extends Component<Props, State> {
    $wrapperElement: ?HTMLElement;

    constructor(props?: Props) {
        super(props);

        let options = [];
        let selectedOption = null;
        let swipeClasses = {
            container: '',
            left: '',
            right: ''
        };
        let type = 'input';

        if (this.props.question && has(this.props.question, 'answer.options')) {
            /**
             * Filter out the answers options based on required conditions. E.g. some options won't show
             * depending on a previous answer. So if the user has brown hair, don't show blonde options.
             */
            options = filter(this.props.question.answer.options, option =>
                optionMeetsCondition(option, this.props.answers)
            );

            /**
             * Get the selected answer so we can show its selected state
             */
            selectedOption = get(
                find(this.props.answers, {questionId: get(this.props.question, 'id')}),
                'value'
            );

            swipeClasses = {
                container: 'c-swipeable',
                left: '',
                right: 'c-swipeable__depth--right'
            };
            type = 'select';
        }

        this.state = {
            options,
            selectedOption,
            scrollEvents: [
                'DOMMouseScroll',
                'mousewheel',
                'MozMousePixelScroll',
                'resize',
                'scroll',
                'touchmove',
                'touchend'
            ],
            swipeClasses,
            type
        };

        (this: any).handleScroll = throttle(this.handleScroll.bind(this), 150);
    }

    componentDidMount() {
        if (this.state.type === 'select') {
            this.manageScrollEvents('add');

            /**
             * If we're showing shade swatches for a colour question, scroll to the area with the most
             * appropriate colours.
             */
            if (hasSwatches(this.props.question)) {
                this.scrollToSuggestion();
            }
        } else {
            /**
             * Autofocus didn't work on mount for some reason so we've had to put it in a timeout
             */
            setTimeout(() => this.textInputFocus(), 1200);
        }
    }

    componentWillUnmount() {
        this.manageScrollEvents('remove');
    }

    textInputFocus() {
        if (this.$wrapperElement) {
            const $inputField = this.$wrapperElement.querySelector('input[type="text"]');

            if ($inputField) {
                $inputField.focus();
            }
        }
    }

    scrollToSuggestion() {
        if (this.$wrapperElement) {
            const $suggestedAnswerElements = ((this.$wrapperElement.querySelector(
                `[title*="${get(this.props.previousAnswer, 'value')}"]`
            ): any): HTMLElement);

            if ($suggestedAnswerElements) {
                const firstElementPosition = $suggestedAnswerElements.getBoundingClientRect().left;

                if (this.$wrapperElement && firstElementPosition) {
                    this.$wrapperElement.scrollLeft = firstElementPosition - CHAT_IMAGE_SIZE * 5;
                }
            }
        }
    }

    manageScrollEvents(type: string) {
        this.state.scrollEvents.map(event => {
            if (this.$wrapperElement) {
                if (type === 'add') {
                    this.$wrapperElement.addEventListener(event, this.handleScroll, false);
                } else {
                    this.$wrapperElement.removeEventListener(event, this.handleScroll, false);
                }
            }
        });
    }

    handleScroll(event: Event) {
        if (this.$wrapperElement) {
            const showLeftDepth = this.$wrapperElement.scrollLeft > SCROLL_OFFSET_BUFFER;
            const showRightDepth =
                this.$wrapperElement.scrollLeft <
                this.$wrapperElement.scrollWidth -
                    this.$wrapperElement.getBoundingClientRect().width -
                    SCROLL_OFFSET_BUFFER;

            this.setState({
                swipeClasses: {
                    container: 'c-swipeable',
                    left: showLeftDepth ? 'c-swipeable__depth--left' : '',
                    right: showRightDepth ? 'c-swipeable__depth--right' : ''
                }
            });
        }
    }

    render() {
        const {
            answers,
            feedback,
            handleOptionSelect,
            handleTextChange,
            handleTextSubmit,
            isDisabled,
            isValid,
            question,
            value
        } = this.props;
        const {options, selectedOption, swipeClasses, type} = this.state;

        return (
            <div className="u-1/1">
                <div className={swipeClasses.container} ref={el => (this.$wrapperElement = el)}>
                    {type === 'select' ? (
                        <ConsultationAnswerInputRadio
                            answers={answers}
                            handleOptionSelect={handleOptionSelect}
                            hasSwatches={hasSwatches(question)}
                            options={options}
                            questionId={get(question, 'id')}
                            selected={selectedOption}
                        />
                    ) : (
                        <ConsultationAnswerInputText
                            feedback={feedback}
                            handleTextChange={handleTextChange}
                            handleTextSubmit={handleTextSubmit}
                            isDisabled={isDisabled}
                            isValid={isValid}
                            value={value}
                        />
                    )}
                </div>
                <div className={`c-swipeable__depth ${swipeClasses.left}`} />
                <div className={`c-swipeable__depth ${swipeClasses.right}`} />
            </div>
        );
    }
}

export default ConsultationAnswerInput;
