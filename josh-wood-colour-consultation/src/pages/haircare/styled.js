import styled from "styled-components";
import { mq } from "../../styled";

export const HaircareForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  width: 100%;

  ${mq.desktop`
     width: 22rem;
     margin: 3rem;
  `};
`;
