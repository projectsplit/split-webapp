import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const StyledConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s4};
  max-width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.size.s12};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.ink.secondary};
  -webkit-tap-highlight-color: transparent;

  &:is(button) {
    cursor: pointer;
  }

  &.danger {
    color: ${({ theme }) => theme.direction.owe};
  }

  .icon {
    display: block;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s13};
  }

  .icon.spin {
    animation: ${spin} 1.2s linear infinite;
  }

  .text {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (prefers-reduced-motion: reduce) {
    .icon.spin {
      animation: none;
    }
  }
`;
