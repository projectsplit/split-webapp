import styled from "styled-components";
import { SpendingCycleSelectorProps } from "../../../interfaces";

export const StyledSpendingCycleSelector = styled.button<SpendingCycleSelectorProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  border-style: ${({ inputError }) => (inputError ? 'solid' : 'none')};
  border-width: ${({ inputError }) => (inputError ? '1px' : '0')};
  border-color: ${({ theme, inputError }) => (inputError ? theme.pink : 'transparent')};

  border-radius: 4px;
  padding: 0.8rem;
  outline: none;
  color: ${({ theme }) => theme.whiteText};
  background-color: ${({ theme }) => theme.layer2};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  cursor: pointer;
  text-align: left;

  .currencyOption {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    right: 14px;
  }
  .icon {
    font-size: 25px;
  }

`;
