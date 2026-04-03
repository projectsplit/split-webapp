import styled from 'styled-components';

export const StyledGroup = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  .spinner {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
  .group {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .noData {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 100px;

      .msg {
        opacity: 0.5;
        white-space: normal;
        text-align: center;
        max-width: 90%;
        word-break: break-word;
      }
      .icon {
        display: flex;
        font-size: 100px;
        opacity: 0.5;
        margin-top: 20px;
      }
    }
  }
  .bottomMenu {
    margin-top: auto;
  }

  .spinner {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    flex: 1;
  }
  .retry {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
`;
