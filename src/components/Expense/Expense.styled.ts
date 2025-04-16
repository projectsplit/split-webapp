import styled from "styled-components";

export const StyledExpense = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "userAmount",
}) <{ onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; userAmount: number; }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.layer2};
  gap: 1rem;
  box-shadow: ${({ theme, userAmount }) => `0 0 0 1px ${userAmount === 0 ? theme.lightBorder : theme.lightBorder}`};
  overflow: auto;
  
  .topRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .icons {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      
      .locationIcon {
        font-size: 18px;
        color: ${({ theme }) => theme.yellow};
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
      font-size: 1.1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .amounts {
      
      .groupTotal {
        display: flex;
        font-size: 14px;
        flex-direction: row;
        gap: 5px;
        margin-bottom: 6px;
        font-weight: 600;
        color:${({ theme }) => theme.grey};
      }
      
      .userShare {
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
    background-color: ${({ theme }) => theme.pink};
  }
  
  .legendGroup {
    background-color: ${({ theme }) => theme.ciel};
  }
`;