import { useState } from 'react';
import { styled } from 'styled-components';
import PlacePicker from './PlacePicker';
import { GeoLocation } from '../types';

const LocationPicker: React.FC<LocationPickerProps> = ({ location, setLocation }) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false)
  const locationName = location?.google?.name
  const locationCoordinates = location?.coordinates

  const renderLocationDisplay = () => {
    if (locationName) {
      return <div className='selected-location'>{locationName}</div>;
    }

    if (locationCoordinates) {
      const { latitude, longitude } = locationCoordinates;
      return (
        <div className='selected-location'>
          <div className='coord'>{latitude}</div>
          <div className='coord'>{longitude}</div>
        </div>
      );
    }

    return <span>{'Select a location...'}</span>;
  };

  return (
    <StyledLocationPicker>
      {isMapOpen && <PlacePicker location={location} setLocation={setLocation} setIsMapOpen={setIsMapOpen} />}
      <div className={'main'} onClick={() => setIsMapOpen(!isMapOpen)}>
        {/* <HiMapPin className='icon' /> */}
        <span>{renderLocationDisplay()}</span>
      </div>
      <div className='meta'>
        <span className='description'>Location</span>
      </div>
    </StyledLocationPicker>
  )
}

export default LocationPicker;

const StyledLocationPicker = styled.div`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  
  .main {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.lineColor};
    border-radius: 8px;
    padding: 0.5em 1em;
    gap: 10px;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    cursor: pointer;
    
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

    .description {
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }  
`

export interface LocationPickerProps {
  location: GeoLocation | undefined
  setLocation: React.Dispatch<React.SetStateAction<GeoLocation | undefined>>
}