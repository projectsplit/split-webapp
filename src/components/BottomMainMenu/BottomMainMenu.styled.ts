import styled from "styled-components";

export const StyledBottomMainMenu = styled.div`
  padding: 0.625rem;
  .bottomMainBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.layer2};
    border-color: ${({ theme }) => theme.layer2};
    border-style: solid;
    border-radius: 10px;
    padding: 0.3rem;
    align-items: center;

    .home,
    .search {
      display: flex;
      font-size: 1.7rem;
      align-self: center;
      cursor: pointer;
    }

    .add {
      font-size: 1.5rem;
      padding: 0.5rem;
      border: 2px solid ${({ theme }) => theme.greyOutline};
      border-radius: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;