import styled from "styled-components";

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
`;
