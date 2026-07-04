import styled from 'styled-components';
export const StyledMenu = styled.div `
  overflow: hidden;
  cursor: pointer;
  scrollbar-width: none;
  position: relative;
  top: ${({ $contentEditableHeight }) => `${$contentEditableHeight - 80}px`};
  z-index: 0;
  border: none;
`;
