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

  .undoButton {
    display: flex;
    justify-content: flex-end;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.accent.you.ink};

    .text {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .destinations {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
  }

  .destinationList {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
  }
`;
