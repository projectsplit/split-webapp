import styled from "styled-components";

export const StyledLocationDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .locationIcon {
    font-size: 30px;
    margin-right: 10px;
    color: ${({ theme }) => theme.yellow};
  }
  .locationAndClose {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #2f3139;
    border-radius: 10px;
    padding: 8px;
    .coord {
      margin-right: 10px;
    }
  }
  .closeButtonWrapper {
    display: flex;
    align-items: center;
    .closeButton {
      margin-left: 10px;
      cursor: pointer;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.textActiveColor};
    }
  }
`;
