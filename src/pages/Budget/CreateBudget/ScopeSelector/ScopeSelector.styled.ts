import styled from 'styled-components';

export const StyledScopeSelector = styled.div<{ $inputError: boolean }>`
  .scopeSelector {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
    width: 100%;
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
    border: 1px solid
      ${({ theme, $inputError }) =>
        $inputError ? theme.direction.owe : theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    outline: none;
    background-color: ${({ theme }) => theme.surface.card};
    color: ${({ theme }) => theme.ink.primary};
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    text-align: left;
    cursor: pointer;
  }

  .scopeText {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .scopeChevron {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s16};
    color: ${({ theme }) => theme.surface.mark};
  }
`;
