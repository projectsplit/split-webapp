import styled from 'styled-components';
import { StyledFormChip } from '../FormChip.styled';

export const StyledDateDisplay = styled(StyledFormChip)`
  .chip {
    font-family: ${({ theme }) => theme.font.mono};
  }

  .chipIcon {
    font-size: ${({ theme }) => theme.size.s12};
  }
`;
