import styled, { css } from "styled-components";
import {mq, theme} from '../../../styled';
import { Title } from "../../../components";

export const SectionWrap = styled.section`
  padding: 0 1.5rem;

  ${mq.desktop `
    padding-top: 4rem;
    
    background: ${theme.background};
  `}
`;

export const Headline = styled(Title)`
  margin: auto;
`;

export const Wrap = styled.div`
  width: 70%;
margin: auto;
`;

export const ProductsContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`;

export const ProductsItemWrap = styled.li`
  width: 100%;
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
   
  ${mq.desktop `
    width: 31%;
    margin-bottom: 5rem;
  `}
`;
