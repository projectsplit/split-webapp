import styled from 'styled-components';

export const StyledSearchFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s8};
  width: 100%;
  min-width: 0;

  .category {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;
  }

  .type {
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .pills {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.space.s8};
    min-width: 0;
  }
`;
