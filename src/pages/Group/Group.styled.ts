import styled from "styled-components";

export const StyledGroup = styled.div`
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .spinner {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
  .group {
    flex: 1; /* Allow the group content to take available space */
    overflow: auto;
    display: flex;
    flex-direction: column;
    .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
 
    .msg {
      opacity: 0.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon {
      display: flex;
      font-size: 100px;
      opacity: 0.4;
      margin-top: 20px;
    }
  }
  }
  .spinner {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    flex: 1; /* Ensure spinner takes available space during loading */
  }

  .bottomMenu {
    position: sticky;
    bottom: 0;
    z-index: 2; /* Ensure it stays above other content */
    background-color: ${({ theme }) => theme.backgroundcolor || '#fff'}; /* Match background to avoid visual gaps */
  }
`;
