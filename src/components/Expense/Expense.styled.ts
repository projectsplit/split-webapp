import styled from "styled-components";

export const StyledExpense = styled.div<{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.layer2};
  gap: 1rem;
  box-shadow: ${({ theme }) => `0 0 0 1px ${theme.lightBorder}`};
  overflow: auto;
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
      font-weight: 800;
    }
  }

  .descrAndAmounts {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    justify-content: space-between;

    .descr {
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }
    .amounts {
      .userShare,
      .groupTotal {
        display: flex;
        font-size: 14px;
        flex-direction: row;
        gap: 5px;
        margin-bottom: 6px;
        font-weight: 600;
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
    background-color: #e151ee;
  }
  .legendGroup {
    background-color: #5183ee;
  }
  .labels {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    gap: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .labels::-webkit-scrollbar {
    display: none;
  }
`;

// export const StyledLabel = styled.div<LabelProps>`
//   display: flex;
//   width: 2rem;
//   height: 0.3rem;
//   background-color: ${({ backgroundColor }) => backgroundColor};
//   flex-shrink: 0;
// `;
