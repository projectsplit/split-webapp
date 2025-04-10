import styled from "styled-components";

export const StyledGroupsContainer = styled.div`
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundcolor};

  .bottom-bar {
    margin-top: auto;
  }
`;
