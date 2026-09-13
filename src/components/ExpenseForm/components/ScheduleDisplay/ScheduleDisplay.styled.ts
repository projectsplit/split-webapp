import styled from 'styled-components';
import { StyledFormChip } from '../FormChip.styled';

export const StyledScheduleDisplay = styled(StyledFormChip)`
  .chip {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rule {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
