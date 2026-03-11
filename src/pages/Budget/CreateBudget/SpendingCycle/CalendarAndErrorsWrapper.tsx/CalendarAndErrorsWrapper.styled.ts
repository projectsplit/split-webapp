import styled from "styled-components";

export const StyledCalendarAndErrorsWrapper = styled.div`  
  display: flex;
  flex-direction: column;
  
  .customPropmtPills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .prompt{
      font-size:16px;
    }
    gap:5px;
    .pill {
      display:flex ;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.whiteText};
      color: ${({ theme }) => theme.text};
      padding:1px;
      border-radius: 10px;
      font-size:16px;
      cursor: pointer;
      .date{
        margin-left:4px;
        margin-right:4px;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }
  `