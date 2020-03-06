import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const Wrapper = styled.div`
  background-color: #ddd;
  height: 1rem;
  position: absolute;
  bottom: 0;
  width: 70rem;
`

const Bar = styled.div`
  background-color: #000;
  width: ${props => `${props.value * 100}%`};
  height: 1rem;
`

const Progressbar = ({ value }) => (
  <Wrapper>
    <Bar value={value} />
  </Wrapper>
)

Progressbar.propTypes = {
  value: propTypes.number.isRequired,
}

export default Progressbar
