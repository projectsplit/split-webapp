import styled from "styled-components";

export const StyledSharedContainer = styled.div<{ $groupState: string }>`
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundcolor};
  position: relative;
  .optionButtonsAndGroups {
    display: flex;
    flex-direction: row;
    height: 100%;

    .optionButtons {
      .buttonWrapper {
        position: relative;
        padding-left: 6px;
        .activeBar {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 50px;
          background: white;
          border-radius: 4px;
        }
        .button {
          margin-top: 20px;
          width: 120%;
          background-color: ${({ theme }) => theme.layer2};
          cursor: pointer;
          border-radius: 10px;
          padding: 0.3rem;

          .groupIcon.active {
            display: flex;
            justify-self: center;
            color: ${({ theme, $groupState }) =>
              $groupState === "Active"
                ? theme.activeActive
                : theme.activeInactive};
            font-size: 30px;
            transition: color 0.2s ease-in-out;
          }
          &:hover .groupIcon.active {
            color: ${({ theme }) => theme.activeActive};
          }

          .groupIcon.non {
            display: flex;
            justify-self: center;
            color: ${({ theme, $groupState }) =>
              $groupState === "NonGroup" ? theme.nonActive : theme.nonInactive};
            font-size: 30px;
            transition: color 0.2s ease-in-out;
          }
          &:hover .groupIcon.non {
            color: ${({ theme }) => theme.nonActive};
          }

          .groupIcon.archived {
            display: flex;
            justify-self: center;
            color: ${({ theme, $groupState }) =>
              $groupState === "Archived"
                ? theme.archivedActive
                : theme.archivedInactive};
            font-size: 30px;
            transition: color 0.2s ease-in-out;
          }
          &:hover .groupIcon.archived {
            color: ${({ theme }) => theme.archivedActive};
          }
          &:has(.groupIcon.active) .descr {
            color: ${({ theme, $groupState }) =>
              $groupState === "Active" ? "inherit" : theme.layer6};
          }
          &:hover:has(.groupIcon.active) .descr {
            color: inherit;
          }

          /* NonGroups button text */
          &:has(.groupIcon.non) .descr {
            color: ${({ theme, $groupState }) =>
              $groupState === "NonGroup" ? "inherit" : theme.layer6};
          }
          &:hover:has(.groupIcon.non) .descr {
            color: inherit;
          }

          /* Archived button text */
          &:has(.groupIcon.archived) .descr {
            color: ${({ theme, $groupState }) =>
              $groupState === "Archived" ? "inherit" : theme.layer6};
          }
          &:hover:has(.groupIcon.archived) .descr {
            color: inherit;
          }
          .descr {
            display: flex;
            justify-self: center;
            font-size: 10px;
            margin-top: 3px;
            transition: color 0.2s ease-in-out;
          }
        }
      }
    }
  }
  .bottom-bar {
    margin-top: auto;
  }
`;
