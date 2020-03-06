import ShadesPage from './shades'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { COLOUR_FAMILIES, SHADES } from '../../common/enums'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  name: state.userName,
  selectedShade: state.shade,
  selectedFamily: state.colourFamily,
})

const mapDispatch = ({
  shade: { updateShade },
  swatch: { updateSwatch },
  shadeShot: { updateShadeShot },
}) => ({
  selectShade: shadeId => {
    updateShade(shadeId)
  },
  selectSwatch: swatch => {
    updateSwatch(swatch)
  },
  selectShadeShot: shadeShot => {
    updateShadeShot(shadeShot)
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
      selectedFamily:
        props.selectedFamily !== 0
          ? COLOUR_FAMILIES.ids[props.selectedFamily].key
          : COLOUR_FAMILIES.ids[1].key,
      isFinished: props.selectedShade !== 0,
    })
  }),
  withHandlers({
    handleSelect: props => selectedId => {
      props.selectShade(selectedId)
      props.selectSwatch(SHADES.ids[selectedId].swatch)
    },
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      if (
        props.selectedShade === SHADES.DB2.id ||
        props.selectedShade === SHADES.DB3.id
      ) {
        props.selectShadeShot(0)
        props.history.push(`${ROOT}/greys`)
      } else {
        props.history.push(`${ROOT}/shade-shot`)
      }
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/colour-family`)
    },
  })
)

export default enhance(ShadesPage)
