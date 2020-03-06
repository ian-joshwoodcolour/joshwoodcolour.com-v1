import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { mq } from '../styled'

const openModal = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Background = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  animation: ${openModal} 0.3s;
  background-color: #f2dbce;
  position: relative;
  width: 100%;
  ${mq.large`
    width: 60%;
  `}
`

const Content = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.gray};
  margin: 1rem 1rem;
  ${mq.large`
    margin: 3rem 3rem;
  `}
`

const CloseIcon = styled.svg`
  position: absolute;
  top: 1rem;
  right: 1rem;
  ${mq.large`
    top: 2rem;
    right: 2rem;
  `}
`

const modal = ({ isVisible, onCloseClick, children }) => (
  <Background isVisible={isVisible}>
    <Content>
      <CloseIcon width="17" height="17" onClick={onCloseClick}>
        <g
          stroke="#777472"
          strokeWidth="1.5"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="square"
        >
          <path d="M15.5 1L1 15.5M1 1l14.5 14.5" />
        </g>
      </CloseIcon>
      {children}
    </Content>
  </Background>
)

modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.element,
}

modal.defaultProps = {
  children: null,
}

export default modal
