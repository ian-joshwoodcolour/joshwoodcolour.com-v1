import React from 'react'
import PropTypes from 'prop-types'
import ButtonSelector from '../../components/button-selector'
import { withHandlers } from 'recompose'

const ShadeShotSelector = ({ shadeShot, selectedShadeShotId, handleClick }) => (
  <ButtonSelector
    selected={shadeShot.id === selectedShadeShotId}
    onClick={handleClick}
    spread
  >
    {shadeShot.name}
  </ButtonSelector>
)

ShadeShotSelector.propTypes = {
  shadeShot: PropTypes.object.isRequired,
  selectedShadeShotId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.shadeShot.id)
  },
})

export default enhance(ShadeShotSelector)
