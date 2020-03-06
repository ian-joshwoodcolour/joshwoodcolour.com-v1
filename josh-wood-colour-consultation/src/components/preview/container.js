import Preview from './preview'
import { connect } from 'react-redux'
import { compose, withHandlers, withState, mapProps } from 'recompose'

const mapState = state => ({
  userImage: state.userImage,
  selectedShade: state.shade,
})

const mapDispatch = ({ userImage: { updateImage } }) => ({
  updateImage: image => {
    updateImage(image)
  },
})

const enhance = compose(
  connect(
    mapState,
    mapDispatch
  ),
  withState('show', 'showItem', 'picture'),
  withHandlers({
    handleRetakeClick: props => updateEvent => {
      updateEvent.preventDefault()
      props.showItem('buttons')
    },
  }),
  mapProps(props => {
    if (!props.userImage) {
      return Object.assign({}, props, { show: 'webcam' })
    } else return props
  })
)

export default enhance(Preview)
