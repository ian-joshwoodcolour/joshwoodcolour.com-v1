import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import { PictureForm, Description } from './styled'
import { SHADES } from '../../common/enums'
import ShadeSelector from './shade-selector'
import { SecondaryButton } from '../../components/button'
import NavigationButtons from '../../components/navigation'
import Modal from '../../components/modal'
import ContactUs from '../../components/contact-us'

const CurrentTypePage = ({
  isFinished,
  handleNextPageClick,
  handlePreviousPageClick,
  selectedShadeId,
  handleSelect,
  handleNoSelectClick,
  isModalVisible,
  handleCloseModalClick,
}) => (
  <Page step={2}>
    <Title>Choose the shade closest to your current hair colour</Title>
    <Description>
      Select the image below that is the nearest match to your current hair
      colour. Concentrate on colour, not on the style or length.
    </Description>
    <PictureForm>
      {SHADES.idsAsEnum.map(typeId => (
        <ShadeSelector
          key={typeId}
          shade={SHADES.ids[typeId]}
          selectedShadeId={selectedShadeId}
          onClick={handleSelect}
        />
      ))}
    </PictureForm>
    <SecondaryButton onClick={handleNoSelectClick}>
      My colour doesn&apos;t look like any of these images.
    </SecondaryButton>
    <NavigationButtons
      handleNextClick={handleNextPageClick}
      handlePreviousClick={handlePreviousPageClick}
      isFinished={isFinished}
    />
    <Modal isVisible={isModalVisible} onCloseClick={handleCloseModalClick}>
      <ContactUs />
    </Modal>
  </Page>
)

CurrentTypePage.defaultProps = {
  isFinished: false,
}

CurrentTypePage.propTypes = {
  selectedShadeId: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  handleNoSelectClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool,
  isModalVisible: PropTypes.bool.isRequired,
  handleCloseModalClick: PropTypes.func.isRequired,
}

export default CurrentTypePage
