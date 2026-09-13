import styled from 'styled-components';

export const StyledMostRecentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};

  .recentBody {
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

  .recentChevron {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.md};
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
