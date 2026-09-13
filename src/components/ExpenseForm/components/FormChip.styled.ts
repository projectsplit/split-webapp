import styled from 'styled-components';

export const StyledFormChip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;

  .chip {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
    max-width: 100%;
    min-width: 0;
    padding: ${({ theme }) => `8px ${theme.space.s12}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.pill};
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
    cursor: pointer;
  }

  .chipIcon {
    display: block;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .closeButtonWrapper {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .closeButton {
      display: block;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.surface.mark};
      cursor: pointer;
    }
  }
`;
