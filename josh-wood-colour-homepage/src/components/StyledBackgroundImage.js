import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

const StyleableBackgroundImage = ({ className }) => (
  <BackgroundImage Tag="section"
    className={className}
    fluid={imageData}
    backgroundColor={`#040e18`}
  >
    <h1>Hello gatsby-background-image</h1>
  </BackgroundImage>
)