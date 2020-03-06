import React from 'react'
import PropTypes from 'prop-types'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <div />
)

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
