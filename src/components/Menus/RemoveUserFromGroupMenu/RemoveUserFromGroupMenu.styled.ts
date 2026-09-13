import { styled } from 'styled-components';

export const StyledRemoveUserFromGroup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.page};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .fixed-header-container {
    position: sticky;
    top: 0;
    z-index: 4;
    background-color: ${({ theme }) => theme.surface.page};
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;

    .sheetTitle {
      flex: 1;
      min-width: 0;
      text-align: center;
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
    }

    .headerSpacer {
      width: 34px;
      flex-shrink: 0;
    }
  }

  .sheetControls {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s14};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;
  }

  .inputField {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: ${({ theme }) => theme.space.s8};

    .search-input {
      flex: 1;
      min-width: 0;
      padding: ${({ theme }) => `${theme.space.s12} 15px`};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      font-size: ${({ theme }) => theme.size.s15};
    }
  }

  .scrollable-content {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s20}`};

    .members {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s10};

      .noData {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${({ theme }) => theme.space.s10};
        margin: 0;
        padding: ${({ theme }) => `${theme.space.s24} 0`};
        color: ${({ theme }) => theme.ink.tertiary};

        .msg {
          font-size: ${({ theme }) => theme.size.s13};
          text-align: center;
          text-wrap: pretty;
        }

        .icon {
          font-size: ${({ theme }) => theme.icon.md};
        }
      }
    }
  }
`;
