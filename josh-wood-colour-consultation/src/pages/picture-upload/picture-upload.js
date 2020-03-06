import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import Button, { SecondaryButton } from '../../components/button'
import Description from '../../components/description'
import Label from '../../components/label'
import ButtonFile from '../../components/button-file'
import Popup from '../../components/popup'
import Examples from './examples'
import { PictureForm, Buttons, Separator, TipsButton, TipsList } from './styled'

const CurrentTypePage = ({
  isFinished,
  handleOpenCameraClick,
  handleNoPhotoClick,
  handleFileSelected,
  isPopupVisible,
  handleClosePopupClick,
  handleShowPopupClick,
}) => (
  <Page step={2} isFinished={isFinished}>
    <Title>Now let&apos;s take a closer look at your hair</Title>
    <Description>
      For the best result we recommend taking or uploading your own photo.
    </Description>
    <TipsButton onClick={handleShowPopupClick}>
      More tips on taking your photo
    </TipsButton>
    <Popup isVisible={isPopupVisible} onCloseClick={handleClosePopupClick}>
      <TipsList>
        <li>Take your photo in daylight if you can</li>
        <li>Make sure we can see your roots</li>
        <li>Let your hair down and have fun!</li>
      </TipsList>
    </Popup>
    <PictureForm>
      <Examples />
      <Buttons>
        <Button onClick={handleOpenCameraClick}>Turn on camera</Button>
        <ButtonFile onChange={handleFileSelected}>Upload your photo</ButtonFile>
        <SecondaryButton onClick={handleNoPhotoClick}>
          Continue without photo
        </SecondaryButton>
      </Buttons>

      <Separator />
      <Label align="center">
        Note: Your photo will only be user for the consultation
      </Label>
    </PictureForm>
  </Page>
)

CurrentTypePage.defaultProps = {
  isFinished: false,
  isPopupVisible: false,
}

CurrentTypePage.propTypes = {
  handleOpenCameraClick: PropTypes.func.isRequired,
  handleNoPhotoClick: PropTypes.func.isRequired,
  handleFileSelected: PropTypes.func.isRequired,
  isFinished: PropTypes.bool,
  isPopupVisible: PropTypes.bool,
  handleClosePopupClick: PropTypes.func.isRequired,
  handleShowPopupClick: PropTypes.func.isRequired,
}

export default CurrentTypePage
