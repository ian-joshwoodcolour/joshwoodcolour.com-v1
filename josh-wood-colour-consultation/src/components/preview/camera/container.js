import Camera from './camera'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapDispatch = ({ userImage: { updateImage } }) => ({
  updateImage: image => {
    updateImage(image)
  },
})

let webcam

const enhance = compose(
  connect(
    null,
    mapDispatch
  ),
  withRouter,
  withHandlers(() => {
    return {
      onRef: () => ref => {
        webcam = ref
      },
      handleCameraClick: props => clickEvent => {
        clickEvent.preventDefault()
        const imageSrc = webcam.getScreenshot()
        props.updateImage(imageSrc)
        props.showItem('picture')
      },
    }
  })
)

export default enhance(Camera)
