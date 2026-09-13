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
`;

export const StyledInput = styled(Input)`
  flex: 1;
  min-width: 0;
  text-align: right;
  border: none;
  background-color: transparent;
  padding: 0;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.figure.input};
  font-weight: ${({ theme }) => theme.weight.medium};
  letter-spacing: -0.02em;

  &:focus {
    border: none;
  }
`;
