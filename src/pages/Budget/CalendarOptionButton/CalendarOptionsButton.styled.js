import styled from 'styled-components';
import { StyledOptionsButton } from '../../../components/OptionsButton/OptionsButton.styled';
export const StyledCalendarOptionsButton = styled(StyledOptionsButton) `
  background-color: ${(props) => props.$isactive ? props.theme.whiteText : props.theme.layer2};
  color: ${(props) => props.$isactive ? props.theme.body : props.theme.whiteText};
`;
