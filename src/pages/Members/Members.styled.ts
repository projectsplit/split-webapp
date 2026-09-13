import styled from 'styled-components';

export const StyledMembers = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  overflow: auto;
  height: 100%;
  gap: ${({ theme }) => theme.space.s10};
  padding: ${({ theme }) => `${theme.space.s16} ${theme.space.s20} 100px`};

  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: ${({ theme }) => theme.space.s24};
    height: 100%;
  }
`;
