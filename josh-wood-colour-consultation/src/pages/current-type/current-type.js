import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import NavigationButtons from '../../components/navigation'
import { TypeForm } from './styled'
import * as enums from '../../common/enums'
import ColourType from './colour-type'
import Modal from '../../components/modal'
import ContactUs from '../../components/contact-us'
const CURRENT_COLOUR_TYPES = enums.CURRENT_COLOUR_TYPES

const CurrentTypePage = ({
  name,
  selectedTypeId,
  handleSelect,
  isFinished,
  isModalVisible,
  handleCloseModalClick,
  handleNextPageClick,
  handlePreviousPageClick,
}) => (
  <Page
    step={1}
    isFinished={isFinished}
    handleNextPageClick={handleNextPageClick}
    handlePreviousPageClick={handlePreviousPageClick}
  >
    <Title>Hi {name}, what type of hair colour do you currently have?</Title>
    <TypeForm>
      {CURRENT_COLOUR_TYPES.idsAsEnum.map(typeId => (
        <ColourType
          key={typeId}
          type={CURRENT_COLOUR_TYPES.ids[typeId]}
          selectedTypeId={selectedTypeId}
          onClick={handleSelect}
        />
      ))}
    </TypeForm>
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
  name: PropTypes.string.isRequired,
  selectedTypeId: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool,
  isModalVisible: PropTypes.bool.isRequired,
  handleCloseModalClick: PropTypes.func.isRequired,
}

export default CurrentTypePage
