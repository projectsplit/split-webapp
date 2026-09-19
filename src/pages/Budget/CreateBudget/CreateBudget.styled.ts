import styled from 'styled-components';

export const StyledCreateBudget = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  margin: 0;
  overflow: hidden;

  .stepScroll {
    margin-top: 15px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: ${({ theme }) => `${theme.space.s4} ${theme.space.s20} ${theme.space.s20}`};
  }

  .errorsWrapper {
    display: flex;
    flex-direction: column;

    .errorMsg {
      padding: ${({ theme }) => `${theme.space.s6} ${theme.space.s2} 0`};
      font-size: ${({ theme }) => theme.size.s12};
      line-height: 1.5;
      color: ${({ theme }) => theme.direction.owe};
    }
  }

  .prompt {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .sectionHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    margin-bottom: ${({ theme }) => theme.space.s10};

    .information {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.xs};
      color: ${({ theme }) => theme.ink.tertiary};
      cursor: pointer;
    }
  }

  .sectionNote {
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s2} 0`};
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.tertiary};
    text-wrap: pretty;
  }

  .spentInfo {
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    animation: fadeIn 0.5s;

    .amount {
      font-family: ${({ theme }) => theme.font.mono};
      color: ${({ theme }) => theme.ink.primary};
    }
  }

  .monthlyPropmt {
    display: flex;
    flex-direction: row;

    .sup {
      margin-top: -3px;
    }
  }

  .submitButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) =>
      `${theme.space.s12} ${theme.space.s20} ${theme.space.s20}`};
    background: ${({ theme }) =>
      `linear-gradient(to top, ${theme.surface.page} 60%, transparent)`};
  }
`;
