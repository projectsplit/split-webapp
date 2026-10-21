import styled from 'styled-components';

export const StyledMostRecentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};

  /* Name and balance share one line. A long name gives way to the balance, which wraps only
     past most of the line, so the name never disappears. */
  .recentBody {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space.s10};

    > :last-child {
      flex-shrink: 0;
      max-width: 70%;
    }
  }

  .groupName {
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s16};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .recentChevron {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.md};
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
