import styled from "styled-components";

export const StyledFilterCalendar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
  border-radius: 6px;
  gap: 10px;
  background-color: ${({ theme }) => theme.layer2};
  border-color: ${({ theme }) => theme.layer2};
  border-style: solid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  z-index: 1000;
  overflow-wrap: break-word;
  .monthNameAndYear {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 5px;
  }
  .calendar-row {
    display: flex;
  }

  .calendar-day {
    flex: 1;
    border-radius: 6px;
    padding: 0.1rem;
    text-align: center;
    position: relative;
    cursor: pointer;

    &:hover {
      color: black;
      font-weight: bold;
      background-color: ${({ theme }) => theme.whiteText};
    }

    &:hover:before {
      content: ""; 
      position: absolute;
      top: 50%; 
      left: 50%; 
      transform: translate(-50%, -50%); 
      width: 30px;
      height: 30px;

    
      z-index: -1; 
    }

    &.selected {
      font-weight: bold;
    }

    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0; 
      left: 25%; 
      right: 25%; 
      height: 2px;
      background-color: ${({ theme }) => theme.whiteText};
      border-radius: 0; 
    }
  }
`;
