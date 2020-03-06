import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const createQuery = searchQuery => gql`
  query {
    products(first: 100, query: "${searchQuery}") {
      edges {
        node {
          id
          title
          description
          variants(first: 1) {
            edges {
              node {
                id
                price  
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
              }
            }
          }
        }
      }
    }
  }
`

const withProducts = searchQuery => compose(graphql(createQuery(searchQuery)))

export default withProducts
