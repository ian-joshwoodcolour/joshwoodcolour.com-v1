/**
 * @prettier
 * @flow
 */
import React from 'react';

type Props = {
    handleImageLoaded?: Function,
    message: JWCConsultationMessage
};

const ConsultationMessageTip = ({message}: Props) => (
    <div className="c-chat__bubble c-chat__bubble--tip">
        <div>
            <strong>{message.prefix}:</strong>{' '}
        </div>
        <span dangerouslySetInnerHTML={{__html: message.text}} />

        {message.image ? <img src={message.image} alt="" className="u-mt-" /> : null}
    </div>
);

export default ConsultationMessageTip;
