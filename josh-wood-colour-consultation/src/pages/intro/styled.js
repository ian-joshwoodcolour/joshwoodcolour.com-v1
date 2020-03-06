import styled from 'styled-components'
import GenericTitle from '../../components/title'
import GenericDescription from '../../components/description'
import GenericButton from '../../components/button'
import { mq } from '../../styled'

export const Picture = styled.div`
  display: none;

  ${mq.large`
    display: block;
    flex: 0 0 40%;
    background-image: url(${({ src }) => src});
    background-size: cover;
    align-self: stretch;
  `}
`

export const Title = styled(GenericTitle)`
  ${mq.large`
  text-align: left;
  font-size: 2.5rem;
  line-height: 50px;
  `}
`

export const Description = styled(GenericDescription)`
  ${mq.large`
    text-align: left;
    max-width: 27rem;
  `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100%;
  flex: 1 1 auto;
`

export const Section = styled.div`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mq.large`
    background-color: transparent;
    padding: 0;
    align-items: flex-start;
  `}
`

export const HeaderSection = styled(Section)`
  background-color: #ed915b;
`

export const NameInput = styled.input`
  border: 0;
  background: transparent;
  font-size: 2rem;
  flex-grow: 1;
  width: 1rem;
  padding: 0;
  margin-left: 0.8rem;
  font-weight: 300;
  ${mq.large`
    font-size: 2.6rem;
  `}
`
export const NameLabel = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 2rem;
`
export const NameForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mq.large`
    padding: 6.25rem 5rem 0 7rem;
    align-items: flex-start;
  `}
`

export const NameField = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  line-height: 2.3rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.5);
  width: 100%;
  margin: 1rem;
  ${mq.large`
    width: 27rem;
    font-size: 2.5rem;
    line-height: 3rem;
    margin: 0;
  `}
`

export const Button = styled(GenericButton)`
  margin: 0%;
  margin-top: 3rem;
  ${mq.large`
    padding: 1.5rem 3rem;
  `}
`
