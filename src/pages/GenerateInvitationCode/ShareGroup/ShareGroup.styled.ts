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
    flex-grow: 1;
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
  .buttonContainer {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 0 10px; /* Optional: add padding for better spacing */
  }
  .buttonContainer > button {
    width: 100%;
    max-width: 100%; /* Ensure button spans full width */
  }
`;