import styled from 'styled-components';

export const StyledPropertyList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  overflow: hidden;

  .divider {
    height: 1px;
    background-color: ${({ theme }) => theme.surface.raisedHigh};
    margin-left: ${({ theme }) => theme.space.s16};
  }
`;

export const StyledPropertyRow = styled.div<{
  $clickable?: boolean;
  $hasNote?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s4};
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  .propertyMain {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .propertyAction {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    flex-shrink: 0;
  }

  .propertyNote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.45;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .propertyLabel {
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    flex-shrink: 0;
  }

  .propertyValue {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    text-align: right;
    white-space: nowrap;
    padding-left: 2px;
    margin-left: -2px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
