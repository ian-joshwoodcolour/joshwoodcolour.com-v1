import React from 'react'
import styled from 'styled-components'
import Form from './Form'
import { mq } from '../../utils'

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0px auto;
  padding: 40px;
  ${mq.desktop`padding: 159px 40px 136px 40px;`}
`

const Content = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: stretch;
`

const Text = styled.div`
    flex: 0 1 435px;
    ${mq.large`flex-shrink: 0;`}
`
const Heading = styled.h2`
    font-size: 30px;
    color: black;
    line-height: 40px;
    margin-bottom: 37px;
    font-weight: 400;
    > b {
        font-weight: 600;
        color: #E17A51;
    }
`

const SubHeading = styled.h3`
    
    font-size: 25px;
    color: #000000;
    margin-bottom: 14px;
`

const List = styled.ul`
    font-size: 15px;
    color: #808080;
    line-height: 30px;
    margin-bottom: 50px;
`

const Item = styled.li`

`

const Button = styled.button`
    width: 184px;
    height: 18px;
    
    font-size: 15px;
    color: #000000;
    letter-spacing: 0.5px;
    border: none;
`

const Graphic = styled.div`
    display: none;
    background-image: url(./contact.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100%;
    flex: 0 1 582px;
    position: relative;
    right: 20px;
    ${mq.large`
        right: 120px;
    `}
    ${mq.desktop`
        display: block;
    `}
`

const Arrow = () => (
    <svg width="58" height="13">
        <path d="M57.803 6.97l-5.6 5.816a.712.712 0 0 1-.99.027c-.272-.24-.279-.707-.027-.968l4.495-4.66H.7A.692.692 0 0 1 0 6.5c0-.378.313-.684.7-.684h54.981l-4.495-4.661c-.252-.261-.234-.717.027-.968a.713.713 0 0 1 .99.027l5.6 5.816c.164.157.194.31.197.47a.791.791 0 0 1-.197.47z" fill="#000" fill-rule="nonzero"/>
    </svg>
)

class Contact extends React.Component {
  render() {
    return (
      <Container>
        <Content>
            <Graphic src="./contact.png" />
            <Text>
                <Heading><b>Join thousands of people</b> who are part of the global Josh Wood Colour community</Heading>
                <SubHeading>Be the first to receive…</SubHeading>
                <List>
                    <Item>Exclusive offers & discounts</Item>
                    <Item>Expert advice and tutorials</Item>
                    <Item>Behind the scenes access</Item>
                </List>
                <Form />
            </Text>
        </Content>        
      </Container>
    )
  }
}

export default Contact;