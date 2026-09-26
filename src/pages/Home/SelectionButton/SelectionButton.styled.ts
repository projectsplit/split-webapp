import styled from 'styled-components';

export const StyledSelectionButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s14};
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  cursor: pointer;

  &:has(.destinationRow) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.space.s12};
  }

  .destinationRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s14};
  }

  .destinationIcon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.md};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .destinationBody {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s4};
  }

  .destinationName {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  .destinationChevron {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.sm};
    color: ${({ theme }) => theme.surface.mark};
  }
`;
