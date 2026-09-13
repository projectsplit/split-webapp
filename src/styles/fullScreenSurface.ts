import { css } from 'styled-components';

export const fullScreenSurfaceStyles = css`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  color: ${({ theme }) => theme.ink.primary};
  background-color: ${({ theme }) => theme.surface.page};
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const formScrollStyles = css`
  .formScroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s16};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s20}`};

    > * {
      flex-shrink: 0;
    }
  }
`;
