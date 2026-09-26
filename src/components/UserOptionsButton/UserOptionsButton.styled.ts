import styled from 'styled-components';

export const StyledUserOptionsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.accent.you.tint};
  border: 1px solid ${({ theme }) => theme.accent.you.tintBorder};
  color: ${({ theme }) => theme.accent.you.ink};
  font-size: ${({ theme }) => theme.size.s13};
  font-weight: ${({ theme }) => theme.weight.semibold};
  user-select: none;
  cursor: pointer;
`;
