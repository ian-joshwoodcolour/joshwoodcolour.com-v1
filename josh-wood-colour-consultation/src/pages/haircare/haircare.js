import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import Description from '../../components/description'
import NavigationButtons from '../../components/navigation'
import { HaircareForm } from './styled'
import HaircareSelector from './haircare-selector'

const HaircarePage = ({
  isFinished,
  selectedHaircareId,
  handleSelect,
  handleNextPageClick,
  handlePreviousPageClick,
}) => (
  <Page step={7}>
    <Title>
      Last step!
      <br />
      Please complete this sentence:
    </Title>
    <Description>I want haircare that will...</Description>
    <HaircareForm>
      <HaircareSelector
        id={1}
        label="control frizz"
        selectedHaircareId={selectedHaircareId}
        onClick={handleSelect}
      />
      <HaircareSelector
        id={2}
        label="add volume"
        selectedHaircareId={selectedHaircareId}
        onClick={handleSelect}
      />
    </HaircareForm>
    <NavigationButtons
      handleNextClick={handleNextPageClick}
      handlePreviousClick={handlePreviousPageClick}
      isFinished={isFinished}
    />
  </Page>
)

HaircarePage.defaultProps = {
  isFinished: false,
}

HaircarePage.propTypes = {
  selectedHaircareId: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool,
}

export default HaircarePage
