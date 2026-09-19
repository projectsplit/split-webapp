import styled from 'styled-components';

export const StyledOptionsToolbar = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;

  & + & {
    margin-top: ${({ theme }) => theme.space.s12};
  }

  .categoryAndTypesWrapper {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
  }

  .category {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .types {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
  }
`;
