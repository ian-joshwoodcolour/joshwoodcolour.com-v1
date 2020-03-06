import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { ShadeWrapper, Name, Picture } from './styled'

const Shade = ({ shade, isSelected, handleClick }) => (
  <ShadeWrapper isSelected={isSelected} onClick={handleClick}>
    <Picture src={shade.picture} />
    <Name isSelected={isSelected}>
      {shade.name} {shade.code}
    </Name>
  </ShadeWrapper>
)

Shade.propTypes = {
  shade: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = withHandlers({
  handleClick: props => clickEvent => {
    clickEvent.preventDefault()
    props.handleSelect(props.shade.id)
  },
})

export default enhance(Shade)
