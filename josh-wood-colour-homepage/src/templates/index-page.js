import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Banner from '../components/Banner'
import ProductTeaser from '../components/ProductTeaser'
import Video from '../components/Video'
import Contact from '../components/Contact'
import Mentions from '../components/Mentions'
import Instagram from '../components/Instagram'
import Footer from '../components/Footer'
import styled from 'styled-components'

const Gradient = styled.div`
  background-image: linear-gradient(180deg, #FFFFFF 0%, #F0F2F5 100%);
`

export const IndexPageTemplate = ({
  title,
}) => (
  <div>
    <Banner />
    <Gradient>
      <ProductTeaser />
      <Video />
    </Gradient>
    <Contact />
    <Mentions />
    <Instagram />
    <Footer />
  </div>
)

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
      }
    }
  }
`
