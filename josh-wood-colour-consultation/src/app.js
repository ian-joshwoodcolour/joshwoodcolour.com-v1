import React from 'react'
import PropTypes from 'prop-types'
import { App, theme } from './styled'
import { ThemeProvider } from 'styled-components'

const app = ({ children }) => (
  <ThemeProvider theme={theme}>
    <App>{children}</App>
  </ThemeProvider>
)

app.defaultProps = {
  children: [],
}

app.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

export default app
