import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import Description from '../../components/description'
import ColourFamilySelector from '../../components/colour-family-selector'
import NavigationButtons from '../../components/navigation'
import Modal from '../../components/modal'
import ContactUs from '../../components/contact-us'

const ColourFamilyPage = ({
  colourFamily,
  isFinished,
  isModalVisible,
  handleCloseModalClick,
  handleSelect,
  handleNextPageClick,
  handlePreviousPageClick,
}) => (
  <Page
    step={3}
    isFinished={isFinished}
    handleNextPageClick={handleNextPageClick}
    handlePreviousPageClick={handlePreviousPageClick}
  >
    <Title>Great! Now let&apos;s find your shade</Title>
    <Description>
      Select the closest match to the roots of your hair.
    </Description>
    <ColourFamilySelector
      selectedFamily={colourFamily}
      handleSelect={handleSelect}
    />
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

ColourFamilyPage.defaultProps = {
  isFinished: false,
}

ColourFamilyPage.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  colourFamily: PropTypes.number.isRequired,
  isFinished: PropTypes.bool,
  isModalVisible: PropTypes.bool.isRequired,
  handleCloseModalClick: PropTypes.func.isRequired,
}

export default ColourFamilyPage
