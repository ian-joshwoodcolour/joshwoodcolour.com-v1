import styled from "styled-components";
import { mq, theme } from "../../../styled";
import { BoxedWrap } from "../../../components/page/styled";

import TitleDefault from "../../../components/title";

export const Wrap = styled(BoxedWrap)`
  background: ${theme.backgroundDark};
  padding: 2rem 1.5rem;

  ${mq.desktop`
       padding: 6rem 1.5rem;
   `};
`;

export const SubHeadlineTop = styled.p`
  margin: 0 0 1rem;
  text-transform: uppercase;
  color: ${theme.gray};
  font-size: 0.8rem;
`;

export const Title = styled(TitleDefault)`
  color: ${theme.highlight};
  
  ${mq.desktop `
     margin-bottom: .5rem;
  `}
`;

export const SubTitle = styled.p`
  color: ${theme.primary};
  margin: auto;
  font-size: 1.2rem;

  ${mq.desktop`
      font-size: 2rem;
    max-width: 35rem;
    line-height: 2.5rem;
  `};
`;

export const VideoWrap = styled.figure`
  width: 100%;
  height: 300px;
  background: #000;
  margin: 2.5rem auto 0 auto;

  ${mq.desktop`
    width: 550px;
  `};
`;

export const Iframe = styled.iframe `
  max-width: 100%;
  width: 560px;
`
