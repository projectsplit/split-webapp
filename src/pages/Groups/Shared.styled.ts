import styled from 'styled-components';

export const StyledGroups = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  padding: ${({ theme }) => `0 ${theme.space.s20}`};

  .searchWrapper {
    overflow: hidden;
    margin-bottom: ${({ theme }) => theme.space.s12};
  }

  .groups {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
    padding-bottom: 100px;
  }

  .groupBody {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s4};
  }

  .groupName {
    font-size: ${({ theme }) => theme.size.s16};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .groupAction {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.space.s8};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.icon.sm};
    cursor: pointer;
  }

  .groupAction.archived {
    color: ${({ theme }) => theme.state.locked};
  }

  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-top: 100px;
    color: ${({ theme }) => theme.ink.tertiary};

    .msg {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon {
      display: flex;
      font-size: 56px;
      margin-top: ${({ theme }) => theme.space.s20};
      color: ${({ theme }) => theme.surface.raisedHigh};
    }
  }
`;
