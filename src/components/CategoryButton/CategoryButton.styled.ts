import styled from "styled-components";
import { CategoryButtonProps } from "../../interfaces";

export const StyledCategoryButton = styled.div<CategoryButtonProps>`
  display: flex;
  flex-direction: row;

  .active {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${(props) =>
      props.backgroundcoloronselect
        ? props.backgroundcoloronselect
        : ({ theme }) => theme.whiteText};
    color: ${({ theme }) => theme.body};
    font-weight: bold;
    text-decoration: none;
  }
  .inactive {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.layer2};
    color: ${({ theme }) => theme.whiteText};
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.layer1};
    }
  }
  .selected {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${(props) =>
    props.backgroundcoloronselect ? props.backgroundcoloronselect : ({ theme }) => theme.whiteText};
    color: ${({ theme }) => theme.body};
    font-weight: bold;
    text-decoration: none;
  }
  .unselected {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.layer2};
    color: ${({ theme }) => theme.whiteText};
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.layer1};
    }
  }

  ${(props) => `
    ${props.style}
  `}
`;
