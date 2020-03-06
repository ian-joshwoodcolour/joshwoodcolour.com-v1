import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'
import mq from '../utils/mq'

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0px auto;
  padding: 118px 40px 149px;
`

const Heading = styled.h2`
    font-size: 13px;
    color: #CCB88B;
    letter-spacing: 5px;
    text-align: center;
    margin-bottom: 28px;
    text-transform: uppercase;
`

const SubHeading = styled.h3`
    color: #000000;
    letter-spacing: -1px;
    text-align: center;
    margin-bottom: 18px;
    font-size: 30px;
    ${mq.desktop`font-size: 50px;`}
`

const Intro = styled.p`
    
    font-size: 15px;
    color: #000000;
    text-align: center;
    line-height: 30px;
    margin-bottom: 110px;
`

const Products = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    ${mq.desktop`flex-wrap: nowrap; width: 1000px;`}
`

const Product = styled.a`
    height: 350px;
    position: relative;
    text-decoration: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    flex: 0 0 300px;
    ${mq.desktop`flex: 0 0 320px;`}
`

const Content = styled.div`
    position: absolute;
    top: 272px;
    bottom: 0px;
    left: 30px;
    right: 30px;
`

const Text = styled.div`
    font-size: 22px;
    color: #000000;
    letter-spacing: -0.5px;
    margin-top: 18px;
`

const Square = styled.div`
    width: 100%;
    height: 330px;
    position: absolute;
    top: 20px;
    background-color: ${({ pink, blue }) => {
        if(blue) return '#C6E1F1'
        if(pink) return '#FFE7EF'
        return '#FFE0CD';
    }};
    z-index: 0;
`

const Line = styled.div`
    background: black;
    width: 21px;
    height: 2px;
`

const Image = styled.img`
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
`

class ProductTeaser extends React.Component {
  render() {
    return (
      <Container>
        <Heading>Discover Our Products</Heading>
        <SubHeading>Colour, Conceal & Care</SubHeading>
        <Intro>Let a world-leading colour expert help create natural, glossy,<br /> modern hair that feels like you.</Intro>
        <Products>
            <Product href="https://joshwoodcolour.com/collections/#permanent-colour-products">
                <Square />
                <Image src="./permanent.png" />
                <Content>
                    <Line />
                    <Text>Permanent Colour Kits</Text>
                </Content>
            </Product>
            <Product href="https://joshwoodcolour.com/collections/#root-concealers-products">
                <Square pink />
                <Image src="./roots.png" />
                <Content>
                    <Line />
                    <Text>Root Concealers</Text>
                </Content>
            </Product>
            <Product href="https://joshwoodcolour.com/collections/#care-range-products">
                <Square blue />
                <Image src="./care.png" />
                <Content>
                    <Line />
                    <Text>Care Range</Text>
                </Content>
            </Product>
        </Products>
      </Container>
    )
  }
}

export default ProductTeaser;