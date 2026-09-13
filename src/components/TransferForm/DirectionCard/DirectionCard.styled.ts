import styled from 'styled-components';

export const StyledDirectionCard = styled.div<{ $inputError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s6};

  .directionCard {
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid
      ${({ theme, $inputError }) =>
        $inputError ? theme.direction.owe : theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;
  }

  .divider {
    position: relative;
    height: 1px;
    margin-left: ${({ theme }) => theme.space.s16};
    background-color: ${({ theme }) => theme.surface.raisedHigh};
  }

  .swap {
    position: absolute;
    right: ${({ theme }) => theme.space.s16};
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.icon.sm};
    cursor: pointer;
  }

  .swap.disabled {
    cursor: default;
    color: ${({ theme }) => theme.surface.mark};
    opacity: 0.5;
  }

  .errorMsg {
    padding: ${({ theme }) => `0 ${theme.space.s4}`};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.direction.owe};
  }

  .sheetBackdrop {
    position: fixed;
    inset: 0;
    z-index: 3;
    background-color: ${({ theme }) => theme.scrim.sheet};
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
`;
