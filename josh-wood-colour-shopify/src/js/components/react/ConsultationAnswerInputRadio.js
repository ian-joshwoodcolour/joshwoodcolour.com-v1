/**
 * @prettier
 * @flow
 */
import React from 'react';
import eq from 'lodash/eq';
import has from 'lodash/has';
import map from 'lodash/map';
import range from 'lodash/range';
import {Motion, spring} from 'react-motion';
import {SPACING_SMALL} from '../../config';

type Props = {
    handleOptionSelect: Function,
    hasSwatches: boolean,
    options: Array<JWCConsultationAnswerOption>,
    questionId: number,
    selected: string | null
};

const MOTION_DEFAULT_Y = SPACING_SMALL;
const MOTION_DEFAULT_X = 200;
const MOTION_SPRING = {
    damping: 20,
    stiffness: 60
};

const getDefaultXStyle = (hasSwatches: boolean = false, index: number): number => {
    if (!hasSwatches) {
        return index < 5 ? MOTION_DEFAULT_X * ((index + 1) * 0.25) : MOTION_DEFAULT_X;
    } else {
        return 0;
    }
};

const getDefaultYStyle = (hasSwatches: boolean = false, index: number): number => {
    if (hasSwatches) {
        return MOTION_DEFAULT_Y * ((index + 1) * 0.25);
    } else {
        return 0;
    }
};

const ConsultationAnswerInputRadio = ({
    handleOptionSelect,
    hasSwatches,
    options,
    questionId,
    selected
}: Props) => (
    <div className="c-chat__input-options">
        {options.map((option, index) => (
            <Motion
                defaultStyle={{
                    opacity: 0,
                    y: getDefaultYStyle(hasSwatches, index),
                    x: getDefaultXStyle(hasSwatches, index)
                }}
                key={`option-${index}`}
                style={{
                    opacity: spring(1, MOTION_SPRING),
                    y: spring(0, MOTION_SPRING),
                    x: spring(0, MOTION_SPRING)
                }}
            >
                {interpolatingStyle => (
                    <div
                        key={`${questionId}-${index}`}
                        className={`c-chat__input-option u-mr- c-button c-button--ghost c-button--round c-button--thin c-button--no-block ${
                            eq(selected, option.value) ? 'c-chat__input-option--selected' : ''
                        } ${option.image ? 'c-chat__input-option--image' : ''} ${
                            option.showImageText ? 'c-chat__input-option--mb' : ''
                        } `}
                        onClick={() => handleOptionSelect(option)}
                        style={{
                            opacity: interpolatingStyle.opacity,
                            transform: `translateY(${interpolatingStyle.y}px) translateX(${
                                interpolatingStyle.x
                            }px)`
                        }}
                        title={option.value}
                    >
                        {option.image ? (
                            <div>
                                <img src={option.image} alt={option.value} />
                                {option.showImageText && (
                                    <div className={`c-chat__input-option_image-text`}>
                                        <span>{option.value}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            option.value
                        )}
                    </div>
                )}
            </Motion>
        ))}
    </div>
);

export default ConsultationAnswerInputRadio;
