import React from 'react'
import PropTypes from 'prop-types'
import { Shade, ShadePicture, Label } from './styled'

import { withHandlers } from 'recompose'

const ShadeSelector = ({ shade, selectedShadeId, handleClick }) => (
  <Shade onClick={handleClick}>
    <ShadePicture
      src={shade.picture}
      alt={shade.name}
      selected={shade.id === selectedShadeId}
    />
    <Label align="center" selected={shade.id === selectedShadeId}>
      {shade.name} {shade.code}
    </Label>
  </Shade>
)

ShadeSelector.propTypes = {
  shade: PropTypes.object.isRequired,
  selectedShadeId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.shade.id)
  },
})

export default enhance(ShadeSelector)
