import styled from "styled-components";

export const StyledHomepage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
> div[style*="position: fixed"] {
    z-index:1; /* Ensure fixed children (background) are above */
  }
  .fixedTop {
    padding: 14px;
  }

  .welcomeStripe {
    font-size: 15px;
    padding: 1rem 0 1rem 0;
    white-space: initial;
  }

  .scrollableContent {
    padding: 14px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    min-height: 0;
    z-index: 1;
    .groupsInfo {
      .settled {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .optionsStripe {
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      .mostRecent {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 1rem;

        .mostRecentMsg {
          font-size: 12px;
          margin-left: 5px;
        }
        .groupName {
        }
      }
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
  .actions {
    position: fixed;
    bottom: 40px;
    right: 25px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.pinkish};
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    cursor: pointer;
    /* box-shadow: rgba(61, 37, 59, 0.5) 0px 4px 4px; */

    .thunder {
      position: static;
      font-size: 30px;
      color: white;
    }
  }
`;
