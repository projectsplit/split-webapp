import styled from 'styled-components';

export const StyledBalanceMeta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s8};
  font-size: ${({ theme }) => theme.size.s12};
  color: ${({ theme }) => theme.ink.secondary};
  min-width: 0;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.space.s2};

  > span {
    white-space: nowrap;
  }

  .dot {
    color: ${({ theme }) => theme.surface.dot};
    flex-shrink: 0;
  }

  .amount {
    font-family: ${({ theme }) => theme.font.mono};
  }

  .owe .amount {
    color: ${({ theme }) => theme.direction.owe};
  }

  .owed .amount {
    color: ${({ theme }) => theme.direction.owed};
  }

  .settled {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s4};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .checkmark {
    font-size: ${({ theme }) => theme.size.s13};
  }
`;
