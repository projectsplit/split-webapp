import { StyledMapsInfoBox } from "./MapsInfoBox.styled";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import InfoBox from "../InfoBox/InfoBox";
import config from "../../../config";
import { MapsInfoBoxProps } from "../../../interfaces";
import { MdLocationOn, MdOutlineLocationOff } from "react-icons/md";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function MapsInfoBox({ location, googleUrl }: MapsInfoBoxProps) {
  const mapId = `${config.googleMapId}`;
  const defaultZoom = 14;
  const [hide, setHide] = useState<boolean>(true);

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <StyledMapsInfoBox>
        {location ? (
          <InfoBox>
            <div className="topStripe">
              <div className="locationAndPin">
                <MdLocationOn className="locationIcon" />
                <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                  <div className="locationName">{location.google?.name}</div>{" "}
                </a>
              </div>
              {!hide ? <div /> : null}
              <div
                className="hideDetalailsButton"
                onClick={() => setHide((hide) => !hide)}
              >
                {hide ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </div>
            </div>{" "}
            {!hide && (
              <Map
                className="map"
                mapId={mapId}
                defaultCenter={{
                  lat: location.coordinates.latitude,
                  lng: location.coordinates.longitude,
                }}
                defaultZoom={defaultZoom}
                renderingType="VECTOR"
                // onClick={handleMapClick}
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
                    background={"#646cff"}
                    borderColor={"#1f234e"}
                    glyphColor={"#1f234e"}
                    scale={1.2}
                  />
                </AdvancedMarker>
              </Map>
            )}
          </InfoBox>
        ) : (
          <div className="noLocation">
            <MdOutlineLocationOff className="locationIcon" />
            <span className="noMapInfo">No location set</span>
            <div />
          </div>
        )}
      </StyledMapsInfoBox>
    </APIProvider>
  );
}
