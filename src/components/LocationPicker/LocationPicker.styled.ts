import { styled } from "styled-components";
import { GeoLocation } from "../../types";

interface StyledLocationPickerProps {
  location: GeoLocation | undefined;
}
export const StyledLocationPicker = styled.div<StyledLocationPickerProps>`

  .main {
    cursor: pointer;
    .locationPicker {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .closeButtonWrapper {
      display: flex;
      align-items: center;
      .closeButton {
        font-size: 1.4rem;
        color: ${({ location, theme }) =>
          !!location ? theme.textActiveColor : ""};
      }
    }
    .icon {
      /* vertical-align: middle; */
    }

    .selected-location {
      display: flex;
      gap: 8px;
      color: ${({ theme }) => theme.textActiveColor};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .coord {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 6em;
    }
  }
`;
