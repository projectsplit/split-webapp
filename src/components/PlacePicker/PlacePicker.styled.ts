import { styled } from "styled-components";

export const StyledPlacePicker = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.lineColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.backgroundcolor};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  .map-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .searchAndClose {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .searchBar {
        flex: 1;
        border-radius: 10px;
        padding: 0.5rem;
        outline: none;
        font-size: 16px;
        border: none;
        color: white;
        background-color: ${({ theme }) => theme.inputGrey};

        margin-bottom: 8px;
      }
      .closeButton {
        cursor: pointer;
        font-size: 1.875rem;
        margin-left: 0.8rem;
        color: ${({ theme }) => theme.textActiveColor};
      }
    }

    .map {
      height: 100%;
    }
  }

  .position-name-container {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    color: ${({ theme }) => theme.textActiveColor};
    .view-in-maps-button {
      padding: 0.5em;
      display: flex;
      .pin{
        color:${({ theme }) => theme.yellow} ;
      }
    }

    .coordinates {
      display: flex;
      gap: 8px;
      overflow: hidden;
    }

    .coord {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 6em;
    }

    .place-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .buttons-container {
    display: flex;
    button {
      width: 100%;
    }
    .select {
      border-color: ${({ theme }) => theme.highlightColor};
    }
  }
`;
