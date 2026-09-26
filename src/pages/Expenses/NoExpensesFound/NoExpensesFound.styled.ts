import styled from 'styled-components';

export const StyledNoExpensesFound = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  .noFilteredData {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .pills {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s6};
    overflow-x: auto;
    scrollbar-width: none;
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s20}`};
    border-bottom: 1px solid ${({ theme }) => theme.surface.hairline};
  }

  .pills::-webkit-scrollbar {
    display: none;
  }

  .emptyState {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s16};
    padding: ${({ theme }) => `${theme.space.s24} ${theme.space.s20}`};

    .msg {
      max-width: 280px;
      font-size: ${({ theme }) => theme.size.s13};
      line-height: 1.5;
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
`;
