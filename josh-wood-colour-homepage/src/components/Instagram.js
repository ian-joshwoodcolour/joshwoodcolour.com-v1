import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby';
import {mq} from '../utils'

const FETCH_URL = 'https://www.instagram.com/joshwoodcolour/?__a=1'

const Container = styled.div`
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
    ${mq.desktop`padding: 103px 0 130px;`}
`

const Content = styled.div`
  padding: 0 40px;
`

const Heading = styled.h2`
    font-size: 35px;
    color: #000000;
    text-align: center;
    line-height: 50px;
`

const Text = styled.div`
    font-size: 15px;
    font-weight: 200;
    color: #808080;
    text-align: center;
    line-height: 25px;
`

const Logos = styled.div`
    border-top: 2px solid #E6E6E6;
    padding-top: 25px;
    text-align: center;
`

const Images = styled.div`
  margin-top: 40px;
  ${mq.desktop`margin-top: 147px;`}
`

const ImageRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Image = styled.div`
  background-image: url(${({src}) => src});
  background-size: cover;
  background-position: center center;
  flex: 1 1 auto;
  padding-top: calc(100% / 6);
`


class Instagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
    }
  }

  componentDidMount() {
    fetch(FETCH_URL).then(
      (response) => response.json()
    ).then(
      ({ graphql: { user: { edge_owner_to_timeline_media: { edges: images } } } }) => {
        
        this.setState({
          images: images.map(({ node: { thumbnail_src } }) => thumbnail_src)
        })
      }
    )
  }

  render() {
    const { images } = this.state;

    return (
      <Container>
        <Content>
          <Heading>Follow us on Instagram</Heading>
          <Text>
              Welcome to our world of colour. From the Atelier to the catwalk<br /> and everything in between — we share it all.
          </Text>
        </Content>
        <Images>
          <ImageRow>
            {images.slice(0, 6).map((src) => <Image src={src} />)}
          </ImageRow>
          <ImageRow>
            {images.slice(6, 12).map((src) => <Image src={src} />)}
          </ImageRow>
        </Images>
      </Container>
    )
  }
}

export default Instagram;