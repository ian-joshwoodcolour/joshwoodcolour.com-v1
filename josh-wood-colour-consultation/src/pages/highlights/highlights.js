import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import NavigationButtons from '../../components/navigation'
import { HIGHLIGHTS } from '../../common/enums'
import { HighlightsForm } from './styled'
import HighlightSelector from './highlight-selector'
const HighlightsPage = ({
  isFinished,
  selectedHighlights,
  handleHighlightSelected,
  handleNextPageClick,
  handlePreviousPageClick,
}) => (
  <Page step={6}>
    <Title>What tone do you want to achieve?</Title>
    <HighlightsForm>
      {HIGHLIGHTS.idsAsEnum.map(id => (
        <HighlightSelector
          key={id}
          highlight={HIGHLIGHTS.ids[id]}
          selectedHighlightId={selectedHighlights}
          onClick={handleHighlightSelected}
        />
      ))}
    </HighlightsForm>
    <NavigationButtons
      handleNextClick={handleNextPageClick}
      handlePreviousClick={handlePreviousPageClick}
      isFinished={isFinished}
    />
  </Page>
)

HighlightsPage.defaultProps = {
  isFinished: false,
  selectedHighlights: null,
}

HighlightsPage.propTypes = {
  selectedHighlights: PropTypes.number,
  handleHighlightSelected: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool,
}

export default HighlightsPage
