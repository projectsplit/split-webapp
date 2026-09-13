import styled from 'styled-components';

export const StyledTransactionCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: 22px 20px;
  column-gap: ${({ theme }) => theme.space.s12};
  row-gap: ${({ theme }) => theme.space.s8};
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};

  .meta {
    grid-column: 1;
    grid-row: 2;
    min-width: 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.s4};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .time {
    font-family: ${({ theme }) => theme.font.mono};
    flex-shrink: 0;
  }
`;
