import React from 'react'
import styled from 'styled-components'
import {mq} from '../utils'

const VOGUE = 'vogue'
const ELLE = 'elle'
const SUNDAY_TIMES_STYLE = 'sunday-times-style'
const REFINERY_29 = 'refinery-29'

const TIME = 5000

const ITEMS = [
  {
    "quote": "This long-awaited launch is going to make a lot of women (and men...) very happy.",
    "logo": "./vogue.png",
  },
  {
    "quote": "The King of Colour has finally imparted his knowledge... This system is simply genius.",
    "logo": "./elle.png"
  },
  {
    "quote": "Finally, an at-home colour kit that is easy to follow and delivers professional results.",
    "logo": "./style.png",
  },
  {
    "quote": "Welcome to the future of haircare and colour.",
    "logo": "./refinery29.png",
  }
]

const Container = styled.div`
  width: 100%;
  border-top: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
  padding: 0 40px;
`

const Content= styled.div`
  max-width: 1136px;
  width: 100%;
  margin: 0px auto;
  padding: 40px 0px;
  ${mq.desktop`padding: 88px 0 104px;`}
`

const Heading = styled.h2`
  font-size: 13px;
  color: #CCB88B;
  letter-spacing: 5px;
  margin-bottom: 28px;
  text-transform: uppercase;
`

const Quotes = styled.div`
  margin-bottom: 67px;
  width: 100%;
  position: relative;
  ${mq.desktop`
    height: 152px;
  `}
`

const Quote = styled.h3`
  font-weight: 300;
  color: #1A1A1A;
  opacity: ${({active}) => active ? 1 : 0};
  transition: opacity .5s;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 12px;
  ${mq.desktop`
    font-size: 40px;
    line-height: 50px;
  `}
`

const Logos = styled.div`
  border-top: 2px solid #E6E6E6;
  padding-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  > :not(:last-child) {
    margin-right: 20px;
    ${mq.desktop`
    margin-right: 100px;
  `}
  }
`

const Logo = styled.img`
  opacity: ${({active}) => active ? 1 : 0.2};
  transition: opacity .5s;
`

class Mentions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      interval: null,
    }
  }

  tick() {
    this.setState(({ index }) => {
      if(index === ITEMS.length - 1) return {index: 0};
      return {index: index + 1};
    })
  }

  componentDidMount() {
    this.setState({
      interval: window.setInterval(() => this.tick(), TIME)
    })
  }

  componentWillUnmount() {
    const { interval } = this.state;

    window.clearInterval(interval)
  }

  render() {
    const { index } = this.state;

    return (
      <Container>
        <Content>
          <Heading>Mentions</Heading>
          <Quotes>
            {ITEMS.map(
              ({quote}, quoteIndex) => <Quote active={Boolean(quoteIndex === index)}>“{quote}”</Quote>
            )}
          </Quotes>
          <Logos>
            {ITEMS.map(
              ({logo}, logoIndex) => <Logo active={Boolean(logoIndex === index)} src={logo} />
            )}
          </Logos>
        </Content>
      </Container>
    )
  }
}

export default Mentions;