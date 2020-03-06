import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.label`
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Label = styled.div`
  
  font-size: 12px;
  color: #808080;
`

const Input = styled.input`
  opacity: 0;
`

const Graphic = styled.div`
  border: 2px solid #999999;
  flex: 0 0 14px;
  height: 14px;
  margin-right: 12px;
  position: relative;
`

const ActiveGraphic = styled.div`
  background-color: #999999;
  position: absolute;
  left: 1px;
  top: 1px;
  width: 8px;
  height: 8px;
`

class Checkbox extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          active: false,
      }
  }

  handleInputChange() {
    this.setState(({ active }) => ({
      active: !active,
    }))
  }

  render() {
    const { name, children } = this.props;
    const { active } = this.state;

    return (
      <Container htmlFor={name}>
        <Graphic>
          {active && <ActiveGraphic />}
        </Graphic>
        <Label>{children}</Label>
        <Input type="checkbox" id={name} onChange={() => this.handleInputChange()} />
      </Container>
    )
  }
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Checkbox;