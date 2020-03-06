import styled from 'styled-components'
import GenericLabel from '../../components/label'
import GenericDescription from '../../components/description'
import { mq } from '../../styled'

export const PictureForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  width: 100%;
  ${mq.large`
   width: 70%;
  `}
`

export const Shade = styled.div`
  display: flex;
  flex-direction: column;
`

export const ShadePicture = styled.img`
  width: 10rem;
  height: 10rem;
  padding: 0.15rem;
  border: 2px solid
    ${props => (props.selected ? props.theme.primary : 'transparent')};
  ${mq.large`
    width: 11rem;
    height: 11rem;
  `}
`

export const Label = styled(GenericLabel)`
  margin: 0.7rem 0 1.2rem;
  color: ${props => (props.selected ? '#000' : props.theme.gray)};
`

export const Description = styled(GenericDescription)`
  margin-bottom: 4rem;
`
