/**
 * @prettier
 * @flow
 */
import React from 'react';

type Props = {
    feedback: string,
    handleTextChange: Function,
    handleTextSubmit: Function,
    isDisabled: boolean,
    isValid: boolean,
    value: string
};

const ConsultationAnswerInputText = ({
    feedback,
    handleTextChange,
    handleTextSubmit,
    isDisabled,
    isValid,
    value
}: Props) => (
    <div className="u-relative u-1/1">
        {feedback !== '' ? <div className="c-chat__feedback">{feedback}</div> : null}
        <input
            className={`c-chat__input ${!isValid ? 'has-error' : ''}`}
            disabled={isDisabled ? 'disabled' : ''}
            onChange={handleTextChange}
            placeholder="Type here..."
            type="text"
            value={value}
        />
        <button className="c-chat__input-submit u-hide@mobile" onClick={handleTextSubmit}>
            <svg viewBox="0 0 13 4">
                <path d="M9.46 1.5H0v1h9.46V4L12 2 9.46 0" />
            </svg>
        </button>
    </div>
);

export default ConsultationAnswerInputText;
