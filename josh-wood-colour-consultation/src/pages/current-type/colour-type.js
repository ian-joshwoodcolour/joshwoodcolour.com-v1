import React from 'react'
import PropTypes from 'prop-types'
import ButtonSelector from '../../components/button-selector'
import { withHandlers } from 'recompose'

const ColourType = ({ type, selectedTypeId, handleClick }) => (
  <ButtonSelector selected={type.id === selectedTypeId} onClick={handleClick}>
    {type.text}
  </ButtonSelector>
)

ColourType.propTypes = {
  type: PropTypes.object.isRequired,
  selectedTypeId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.type.id)
  },
})

export default enhance(ColourType)
