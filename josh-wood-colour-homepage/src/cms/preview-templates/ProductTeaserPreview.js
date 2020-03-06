import React from 'react'
import PropTypes from 'prop-types'
import { ProductTeaserTemplate } from '../../templates/product-teaser'

const AboutPagePreview = ({ entry, widgetFor }) => (
  <ProductTeaserTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
