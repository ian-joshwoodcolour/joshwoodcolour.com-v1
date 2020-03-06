import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button, { SecondaryButton } from './button'
import { mq } from '../styled'

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 3rem;
  width: 100%;
  ${mq.large`
    margin: 3rem 0;
    width: 66rem;
  `}
`
const BackButton = styled(SecondaryButton)`
  color: ${props => props.theme.gray};
  text-decoration: none;
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  width: 3rem;
  padding: 0;
  margin: 1rem;
  ${mq.large`
    width: 22rem;
    margin: 0;
    position: initial;
    padding: 1.4rem 1.5rem;
  `}
`

const BackText = styled.span`
  display: none;
  ${mq.large`
    display: inline;
  `}
`

const NextButton = styled(Button)`
  width: 100%;
  max-width: 22rem;
  ${mq.large`
    width: 22rem;
    margin: 0;
  `}
  margin: 0 auto;
`

const BackIcon = styled.svg`
  margin-right: 1rem;
`

const NavigationButtons = ({
  isFinished,
  handleNextClick,
  handlePreviousClick,
}) => (
  <Navigation>
    <BackButton onClick={handlePreviousClick}>
      <BackIcon width="36" height="14">
        <g
          stroke="#000"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
          opacity=".4"
        >
          <path d="M34.6 7.2H3" strokeLinecap="square" />
          <path d="M8.2 13.3L2 7.2 8.2 1" />
        </g>
      </BackIcon>{' '}
      <BackText>Previous</BackText>
    </BackButton>
    <NextButton onClick={handleNextClick} disabled={!isFinished}>
      Next
    </NextButton>
  </Navigation>
)

NavigationButtons.defaultProps = {
  isFinished: false,
}

NavigationButtons.propTypes = {
  isFinished: PropTypes.bool,
  handleNextClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
}
export default NavigationButtons
