import React from 'react'
import Title from './title'
import Description from './description'
import styled from 'styled-components'

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContactUs = () => (
  <Content>
    <Title>Don’t worry!</Title>
    <Description>
      Our team of Expert Colourists are here to help. Please drop us an email
      at&nbsp;
      <a href="mailto:hello@joshwoodcolour.com">hello@joshwoodcolour.com</a>,
      attaching photos of your hair roots and lengths, and we will get back to
      you within one working day with your personal product recommendations,
      tips and tricks.
    </Description>
  </Content>
)

export default ContactUs
