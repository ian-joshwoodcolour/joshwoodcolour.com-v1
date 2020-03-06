import React from 'react'
import {
  ExamplePictures,
  ExamplesSection,
  PictureWrapper,
  Pictures,
  Picture,
  ImageLabel,
  SectionLabel,
  Icon,
} from './styled'
import propTypes from 'prop-types'
import { CDN } from '../../common/paths'

const Example = ({ src, label }) => (
  <PictureWrapper>
    <Picture src={src} alt={label || 'Sample'} />
    {label && <ImageLabel>{label}</ImageLabel>}
  </PictureWrapper>
)

Example.defaultProps = {
  label: '',
}

Example.propTypes = {
  src: propTypes.string.isRequired,
  label: propTypes.string,
}

const Examples = () => (
  <ExamplePictures>
    <ExamplesSection>
      <SectionLabel>
        <Icon width="10" height="9">
          <path
            d="M1 4.5L3.4 7 9 1"
            stroke="#000"
            strokeWidth="1.8"
            fill="none"
            fillRule="evenodd"
          />
        </Icon>
        Dos
      </SectionLabel>
      <Pictures>
        <Example src={`${CDN}/dos1.jpg`} />
        <Example src={`${CDN}/dos2.jpg`} />
      </Pictures>
    </ExamplesSection>
    <ExamplesSection>
      <SectionLabel>
        <Icon width="9" height="9">
          <g stroke="#000" strokeWidth="1.8" fill="none" fillRule="evenodd">
            <path d="M.8 8.3l7-7.1M7.9 8.3L.8 1.2" />
          </g>
        </Icon>
        Don&apos;ts
      </SectionLabel>
      <Pictures>
        <Example src={`${CDN}/donts1.jpg`} label="Too dark" />
        <Example src={`${CDN}/donts2.jpg`} label="Too far away" />
      </Pictures>
    </ExamplesSection>
  </ExamplePictures>
)

export default Examples
