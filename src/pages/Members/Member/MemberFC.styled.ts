import styled from "styled-components";

interface StyledMemberFC {
  isGuest: boolean;
  isLogedUser: boolean;
}
export const StyledMemberFC = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isGuest", "isLogedUser"].includes(prop),
})<StyledMemberFC>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.layer2};

  box-shadow: ${({ theme, isGuest }) =>
    isGuest
      ? `0 0 0 1px ${theme.lightCiel}`
      : `0 0 0 1px ${theme.lightBorder}`};

  border: none;
  .preposition {
    color: ${({ theme }) => theme.layer6};
    margin-top: 10px;
  }
  .currencyOwes {
    color: ${({ theme }) => theme.redish};
  }
  .currencyIsOwed {
    color: ${({ theme }) => theme.green};
  }
  .debtsCreditsStripeAndTotal {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .debtsCreditsAndTree {
      display: flex;
      flex-direction: column;
      .totalSpent {
        line-height:1.4;
        margin-top: 10px;
        color: ${({ theme }) => theme.layer6};
        font-size: 15px;
        .name{
          color:${({ theme }) => theme.textActiveColor};
        }
        .amounts {
          color: ${({ theme }) => theme.orange};
        }
      }
      .debtsCredits {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        

        .descAndButton {
          display: flex;
          flex-direction: column;
        }
        .owesAndIsOwed {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          
        }
        .owes,
        .isOwed {
          display: flex;
          flex-direction: column;
        }
        .settled {
          .you {
            font-weight: bold;
            color: white;
          }
          .are,
          .is {
            color: ${({ theme }) => theme.layer6};
          }
          color: ${({ theme }) => theme.layer6};
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .checkmark {
          color: ${({ theme }) => theme.green};
          font-size: 22px;
          font-weight: 500;
        }
      }
    }
    .settleUpPos {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      gap: 15px;
      justify-content: space-between;
    }

    .button {
    }
  }
  .guest {
    display:flex;
    justify-content:flex-end;
    font-weight: 300;
    font-size: 12px;
  }
`;
