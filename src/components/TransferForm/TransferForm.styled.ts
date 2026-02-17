import styled from "styled-components";
interface StyledTransferFormProps {
  $inputError?: boolean;
  $noReceiverSelected?: boolean;
   $isSamePersonError:boolean;
}

export const StyledTransferForm = styled.div<StyledTransferFormProps>`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 20px;
  z-index: 10;
  bottom: 0;
  overflow-y: auto;
  .spacer {
    flex-grow: 1;
  }
  .bottomButtons {
    display: flex;
    flex-direction: row;
    align-items: center;

    .submitButton {
      flex-grow: 1;
    }
    .submitButton > * {
      width: 100%; /* Ensure the button inside takes full container width */
    }
    .calendarIcon {
      color: ${({ theme }) => theme.highlightColor};
      flex-shrink: 0;
      font-size: 30px;
      
      margin-left: 10px;
    }
  }


`;
