import React from 'react'
import styled from 'styled-components'
import mq from '../utils/mq'

const Container = styled.div`
  max-width: 1136px;
  width: 100%;
  margin: 0px auto;
  border-top: 1px solid #E6E6E6;
  padding: 40px;
  ${mq.desktop`padding: 129px 40px 190px;`}
`

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const Text = styled.div`
    flex: 0 0 340px;
`

const Heading = styled.h2`
    
    font-size: 13px;
    color: #CCB88B;
    letter-spacing: 5px;
    margin-bottom: 28px;
    text-transform: uppercase;
`

const SubHeading = styled.h3`
    font-size: 35px;
    color: #1A1A1A;
    line-height: 40px;
`

const Intro = styled.p`
    
    font-size: 15px;
    color: #808080;
    line-height: 25px;
    margin-bottom: 39px;
    width: 340px;
`

const Button = styled.button`
    width: 184px;
    height: 18px;
    
    font-size: 15px;
    color: #000000;
    letter-spacing: 0.5px;
    border: none;
    background: transparent;
    padding: 0;
    text-align: left;
    position: relative;
    > svg {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
`

const Arrow = () => (
    <svg width="58" height="13">
        <path d="M57.803 6.97l-5.6 5.816a.712.712 0 0 1-.99.027c-.272-.24-.279-.707-.027-.968l4.495-4.66H.7A.692.692 0 0 1 0 6.5c0-.378.313-.684.7-.684h54.981l-4.495-4.661c-.252-.261-.234-.717.027-.968a.713.713 0 0 1 .99.027l5.6 5.816c.164.157.194.31.197.47a.791.791 0 0 1-.197.47z" fill="#000" fill-rule="nonzero"/>
    </svg>
)

class Video extends React.Component {
  render() {
    return (
      <Container>
        <Content>
            <Text>
                <Heading>Community</Heading>
                <SubHeading>Josh talks Gloss</SubHeading>
                <Intro>Josh goes behind the hype on this buzzy product to explain why he’s formatted our new innovation: shades shot gloss. We meet Josh’s teammate, Jenna who uses icy blonde to tone down the ‘yellow’ or brassiness in her hair.</Intro>
                <Button>Play video <Arrow /></Button>
            </Text>
            <iframe src="https://player.vimeo.com/video/343412951?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="fullscreen" allowfullscreen></iframe>
        </Content>        
      </Container>
    )
  }
}

export default Video;