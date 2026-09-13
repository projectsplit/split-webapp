import styled from 'styled-components';

export const StyledYearOption = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 44vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radius.iconButton};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.surface.raised};
    }
  }

  .item.clicked {
    background-color: ${({ theme }) => theme.surface.hairline};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }
`;
