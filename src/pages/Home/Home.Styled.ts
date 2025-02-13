import styled from "styled-components";

export const StyledHomepage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  padding: 14px;
  overflow: hidden; 

  .fixedTop {
    position: sticky;
    top: 0;

    z-index: 10;
    padding-bottom: 10px; 
  }

  .welcomeStripe {
    font-size: 15px;
    padding: 2.5rem 0 2.5rem 0;
    white-space: initial;
  }

  .scrollableContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto; 
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

      .groupIconAndNumberOfGroups {
        position: relative;
      }
      .groupCount {
        position: absolute;
        color: ${({ theme }) => theme.whiteText};
        font-size: 15px;
        bottom: -2px; 
        right: 0; 
        padding: -8px 3px;
        font-weight: bold;
      }
      .groupName {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .analyticsIcon,
    .personalIcon,
    .budgetIcon,
    .groupIcon {
      color: ${({ theme }) => theme.deepPurple};
      font-size: 30px;
    }

    .group {
      color: #9918ff;
      font-size: 25px;
      position: relative;
    }

    .groupsInfo {
      font-size: 15px;
      color: ${({ theme }) => theme.layer6};
      .owe {
        color: ${({ theme }) => theme.redish};
      }
      .owed {
        color: ${({ theme }) => theme.green};
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
    color: ${({ theme }) => theme.labelColor6};
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
