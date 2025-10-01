import { APIProvider } from "@vis.gl/react-google-maps";
import config from "../../config";
import { StyledLocationPicker } from "./LocationPicker.styled";
import { LocationPickerProps } from "../../interfaces";
import { IoClose } from "react-icons/io5";
import PlacePicker from "../PlacePicker/PlacePicker";
import { FaLocationArrow } from "react-icons/fa";

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  isMapOpen,
  timeZoneCoordinates,
}) => {

  const clearLocation = () => {
    location.value = undefined;
  };

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <StyledLocationPicker location={location.value}>
        {isMapOpen.value && (
          <PlacePicker
            location={location}
            isMapOpen={isMapOpen}
            defaultCoordinates={timeZoneCoordinates}
          />
        )}
        <div className="main">
          <FaLocationArrow
            className="locationIcon"
            onClick={() => (isMapOpen.value = !isMapOpen.value)}
          />
        
        </div>
      </StyledLocationPicker>
    </APIProvider>
  );
};

export default LocationPicker;
