import styled from 'styled-components';

export const ScrollableContainer = styled.div`
  padding-top: ${({ theme }) => theme.space.s8};
  flex: 0 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;

  .items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 0 1 auto;
    min-height: 0;
  }

  .menuHint {
    flex-shrink: 0;
    padding: ${({ theme }) => `${theme.space.s10} 2px 0`};
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
    text-wrap: pretty;
  }
`;
