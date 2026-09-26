import styled from 'styled-components';

export const StyledGroupSearchBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 47px;
  margin: ${({ theme }) => `${theme.space.s8} 0`};
  padding: ${({ theme }) => `0 ${theme.space.s14}`};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.iconButton};
  outline: none;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.size.s15};
  color: ${({ theme }) => theme.ink.primary};
  transition: border-color 0.15s;

  &::placeholder {
    color: ${({ theme }) => theme.ink.tertiary};
    opacity: 1;
  }

  &:focus {
    border-color: ${({ theme }) => theme.accent.you.ink};
  }
`;
