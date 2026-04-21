import styled, { css } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';

export const Prefix = styled.span<{ $size: Size; $muted?: boolean }>`
  font-family: 'Roboto Mono', monospace;
  color: ${({ $muted }) => ($muted ? 'rgba(207, 194, 214, 0.6)' : '#ddb7ff')};
  margin-right: 0.75rem;
  ${({ $size }) => {
    if ($size === 'sm')
      return css`
        font-size: 0.875rem;
        margin-right: 0.5rem;
      `;
    if ($size === 'lg')
      return css`
        font-size: 1.5rem;
        font-weight: 700;
        margin-right: 1rem;
      `;
    return css`
      font-size: 1.125rem;
    `;
  }}
`;

export const AmountInput = styled.input<{ $size: Size }>`
  flex: 1 1 0;
  min-width: 0;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #e2e2e2;
  font-family: 'Roboto Mono', monospace;

  &::placeholder {
    color: rgba(207, 194, 214, 0.2);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  appearance: textfield;
  -moz-appearance: textfield;

  ${({ $size }) => {
    if ($size === 'sm')
      return css`
        font-size: 0.875rem;
      `;
    if ($size === 'lg')
      return css`
        font-size: 1.875rem;
        font-weight: 700;
      `;
    return css`
      font-size: 1.25rem;
    `;
  }}
`;

export const Suffix = styled.span<{ $size: Size }>`
  font-family: 'Roboto Mono', monospace;
  color: rgba(207, 194, 214, 0.6);
  margin-left: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;

  ${({ $size }) => {
    if ($size === 'sm')
      return css`
        font-size: 0.625rem;
        margin-left: 0.5rem;
        color: rgba(207, 194, 214, 0.4);
      `;
    if ($size === 'lg')
      return css`
        font-size: 0.875rem;
      `;
    return css`
      font-size: 0.625rem;
      color: rgba(207, 194, 214, 0.4);
    `;
  }}
`;
