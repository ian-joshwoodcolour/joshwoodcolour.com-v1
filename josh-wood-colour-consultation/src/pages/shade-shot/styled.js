import styled from 'styled-components'
import {mq} from '../../styled';
import TipsButton from "../../components/tips-button";

export const ShadeShotForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2rem;
`

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  
  ${mq.desktop `
    padding-left: 2.5rem;
    width: 50%;
  `}
`

export const Preview = styled.img`
  height: 550px;
  width: 435px;
  object-fit: cover;
  display: none;
  
  ${mq.desktop `
    display: block;
  `}
`

export const Selectors = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  
  ${mq.desktop `
    width: 21.25rem;
    margin: 2.5rem 0;
  `}
`

export const VideoSection = styled.div`
  background-color: #f2eae4;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.5rem;
  
  ${mq.desktop `
    padding: 5rem 0;
  `}
`

export const VideoTitle = styled.span`
  color: #e17a51;
`

export const VideoIFrame = styled.iframe`
  margin: 3rem;
  width: 100%;
  
  ${mq.desktop `
     width: 560px;
  `}
`

export const TipsButtonTop = styled(TipsButton) `
  ${mq.desktop `
    display: none;
  `}
`

export const ButtonSelectorsWrap = styled.div `
  display: none;
  
  ${mq.desktop `
    display: block;
  `}
`

export const ChoicesWrap = styled.div `
  display: flex;
  flex-direction: row;
  
  ${mq.desktop `
    display: none;
  `}
`
