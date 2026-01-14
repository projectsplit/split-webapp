import styled from "styled-components";

export const StyledDateDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .calendarIcon {
    color: ${({ theme }) => theme.highlightColor};
    margin-right: 10px;
    font-size: 30px;
  }
  .dateAndClose {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #2f3139;
    border-radius: 10px;
    padding: 8px;
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
