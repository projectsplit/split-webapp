import { styled } from 'styled-components';

export const StyledProtected = styled.div<{ $shouldStyleBorder: boolean }>`
  ${({ $shouldStyleBorder }) =>
    $shouldStyleBorder &&
    `
    border: 2px solid #D79244;
    border-radius: 10px;
  `}
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  /* Fixed positioning is relative to the viewport, so this sits outside #root's padding and has to
     hold the safe area itself. Same reason as the rule there: on Android 15+ the WebView owns the
     full screen, system bars included. */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  > div[style*='position: fixed'] {
    z-index: 4; /* Ensure fixed children (background) are above */
  }
`;
