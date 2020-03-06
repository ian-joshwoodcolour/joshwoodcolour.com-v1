import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import useSiteMetadata from './SiteMetadata'
import 'intersection-observer'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Brown;
    src: url('./lineto-brown-light.woff');
    src: url('./lineto-brown-light.woff2') format('woff2');
    font-weight: 300;
  }
  @font-face {
    font-family: Brown;
    src: url('./lineto-brown-regular.woff');
    src: url('./lineto-brown-regular.woff2') format('woff2');
    font-weight: 400;
  }
  @font-face {
    font-family: Brown;
    src: url('./lineto-brown-bold.woff');
    src: url('./lineto-brown-bold.woff2') format('woff2');
    font-weight: 700;
  }
  html, body {
    margin: 0;
    padding: 0;
  }
  * {
    font-family: Brown;
    box-sizing: border-box;
  }
  button {
    background:none;
    color:inherit;
    border:none; 
    padding:0!important;
    font: inherit;
    cursor: pointer;
  }
  a {
    color: inherit;
  }
`

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <GlobalStyle />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
      </Helmet>
      <div>{children}</div>
    </div>
  )
}

export default TemplateWrapper
