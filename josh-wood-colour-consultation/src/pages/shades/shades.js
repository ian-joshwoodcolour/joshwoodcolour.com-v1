import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Title from '../../components/title'
import Description from '../../components/description'

import NavigationButtons from '../../components/navigation'
import { ShadesForm, Shades } from './styled'
import Shade from './shade'
import Preview from '../../components/preview'
import { SHADES } from '../../common/enums'

const ShadesPage = ({
  name,
  isFinished,
  selectedShade,
  selectedFamily,
  handleSelect,
  handleNextPageClick,
  handlePreviousPageClick,
}) => (
  <Page step={4}>
    <Title>What shade do you want to achieve {name}?</Title>
    <Description>
      Our products are formulated to match your natural colour. For any major
      colour changes we recommend you speak to our expert colourists.
    </Description>
    <ShadesForm>
      <Preview />
      <Shades>
        {SHADES.idsAsEnum
          .map(shadeId => SHADES.ids[shadeId])
          .filter(shade => shade.family === selectedFamily)
          .map(shade => (
            <Shade
              key={shade.id}
              shade={shade}
              isSelected={shade.id === selectedShade}
              handleSelect={handleSelect}
            />
          ))}
      </Shades>
    </ShadesForm>
    <NavigationButtons
      handleNextClick={handleNextPageClick}
      handlePreviousClick={handlePreviousPageClick}
      isFinished={isFinished}
    />
  </Page>
)

ShadesPage.defaultProps = {
  isFinished: false,
}

ShadesPage.propTypes = {
  name: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool,
  selectedShade: PropTypes.number.isRequired,
  selectedFamily: PropTypes.string.isRequired,
}

export default ShadesPage
