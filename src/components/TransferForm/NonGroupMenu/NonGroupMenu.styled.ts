import styled from "styled-components";

interface StyledNonGroupMenuProps {
  $noReceiverSelected?: boolean;
   $isSamePersonError:boolean;
}

export const StyledNonGroupMenu = styled.div<StyledNonGroupMenuProps>`
      .nonGroupMenu {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px;

      .textAndButton {
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        flex-shrink: 0;

        .button {
          font-weight: bold;
          border: 1px solid ;
          border-radius: 5px;
          padding: 4px 8px;
          cursor: pointer;
          flex-shrink: 0;
          &.receiverButton {
            border-color: ${(props) =>
              (props.$noReceiverSelected||props.$isSamePersonError)
                ? props.theme.redish
                : props.theme.highlightColor};
          }

          /* Sender button never red from this condition */
          &.senderButton {
            border-color: ${({ theme,$isSamePersonError }) => $isSamePersonError?theme.redish:theme.highlightColor};
          }
        }

        @media (max-width: 275px) {
          flex-direction: column;
          gap: 4px;
          white-space: normal;

          .text {
            text-align: center;
          }
        }
      }
    }
    .buttonWrapper {
      display: flex;
      justify-content: center;
      .groupButton {
        margin-top: 20px;
        width: 60px;
        background-color: ${({ theme }) => theme.layer2};
        cursor: pointer;
        border-radius: 10px;
        padding: 0.5rem;
        .groupIcon {
          display: flex;
          justify-self: center;
          color: ${({ theme }) => theme.deepPurple};
          font-size: 30px;
        }
        .descr {
          display: flex;
          justify-self: center;
          font-size: 10px;
          margin-top: 3px;
        }
      }
    }
    .errorMsg {
      font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      display: flex;
      justify-content: center;
    }
`;