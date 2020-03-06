/**
 * @prettier
 * @flow
 */
import React, {Component} from 'react';
import eq from 'lodash/eq';
import {Motion, spring} from 'react-motion';
import {CHAT_BUBBLE_SPRING, SPACING_TINY} from '../../config';
import ConsultationMessageAnswer from './ConsultationMessageAnswer';
import ConsultationMessageQuestion from './ConsultationMessageQuestion';
import ConsultationMessageTip from './ConsultationMessageTip';

type Props = {
    answers: Array<JWCConsultationAnswer>,
    expandTip: boolean,
    message: JWCConsultationMessage
};

const ConsultationMessage = ({answers, expandTip, message}: Props) => (
    <li className={`c-chat__message c-chat__message--${message.type}`}>
        <Motion
            defaultStyle={{
                opacity: 0,
                scale: 0
            }}
            style={{
                opacity: spring(1),
                scale: spring(1, CHAT_BUBBLE_SPRING)
            }}
        >
            {({opacity, scale}) => (
                <div
                    style={{
                        opacity,
                        transform: `scale(${scale})`,
                        transformOrigin: eq(message.type, 'answer') ? 'right bottom' : 'left top',
                        perspective: '1000',
                        WebkitPerspective: '1000',
                        WebkitTransform: `scale(${scale})`,
                        WebkitTransformOrigin: eq(message.type, 'answer')
                            ? 'right bottom'
                            : 'left top'
                    }}
                >
                    {eq(message.type, 'answer') ? (
                        <ConsultationMessageAnswer message={message} />
                    ) : null}
                    {eq(message.type, 'tip') ? (
                        <ConsultationMessageTip isExpanded={expandTip} message={message} />
                    ) : null}
                    {eq(message.type, 'question') ? (
                        <ConsultationMessageQuestion answers={answers} message={message} />
                    ) : null}
                </div>
            )}
        </Motion>
    </li>
);

export default ConsultationMessage;
