import React from 'react'
import { Wrapper } from './styled'
import Picture from './picture/index'
import Camera from './camera/index'
import Buttons from './buttons'
import PropTypes from 'prop-types'

const Preview = ({ show, handleRetakeClick, showItem }) => (
  <Wrapper>
    {show === 'picture' ? (
      <Picture handleRetakeClick={handleRetakeClick} />
    ) : null}
    {show === 'buttons' ? <Buttons showItem={showItem} /> : null}
    {show === 'webcam' ? <Camera showItem={showItem} /> : null}
  </Wrapper>
)

Preview.propTypes = {
  show: PropTypes.oneOf(['picture', 'buttons', 'webcam']).isRequired,
  handleRetakeClick: PropTypes.func.isRequired,
  showItem: PropTypes.func.isRequired,
}

export default Preview
