import styled from 'styled-components';

export const StyledItemCard = styled.div<{ $clickable?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s12};
  width: 100%;
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;
