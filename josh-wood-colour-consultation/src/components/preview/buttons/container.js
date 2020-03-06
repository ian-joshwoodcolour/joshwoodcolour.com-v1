import Buttons from './buttons'
import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapDispatch = ({ userImage: { updateImage } }) => ({
  updateImage: image => {
    updateImage(image)
  },
})

const enhance = compose(
  connect(
    null,
    mapDispatch
  ),
  withRouter,
  withState('isCameraEnabled', 'setCameraEnabled', false),
  withHandlers(() => {
    return {
      handleOpenCameraClick: props => clickEvent => {
        clickEvent.preventDefault()
        props.showItem('webcam')
      },
      handleFileSelected: props => clickEvent => {
        clickEvent.preventDefault()
        const file = clickEvent.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
          props.updateImage(reader.result)
          props.showItem('picture')
        }
        reader.readAsDataURL(file)
      },
      handleNoPhotoClick: props => clickEvent => {
        clickEvent.preventDefault()
        props.history.push('/picture-select')
      },
    }
  })
)

export default enhance(Buttons)
