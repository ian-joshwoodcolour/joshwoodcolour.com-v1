import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import Instagram from './Instagram'
import Facebook from './Facebook'
import Form from './Form'
import mq from '../../utils/mq'

const Container = styled.footer`
  padding-top: 96px !important;
  padding-bottom: 96px !important;
`

const Content = styled.footer`
  max-width: 1300px;
  width: 100%;
  padding-left: 48px !important;
  padding-right: 48px !important;
  display: flex;
  flex-wrap: wrap;
  align-items: top;
  justify-content: space-between;
  margin: 0 auto;
`

const Menu = styled.ul`
  list-style: none;
  line-height: 27px;
  font-weight: 400;
  margin: 0;
  ${({ light }) => light && `font-weight: 300; display: none;`};
  ${mq.desktop`display: block;`}
`

const MenuItemContainer = styled.li`
  svg {
    margin-right: 7px;
  }
`

const Link = styled.a`
  text-decoration: none;
`

const LogoLink = styled.a`
  position: relative;
  top: -7px;
`

const FormContainer = styled.div`
  text-align: right;
  padding-top: 24px;
  ${mq.desktop`padding-top: 0`}
`

const Copyright = styled.div`
  color: #979797 !important;
  margin-top: 24px;
  font-size: 12px;
  font-weight: 200;
`


const MenuItem = ({ href, children }) => <MenuItemContainer>
  <Link href={href}>{children}</Link>
</MenuItemContainer>


const Footer = class extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <LogoLink href="https://joshwoodcolour.com/">
            <Logo />
          </LogoLink>
          <Menu>
            <MenuItem href="https://joshwoodcolour.com/collections/all">Shop</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/how-it-works">How it Works</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/blogs/tips-tricks">Community</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/about-josh">About Josh</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/salon">Salon</MenuItem>
          </Menu>
          <Menu light>
            <MenuItem href="https://joshwoodcolour.com/collections/all">Salon Price List</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/how-it-works">Terms & Conditions</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/blogs/tips-tricks">Privacy Policy</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/about-josh">Cookie policy</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/salon">FAQs</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/salon">Delivery & Returns</MenuItem>
            <MenuItem href="https://joshwoodcolour.com/pages/salon">Contact us</MenuItem>
          </Menu>
          <Menu light>
            <MenuItem href="https://www.instagram.com/joshwoodcolour"><Instagram />Instagram</MenuItem>
            <MenuItem href="https://en-gb.facebook.com/JoshWoodColour/"><Facebook />Facebook</MenuItem>
          </Menu>
          <FormContainer>
            <Form />
            <Copyright>© Copyright 2019 | All Rights Reserved. </Copyright>
          </FormContainer>
        </Content>
      </Container>
    )
  }
}

export default Footer
