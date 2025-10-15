import { styled } from "styled-components";

export const StyledProtected = styled.div<{ $shouldStyleBorder: boolean }>`
${({ $shouldStyleBorder }) =>
    $shouldStyleBorder &&
    `
    border: 2px solid #D79244;
    border-radius: 10px;
  `}
  overflow: auto;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
> div[style*="position: fixed"] {
    z-index: 4; /* Ensure fixed children (background) are above */
  }
`;
