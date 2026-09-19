import styled from 'styled-components';

export const StyledBudgetScopeGroupsMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s12};

  .searchBar {
    box-sizing: border-box;
    width: 100%;
    height: 47px;
    padding: ${({ theme }) => `0 ${theme.space.s14}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    outline: none;
    font-size: ${({ theme }) => theme.size.s15};
    color: ${({ theme }) => theme.ink.primary};

    &::placeholder {
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }

  .groupList {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;

    > * {
      position: relative;
      flex-shrink: 0;
    }

    > * + *::before {
      content: '';
      position: absolute;
      left: 58px;
      right: 0;
      top: 0;
      height: 1px;
      background-color: ${({ theme }) => theme.surface.raisedHigh};
    }
  }

  .groupRow {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    min-height: 56px;
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s16}`};
    cursor: pointer;

    .groupIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.icon.sm};
    }

    .groupName {
      flex: 1;
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.secondary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .archived {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.xs};
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .check {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.ink.primary};
    }

    &.selected .groupName {
      color: ${({ theme }) => theme.ink.primary};
    }
  }

  .noResults {
    padding: ${({ theme }) => `${theme.space.s16} 0`};
    text-align: center;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
