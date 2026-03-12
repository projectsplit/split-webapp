import styled from 'styled-components';
import { StyledDateTimePicker } from '../../../components/DateTimePicker/DateTimePicker.styled';

export const StyledCustomDateCalendar = styled.div`
  margin: 10px auto;
  width: fit-content;
  ${StyledDateTimePicker} {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  }
`;
