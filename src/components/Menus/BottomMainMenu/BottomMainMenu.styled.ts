import styled from 'styled-components';

export const StyledBottomMainMenu = styled.div<{ $groupIsArchived?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s20}`};
  padding-bottom: max(env(safe-area-inset-bottom), 20px);
  background: ${({ theme }) =>
    `linear-gradient(to top, ${theme.surface.page} 60%, ${theme.scrim.fade})`};
  pointer-events: none;

  .bottomMainBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: none;
    pointer-events: auto;
  }

  .home,
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.iconButton};
    font-size: ${({ theme }) => theme.icon.lg};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;
  }

  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: none;
    font-size: 19px;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.fab};
    background-color: ${({ theme, $groupIsArchived }) =>
      $groupIsArchived ? theme.surface.raised : theme.ink.primary};
    color: ${({ theme, $groupIsArchived }) =>
      $groupIsArchived ? theme.state.locked : theme.surface.page};

    .prohibited {
      color: ${({ theme }) => theme.state.locked};
      cursor: not-allowed;
    }
  }
`;
