import styled from 'styled-components';

export const StyledBarWithLegends = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s20}`};
`;
