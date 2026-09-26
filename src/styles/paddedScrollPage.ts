import { css } from 'styled-components';

export const paddedScrollPageStyles = css`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  margin: 0;
  padding: 0 0 20px;
  gap: 15px;
  overflow: hidden;

  & > *:not(.scrollContainer) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .scrollContainer {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
`;
