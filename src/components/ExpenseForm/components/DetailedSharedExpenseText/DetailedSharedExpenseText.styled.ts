import styled from 'styled-components';

export const StyledDetailedSharedExpenseText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s6};

  .splitCard {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;

    > * {
      position: relative;
      flex-shrink: 0;
    }

    > * + *::before {
      content: '';
      position: absolute;
      left: ${({ theme }) => theme.space.s14};
      right: 0;
      top: 0;
      height: 1px;
      background-color: ${({ theme }) => theme.surface.raisedHigh};
    }
  }

  .peopleRow {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    min-height: 48px;
    padding: ${({ theme }) => `0 ${theme.space.s14}`};
    cursor: pointer;

    &.static {
      cursor: default;
    }

    .rowLabel {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.size.s14};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .rowValue {
      flex: 1;
      min-width: 0;
      text-align: right;
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rowChevron {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .errors {
    .errorMsg {
      padding: ${({ theme }) => `0 ${theme.space.s2}`};
      word-wrap: break-word;
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.direction.owe};
    }
  }
`;
