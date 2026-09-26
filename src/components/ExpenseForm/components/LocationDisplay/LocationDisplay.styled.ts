import styled from 'styled-components';
import { StyledFormChip } from '../FormChip.styled';

export const StyledLocationDisplay = styled(StyledFormChip)`
  .chip {
    overflow: hidden;
  }

  .chipLabel {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coord {
    font-family: ${({ theme }) => theme.font.mono};
  }
`;
