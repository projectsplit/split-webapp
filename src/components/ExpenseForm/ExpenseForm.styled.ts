import styled from 'styled-components';

export const StyledExpenseForm = styled.div`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  width: 100%;
  height: 100dvh;
  left: 0;
  right: 0;
  top: 0;
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 20px;
  overflow-y: auto;

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
  .spacer {
    flex-grow: 1; /* This pushes the button to the bottom */
  }
`;
