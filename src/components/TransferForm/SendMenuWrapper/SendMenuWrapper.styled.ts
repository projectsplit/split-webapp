import styled from 'styled-components';

export const StyledSendMenu = styled.div<{ $inputError?: boolean }>`
  .sendRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s16}`};
    min-height: 56px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .rowLabel {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme, $inputError }) =>
      $inputError ? theme.direction.owe : theme.ink.secondary};
  }

  .rowValue {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
    min-width: 0;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s10};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .name {
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .placeholder {
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme, $inputError }) =>
      $inputError ? theme.direction.owe : theme.ink.tertiary};
  }

  .rowIcon {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.sm};
    color: ${({ theme }) => theme.surface.mark};
  }
`;
