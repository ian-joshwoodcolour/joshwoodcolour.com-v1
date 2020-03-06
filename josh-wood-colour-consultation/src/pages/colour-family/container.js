import ColourFamily from './colour-family'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { COLOUR_FAMILIES, SHADES, SHADE_SHOTS } from '../../common/enums/index'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  colourFamily: state.colourFamily,
  userImage: state.userImage,
})

const mapDispatch = ({
  colourFamily: { updateColourFamily },
  shade: { updateShade },
  shadeShot: { updateShadeShot },
  swatch: { updateSwatch },
}) => ({
  selectColourFamily: familyId => {
    updateColourFamily(familyId)
    const selectedShade = SHADES.idsAsEnum
      .map(shdId => SHADES.ids[shdId])
      .find(shade => shade.family === COLOUR_FAMILIES.ids[familyId].key)

    if (selectedShade) {
      updateShade(selectedShade.id)
    }

    const shadeShots = SHADE_SHOTS.idsAsEnum
      .map(shadeShotId => SHADE_SHOTS.ids[shadeShotId])
      .filter(shadeShot => shadeShot.families.includes(familyId))

    if (shadeShots.length > 0) {
      updateShadeShot(shadeShots[0].id)
    } else {
      updateShadeShot(null)
    }
  },
  selectSwatch: swatch => {
    updateSwatch(swatch)
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
      isFinished: props.rootsColourFamily !== 0,
    })
  }),
  withState('isModalVisible', 'showModal', false),
  withHandlers({
    handleSelect: props => selectedId => {
      props.selectColourFamily(selectedId)
      props.selectSwatch(COLOUR_FAMILIES.ids[selectedId].picture)
    },
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      if (props.isFinished) {
        switch (props.colourFamily) {
          case COLOUR_FAMILIES.LIGHT_BLONDE.id:
          case COLOUR_FAMILIES.DARK_BLONDE.id:
          case COLOUR_FAMILIES.LIGHT_BROWN.id:
          case COLOUR_FAMILIES.DARK_BROWN.id:
            props.history.push(`${ROOT}/shades`)
            break
          case COLOUR_FAMILIES.RED.id:
            props.history.push(`${ROOT}/results`)
            break
          case COLOUR_FAMILIES.BLACK.id:
            props.history.push(`${ROOT}/greys`)
            break
          case COLOUR_FAMILIES.OTHER.id:
            props.showModal(true)
            break
          default:
        }
      }
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/picture`)
    },
    handleCloseModalClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showModal(false)
    },
  })
)

export default enhance(ColourFamily)
