import styled from 'styled-components';

export const StyledInfoBox = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  background-color: ${({ theme }) => theme.surface.page};
  padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
  color: ${({ theme }) => theme.ink.primary};
`;
