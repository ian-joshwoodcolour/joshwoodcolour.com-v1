import React from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'

const Container = styled.div`
  max-width: 337px;
`

const Controls = styled.div`
  display: flex;
`

const TextInput = styled.input`
    font-size: 14px;
    color: #999999;
    background: white;
    border: 1px solid #dedede;
    border-right: none;
    flex: 1 1 287px;
    height: 56px;
    padding: 18px;
    text-align: right;
    margin-bottom: 28px;
    min-width: 0;
`

const Button = styled.button`
    flex: 0 0 40px;
    height: 56px;
    border: 1px solid #dedede;
    border-left: none;
    position: relative;
    background: white;
    > svg { 
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
`

const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 16px;
`

const Arrow = () => (
    <svg class="c-svg c-svg--w16 u-h-auto" viewBox="0 0 13 4" width="16">
        <path d="M9.46 1.5H0v1h9.46V4L12 2 9.46 0"></path>
    </svg>
)

class Form extends React.Component {
  render() {
    return (
      <Container>
        <Title>Receive the latest news from Josh Wood</Title>
        <Controls>
          <TextInput placeholder="Your email adress" />        
          <Button type="submit">
            <Arrow />
          </Button>
        </Controls>
        <Checkbox name="consent-footer">
          I consent to Josh Wood Colour storing and using my data for the requirements set out on the <a href="https://joshwoodcolour.com/pages/privacy-policy">privacy policy</a>.
        </Checkbox>
      </Container>
    )
  }
}

export default Form;