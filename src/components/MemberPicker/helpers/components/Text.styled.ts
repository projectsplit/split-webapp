import styled from 'styled-components';

export const StyledText = styled.div<{ $error?: string }>`
  flex: 1;
  min-width: 0;
  text-align: right;
  font-size: ${({ theme }) => theme.size.s14};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ $error, theme }) =>
    $error ? theme.direction.owe : theme.ink.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
