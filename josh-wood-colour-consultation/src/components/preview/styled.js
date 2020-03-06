import styled from 'styled-components'
import { mq } from '../../styled'

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  ${mq.large`
    flex-direction: row;
    margin-right: 80px;
  `}
`
export const SelectedSwatch = styled.img`
  width: 10rem;
  height: 10rem;
  border: 0.1rem solid #f7f3f0;
  background-color: #f7f3f0;
  border-radius: 50%;
  order: -1;
  margin-bottom: -5rem;
  z-index: 1;
  ${mq.large`
  order: 1;
    position: initial;
    margin-left: -5rem;
    margin-top: -15rem;
  `}
`

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  ${mq.large`
  width: auto;
  margin: 3rem;
  `}
`

export const Separator = styled.hr`
  border-top: 1px solid gray;
  width: 100%;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 550px;
  ${mq.large`
  padding: 3rem;
  margin-right: 5rem;
  background-color: #e6e0dc;
  width: 435px;
  `}
`

export const RetakeButton = styled.button`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 1rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  border: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Icon = styled.svg`
  margin: 0.4rem;
`

export const PicturePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  ${mq.large`
    flex-direction: row;
  `}
`

export const ImageCrop = styled.div`
  height: 550px;
  width: 100%;
  max-width: 435px;
  overflow: hidden;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: flex-end;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  ${mq.large`
  width: 435px;
  `}
`

export const CameraWrapper = styled.div`
  height: 550px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  ${mq.large`
  width: 435px;
  margin-right: 5rem;
  `}
`

export const CameraButton = styled(RetakeButton)`
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
