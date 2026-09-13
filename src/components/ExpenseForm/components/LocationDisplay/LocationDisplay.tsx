import { IoClose } from 'react-icons/io5';
import { LocationDisplayProps } from '../../../../interfaces';
import { StyledLocationDisplay } from './LocationDisplay.styled';
import { MdLocationOn } from 'react-icons/md';

export const LocationDisplay = ({
  location,
  isMapOpen,
  setLocation,
}: LocationDisplayProps) => {
  const locationName = location?.google?.name;
  const locationCoordinates = location?.coordinates;

  const clearLocation = () => {
    setLocation(undefined);
  };

  if (locationName) {
    return (
      <StyledLocationDisplay>
        <div
          className="chip"
          onClick={() => (isMapOpen.value = !isMapOpen.value)}
        >
          <MdLocationOn className="chipIcon" />
          <span className="chipLabel">{locationName}</span>
          <div className="closeButtonWrapper">
            {location !== undefined ? (
              <IoClose
                className="closeButton"
                onClick={(e) => {
                  e.stopPropagation();
                  clearLocation();
                }}
              />
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
        <div
          className="chip"
          onClick={() => (isMapOpen.value = !isMapOpen.value)}
        >
          <MdLocationOn className="chipIcon" />
          <div className="coord">{latitude}</div>
          <div className="coord">{longitude}</div>
          <div className="closeButtonWrapper">
            {location !== undefined ? (
              <IoClose
                className="closeButton"
                onClick={(e) => {
                  e.stopPropagation();
                  clearLocation();
                }}
              />
            ) : null}
          </div>
        </div>
      </StyledLocationDisplay>
    );
  }
};

export default LocationDisplay;
