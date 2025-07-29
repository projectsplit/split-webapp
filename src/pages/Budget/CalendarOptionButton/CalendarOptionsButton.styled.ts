import styled from "styled-components";

import {
  CalendarOptionsButtonProps,
  OptionsButtonProps,
} from "../../../interfaces";
import { StyledOptionsButton } from "../../../components/OptionsButton/OptionsButton.styled";

export const StyledCalendarOptionsButton = styled(StyledOptionsButton)<
  OptionsButtonProps & CalendarOptionsButtonProps
>`
  background-color: ${(props) =>
    props.isactive ? props.theme.whiteText : props.theme.layer2};
  color: ${(props) =>
    props.isactive ? props.theme.body : props.theme.whiteText};
`;
