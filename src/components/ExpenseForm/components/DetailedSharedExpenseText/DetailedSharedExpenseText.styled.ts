import styled from "styled-components";

export const StyledDetailedSharedExpenseText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .textStyleInfo {
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    /* @media (max-width: 400px) {
      flex-direction: column;
      align-items: center;
    } */
    .editButton {
      display: flex;
      align-self: center;
      font-size: 25px;
      margin-left: 20px;
      cursor: pointer;
    }
    .definition {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      .labelStyle {
        background-color: #696e80;
        color: white;
        display: flex;
        gap: 8px;
        align-items: center;
        border-radius: 5px;
        padding: 2px 8px;
        font-size: 14px;
        font-weight: 700;
        .info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }
  .errors {
    .errorMsg {
      display: flex;
      justify-content: center;
      word-wrap: break-word;
      font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }
`;
