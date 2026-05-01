import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 15px;
`;

export const Label = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #cfc2d6;
  margin-right: 0.25rem;
`;

export const OptionButton = styled.button<{ $active: boolean }>`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.375rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(221, 183, 255, 0.15);
  background: rgba(53, 53, 53, 0.4);
  color: #cfc2d6;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(53, 53, 53, 0.8);
    border-color: rgba(221, 183, 255, 0.3);
  }

  &:active {
    transform: scale(0.96);
  }

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(221, 183, 255, 0.15);
      border-color: rgba(221, 183, 255, 0.5);
      color: #ddb7ff;
    `}
`;
