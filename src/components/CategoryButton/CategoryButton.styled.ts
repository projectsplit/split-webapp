import styled from "styled-components";
import { CategoryButtonProps } from "../../interfaces";

export const StyledCategoryButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "selected"
})<CategoryButtonProps>`
  display: flex;
  flex-direction: row;
  font-size:14px;

  .active,.selected {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${(props) => props.backgroundcoloronselect ? props.backgroundcoloronselect : ({ theme }) => theme.greySelect};
    color: ${({ theme }) => theme.textActiveColor};
    font-weight: 600;
    text-decoration: none;
  }
  .inactive {
    padding-top: 0.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    /* background-color: ${({ theme }) => theme.layer2}; */
    color: ${({ theme }) => theme.textInactiveColor};
    font-weight: 600;
    text-decoration: none;
    /* transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.layer1};
    } */
  }

  .unselected {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.layer2};
    color: ${({ theme }) => theme.whiteText};
    font-weight: 600;
    text-decoration: none;
    /* transition: background-color 0.2s ease-in-out; */

  }

  ${(props) => `
    ${props.style}
  `}

 
`;
