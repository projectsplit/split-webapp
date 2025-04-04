import styled from "styled-components";
import Input from "../Input/Input";

interface StyledInputMonetary {
  $inputError?: boolean;
}
export const StyledInputMonetary = styled.div<StyledInputMonetary>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  border: 1px solid ${({ theme, $inputError }) => ($inputError ? theme.errorColor :  theme.lineColor)};
  /* border-style: ${({ $inputError }) => ($inputError ? "solid" : "none")};
  border-width: ${({ $inputError }) => ($inputError ? "1px" : "0")};
  border-color: ${({ theme, $inputError }) =>
    $inputError ? theme.errorColor : "transparent"}; */
  background-color: ${({ theme }) => theme.layer2};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  &:focus-within {
      border-color: ${({ theme, $inputError }) => ($inputError ? theme.errorColor : theme.highlightColor)};
    }
  .currencySelectorWrapper {
    position: absolute;
    
    .currencySelector {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      border-radius: 10px;
      padding: 0.5rem;
      font-size: 1.125rem;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .angleDown {
        font-size: 1.5rem;
      }
    }
  }
`;

export const StyledInput = styled(Input)`
  text-align: right;
  margin-left: 70px;
`;
