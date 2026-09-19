import { styled } from 'styled-components';
import { GeoLocation } from '../../types';

interface StyledLocationPickerProps {
  location: GeoLocation | undefined;
}
export const StyledLocationPicker = styled.div<StyledLocationPickerProps>`
  .main {
    cursor: pointer;
    .closeButtonWrapper {
      display: flex;
      align-items: center;
      .closeButton {
        font-size: ${({ theme }) => theme.icon.md};
        color: ${({ location, theme }) =>
          !!location ? theme.ink.primary : ''};
      }
    }
    .icon {
    }

    .coord {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 6em;
    }
  }
`;
