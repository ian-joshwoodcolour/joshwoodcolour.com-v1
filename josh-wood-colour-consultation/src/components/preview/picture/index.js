import Picture from './picture'
import { connect } from 'react-redux'

const mapState = state => ({
  userImage: state.userImage,
  selectedSwatch: state.swatch,
})

export default connect(mapState)(Picture)
