import styled from "styled-components";

export const StyledGroups2Container = styled.div<{ groupState: string }>`
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
            color: ${({ theme, groupState }) =>
              groupState === "Active"
                ? theme.activeActive
                : theme.activeInactive};
            font-size: 30px;
          }
          .groupIcon.non {
            display: flex;
            justify-self: center;
            color: ${({ theme, groupState }) =>
              groupState === "NonGroups" ? theme.nonActive : theme.nonInactive};
            font-size: 30px;
          }
          .groupIcon.archived {
            display: flex;
            justify-self: center;
            color: ${({ theme, groupState }) =>
              groupState === "Archived"
                ? theme.archivedActive
                : theme.archivedInactive};
            font-size: 30px;
          }
          &:has(.groupIcon.active) .descr {
            color: ${({ theme, groupState }) =>
              groupState === "Active" ? "inherit" : theme.layer6};
          }

          /* NonGroups button text */
          &:has(.groupIcon.non) .descr {
            color: ${({ theme, groupState }) =>
              groupState === "NonGroups"
                ? "inherit"
                : theme.layer6};
          }

          /* Archived button text */
          &:has(.groupIcon.archived) .descr {
            color: ${({ theme, groupState }) =>
              groupState === "Archived" ? "inherit" : theme.layer6};
          }
          .descr {
            display: flex;
            justify-self: center;
            font-size: 10px;
            margin-top: 3px;
          }
        }
      }
    }
  }
  .bottom-bar {
    margin-top: auto;
  }
`;
