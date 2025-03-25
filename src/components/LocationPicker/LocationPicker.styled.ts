import { styled } from "styled-components";
import { GeoLocation } from "../../types";

interface StyledLocationPickerProps {
  location: GeoLocation | undefined;
}
export const StyledLocationPicker = styled.div<StyledLocationPickerProps>`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.layer2};

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.lineColor};
    border-radius: 8px;
    padding: 0.5em 1em;
    gap: 10px;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    position: relative;
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
        color: ${({ location,theme }) => (!!location ? theme.textActiveColor : "")};


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

  .meta {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    font-size: 12px;
    background-color: ${({ theme }) => theme.backgroundcolor};
    .description {
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }
`;
