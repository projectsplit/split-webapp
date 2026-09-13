import styled from 'styled-components';

export const StyledSpendingCycle = styled.div<{ $calendarIsOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s20};

  .cycleSegments {
    display: flex;
    flex-direction: row;
    gap: 3px;
    padding: 3px;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.iconButton};

    .segment {
      flex: 1;
      text-align: center;
      padding: 7px 0;
      border-radius: ${({ theme }) => theme.radius.control};
      font-size: ${({ theme }) => theme.size.s13};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.secondary};
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .segment.active {
      background-color: ${({ theme }) => theme.surface.hairline};
      color: ${({ theme }) => theme.ink.primary};
      font-weight: ${({ theme }) => theme.weight.semibold};
    }
  }

  .commencesSection {
    display: flex;
    flex-direction: column;
  }
`;
