import Intro from './intro'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { ROOT } from '../../common/paths'

const mapState = state => ({
  name: state.userName,
})

const mapDispatch = ({ userName: { updateName }, ...store }) => ({
  updateName: name => {
    updateName(name)
  },
  resetStore: () => {
    updateName('')
    store.currentColourType.updateType(0)
    store.colourFamily.updateColourFamily(0)
    store.graysLevel.updateGraysLevel(null)
    store.haircare.updateHaircare(0)
    store.highlights.updateHighlights(null)
    store.selectedShade.updateShade(0)
    store.shade.updateShade(0)
    store.shadeShot.updateShadeShot(null)
    store.swatch.updateSwatch('')
    store.userImage.updateImage('')
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
      isStartButtonDisabled: props.name.length === 0,
    })
  }),
  withHandlers({
    handleNameChange: props => updateEvent => {
      updateEvent.preventDefault()
      props.updateName(updateEvent.target.value)
    },
    handleStartClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.history.push(`${ROOT}/current-type`)
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetStore()
    },
  })
)

export default enhance(Intro)
