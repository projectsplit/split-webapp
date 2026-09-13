import styled from 'styled-components';

export const StyledCycleOption = styled.div`
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radius.iconButton};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    gap: ${({ theme }) => theme.space.s2};
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.surface.raised};
    }
  }

  .item.clicked {
    background-color: ${({ theme }) => theme.surface.hairline};
  }
`;
