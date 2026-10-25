import styled from 'styled-components';

export const StyledCalculatorBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.s8};
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s20}`};
  background-color: ${({ theme }) => theme.surface.footer};
  border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};

  button {
    flex: 1;
    min-width: 0;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.buttonSmall};
    background-color: ${({ theme }) => theme.surface.card};
    color: ${({ theme }) => theme.ink.primary};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.icon.md};
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s;
  }

  button:not([aria-disabled='true']):active {
    background-color: ${({ theme }) => theme.surface.raised};
  }

  .equals {
    border-color: ${({ theme }) => theme.accent.you.tintBorder};
    background-color: ${({ theme }) => theme.accent.you.tint};
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .equals:not([aria-disabled='true']):active {
    background-color: ${({ theme }) => theme.accent.you.tintBorder};
  }

  button[aria-disabled='true'] {
    opacity: 0.4;
    cursor: default;
  }
`;
