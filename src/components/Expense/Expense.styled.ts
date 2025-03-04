import styled from "styled-components";
import { theme } from "../../theme";

export const StyledExpense = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.layer2};
  gap: 1.3rem;
  .topRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .locationIcon {
      font-size: 18px;
      color: ${({ theme }) => theme.yellow};
    }
    .time {
      font-size: 14px;
      color: #777777;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .descrAndLabels {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      justify-content: end;
      .descr {
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
      }
      .labels {
        display: flex;
        flex-direction: row;
        gap: 5px;
        .label {
          display: flex;

          width: 2rem;
          height: 0.3rem;
          background-color: rgb(189, 123, 243);
        }
      }
    }
    .amounts {
      .userShare,
      .groupTotal {
        display: flex;
        flex-direction: row;
        gap: 5px;
        margin-bottom: 6px;
      }
    }
  }

  .legendUser,
  .legendGroup {
    font-size: 18px;
    width: 1rem;
    height: 1rem;

    border-radius: 5px;
  }
  .legendUser {
    background-color:#e151ee ;
  }
  .legendGroup {
    background-color:#5183ee;
  }
`;
