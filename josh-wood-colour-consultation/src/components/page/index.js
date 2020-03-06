import React from 'react'
import PropTypes from 'prop-types'
import { Page as PageWrapper, StepIndicator } from './styled'

const Page = ({ step, children }) => (
  <PageWrapper>
    <StepIndicator>Step {step}/7</StepIndicator>
    {children}
  </PageWrapper>
)

Page.defaultProps = {
  children: [],
}

Page.propTypes = {
  step: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
}

export default Page
