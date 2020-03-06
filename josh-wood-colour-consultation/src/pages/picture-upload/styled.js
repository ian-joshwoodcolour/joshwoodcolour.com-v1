import styled from 'styled-components'
import GenericTipsButton from '../../components/tips-button'
import { mq } from '../../styled'

export const PictureForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  ${mq.large`
   width: 70%;
  `}
`

export const TipsButton = styled(GenericTipsButton)`
  margin: 2rem 0;
`

export const ExamplePictures = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mq.large`
    flex-direction: row;
    margin-bottom: 2rem;
  `}
`

export const ExamplesSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem;
`

export const Pictures = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`

export const Picture = styled.img`
  width: 10rem;
  border: 1px solid #979797;
`

export const ImageLabel = styled.div`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.3rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
`

export const SectionLabel = styled.div`
  color: #000;
  font-size: 0.9rem;
  line-height: 1.5rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`

export const PictureWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const Icon = styled.svg`
  margin-right: 0.4rem;
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 22rem;
  ${mq.large`
    width: 22rem;
  `}
`

export const Separator = styled.hr`
  border-top: 1px solid ${props => props.theme.secondary};
  width: 100%;
`

export const BottomPopup = styled.div`
  background-color: #ccc;
  position: absolute;
  bottom: 1rem;
  width: 70rem;
`

export const TipsList = styled.ol`
  text-align: left;
  margin: 0 auto;
  width: max-content;
  ${mq.large`
    width: auto;
  `}
`
