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
    z-index: 1; /* Ensure fixed children (background) are above */
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
      }
    }
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
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    box-shadow: 0 0 10px ${({ theme }) => theme.pinkish};
    will-change: box-shadow;
    overflow: hidden; /* clips glow to circular boundary */
    border-radius: 50%;

    .thunder {
      font-size: 30px;
      color: white;
    }

    &.glow {
      animation: glowRandom 2.5s infinite ease-in-out;
      transform: scale(1.08);
    }
  }

  @keyframes glowRandom {
    0% {
      box-shadow: 0 0 10px ${({ theme }) => theme.pinkish},
        2px -2px 15px ${({ theme }) => theme.pinkish},
        -3px 3px 20px ${({ theme }) => theme.pinkish};
    }
    20% {
      box-shadow: -2px 1px 12px ${({ theme }) => theme.pinkish},
        3px -3px 18px ${({ theme }) => theme.pinkish},
        1px 2px 25px ${({ theme }) => theme.pinkish};
    }
    40% {
      box-shadow: 3px 2px 10px ${({ theme }) => theme.pinkish},
        -2px -3px 20px ${({ theme }) => theme.pinkish},
        0 0 15px ${({ theme }) => theme.pinkish};
    }
    60% {
      box-shadow: -3px -1px 12px ${({ theme }) => theme.pinkish},
        2px 3px 18px ${({ theme }) => theme.pinkish},
        0 0 20px ${({ theme }) => theme.pinkish};
    }
    80% {
      box-shadow: 2px 3px 10px ${({ theme }) => theme.pinkish},
        -1px -2px 18px ${({ theme }) => theme.pinkish},
        1px 1px 25px ${({ theme }) => theme.pinkish};
    }
    100% {
      box-shadow: 0 0 10px ${({ theme }) => theme.pinkish},
        2px -2px 15px ${({ theme }) => theme.pinkish},
        -3px 3px 20px ${({ theme }) => theme.pinkish};
    }
  }
`;
