import styled, { css } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';

export const Label = styled.span<{ $size: Size; $muted?: boolean }>`
  font-family: 'Roboto Mono', monospace;
  color: rgba(207, 194, 214, 0.8);
  white-space: nowrap;

  ${({ $size }) => {
    if ($size === 'sm')
      return css`
        font-size: 0.875rem;
      `;
    if ($size === 'lg')
      return css`
        font-size: 1.25rem;
      `;
    return css`
      font-size: 1rem;
    `;
  }}
`;

export const BaseInput = styled.input<{ $size: Size }>`
  background: transparent;
  border: none;
  border-bottom: 1px dashed rgba(221, 183, 255, 0.3);
  outline: none;
  color: #ddb7ff;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  padding: 0 0.25rem;
  margin: 0 0.5rem;
  transition: all 0.2s ease;

  &:focus {
    border-bottom-color: #ddb7ff;
    color: #fff;
    background: rgba(221, 183, 255, 0.05);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;

  ${({ $size }) => {
    if ($size === 'sm')
      return css`
        font-size: 0.875rem;
        width: 2.5rem;
      `;
    if ($size === 'lg')
      return css`
        font-size: 1.25rem;
        width: 4rem;
      `;
    return css`
      font-size: 1rem;
      width: 3.5rem;
    `;
  }}
`;
