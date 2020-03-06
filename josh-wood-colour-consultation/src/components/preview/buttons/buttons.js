import React from 'react'
import Button, { SecondaryButton } from '../../button'
import Label from '../../label'
import ButtonFile from '../../button-file'
import { Separator, Form } from '../styled'
import PropTypes from 'prop-types'

const PhotoForm = ({
  handleFileSelected,
  handleOpenCameraClick,
  handleNoPhotoClick,
}) => (
  <Form>
    <Button onClick={handleOpenCameraClick}>Turn on camera</Button>
    <ButtonFile onChange={handleFileSelected}>Upload your photo</ButtonFile>
    <SecondaryButton onClick={handleNoPhotoClick}>
      Continue without photo
    </SecondaryButton>

    <Separator />
    <Label align="center">
      Note: Your photo will only be user for the consultation
    </Label>
  </Form>
)

PhotoForm.propTypes = {
  handleOpenCameraClick: PropTypes.func.isRequired,
  handleFileSelected: PropTypes.func.isRequired,
  handleNoPhotoClick: PropTypes.func.isRequired,
}

export default PhotoForm
