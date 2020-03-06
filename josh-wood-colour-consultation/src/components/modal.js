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
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  animation: ${openModal} 0.3s;
`

const Content = styled.div`
  background: ${props => props.theme.background};
  position: relative;
  margin: 25% 1.5rem;
  padding: 1.5rem;
  ${mq.large`
    width: 70%;
    padding: 4rem;
    margin: 15% auto;
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
