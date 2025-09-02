import styled from "styled-components";

export const StyledGenerateInvitationCode = styled.div`
  .header {
    padding: 0.875rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    .title {
      font-weight: 600;
      font-size: 1.125rem;
    }
    .closeButtonContainer {
      position: relative;
      cursor: pointer;
      display: inline-block;
    }

    .closeButton {
      cursor: pointer;
      display: block;
      font-size: 1.875rem;
    }

    .closeButtonContainer:hover::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: rgba(128, 128, 128, 0.3);
      pointer-events: none;
    }

    .title {
      display: flex;
      flex-direction: row;
      gap: 10px;
      font-weight: 600;
    }
    .gap {
      margin-right: 0.9375rem;
    }
  }

  .promptMessage {
    margin-top: 50px;
    font-size: 0.9rem;
    padding: 10px;
    text-align: center;
    word-break: break-word;
    overflow-wrap: break-word;
    display: flex;
    flex-direction: column;
  }
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
    .code{
        margin-top:10px;
    }
  }
`;
