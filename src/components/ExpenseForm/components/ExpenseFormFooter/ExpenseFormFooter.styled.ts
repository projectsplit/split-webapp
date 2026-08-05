import styled from 'styled-components';

export const StyledExpenseFormFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .submitButton {
    flex-grow: 1;
  }
  .submitButton > * {
    width: 100%; /* Ensure the button inside takes full container width */
  }
  .locationIcon {
    color: ${({ theme }) => theme.yellow};
    flex-shrink: 0;
    font-size: 25px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    align-self: center;
  }
  .calendarIcon {
    color: ${({ theme }) => theme.highlightColor};
    flex-shrink: 0;
    font-size: 30px;

    margin-right: 10px;
  }
  .recurringIcon {
    /* Grey until a cycle is picked, white once one is, so the footer reads as "off" at a glance
       the way an unset location does. Deliberately not the highlight blue: the calendar sitting
       next to it already owns that colour, and two blue icons read as one control. */
    color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    flex-shrink: 0;
    font-size: 26px;
    margin-right: 10px;

    &.active {
      color: ${({ theme }) => theme.whiteText};
    }
  }
`;
