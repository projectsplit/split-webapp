import styled from 'styled-components';

export const StyledTransactionsPage = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  flex: 1;

  .scroll-area {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }

  .same-date-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .date-only {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: ${({ theme }) => theme.surface.page};
      padding: ${({ theme }) =>
        `${theme.space.s16} ${theme.space.s20} ${theme.space.s6}`};
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s8};
      padding: ${({ theme }) => `0 ${theme.space.s20}`};
    }
  }
`;
