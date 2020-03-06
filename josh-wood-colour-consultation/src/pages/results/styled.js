import styled from "styled-components";
import { mq, theme } from "../../styled";
import { BoxedWrap } from "../../components/page/styled";

export const Title = styled.h2`
  font-size: 20px;
  color: #169;
`;
export const Container = styled.div`
  overflow-y: auto;
  background: ${theme.backgroundDark};
`;

export const Content = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding-top: 160px;
`;

export const PreviewSection = styled(BoxedWrap)`
  ${mq.desktop`
       padding-bottom: 12.5rem;
  `};
`;

export const Description = styled.p``;
export const NameInput = styled.input``;
export const NameLabel = styled.label`
  font-weight: 500;
`;
export const NameForm = styled.form``;
export const NameField = styled.div``;

export const Subtitle = styled.p`
  max-width: 40rem;
  margin: 1.5rem auto 4rem auto;
  color: ${theme.gray};
  font-size: 1.5rem;
  font-weight: 300;
`;

export const ResultPhotos = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 3rem;
  margin: 0 auto 3rem auto;
  justify-content: center;

  ${mq.desktop`
     height: 300px;
     width: 500px;
  `};
`;

export const ResultWrap = styled.div`
  flex: 1;
  max-width: 50%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
