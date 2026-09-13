import { css } from 'styled-components';

export const optionsListStyles = css`
  .optionsContainer {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s20};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s24}`};
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
  }
`;
