import Haircare from './haircare'
import { connect } from 'react-redux'

import { compose, withHandlers, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { CURRENT_COLOUR_TYPES } from '../../common/enums'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  selectedHaircareId: state.haircare,
  currentColourType: state.currentColourType,
  selectedShade: state.shade,
  highlights: state.highlights,
})

const mapDispatch = ({ haircare: { updateHaircare } }) => ({
  selectHaircare: haircareId => {
    updateHaircare(haircareId)
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
      isFinished: props.selectedGraysLevel !== 0,
    })
  }),
  withHandlers({
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/results`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      if (props.currentColourType === CURRENT_COLOUR_TYPES.BLEACH.id) {
        props.history.push(`${ROOT}/current-type`)
      } else if (props.selectedShade === 0 && props.highlights !== 0) {
        props.history.push(`${ROOT}/highlights`)
      } else {
        props.history.push(`${ROOT}/greys`)
      }
    },
    handleSelect: props => haircareId => {
      props.selectHaircare(haircareId)
    },
  })
)

export default enhance(Haircare)
