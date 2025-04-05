import styled from "styled-components";
import { OptionsContainerProps } from "../../interfaces";

export const StyledTreeAdjustedContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["hasOption", "iconfontsize,optionname"].includes(prop),
})<OptionsContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 0.8rem 0px;
  border-bottom-width: 0px;
  border-top-width: 5px;
  border-radius: 10px;
  gap: 14px;
  background-color: ${({ theme }) => theme.layer2};
  border-color: ${({ theme }) => theme.layer2};
  border-style: solid;
  /* cursor: ${({ hasOption }) =>
    hasOption === true ? "pointer" : "default"}; */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out; /* Add transition for background-color */
  border: none;

  /* &:hover {
    background-color: ${({ theme, hasOption }) =>
    hasOption === true ? theme.layer1 : theme.layer2}; 
  } */
  &:hover {
    background-color: ${({ theme }) => theme.layer1};
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ right }) => `${right ? right : 0}rem`};
    font-size: ${({ iconfontsize }) => `${iconfontsize ? iconfontsize : 30}px`};
    z-index:2;
  }

  .checkmark {
    color: ${({ theme }) => theme.green};
    font-size: 22px;
    font-weight: 500;
  }
`;
