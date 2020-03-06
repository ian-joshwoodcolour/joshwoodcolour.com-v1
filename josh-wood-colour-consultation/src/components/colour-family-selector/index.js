import React from 'react'
import PropTypes from 'prop-types'
import { ColourFamilyForm, SwatchList } from './styled'
import Preview from '../../components/preview'
import { COLOUR_FAMILIES } from '../../common/enums'
import Swatch from './swatch'

const ColourFamily = ({ selectedFamily, handleSelect }) => (
  <ColourFamilyForm>
    <Preview />
    <SwatchList>
      {COLOUR_FAMILIES.idsAsEnum.map(familyId => (
        <Swatch
          key={familyId}
          item={COLOUR_FAMILIES.ids[familyId]}
          isSelected={selectedFamily === familyId}
          onClick={handleSelect}
        />
      ))}
    </SwatchList>
  </ColourFamilyForm>
)

ColourFamily.propTypes = {
  selectedFamily: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
}

export default ColourFamily
