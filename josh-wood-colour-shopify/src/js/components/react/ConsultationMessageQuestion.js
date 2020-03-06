/**
 * @prettier
 * @flow
 */
import React from 'react';
import find from 'lodash/find';

type Props = {
    answers: Array<JWCConsultationAnswer>,
    message: JWCConsultationMessage
};

const getQuestionText = (text: string, answers: Array<JWCConsultationAnswer>) => {
    /**
     * Some questions will use previous answers in its message. E.g. after a user adds their name,
     * we may refer to them by their name in a follow-up question. This is a simple check and replace to
     * do that. This is done by defining the answer's question in curly brackets, e.g. `{NAME}`.
     */
    if (text && text.indexOf('{') !== -1 && text.indexOf('}') !== -1) {
        const questionName = text.match(/\{(.*)\}/);

        if (questionName && questionName.length) {
            const answer = find(answers, {name: questionName[1]});

            text = text.replace(RegExp(questionName[0], 'g'), answer ? answer.value : '');
        }
    }

    return text;
};

const ConsultationMessageQuestion = ({answers, message}: Props) => (
    <div
        className="c-chat__bubble c-chat__bubble--question"
        dangerouslySetInnerHTML={{
            __html: getQuestionText(message.text, answers)
        }}
    />
);

export default ConsultationMessageQuestion;
