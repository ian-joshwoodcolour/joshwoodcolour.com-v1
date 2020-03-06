import React from 'react'
import { CameraWrapper, Icon, CameraButton } from '../styled'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

const PhotoForm = ({ handleCameraClick, onRef }) => (
  <CameraWrapper>
    <Webcam
      ref={onRef}
      audio={false}
      height={550}
      width={435}
      style={{ objectFit: 'cover' }}
      minScreenshotHeight={550}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
    <CameraButton onClick={handleCameraClick}>
      <Icon width="28" height="23">
        <path
          d="M9.9 0L8.2 3.4H2.4C1 3.4 0 4.4 0 5.8v14.8C0 22 1 23 2.4 23h23.2c1.3 0 2.4-1 2.4-2.4V5.7c0-1.3-1-2.3-2.4-2.3h-5.8L18.1 0H9.9zM14 5.8c4.1 0 7.5 3.3 7.5 7.4a7.5 7.5 0 0 1-15 0C6.5 9 9.9 5.8 14 5.8zm0 2.7a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 1 0 0-9.4z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </Icon>
    </CameraButton>
  </CameraWrapper>
)

PhotoForm.propTypes = {
  handleCameraClick: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
}

export default PhotoForm
