import styled from 'styled-components'
import Button from './button'

export default styled(Button)`
  color: #000;
  background-color: transparent;
  margin: 0.3rem 0;
  border: ${props => {
    if (props.selected) return `0.1rem solid ${props.theme.primary}`
    return `0.1rem solid ${props.theme.secondary}`
  }};
`
