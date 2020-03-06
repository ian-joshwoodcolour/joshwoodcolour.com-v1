import PictureSelect from './picture-select'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SHADES } from '../../common/enums'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  selectedShadeId: state.selectedShade,
})

const mapDispatch = ({
  selectedShade: { updateShade },
  userImage: { updateImage },
}) => ({
  selectShade: shadeId => {
    updateShade(shadeId)
    updateImage(SHADES.ids[shadeId].picture)
  },
})

const enhance = compose(
  connect(
    mapState,
    mapDispatch
  ),
  withRouter,
  withState('isModalVisible', 'showModal', false),
  mapProps(props => {
    return Object.assign({}, props, {
      isFinished: props.selectedShadeId !== 0,
    })
  }),
  withHandlers({
    handleSelect: props => selectedId => {
      props.selectShade(selectedId)
    },
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/colour-family`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/picture`)
    },
    handleNoSelectClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showModal(true)
    },
    handleCloseModalClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showModal(false)
    },
  })
)

export default enhance(PictureSelect)
