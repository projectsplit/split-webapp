import styled from "styled-components";

export const StyledShareGroup = styled.div`
  margin-top: 50px;
  font-size: 0.9rem;
  padding: 10px;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  .qrCodeContainer {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
  .codentext {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: center;
    margin-top: 50px;
    .code {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 10px;
      .copy {
        display: flex;
        align-self: center;
        font-size: 18px;
      }
    }
  }
`;
