import Highlights from './highlights'
import { connect } from 'react-redux'

import { compose, withHandlers, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  selectedHighlights: state.highlights,
})

const mapDispatch = ({
  highlights: { updateHighlights },
  shade: { updateShade },
  shadeShot: { updateShadeShot },
}) => ({
  selectHighlights: highlightsId => {
    updateHighlights(highlightsId)
    updateShade(0)
    updateShadeShot(0)
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
      isFinished: props.selectedHighlights !== null,
    })
  }),
  withHandlers({
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/haircare`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/current-type`)
    },
    handleHighlightSelected: props => level => {
      props.selectHighlights(level)
    },
  })
)

export default enhance(Highlights)
