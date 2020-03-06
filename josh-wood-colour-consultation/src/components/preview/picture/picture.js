import React from 'react'
import PropTypes from 'prop-types'

import {
  PicturePreview,
  RetakeButton,
  SelectedSwatch,
  ImageCrop,
  Icon,
} from '../styled'

const Picture = ({ userImage, selectedSwatch, handleRetakeClick }) => (
  <PicturePreview>
    <ImageCrop src={userImage}>
      <RetakeButton onClick={handleRetakeClick}>
        <Icon width="9" height="9">
          <g stroke="#FFF" strokeWidth="1.8" fill="none" fillRule="evenodd">
            <path d="M.8 8.3l7-7.1M7.9 8.3L.8 1.2" />
          </g>
        </Icon>
        Retake
      </RetakeButton>
    </ImageCrop>
    {selectedSwatch && <SelectedSwatch src={selectedSwatch} />}
  </PicturePreview>
)

Picture.propTypes = {
  userImage: PropTypes.string.isRequired,
  selectedSwatch: PropTypes.string.isRequired,
  handleRetakeClick: PropTypes.func.isRequired,
}

export default Picture
