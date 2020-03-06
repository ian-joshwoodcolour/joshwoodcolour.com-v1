import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SHADE_SHOTS, SHADES } from '../../common/enums'
import { compose, mapProps } from 'recompose'
import Title from '../../components/title'
import Description from '../../components/description'
import { connect } from 'react-redux'
import { CDN } from '../../common/paths'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`
const Picture = styled.img`
  height: 33rem;
  width: 33rem;
  object-fit: cover;
  //margin: 2.5rem;
  width: 100%;
`

const PictureWrap = styled.figure`
  width: 100%;
  
`

const ShadeShotBox = ({ selectedShadeShot, comparisonPicture }) => (
  <Content>
    <Title>
      Shade Shot Plus
      <br />
      {selectedShadeShot.name}
    </Title>
      <Description>
          {selectedShadeShot.description}
      </Description>
      <PictureWrap>
            <Picture src={comparisonPicture} />
      </PictureWrap>
  </Content>
)

ShadeShotBox.propTypes = {
  selectedShadeShot: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  comparisonPicture: PropTypes.string.isRequired,
}

const mapState = state => ({
  selectedShadeId: state.shade,
  //selectedShadeShotId: state.shadeShot,
  selectedShadeShotId: 1,
    selectedShadeId: 1,
})

const enhance = compose(
  connect(mapState),
  mapProps(props => {
    const shadeKey = SHADES.ids[props.selectedShadeId].comparisonKey
    const shadeShotKey =
      SHADE_SHOTS.ids[props.selectedShadeShotId].comparisonKey
    const selectedShadeShot = SHADE_SHOTS.ids[props.selectedShadeShotId]
    return Object.assign({}, props, {
      selectedShadeShot,
      comparisonPicture: `${CDN}/shade-shots/${shadeKey} & ${shadeShotKey}.jpg`,
    })
  })
)
export default enhance(ShadeShotBox)
