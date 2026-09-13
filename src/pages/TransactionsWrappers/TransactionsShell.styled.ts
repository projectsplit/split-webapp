import styled from 'styled-components';

export const StyledTransactionsShell = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface.page};
  position: relative;

  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    color: ${({ theme }) => theme.ink.tertiary};

    .msg {
      white-space: normal;
      text-align: center;
      max-width: 90%;
      word-break: break-word;
    }

    .icon {
      display: flex;
      font-size: 56px;
      margin-top: ${({ theme }) => theme.space.s20};
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .bottomMenu {
    margin-top: auto;
  }

  .spinner {
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.space.s24};
    flex: 1;
  }
`;
