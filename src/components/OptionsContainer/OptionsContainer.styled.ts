import styled from "styled-components";
import { OptionsContainerProps } from "../../interfaces";

export const StyledOptionsContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hasOption", "iconfontsize,optionname"].includes(prop)
})<OptionsContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
  border-radius: 10px;
  gap: 5px;
  background-color: ${({ theme }) => theme.layer2};
  border: 1px solid ${({ theme }) => theme.layer2}; 
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.layer1};
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ right }) => `${right ? right : 0}rem`};
    font-size: ${({ iconfontsize }) => `${iconfontsize ? iconfontsize : 30}px`};
  }
  
  .checkmark {
    color: ${({ theme }) => theme.green};
    font-size: 22px;
    font-weight: 500;
  }
`;
