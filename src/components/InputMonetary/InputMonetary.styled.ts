import styled from 'styled-components';
import Input from '../Input/Input';

interface StyledInputMonetary {
  $inputError?: boolean;
}
export const StyledInputMonetary = styled.div<StyledInputMonetary>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s8};
  border: 1px solid
    ${({ theme, $inputError }) =>
      $inputError ? theme.direction.owe : theme.surface.hairline};
  background-color: ${({ theme }) => theme.surface.card};
  border-radius: ${({ theme }) => theme.radius.surface};
  padding: ${({ theme }) => `${theme.space.s20} 18px`};
  &:focus-within {
    border-color: ${({ theme, $inputError }) =>
      $inputError ? theme.direction.owe : theme.accent.you.ink};
  }
  transition: border-color 0.15s;
  .currencySelectorWrapper {
    flex-shrink: 0;
  }

  .amountField {
    flex: 1;
    min-width: 0;
    position: relative;
    container-type: inline-size;
  }

  /* Sits in the card's bottom padding, so the result appearing or going never moves the form. */
  .result {
    position: absolute;
    right: 0;
    top: calc(100% - 4px);
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 16px;
    color: ${({ theme }) => theme.ink.secondary};
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
  }

  .result.shown {
    opacity: 1;
    transition: opacity 0.2s;
  }

  .result.invalid {
    color: ${({ theme }) => theme.direction.owe};
  }
`;

export const StyledInput = styled(Input)`
  display: block;
  width: 100%;
  /* Fixed at the full-size line, so shrinking the text below does not change the card's height. */
  height: calc(${({ theme }) => theme.figure.input} * 1.3);
  text-align: right;
  border: none;
  background-color: transparent;
  padding: 0;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.figure.input};
  /* A long amount or sum shrinks to fit (monospace glyphs are 0.6em wide), down to a floor below
     which it scrolls instead. */
  font-size: clamp(
    16px,
    calc(100cqi / (var(--amount-length) * 0.6)),
    ${({ theme }) => theme.figure.input}
  );
  font-weight: ${({ theme }) => theme.weight.medium};
  letter-spacing: -0.02em;

  &:focus {
    border: none;
  }
`;
