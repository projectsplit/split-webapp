import styled from 'styled-components';

export const StyledTopMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s10};
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.space.s20} ${theme.space.s20} ${theme.space.s14}`};
  padding-top: calc(${({ theme }) => theme.space.s20} + env(safe-area-inset-top));

  /* The two sides share what the title leaves over equally, so the title sits in the middle of the
     bar whatever either side holds: the heart that shows only on the home page used to push it off
     centre, and it slid back once the next page was open. */
  .side {
    flex: 1 1 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    min-height: 34px;
  }

  .side.right {
    justify-content: flex-end;
  }

  .iconButton {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    font-size: ${({ theme }) => theme.icon.md};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;
  }

  .iconButton .unarchive {
    color: ${({ theme }) => theme.state.locked};
  }

  .titleStripe {
    flex: 0 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space.s2};

    .title {
      max-width: 100%;
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title.archived {
      color: ${({ theme }) => theme.state.locked};
    }
  }

  .supportButton {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.accent.you.tintBorder};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.accent.you.tint};
    color: ${({ theme }) => theme.accent.you.ink};
    font-size: ${({ theme }) => theme.size.s17};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .bellIconAndNumberOfNotifications {
    font-size: ${({ theme }) => theme.icon.lg};

    .notification {
      position: absolute;
      top: 5px;
      right: 6px;
      width: 7px;
      height: 7px;
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.accent.you.ink};
      border: 2px solid ${({ theme }) => theme.surface.page};
    }
  }
`;
