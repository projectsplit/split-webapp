import styled from 'styled-components';
import { SpendingCycleSelectorProps } from '../../../interfaces';

export const StyledSpendingCycleSelector = styled.button<SpendingCycleSelectorProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s12};
  width: 100%;
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
  border: none;
  border-radius: 0;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.ink.primary};
  font-size: ${({ theme }) => theme.size.s15};
  font-weight: ${({ theme }) => theme.weight.medium};
  text-align: left;
  cursor: pointer;

  .currencyOption {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    order: 1;
  }

  .angle {
    font-size: ${({ theme }) => theme.size.s16};
    color: ${({ theme }) => theme.surface.mark};
  }
`;
