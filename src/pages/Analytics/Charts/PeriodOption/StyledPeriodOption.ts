import styled from "styled-components";
import { StyledCycleOption } from "../../CycleOption/CycleOption.styled";

export const StyledPeriodOption = styled(StyledCycleOption)`
  overflow: auto; /* or overflow: scroll; or overflow: hidden; */
  height: 30vh;

  .height {
    height: 10px;
  }
  .wrapper {
    padding: 12px;
  }
`;
