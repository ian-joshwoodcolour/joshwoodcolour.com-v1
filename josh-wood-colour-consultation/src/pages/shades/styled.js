import styled from 'styled-components'
import Label from '../../components/label'
import { mq } from '../../styled'

export const ShadesForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  ${mq.large`
    flex-direction: row;
  `}
`

export const Shades = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  order: -1;
  ${mq.large`
    order: 1;
  `}
`

export const ShadeWrapper = styled.li`
  margin: 0.5rem 0;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid
    ${props => (props.isSelected ? props.theme.primary : 'transparent')};
`

export const Name = styled(Label)`
  margin: 1rem;
  margin-right: 3rem;
  color: ${props => (props.isSelected ? '#000' : props.theme.gray)};
`
export const Picture = styled.img`
  height: 10rem;
  margin-right: 1rem;
`
