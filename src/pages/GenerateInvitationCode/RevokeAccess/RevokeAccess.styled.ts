import styled from "styled-components";

export const StyledRevokeAccess = styled.div`
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  flex: 1;

  .scrollable-content {
    overflow-y: auto;
    flex: 1;
    padding-top: 1rem;
    padding-bottom: 180px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .promptText {
    padding: 10px;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: center;
  }

  .textAndIcon {
    white-space: normal;
    text-align: center;
    margin-top: 10rem;

    .text {
      opacity: 0.5;
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
      text-align: center;
      .emoji {
        opacity: 1;
      }
    }
    .icon{
 
      font-size: 100px;
      opacity: 0.5;

    }
  }
  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    height: 100%;
  }
`;
