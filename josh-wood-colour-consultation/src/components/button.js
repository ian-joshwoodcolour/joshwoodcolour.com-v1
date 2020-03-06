import styled, { css } from 'styled-components'
import {mq, theme} from '../styled';

const Button = styled.button`
  font-size: 1.15rem;
  padding: 1.4rem 1.5rem;
  margin: 0.5rem 0;
  letter-spacing: 0.5px;
  background-color: ${props => {
    if (props.disabled) return props.theme.disabled
    return props.theme.primary
  }};
  color: #fff;
  border: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${mq.large`
    width: auto;
  `}
  
  ${({ spread }) => spread && css `
    width: 100%!important;
  `}
`

export default Button

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${props => {
    if (props.disabled) return 'gray'
    return props.theme.primary
  }};
  text-decoration: underline;
  font-size: 1rem;
  
  ${({ bordered }) => bordered && `
    border: 2px solid ${theme.primary}
  `}
`
