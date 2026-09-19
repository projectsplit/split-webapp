import styled from 'styled-components';
import { InputProps } from '../../interfaces';

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) =>
    !['backgroundcolor', 'error', 'width'].includes(prop),
})<InputProps>`
  padding: 13px 15px;
  border-radius: ${({ theme }) => theme.radius.iconButton};
  outline: none;
  color: ${({ theme }) => theme.ink.primary};
  background-color: ${({ theme, backgroundcolor }) =>
    backgroundcolor || theme.surface.card};
  font-size: ${({ theme }) => theme.size.s16};
  border: 1px solid
    ${({ error, theme }) =>
      error ? theme.direction.owe : theme.surface.hairline};
  transition: border-color 0.15s;

  &::placeholder {
    color: ${({ theme }) => theme.ink.tertiary};
    opacity: 1;
  }

  &:focus {
    border-color: ${({ error, theme }) =>
      error ? theme.direction.owe : theme.accent.you.ink};
  }
`;
