import styled from 'styled-components'
import { mq } from '../styled'

export default styled.h2`
  color: #000;
  font-weight: 600;
  letter-spacing: -1px;
  text-align: center;
  margin: 0 2rem;
  font-size: 1.7rem;
  line-height: 2.1rem;
  ${mq.large`
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 2.5rem;
    max-width: 34rem;
    margin: 0 auto;
  `}
`
