import styled from "styled-components";

export const StyledNoExpensesFound = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    .pills {
      padding-left: 0.7rem;
      padding-right: 0.7rem;
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto;
      text-align: center;
      scrollbar-width: none;
    }
    .textAndIcon {
      white-space: normal;
      text-align: center;
      margin-top: 10rem;

      .text {
        opacity: 0.5;
        white-space: normal;
        overflow: visible;
        text-overflow: clip;
        text-align: center;
         .emoji{
          opacity:1
        }
      }
    }

    .icon {
      display: flex;
      justify-self: center;
      font-size: 100px;
      opacity: 0.5;
      margin-top: 10px;
    }
`
