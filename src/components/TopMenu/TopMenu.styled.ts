import styled from "styled-components";

export const StyledTopMenu = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:14px;
  margin-bottom: 1rem;

  .titleStripe {
    display: flex;
    flex-direction: row;

    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .useOptionsContainer {
    position: relative;
    cursor: pointer;
    display: inline-block;
  }


`;
