import { styled } from "styled-components";

export const StyledExpenseForm = styled.div`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 20px;
  z-index: 10;
  bottom: 0;

  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
    .errorMsg {
      font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      display: flex;
      justify-content: end;
    }
  }
  .amount-input {
    text-align: right;
  }

  .submit-button {
    margin-top: auto;
  }
`;
