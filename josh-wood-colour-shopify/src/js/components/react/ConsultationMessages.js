/**
 * @prettier
 * @/flow
 */
import React, {Component} from 'react';
import ConsultationMessage from './ConsultationMessage';

type Props = {
    answers: Array<JWCConsultationAnswer>,
    currentQuestion: JWCConsultationQuestion,
    messages: Array<JWCConsultationMessage>
};
type State = {};

class ConsultationMessages extends Component<Props, State> {
    $container: ?HTMLElement;
    $messagesEnd: ?HTMLElement;

    componentDidUpdate() {
        /**
         * Every time a new message has been added to the collection scroll the list to the bottom
         * so that it is visible
         */
        this.scrollToBottom();
    }

    scrollToBottom() {
        /**
         * $messagesEnd is a cached selector that we can easily scroll to, without having to get
         * the latest message's element. If there is no native scrolling API available, revert to the
         * clucky `scrollTop` instead.
         */
        if (this.$messagesEnd && this.$messagesEnd.scrollIntoView) {
            this.$messagesEnd.scrollIntoView({behaviour: 'smooth'});
        } else if (this.$container) {
            this.$container.scrollTop = this.$container.scrollHeight;
        }
    }

    render() {
        const {answers, currentQuestion, messages} = this.props;

        return (
            <div
                className="c-chat__messages-container"
                ref={el => {
                    this.$container = el;
                }}
            >
                <ul className="c-chat__messages">
                    {messages.map((message, index) => (
                        <ConsultationMessage
                            answers={answers}
                            key={`message-${index}`}
                            message={message}
                        />
                    ))}
                </ul>
                <div
                    ref={el => {
                        this.$messagesEnd = el;
                    }}
                />
            </div>
        );
    }
}

export default ConsultationMessages;
