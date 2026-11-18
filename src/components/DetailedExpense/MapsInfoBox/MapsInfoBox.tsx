import { StyledMapsInfoBox } from './MapsInfoBox.styled';
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import InfoBox from '../InfoBox/InfoBox';
import config from '../../../config';
import { MapsInfoBoxProps } from '../../../interfaces';
import { MdLocationOn, MdOutlineLocationOff } from 'react-icons/md';
import { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import PlusBadge from '../../Plus/PlusBadge';
import { openPlusInfo } from '../../Plus/plusMenu';
import { usePlus } from '../../../hooks/usePlus';

export default function MapsInfoBox({
  location,
  googleMapsUrl,
}: MapsInfoBoxProps) {
  const mapId = `${config.googleMapId}`;
  const defaultZoom = 14;
  const [hide, setHide] = useState<boolean>(true);
  const { isLocked } = usePlus();

  // The place's name and its link to Google Maps stay for everyone: they were saved with the
  // expense and cost nothing to show. Drawing the map here is what Google bills for, so that is
  // the part behind Plus.
  const handleMapToggle = () => {
    if (isLocked) openPlusInfo();
    else setHide((hide) => !hide);
  };

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <StyledMapsInfoBox>
        <InfoBox>
          {location ? (
            <>
              <div className="locationRow">
                <MdLocationOn className="locationIcon" />
                <a
                  className="locationLink"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="locationName">{location.google?.name}</span>
                </a>
                <PlusBadge />
                <span
                  className="mapToggle"
                  onClick={handleMapToggle}
                >
                  <IonIcon
                    name={hide ? 'chevron-down-outline' : 'chevron-up-outline'}
                  />
                </span>
              </div>

              {!hide && !isLocked && (
                <Map
                  className="map"
                  mapId={mapId}
                  defaultCenter={{
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude,
                  }}
                  defaultZoom={defaultZoom}
                  renderingType="VECTOR"
                  gestureHandling="greedy"
                  disableDefaultUI
                  keyboardShortcuts={false}
                >
                  <AdvancedMarker
                    position={{
                      lat: location.coordinates.latitude,
                      lng: location.coordinates.longitude,
                    }}
                  >
                    <Pin
                      background={'#FFEE34'}
                      borderColor={'#1f234e'}
                      glyphColor={'#1f234e'}
                      scale={1.2}
                    />
                  </AdvancedMarker>
                </Map>
              )}
            </>
          ) : (
            <div className="locationRow empty">
              <MdOutlineLocationOff className="locationIcon" />
              <span className="noMapInfo">No location set</span>
            </div>
          )}
        </InfoBox>
      </StyledMapsInfoBox>
    </APIProvider>
  );
}
