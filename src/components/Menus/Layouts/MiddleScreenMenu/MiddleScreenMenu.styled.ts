import styled from 'styled-components';

export const StyledMiddleScreenMenu = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: ${({ theme }) => theme.space.s20};
  right: ${({ theme }) => theme.space.s20};
  top: 0;
  bottom: 0;
  height: fit-content;
  margin: auto 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s14};
  padding: ${({ theme }) => theme.space.s20};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.dialog};
`;
