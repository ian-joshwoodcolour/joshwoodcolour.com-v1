import styled from 'styled-components'
import { mq } from '../../styled'

export const TypeForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem 1.5rem;
  width: 100%;
  max-width: 22rem;
  ${mq.large`
    width: 22rem;
    margin: 4rem auto;
  `}
`
