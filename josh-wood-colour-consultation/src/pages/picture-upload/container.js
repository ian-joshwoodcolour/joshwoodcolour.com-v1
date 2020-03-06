import PictureUpload from './picture-upload'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  userImage: state.userImage,
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
  withRouter,
  mapProps(props => {
    return Object.assign({}, props, {
      isFinished: props.userImage !== '',
    })
  }),
  withState('isPopupVisible', 'showPopup', false),
  withHandlers({
    handleOpenCameraClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/colour-family`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/current-type`)
    },
    handleNoPhotoClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/picture-select`)
    },
    handleFileSelected: props => clickEvent => {
      clickEvent.preventDefault()
      const file = clickEvent.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        props.updateImage(reader.result)
        props.history.push(`${ROOT}/colour-family`)
      }
      reader.readAsDataURL(file)
    },
    handleClosePopupClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showPopup(false)
    },
    handleShowPopupClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showPopup(true)
    },
  })
)

export default enhance(PictureUpload)
