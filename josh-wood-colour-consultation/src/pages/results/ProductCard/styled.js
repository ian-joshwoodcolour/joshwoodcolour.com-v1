import styled from "styled-components";
import {mq, theme} from '../../../styled';
import { SecondaryButton } from "../../../components/button";

export const ImageWrap = styled.div`
  width: 100%;
  height: 320px;
  background: ${theme.disabled};
  margin-bottom: .5rem;
  position: relative;
`;

export const Description = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  visibility: hidden;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 0 1.6rem;
  font-weight: 200;
  font-size: 1.2rem;
  display: none;
      box-sizing: border-box;
  
  ${mq.desktop `
     display: flex;
  `}
`;

export const Wrap = styled.article`
  &:hover {
    ${Description} {
      visibility: visible;
    }
  }
`;

export const Metadata = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 1rem;
  justify-content: space-between;
  font-size: 1rem;
  
  ${mq.desktop `
    font-size: 1.4rem;
  `}
`;

export const Title = styled.p`
  margin: 0;
  max-width: 80%;
  font-weight: 600;
  text-align: left;
  
  ${mq.desktop `
    font-size: 1.5rem;
    height: 3.5rem;
  `}
`;

export const Price = styled.span`
  font-weight: 400;
`;

export const TextDescription = styled.p`
   font-size: 1rem;
   color: ${theme.gray};
   text-align: left;
   margin: 0 0 1rem;
   line-height: 1.5rem;
   
   ${mq.desktop `
    display: none;
   `}
`;

export const AddToCartButton = styled(SecondaryButton)`
   text-decoration: none;
   color: #fff;
   background: ${theme.primary};
   ${mq.desktop `
      color: ${theme.primary}
    background: none;
   `}
`;
