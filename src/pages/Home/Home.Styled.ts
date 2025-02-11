import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledHomepage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 14px;

  .welcomeStripe {
    font-size: 15px;
    padding: 2.5rem 0 2.5rem 0;
    white-space: initial;
  }

  .optionsStripe {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .groups {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 9px;
      align-items: center;

      .group {
        color: #9918ff;
        font-size: 25px;
        position: relative;
      }
      .groupCount {
        position: absolute;
        color: ${({ theme }) => theme.colors.whiteText};
        font-size: 15px;
        bottom: -5px; /* Position at the bottom */
        right: 0; /* Position at the right */
        padding: -8px 3px;
        font-weight: bold;
      }
      .groupName {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .analyticsIcon {
      color: ${({ theme }) => theme.colors.deepPurple};
      font-size: 30px;
    }

    .personalIcon {
      color: ${({ theme }) => theme.colors.deepPurple};
      font-size: 30px;
    }

    .budgetIcon {
      color: ${({ theme }) => theme.colors.deepPurple};
      font-size: 30px;
    }

    .group {
        color: #9918ff;
        font-size: 25px;
        position: relative;
      }
    

    .groupsInfo {
      font-size: 15px;
      color: ${({ theme }) => theme.colors.layer6};
      .owe {
        color: ${({ theme }) => theme.colors.redish};
      }
      .owed {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  .mostRecent {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .mostRecentMsg {
      font-size: 12px;
      margin-left: 5px;
    }
    .groupName {
      font-size: 20px;
      font-weight: bold;
    }
  }

  @keyframes spin-animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .spinner {
      align-self: center;
      animation: spin-animation 0.8s linear infinite;
      font-size: 25px;
      color: ${({ theme }) => theme.colors.labelColor6};
      margin-top: 10px;
      margin-bottom: 10px;
    }
`;
