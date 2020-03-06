import ShadeShot from './shade-shot'
import { compose, withHandlers, mapProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SHADE_SHOTS, SHADES } from '../../common/enums'
import { connect } from 'react-redux'
import { CDN, ROOT } from '../../common/paths'

const mapState = state => ({
  selectedColourFamilyId: state.colourFamily,
  selectedShadeShotId: state.shadeShot,
  selectedShadeId: state.shade,
  colourFamily: state.colourFamily,
  currentColourType: state.currentColourType,
})

const mapDispatch = ({ shadeShot: { updateShadeShot } }) => ({
  selectShadeShot: shadeShotId => {
    updateShadeShot(shadeShotId)
  },
})

const enhance = compose(
  connect(
    mapState,
    mapDispatch
  ),
  withRouter,
  mapProps(props => {
    let preview = `${CDN}/shades/Level ${props.selectedShadeId &&
      SHADES.ids[props.selectedShadeId].comparisonKey}.jpg`

    if (props.selectedShadeId !== 0 && props.selectedShadeShotId !== 0) {
      const shadeKey = SHADES.ids[props.selectedShadeId].comparisonKey
      const shadeShotKey =
        SHADE_SHOTS.ids[props.selectedShadeShotId].comparisonKey

      preview = `${CDN}/shades/${shadeKey} & ${shadeShotKey}.jpg`
    }

    return Object.assign({}, props, {
      isFinished: true,
      preview,
      shadeShots: SHADE_SHOTS.idsAsEnum
        .map(shadeShotId => SHADE_SHOTS.ids[shadeShotId])
        .filter(shadeShot =>
          shadeShot.families.includes(props.selectedColourFamilyId)
        ),
    })
  }),
  withState('isModalVisible', 'showModal', false),
  withHandlers({
    handleSelect: props => shadeShotId => {
      props.selectShadeShot(shadeShotId)
    },
    handleNoShadeShot: props => clickEvent => {
      clickEvent.preventDefault()
      props.selectShadeShot(0)
    },
    handleShowComparison: props => () => {
      props.showModal(true)
    },
    handleCloseModalClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.showModal(false)
    },
    handleNextPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/greys`)
    },
    handlePreviousPageClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/shades`)
    },
  })
)

export default enhance(ShadeShot)
