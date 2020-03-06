import Results from './results'
import { connect } from 'react-redux'

import { compose, withHandlers, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  userName: state.userName,
  userImage: state.userImage,
  currentColourType: state.currentColourType,
  selectedShade: state.selectShade,
  colourFamily: state.colourFamily,
  shade: state.shade,
  shadeShot: state.shadeShot,
  graysLevel: state.graysLevel,
  haircare: state.haircare,
  highlights: state.highlights,
})

const enhance = compose(
  connect(mapState),
  withRouter,
  mapProps(props => {
    return Object.assign({}, props, {
      isFinished: props.selectedGraysLevel !== 0,
    })
  }),
  withHandlers({
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/haircare`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/shade-shot`)
    },
    handleLevelSelected: props => level => {
      props.selectShade(level)
    },
  })
)

export default enhance(Results)
