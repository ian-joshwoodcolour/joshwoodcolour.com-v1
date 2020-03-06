import Grays from './grays'
import { connect } from 'react-redux'

import { compose, withHandlers, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SHADES, COLOUR_FAMILIES } from '../../common/enums'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  selectedGraysLevel: state.graysLevel,
  selectedShade: state.shade,
  colourFamily: state.colourFamily,
})

const mapDispatch = ({ graysLevel: { updateGraysLevel } }) => ({
  selectShade: graysLevelId => {
    updateGraysLevel(graysLevelId)
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
      isFinished: props.selectedGraysLevel !== null,
    })
  }),
  withHandlers({
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/haircare`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      if (
        props.selectedShade === SHADES.DB2.id ||
        props.selectedShade === SHADES.DB3.id
      ) {
        props.history.push(`${ROOT}/shades`)
      } else if (props.colourFamily === COLOUR_FAMILIES.BLACK.id) {
        props.history.push(`${ROOT}/colour-family`)
      } else {
        props.history.push(`${ROOT}/shade-shot`)
      }
    },
    handleLevelSelected: props => level => {
      props.selectShade(level)
    },
  })
)

export default enhance(Grays)
