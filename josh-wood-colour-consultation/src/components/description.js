import styled from 'styled-components'

export default styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  max-width: 30rem;
  text-align: ${props => (props.align ? props.align : 'center')};
`
