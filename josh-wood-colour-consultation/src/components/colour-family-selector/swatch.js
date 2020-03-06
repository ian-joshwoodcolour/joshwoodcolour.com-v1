import React from 'react'
import PropTypes from 'prop-types'
import GenericLabel from '../label'
import { withHandlers } from 'recompose'
import styled from 'styled-components'

const Swatch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0.3rem;
`

const Picture = styled.img`
  width: 5rem;
  height: 5rem;
  border: 2px solid
    ${props => (props.isSelected ? props.theme.primary : 'transparent')};
  border-radius: 50%;
  padding: 0.1rem;
  margin-right: 1rem;
`

const Label = styled(GenericLabel)`
  color: ${props => (props.isSelected ? '#000' : props.theme.gray)};
`

const SwatchSelector = ({ item, isSelected, handleClick }) => (
  <Swatch onClick={handleClick}>
    <Picture src={item.picture} alt={item.name} isSelected={isSelected} />
    <Label isSelected={isSelected}>{item.name}</Label>
  </Swatch>
)

SwatchSelector.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.item.id)
  },
})

export default enhance(SwatchSelector)
