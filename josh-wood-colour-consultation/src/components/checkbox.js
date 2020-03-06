import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ButtonSelector from './button-selector'
import {mq} from '../styled';

const Icon = () => (
  <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path
        strokeOpacity=".1"
        stroke="#000"
        strokeWidth="2"
        fill="#000"
        d="M1 1h23v23H1z"
      />
      <path stroke="#F7F3F0" strokeWidth="2.5" d="M6 12.7l4.2 4.1L20 7" />
    </g>
  </svg>
)

const CheckboxSelector = styled(ButtonSelector)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const UncheckedIcon = styled.div`
  width: 24px;
  height: 24px;
  border: ${props => `0.1rem solid ${props.theme.secondary}`};
`

const Label = styled.span`
  margin-left: 1rem;
  font-size: .9rem;
  
  ${mq.desktop `
    font-size: 1rem;
  `}
`

const Checkbox = ({ label, isChecked, ...props }) => (
  <CheckboxSelector selected={isChecked} {...props}>
    {isChecked ? <Icon /> : <UncheckedIcon />}
    <Label>{label}</Label>
  </CheckboxSelector>
)

Checkbox.propTypes = {
  label: PropTypes.string,
  isChecked: PropTypes.bool,
}

Checkbox.defaultProps = {
  label: '',
  isChecked: false,
}

export default Checkbox
