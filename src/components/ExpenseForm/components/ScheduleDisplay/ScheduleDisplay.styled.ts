import styled from 'styled-components';

export const StyledScheduleDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .recurringIcon {
    font-size: 26px;
    margin-right: 10px;
    /* Grey, not the highlight blue: this is a statement about the expense, not a call to action,
       and the calendar in the footer already owns that colour. */
    color: ${({ theme }) => theme.grey};
    flex-shrink: 0;
  }

  .scheduleAndClose {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-grow: 1;
    min-width: 0;
    border: 1px solid ${({ theme }) => theme.lineColor};
    border-radius: 10px;
    padding: 8px;

    .text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .rule {
      color: ${({ theme }) => theme.whiteText};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Nothing is created on submit, so the form has to say when the first one actually lands. */
    .first {
      color: ${({ theme }) => theme.secondaryTextColor};
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .closeButtonWrapper {
    display: flex;
    align-items: center;

    .closeButton {
      cursor: pointer;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.textActiveColor};
      flex-shrink: 0;
    }
  }
`;
