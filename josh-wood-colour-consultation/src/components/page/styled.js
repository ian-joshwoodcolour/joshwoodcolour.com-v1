import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1.5rem;
`
export const StepIndicator = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.gray};
  margin: 126px 1rem 1rem;
`

export const BoxedWrap = styled(Page) `
     padding: 0 1.5rem;
`
