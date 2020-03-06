import styled, { createGlobalStyle } from 'styled-components'
import { generateMedia } from 'styled-media-query'

export const theme = {
  primary: '#000',
  secondary: '#D2CECC',
  disabled: '#B3ADAA',
  highlight: '#ED915B',
  background: '#f7f3f0',
  backgroundDark: '#f2eae4',
  gray: '#949190',
}

export const App = styled.div`
  background: ${props => props.theme.background};
  width: 100%;
  margin: auto;
  font-size: 1.4rem;
  min-height: 100%;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 62.5%;
  * {
    font-family: Brown, sans-serif;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
`

export const Header = styled.h1`
  margin: 0;
`

const MOBILE = 'mobile'
const LARGE = 'large'

const media = generateMedia({
  [MOBILE]: '768px',
  [LARGE]: '1170px',
})

export const mq = {
  desktop: media.greaterThan(MOBILE),
  large: media.greaterThan(LARGE),
}
