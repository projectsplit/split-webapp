import { APIProvider } from "@vis.gl/react-google-maps";
import config from "../../config";
import { StyledLocationPicker } from "./LocationPicker.styled";
import { LocationPickerProps } from "../../interfaces";
import { IoClose } from "react-icons/io5";
import PlacePicker from "../PlacePicker/PlacePicker";

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  isMapOpen,
  timeZoneCoordinates
}) => {
  const locationName = location.value?.google?.name;
  const locationCoordinates = location.value?.coordinates;

  const renderLocationDisplay = () => {
    if (locationName) {
      return <div className="selected-location">{locationName}</div>;
    }

    if (locationCoordinates) {
      const { latitude, longitude } = locationCoordinates;
      return (
        <div className="selected-location">
          <div className="coord">{latitude}</div>
          <div className="coord">{longitude}</div>
        </div>
      );
    }
    return <span>{"Select a location"}</span>;
  };

  const clearLocation = () => {
    location.value = undefined;
  };

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <StyledLocationPicker location={location.value}>
        {isMapOpen.value && (
          <PlacePicker location={location} isMapOpen={isMapOpen} defaultCoordinates={timeZoneCoordinates} />
        )}
        <div className={"main"}>
          {/* <HiMapPin className='icon' /> */}
          <span
            className="locationPicker"
            onClick={() => (isMapOpen.value = !isMapOpen.value)}
          >
            {renderLocationDisplay()}
          </span>
          <div className="closeButtonWrapper">
            {location.value!==undefined?<IoClose className="closeButton" onClick={clearLocation} />:null}
          </div>
        </div>
        <div className="meta">
          <span className="description">Location</span>
        </div>
      </StyledLocationPicker>
    </APIProvider>
  );
};

export default LocationPicker;
