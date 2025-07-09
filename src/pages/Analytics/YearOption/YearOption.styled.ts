import styled from "styled-components";

export const StyledYearOption = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto; /* or overflow: scroll; or overflow: hidden; */
  height: 30vh;

  .height {
    height: 10px;
  }
  .wrapper {
    padding: 12px;
  }
`;
