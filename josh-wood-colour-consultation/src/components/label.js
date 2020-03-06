import styled from 'styled-components'

export default styled.span`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: ${props => (props.align ? props.align : 'left')};
`
