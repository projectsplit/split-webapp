import styled from 'styled-components';

export const StyledCumulativeSpending = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .chartArea {
    position: relative;
    width: 100%;
    height: 330px;
    flex-shrink: 0;
  }

  .periodOptions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${({ theme }) => theme.ink.primary};
    font-weight: ${({ theme }) => theme.weight.semibold};
    font-size: ${({ theme }) => theme.figure.card};
    letter-spacing: -0.02em;
    margin-top: ${({ theme }) => theme.space.s20};
    .period {
      align-self: center;
    }
  }
`;
