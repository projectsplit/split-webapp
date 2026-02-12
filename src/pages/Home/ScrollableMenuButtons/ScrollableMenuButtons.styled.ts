import styled from "styled-components";

export const StyledScrollableMenuButtons = styled.div`
    padding: 14px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    min-height: 0;
     gap: 15px;
    z-index: 1;
    .groupsInfo {
      .settled {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    

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
    
`;