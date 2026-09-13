import styled from 'styled-components';

export const StyledScrollableMenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
  z-index: 1;
  gap: ${({ theme }) => theme.space.s24};
  padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s20} 110px`};

  .destinations {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
  }

  .budgetMetaLine {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s8};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
    margin-bottom: ${({ theme }) => theme.space.s8};
  }

  .destinationList {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
  }
`;
