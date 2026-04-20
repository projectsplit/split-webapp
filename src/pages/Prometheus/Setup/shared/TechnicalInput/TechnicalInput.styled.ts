import styled, { css } from 'styled-components';

export const Shell = styled.div<{
  $accent?: 'primary' | 'error' | 'error-soft';
  $pad?: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  background: #0e0e0e;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  ${({ $pad = 'md' }) => {
    if ($pad === 'sm')
      return css`
        padding: 0.5rem 0.75rem;
      `;
    if ($pad === 'lg')
      return css`
        padding: 1rem 1.5rem;
      `;
    return css`
      padding: 0.75rem 1rem;
    `;
  }}

  ${({ $accent }) => {
    if ($accent === 'error')
      return css`
        border-color: rgba(255, 180, 171, 0.1);
      `;
    if ($accent === 'error-soft')
      return css`
        border-color: rgba(255, 180, 171, 0.05);
      `;
    return css``;
  }}

  &:focus-within {
    border-color: rgba(221, 183, 255, 0.4);
    box-shadow: 0 0 15px rgba(221, 183, 255, 0.1);
  }
`;
