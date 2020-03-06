import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const Label = styled.label`
  font-size: 1.15rem;
  padding: 1.4rem 1.5rem;
  letter-spacing: 0.5px;
  background-color: ${props => {
    if (props.disabled) return 'gray'
    return props.theme.primary
  }};
  color: #fff;
  border: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  margin: 0.5rem 0;
`

const ButtonFile = ({ children, onChange }) => (
  <Wrapper>
    <Input type="file" name="file" id="file" onChange={onChange} />
    <Label htmlFor="file">{children}</Label>
  </Wrapper>
)

ButtonFile.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.element])
    .isRequired,
  onChange: propTypes.func.isRequired,
}

export default ButtonFile
