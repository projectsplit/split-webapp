import styled from "styled-components";

export const StyledMembersInfoBox = styled.div`
 
  .topStripe {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .info {
      cursor: pointer;
      font-weight: 600;
      font-style: italic;
    }
    .hideDetalailsButton {
      color: ${({ theme }) => theme.grey};
      cursor: pointer;
    }
  }

  .memberInfoStripe {
    margin-top: 30px;
    color: ${({ theme }) => theme.layer6};
    .member {
      display: flex;
      flex-direction: row;
      margin-bottom: 7px;
      .memberName {
        flex: 1 0 0;
        .you {
          color: white;
          font-weight: bold;
        }
      }
      .amount {
        margin-right: 15px;
        .yourAmount {
          color: white;
          font-weight: bold;
        }
      }
    }
    .yourPercentage {
      color: white;
      font-weight: bold;
    }
  }
`;
