import styled from 'styled-components';
import { SpendingCycleSelectorProps } from '../../../interfaces';

export const StyledSpendingCycleSelector = styled.button<SpendingCycleSelectorProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;


  border: none;
  border-radius: 0;
  padding: 0.8rem;
  outline: none;
  color: ${({ theme }) => theme.whiteText};
  background-color: transparent;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
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
  .angle {
    font-size: 25px;
  }
`;
