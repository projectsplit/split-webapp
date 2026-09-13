import styled from 'styled-components';

export const StyledSettleUpButton = styled.div<{ $primary?: boolean }>`
  width: fit-content;
  min-width: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: ${({ theme }) => `3px ${theme.space.s12}`};
  border-radius: ${({ theme }) => theme.radius.buttonSmall};
  border: 1px solid
    ${({ theme, $primary }) =>
      $primary ? 'transparent' : theme.surface.outline};
  background-color: ${({ theme, $primary }) =>
    $primary ? theme.ink.primary : 'transparent'};
  color: ${({ theme, $primary }) =>
    $primary ? theme.surface.page : theme.ink.primary};
  font-size: ${({ theme }) => theme.size.s12};
  font-weight: ${({ theme }) => theme.weight.medium};
  white-space: nowrap;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -10px;
  }
`;
