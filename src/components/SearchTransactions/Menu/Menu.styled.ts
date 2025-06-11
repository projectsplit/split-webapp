import styled from "styled-components";
import { CombinedMenuProps } from "../../../interfaces";

export const StyledMenu = styled.div<CombinedMenuProps>`
  overflow: hidden;
  background-color: transparent;
  cursor: pointer;
  scrollbar-width: none;
  position: relative;
  top: ${({ $contentEditableHeight }) => `${$contentEditableHeight - 37}px`};

  z-index: 1000;
  border: none;
`;
