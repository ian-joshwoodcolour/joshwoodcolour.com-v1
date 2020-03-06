import React from 'react'
import PropTypes from 'prop-types'
import { Highlight, Picture, Label } from './styled'
import { withHandlers } from 'recompose'

const HighlightSelector = ({ highlight, selectedHighlightId, handleClick }) => (
  <Highlight onClick={handleClick}>
    <Picture
      src={highlight.picture}
      alt={highlight.name}
      selected={highlight.id === selectedHighlightId}
    />
    <Label align="center" isSelected={highlight.id === selectedHighlightId}>{highlight.name}</Label>
  </Highlight>
)

HighlightSelector.defaultProps = {
  selectedHighlightId: null,
}

HighlightSelector.propTypes = {
  highlight: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  selectedHighlightId: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.onClick(props.highlight.id)
  },
})

export default enhance(HighlightSelector)
