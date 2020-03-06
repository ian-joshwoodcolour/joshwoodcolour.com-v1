import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  NameInput,
  NameForm,
  NameLabel,
  NameField,
  Title,
  Description,
  Picture,
  Button,
  Section,
  HeaderSection,
} from './styled'
import { CDN } from '../../common/paths'

const IntroPage = ({
  name,
  handleNameChange,
  handleStartClick,
  isStartButtonDisabled,
}) => (
  <Container>
    <Picture src={`${CDN}/home.jpg`} />
    <NameForm>
      <HeaderSection>
        <Title>We&apos;re here to help you achieve your best colour</Title>
        <Description>
          Use our consultation to find your perfect products for natural
          looking, glossy colour and fantastic condition.
        </Description>
      </HeaderSection>
      <Section>
        <NameLabel>Firstly, tell us your name</NameLabel>
        <NameField>
          <span>Hi, I&apos;m</span>
          <NameInput value={name} onChange={handleNameChange} />
        </NameField>
        <Button disabled={isStartButtonDisabled} onClick={handleStartClick}>
          Find my personalised colour
        </Button>
      </Section>
    </NameForm>
  </Container>
)

IntroPage.propTypes = {
  name: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired,
  isStartButtonDisabled: PropTypes.bool.isRequired,
}

export default IntroPage
