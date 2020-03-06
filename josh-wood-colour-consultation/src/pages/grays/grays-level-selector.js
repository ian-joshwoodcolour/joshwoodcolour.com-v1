import React from 'react'
import PropTypes from 'prop-types'
import { GraysLevel, Picture, Label } from './styled'
import { withHandlers } from 'recompose'

const GraysLevelSelector = ({ level, selectedGraysLevelId, handleClick }) => (
  <GraysLevel onClick={handleClick}>
    <Picture
      src={level.picture}
      alt={level.label}
      selected={level.id === selectedGraysLevelId}
    />
    <Label align="center" selected={level.id === selectedGraysLevelId}>
      {level.label}
    </Label>
    <Label align="center" selected={level.id === selectedGraysLevelId}>
      {level.percentage}
    </Label>
  </GraysLevel>
)

GraysLevelSelector.defaultProps = {
  selectedGraysLevelId: null,
}

GraysLevelSelector.propTypes = {
  level: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  selectedGraysLevelId: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.level.id)
  },
})

export default enhance(GraysLevelSelector)
