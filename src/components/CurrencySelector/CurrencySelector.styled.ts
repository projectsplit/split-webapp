import styled from 'styled-components';

export const StyledCurrencySelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s8};
  padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s12}`};
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.surface.raised};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.s15};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.ink.primary};
  cursor: pointer;

  .currencyCode {
    white-space: nowrap;
  }

  .angleDown {
    display: block;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }
`;
