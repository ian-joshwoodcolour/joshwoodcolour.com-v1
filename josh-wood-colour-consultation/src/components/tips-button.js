import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './button'

const Icon = styled.svg`
  margin-right: 1rem;
`

const HighlightButton = styled(Button)`
  color: ${props => props.theme.highlight};
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
`

const TipsButton = props => (
  <HighlightButton {...props}>
    <Icon width="20" height="20">
      <path
        d="M10 0C4.47 0 0 4.47 0 10s4.47 10 10 10 10-4.47 10-10S15.53 0 10 0zm-.72 5.26A.96.96 0 0 1 10 5a1 1 0 0 1 .72.26c.18.18.28.42.28.74 0 .3-.1.53-.28.74A.96.96 0 0 1 10 7a1 1 0 0 1-.72-.26A.98.98 0 0 1 9 6c0-.32.08-.56.28-.74zM12 15H8v-.51l.45-.18.51-.16V9.12L8 8.99v-.5c.16-.07.32-.13.54-.16.23-.06.45-.09.7-.15.26-.03.49-.09.71-.12.22-.03.45-.06.6-.06h.49v6.16c.2.06.35.09.51.15l.45.18V15z"
        fill="#ED915B"
        fillRule="nonzero"
      />
    </Icon>
    {props.children}
  </HighlightButton>
)

TipsButton.propTypes = {
  children: PropTypes.string,
}

TipsButton.defaultProps = {
  children: null,
}

export default TipsButton
