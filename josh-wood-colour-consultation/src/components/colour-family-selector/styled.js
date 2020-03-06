import styled from 'styled-components'
import { mq } from '../../styled'

export const ColourFamilyForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
`
export const SwatchList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-height: 400px;
  flex-grow: 1;
  order: -1;
  ${mq.large`
    order: 1;
  `}
`
