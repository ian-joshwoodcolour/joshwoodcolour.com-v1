import styled from "styled-components";
import GenericLabel from "../../components/label";
import { mq } from "../../styled";

export const GraysForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 3rem 0;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const GraysLevel = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  margin-bottom: 1rem;

  ${mq.desktop`
    width: 19%;
  `};
`;

export const Picture = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 9rem;
  object-fit: cover;
  margin-bottom: 0.5rem;
  padding: 0.15rem;
  border: 2px solid
    ${props => (props.selected ? props.theme.primary : "transparent")};

  ${mq.desktop`
     width: 100%;
      margin-bottom: 1rem;
      height: 11.5rem;
  `};
`;

export const Label = styled(GenericLabel)`
  color: ${props => (props.selected ? "#000" : props.theme.gray)};
  font-size: .9rem;
  
  ${mq.desktop `
     font-size: 1.1rem;
  `}
`;
