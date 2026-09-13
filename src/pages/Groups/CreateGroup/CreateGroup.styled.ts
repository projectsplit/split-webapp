import styled from 'styled-components';
import { sheetHeaderStyles } from '@/styles/sheetHeader';

export const StyledCreateGroup = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100dvh;
  overflow: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.page};
  z-index: 3;
  display: flex;
  flex-direction: column;

  .fieldLabel {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
    margin-bottom: ${({ theme }) => theme.space.s10};
  }

  .currencyNote {
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s20} 0`};
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .inputAndCurrWrapper {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s16};
    .formInputWrapper {
      margin-top: ${({ theme }) => theme.space.s8};
      padding: ${({ theme }) => `0 ${theme.space.s20}`};
    }

    .currencySelectorWrapper {
      padding: ${({ theme }) => `0 ${theme.space.s20}`};
      display: flex;
      flex-direction: column;
      .currencySelector {
        align-self: flex-start;
      }
    }
  }

  .submitButton {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: ${({ theme }) =>
      `${theme.space.s12} ${theme.space.s20} ${theme.space.s20}`};
  }

  ${sheetHeaderStyles}
`;
