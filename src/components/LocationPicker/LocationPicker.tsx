import { APIProvider } from '@vis.gl/react-google-maps';
import config from '../../config';
import { StyledLocationPicker } from './LocationPicker.styled';
import { LocationPickerProps } from '../../interfaces';
import PlacePicker from '../PlacePicker/PlacePicker';
import { MdLocationOn } from 'react-icons/md';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  isMapOpen,
  timeZoneCoordinates,
  setLocation,
  isCreateExpense,
  setDescriptionError,
}) => {
  useCloseOnBack(isMapOpen.value, () => (isMapOpen.value = false));

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <StyledLocationPicker location={location}>
        {isMapOpen.value && (
          <PlacePicker
            location={location}
            isMapOpen={isMapOpen}
            defaultCoordinates={timeZoneCoordinates}
            setLocation={setLocation}
            isCreateExpense={isCreateExpense}
            setDescriptionError={setDescriptionError}
          />
        )}
        <div
          className={`main${location ? ' set' : ''}`}
          onClick={() => (isMapOpen.value = !isMapOpen.value)}
        >
          <MdLocationOn className="locationIcon" />
        </div>
      </StyledLocationPicker>
    </APIProvider>
  );
};

export default LocationPicker;
