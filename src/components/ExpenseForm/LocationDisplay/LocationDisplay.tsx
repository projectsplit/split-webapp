import { IoClose } from "react-icons/io5";
import { LocationDisplayProps } from "../../../interfaces";
import { StyledLocationDisplay } from "./LocationDisplay.styled";
import { MdLocationOn } from "react-icons/md";

export const LocationDisplay = ({ location }: LocationDisplayProps) => {
  const locationName = location.value?.google?.name;
  const locationCoordinates = location.value?.coordinates;

  const clearLocation = () => {
    location.value = undefined;
  };

  if (locationName) {
    return (
      <StyledLocationDisplay>
        <MdLocationOn className="locationIcon" />
        <div className="locationAndClose">
          {locationName}
          <div className="closeButtonWrapper">
            {location.value !== undefined ? (
              <IoClose className="closeButton" onClick={clearLocation} />
            ) : null}
          </div>
        </div>
      </StyledLocationDisplay>
    );
  }

  if (locationCoordinates) {
    const { latitude, longitude } = locationCoordinates;
    return (
      <StyledLocationDisplay>
        <MdLocationOn className="locationIcon" />
        <div className="locationAndClose">
          <div className="coord">{latitude}</div>
          <div className="coord">{longitude}</div>
          <div className="closeButtonWrapper">
            {location.value !== undefined ? (
              <IoClose className="closeButton" onClick={clearLocation} />
            ) : null}
          </div>
        </div>
      </StyledLocationDisplay>
    );
  }
};

export default name;
