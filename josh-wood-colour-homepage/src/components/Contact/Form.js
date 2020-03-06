import React from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import {mq} from '../../utils'

const Container = styled.div`
  
`

const Controls = styled.div`
  display: flex;
  width: 100%;
`

const TextInput = styled.input`
    font-size: 20px;
    color: #999999;
    background: #F0F0F2;
    flex: 1 1 auto;
    height: 70px;
    padding: 25px;
    margin-bottom: 28px;
    border: 0px;
    min-width: 0;
`

const Button = styled.button`
    display: block;
    flex: 0 0 70px;
    height: 70px;
    position: relative;
    background: black;
    > svg { 
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
`

const SocialText = styled.span`
  display: none;
  ${mq.desktop`display: inline;`}
`

const Social = styled.div`
  margin-top: 70px;
  
  color: #999999;    
  font-size: 15px;
  a {
    margin-left: 17px;
  }
`

const Arrow = () => (
    <svg width="23" height="14">
        <path d="M22.784 6.494L16.651.23a.79.79 0 0 0-1.084-.028c-.298.257-.306.76-.03 1.041l4.924 5.02H.767C.343 6.263 0 6.593 0 7s.343.737.767.737H20.46l-4.924 5.02c-.276.28-.256.771.03 1.042a.79.79 0 0 0 1.084-.03l6.133-6.262A.643.643 0 0 0 23 7a.845.845 0 0 0-.216-.506z" fill="#F2F2F2" fill-rule="nonzero"/>
    </svg>
)

class Form extends React.Component {
  render() {
    return (
      <Container>
        <Controls>
          <TextInput placeholder="Your email adress" />        
          <Button type="submit">
            <Arrow />
          </Button>
        </Controls>
        <Checkbox name="consent">
          I consent to Josh Wood Colour storing and using my data for the requirements set out on the <a href="https://joshwoodcolour.com/pages/privacy-policy">privacy policy</a>.
        </Checkbox>
        <Social>
          <SocialText>Stay in touch via</SocialText><a href="https://en-gb.facebook.com/JoshWoodColour/">Facebook</a> <a href="https://www.instagram.com/joshwoodcolour">Instagram</a> <a href="https://www.youtube.com/channel/UCXp8H8zsPLgaHZnukBwcgHQ">Youtube</a>
        </Social>
      </Container>
    )
  }
}

export default Form;