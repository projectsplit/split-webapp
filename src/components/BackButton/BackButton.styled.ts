import styled from 'styled-components';

export const StyledBackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.ink.secondary};
  font-size: ${({ theme }) => theme.icon.md};
  cursor: pointer;
`;
