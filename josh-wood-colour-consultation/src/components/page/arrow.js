import React from 'react'
import styled from 'styled-components'
import { ARROW_DIRECTIONS } from '../../common/enums'
import PropTypes from 'prop-types'

const size = 10

const ArrowWrapper = styled.div`
  background-color: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.primary : '#ddd'};
  position: absolute;
  top: 50%;
  width: ${size / 2}rem;
  height: ${size}rem;
  right: ${({ direction }) =>
    direction.id === ARROW_DIRECTIONS.RIGHT.id ? '0' : 'auto'};
  left: ${({ direction }) =>
    direction.id === ARROW_DIRECTIONS.LEFT.id ? '0' : 'auto'};
`

const Arrow = ({ direction, isHighlighted, onClick }) => (
  <ArrowWrapper
    direction={direction}
    isHighlighted={isHighlighted}
    onClick={onClick}
  >
    {direction.icon}
  </ArrowWrapper>
)

Arrow.defaultProps = {
  isHighlighted: false,
}

Arrow.propTypes = {
  direction: PropTypes.object.isRequired,
  isHighlighted: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default Arrow
