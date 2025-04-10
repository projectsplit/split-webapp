import styled from "styled-components";

export const StyledGroup = styled.div`

  .spinner {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
  .group {
    overflow: auto;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 100%;
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

  /* .bottom-bar {
    margin-bottom: auto;
  } */
  .bottomMenu {
    margin-top: auto; 
    padding-bottom: 4.91rem;
  }
`;
