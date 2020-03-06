import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Intro from './pages/intro'
import CurrentType from './pages/current-type'
import PictureUpload from './pages/picture-upload'
import PictureSelect from './pages/picture-select'
import ColourFamily from './pages/colour-family'
import ShadeShot from './pages/shade-shot'
import Grays from './pages/grays'
import Shades from './pages/shades'
import Haircare from './pages/haircare'
import Results from './pages/results'
import Highlights from './pages/highlights'
import store from './store'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ROOT } from './common/paths'
import ScrollToTop from './utils/scroll-to-top'

// import 'sanitize.css'

const STOREFRONT_URL = 'https://josh-wood-colour.myshopify.com/api/graphql'
const STOREFRONT_TOKEN = 'c941e02de2449d09c99bfd791be32bfd'

const client = new ApolloClient({
  uri: STOREFRONT_URL,
  headers: {
    'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
  },
})

const Pages = ({ addToCart }) => (
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App>
          <ScrollToTop>
            <Route path={`${ROOT}/`} exact component={Intro} />
            <Route
              path={`${ROOT}/current-type`}
              exact
              component={CurrentType}
            />
            <Route path={`${ROOT}/picture`} exact component={PictureUpload} />
            <Route
              path={`${ROOT}/picture-select`}
              exact
              component={PictureSelect}
            />
            <Route
              path={`${ROOT}/colour-family`}
              exact
              component={ColourFamily}
            />
            <Route path={`${ROOT}/shades`} exact component={Shades} />
            <Route path={`${ROOT}/shade-shot`} exact component={ShadeShot} />
            <Route path={`${ROOT}/greys`} exact component={Grays} />
            <Route path={`${ROOT}/haircare`} exact component={Haircare} />
            <Route
              path={`${ROOT}/results`}
              exact
              component={() => <Results addToCart={addToCart} />}
            />
            <Route path={`${ROOT}/highlights`} exact component={Highlights} />
          </ScrollToTop>
        </App>
      </ApolloProvider>
    </Provider>
  </Router>
)

const render = (container, addToCart) => {
  if (container) ReactDOM.render(<Pages addToCart={addToCart} />, container)
}

render(document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

export default render
