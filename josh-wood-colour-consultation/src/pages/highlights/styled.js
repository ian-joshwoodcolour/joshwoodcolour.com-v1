import styled from 'styled-components'
import GenericLabel from '../../components/label'

export const HighlightsForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 3rem;
`

export const Highlight = styled.div`
  display: flex;
  flex-direction: column;
`

export const Picture = styled.img`
  margin: 1rem;
  padding: 0.15rem;
  border: 2px solid
    ${props => (props.selected ? props.theme.primary : 'transparent')};
`

export const Label = styled(GenericLabel)`
  color: ${props => (props.isSelected ? '#000' : props.theme.gray)};
`