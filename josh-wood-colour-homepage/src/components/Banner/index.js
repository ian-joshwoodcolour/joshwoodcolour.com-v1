import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'
import Menu from './Menu'
import mq from '../../utils/mq'

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

`

const Images = styled.div`
  width: 100%;
  flex: 1 1 100%;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 560px;
`

const Heading = styled.h2`
  font-size: 42px;
  letter-spacing: -0.7px;
  color: #000000;
  margin-bottom: 24px;
  line-height: normal;
  ${({ small }) => small && `font-size: 26px;`}
  ${mq.desktop`
    font-size: 60px;
    letter-spacing: -1px;    
    ${({ small }) => small && `
      font-weight: 400;
      font-size: 40px;
    `}    
  `}
`

const SubHeading = styled.h3`
  opacity: 0.8;
  
  font-size: 20px;
  color: #000000;
`

const Text = styled.div`
  opacity: 0.8;
  font-size: 20px;
  color: #000000;
  line-height: 30px;
  margin-bottom: 82px;
  max-width: 70%;
`

const BannerBackgroundImage = styled.div`
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  ${({ active }) => active ? `opacity: 1; z-index: 1` : `opacity: 0; z-index: 0`};
  transition: opacity 1s;
  background-size: cover;
  background-position: bottom right;
  
  &:nth-child(1) {
    background-image: url('./josh.png')
  }
  &:nth-child(2) {
    background-image: url('./rangeshot.png')
  }
  &:nth-child(3) {
    background-image: url('./models.png')
  }
`

const Button = styled.a`
  background: #000000;
  font-size: 18px;
  font-weight: 200;
  color: #FFFFFF;
  letter-spacing: 0.47px;
  text-align: center;
  text-decoration: none;
  margin-top: 42px;
  padding: 10px 20px;
  ${mq.desktop`
    padding: 24px 82px;
  `}
`

class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }

  handlePickerClick(newIndex) {
    this.setState({
      currentIndex: newIndex,
    })
  }

  render() {
    const { data } = this.props
    const { currentIndex } = this.state;
    const { edges: posts } = data.allMarkdownRemark

    console.log(posts)

    return (
      <Container>
        <Images>
          {posts &&
            posts.map(({ node: {id, html, frontmatter: { sort, title, subTitle, buttonURL, buttonLabel }}}, index) => (
              <BannerBackgroundImage key={`${id}${title}${sort}`} active={Boolean(currentIndex==index)}>
                  <Content>
                    <Heading small={sort===0}>{title}</Heading>
                    <SubHeading>{subTitle}</SubHeading>
                    <Text dangerouslySetInnerHTML={{ __html: html }} />
                    <Button href={buttonURL}>{buttonLabel}</Button>
                  </Content>
              </BannerBackgroundImage>
            ))}
        </Images>
        <Menu pickerLength={posts.length} pickerOnClick={(value) => this.handlePickerClick(value)} pickerIndex={currentIndex} />
      </Container>
    )
  }
}

Banner.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BannerQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___sort] }
          filter: { frontmatter: { templateKey: { eq: "banner-item" } } }
        ) {
          edges {
            node {
              id
              html
              frontmatter {
                title
                subTitle
                templateKey
                buttonLabel
                buttonURL
                sort
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Banner data={data} count={count} />}
  />
)
