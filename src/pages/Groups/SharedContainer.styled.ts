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
          border-radius: 12px;
          padding: 0.5rem 0.2rem;
          transition: all 0.2s ease-in-out;
          display: flex;
          flex-direction: column;
          align-items: center;

          &:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
          }

          .groupIcon.active,
          .groupIcon.non,
          .groupIcon.archived {
            font-size: 28px;
            margin-bottom: 4px;
          }

          .groupIcon.active {
            color: ${({ theme, $groupState }) =>
              $groupState === "Active"
                ? theme.activeActive
                : theme.activeInactive};
          }
          .groupIcon.non {
            color: ${({ theme, $groupState }) =>
              $groupState === "NonGroup" ? theme.nonActive : theme.nonInactive};
          }
          .groupIcon.archived {
            color: ${({ theme, $groupState }) =>
              $groupState === "Archived"
                ? theme.archivedActive
                : theme.archivedInactive};
          }

          &:has(.groupIcon.active) .descr {
            color: ${({ theme, $groupState }) =>
              $groupState === "Active" ? "inherit" : theme.layer6};
          }

          /* NonGroups button text */
          &:has(.groupIcon.non) .descr {
            color: ${({ theme, $groupState }) =>
              $groupState === "NonGroup" ? "inherit" : theme.layer6};
          }

          /* Archived button text */
          &:has(.groupIcon.archived) .descr {
            color: ${({ theme, $groupState }) =>
              $groupState === "Archived" ? "inherit" : theme.layer6};
          }
          .descr {
            font-size: 11px;
            font-weight: 500;
            line-height: 1.2;
          }
        }
      }
    }
  }
  .bottom-bar {
    margin-top: auto;
  }
`;
