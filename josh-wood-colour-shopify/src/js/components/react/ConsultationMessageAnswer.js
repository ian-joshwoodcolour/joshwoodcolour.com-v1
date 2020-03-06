/**
 * @prettier
 * @flow
 */
import React from 'react';

type Props = {
    message: JWCConsultationMessage
};

const ConsultationMessageAnswer = ({message}: Props) => (
    <div className="c-chat__bubble c-chat__bubble--answer">
        <strong>{message.text}</strong>
    </div>
);

export default ConsultationMessageAnswer;
