import styled from 'styled-components';

export const StyledTopMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s10};
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.space.s20} ${theme.space.s20} ${theme.space.s14}`};
  padding-top: calc(${({ theme }) => theme.space.s20} + env(safe-area-inset-top));

  .slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
  }

  .slot.right {
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
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;

    .title {
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
