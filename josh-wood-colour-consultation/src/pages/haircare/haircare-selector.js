import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../components/checkbox'
import { withHandlers } from 'recompose'

const HaircareSelector = ({ label, id, selectedHaircareId, handleClick }) => (
  <Checkbox
    label={label}
    isChecked={id === selectedHaircareId}
    onClick={handleClick}
  />
)

HaircareSelector.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selectedHaircareId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.id)
  },
})

export default enhance(HaircareSelector)
