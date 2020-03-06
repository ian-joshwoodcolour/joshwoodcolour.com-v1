import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SHADE_SHOTS } from '../../common/enums'
import { compose, mapProps, withHandlers } from 'recompose'
import Description from '../../components/description'
import TipsButton from '../../components/tips-button'
import {mq} from '../../styled';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: ${props => `1px solid ${props.theme.secondary}`};
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  
  ${mq.desktop `
      align-items: center;
  `}
`

const Header = styled.h3`
  text-align: left;
  margin: 0;
  font-size: 1rem;
  
  ${mq.desktop `
     font-size: 1.3rem;
  `}
`

const Picture = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  
  ${mq.desktop `
     width: 9rem;
    height: 9rem;
  `}
`

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  align-items: flex-start;
  
  ${mq.desktop `
     margin-left: 2.5rem;
  `}
`

const ShadeShotDescription = styled(Description)`
  text-align: left;
`

const TipsButtonEnhanced = styled(TipsButton) `
  display: none;
  
  ${mq.desktop `
    display: block;
  `}
`

const ShadeShotBox = ({ selectedShadeShot, handleClick }) => (
  <Box>
    <Picture src={selectedShadeShot.picture} />
    <TextInfo>
      <Header>Shade Shot {selectedShadeShot.name}</Header>
      <ShadeShotDescription>
        {selectedShadeShot.description}
      </ShadeShotDescription>
      <TipsButtonEnhanced onClick={handleClick}>Show me a before and after</TipsButtonEnhanced>
    </TextInfo>
  </Box>
)

ShadeShotBox.propTypes = {
  selectedShadeShot: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
}

const enhance = compose(
  mapProps(props => {
    const selectedShadeShot = SHADE_SHOTS.ids[props.selectedShadeShotId]
    return Object.assign({}, props, { selectedShadeShot })
  }),
  withHandlers({
    handleClick: props => clickEvent => {
      clickEvent.preventDefault()
      props.handleShowComparison()
    },
  })
)
export default enhance(ShadeShotBox)
