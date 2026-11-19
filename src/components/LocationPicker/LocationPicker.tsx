import { APIProvider } from '@vis.gl/react-google-maps';
import config from '../../config';
import { StyledLocationPicker } from './LocationPicker.styled';
import { LocationPickerProps } from '../../interfaces';
import PlacePicker from '../PlacePicker/PlacePicker';
import { MdLocationOn } from 'react-icons/md';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import PlusBadge from '../Plus/PlusBadge';
import { openPlusInfo } from '../Plus/plusMenu';
import { usePlus } from '../../hooks/usePlus';

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  isMapOpen,
  timeZoneCoordinates,
  setLocation,
  isCreateExpense,
  setDescriptionError,
}) => {
  const { isLocked } = usePlus();

  useCloseOnBack(isMapOpen.value, () => (isMapOpen.value = false));

  // Every map and place lookup is billed by Google, so the picker is the part of Places that has
  // to stay behind Plus. A place already on an expense is left alone: it can still be read, and
  // the expense saved with it.
  const handleClick = () => {
    if (isLocked) openPlusInfo();
    else isMapOpen.value = !isMapOpen.value;
  };

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <StyledLocationPicker location={location}>
        {isMapOpen.value && !isLocked && (
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
          onClick={handleClick}
        >
          <MdLocationOn className="locationIcon" />
          {/* Google bills per map and per place lookup, which is what puts this behind Plus. The
              mark sits on the corner so the control itself stays the same size as its neighbours. */}
          <PlusBadge size="xs" className="plusMark" />
        </div>
      </StyledLocationPicker>
    </APIProvider>
  );
};

export default LocationPicker;
