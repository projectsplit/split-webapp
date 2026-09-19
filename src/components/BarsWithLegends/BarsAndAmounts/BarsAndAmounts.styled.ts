import { styled } from 'styled-components';

export const StyledBarsAndAmounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s12};

  .pair {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .side {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s3};
    min-width: 0;
  }

  .side.whole {
    align-items: flex-end;
  }

  .legend {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
  }

  .swatch {
    width: ${({ theme }) => theme.space.s8};
    height: ${({ theme }) => theme.space.s8};
    border-radius: 2px;
    flex-shrink: 0;
  }

  .label {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .figures {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space.s6};
  }

  .figure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.figure.summary};
    letter-spacing: -0.01em;
  }

  .percent {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  &.compact {
    gap: ${({ theme }) => theme.space.s4};

    .side {
      flex-direction: row;
      align-items: baseline;
      gap: ${({ theme }) => theme.space.s8};
    }

    .side.whole {
      align-items: baseline;
    }

    .pair.below {
      justify-content: flex-end;
    }

    .swatch {
      width: ${({ theme }) => theme.space.s6};
      height: ${({ theme }) => theme.space.s6};
    }

    .label {
      font-size: ${({ theme }) => theme.size.s10};
    }

    .figure {
      font-size: ${({ theme }) => theme.size.s16};
    }

    .pair.below .figure {
      font-size: ${({ theme }) => theme.size.s14};
    }

    .percent {
      font-size: ${({ theme }) => theme.size.s10};
    }
  }
`;
