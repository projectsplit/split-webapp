import styled from 'styled-components';

export const StyledRevokeAccess = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  .scrollable-content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) =>
      `${theme.space.s4} ${theme.space.s20} ${theme.space.s24}`};

    > * {
      flex-shrink: 0;
    }
  }

  .promptText {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
    text-wrap: pretty;
  }

  .emptyState {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s16};
    flex: 1;
    padding: ${({ theme }) => `${theme.space.s24} ${theme.space.s20}`};

    .msg {
      font-size: ${({ theme }) => theme.size.s13};
      color: ${({ theme }) => theme.ink.tertiary};
      text-align: center;
      text-wrap: pretty;
    }

    .icon {
      display: flex;
      font-size: 56px;
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .spinner {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;
