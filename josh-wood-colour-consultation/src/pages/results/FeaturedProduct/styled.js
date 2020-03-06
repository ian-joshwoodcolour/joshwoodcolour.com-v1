import styled from "styled-components";
import { mq, theme } from "../../../styled";
import Button from "../../../components/button";

import { ImageWrap as ImageWrapDefault } from "../../../components/image";

export const InvisibleWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 1.5rem;

  ${mq.desktop`
    transform: translateY(-25%);
    `};
`;

export const Wrap = styled.div`
  margin: auto;
  position: relative;
  ${mq.desktop`
    background: linear-gradient(to right, #ddbb77, #ebd2a5);
    padding: 2.5rem 4rem;
   width: 80%;
   padding: .375rem;
   `};
`;

export const InnerWrap = styled.div`
  width: 100%;
  height: 100%;

  ${mq.desktop`
    background: ${theme.background};
        padding: 4rem 0;
        min-height: 300px;
  `};
`;

export const Title = styled.p`
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  max-width: 85%;
  color: ${theme.primary};

  ${mq.desktop`
      width: 100%;
      font-size: 1.6rem;
  `};
`;

export const Price = styled(Title)`
  margin-bottom: 1rem;
  font-weight: 400;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem 0;

  &:last-child {
    padding-bottom: 0;
  }

  ${mq.desktop`
    flex-direction: row;
    padding-left: 6rem;
    padding-right: 6rem;
  `};
`;

export const ImageWrap = styled(ImageWrapDefault)`
  width: 100%;

  ${mq.desktop`
     width: 250px;
    height: 300px;
  `};
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${theme.gray};

  ${mq.desktop`
    margin-bottom: 2rem;
  `};
`;

export const DescriptionWrap = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  margin: 1rem 0;
  flex-wrap: wrap;
  flex-direction: column;

  ${mq.desktop`
     margin-left: 1.5rem;
  `};
`;

export const AddToCardButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;

  ${mq.desktop`
    width: 80%;
  `};
`;
