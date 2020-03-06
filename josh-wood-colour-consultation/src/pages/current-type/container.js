import CurrentType from './current-type'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { CURRENT_COLOUR_TYPES } from '../../common/enums'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  name: state.userName,
  selectedTypeId: state.currentColourType,
})

const mapDispatch = ({ currentColourType: { updateType } }) => ({
  selectType: typeId => {
    updateType(typeId)
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
      isFinished: props.selectedTypeId !== 0,
    })
  }),
  withState('isModalVisible', 'showModal', false),
  withHandlers({
    handleSelect: props => selectedId => {
      props.selectType(selectedId)
    },
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      switch (props.selectedTypeId) {
        case CURRENT_COLOUR_TYPES.ALL_COLOUR.id:
        case CURRENT_COLOUR_TYPES.NONE.id:
          props.history.push(`${ROOT}/picture`)
          break
        case CURRENT_COLOUR_TYPES.BLEACH.id:
          props.history.push(`${ROOT}/haircare`)
          break
        case CURRENT_COLOUR_TYPES.HIGHLIGHTS.id:
          props.history.push(`${ROOT}/highlights`)
          break
        case CURRENT_COLOUR_TYPES.NOT_SURE.id:
          props.showModal(true)
          break
        default:
        // stay on current page
      }
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/`)
    },
    handleCloseModalClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showModal(false)
    },
  })
)

export default enhance(CurrentType)
