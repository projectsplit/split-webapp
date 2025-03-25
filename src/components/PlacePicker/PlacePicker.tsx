import {
  AdvancedMarker,
  Map,
  MapMouseEvent,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useGeolocation from "../../hooks/useGeoLocation";
import { SiGooglemaps } from "react-icons/si";
import Button from "../Button";
import { Coordinates, GeoLocation } from "../../types";
import config from "../../config";
import { IoClose } from "react-icons/io5";
import { StyledPlacePicker } from "./PlacePicker.styled";
import { PlacePickerProps } from "../../interfaces";
import MyButton from "../MyButton/MyButton";

const PlacePicker: React.FC<PlacePickerProps> = ({
  location,
  isMapOpen
}) => {
  const mapId = `${config.googleMapId}`;
  const defaultZoom = 14;
  const googleMapsBaseUrl = "https://www.google.com/maps/search/?api=1";
  const buildGoogleUrl = (coords: Coordinates) =>
    `${googleMapsBaseUrl}&query=${coords.latitude},${coords.longitude}`;

  const defaultCoordinates: Coordinates = {
    latitude: 53.54992,
    longitude: 10.00678,
  };

  const initialLocation: GeoLocation = location.value ?? {
    coordinates: {
      latitude: defaultCoordinates.latitude,
      longitude: defaultCoordinates.longitude,
    },
    google: {
      id: null,
      address: undefined,
      name: undefined,
      url: undefined,
    },
  };

  const [selectedLocation, setSelectedLocation] = useState<GeoLocation>(
    location.value ?? initialLocation
  );

  const userLocation = useGeolocation();
  const map = useMap();
  const shouldPanToUserLocation = useRef(!location);
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  const placesLib = useMapsLibrary("places");

  const placesService = useMemo(
    () => placesLib && map && new placesLib.PlacesService(map),
    [placesLib, map]
  );

  const autocomplete = useMemo(
    () =>
      autocompleteInputRef.current &&
      placesLib &&
      new placesLib.Autocomplete(autocompleteInputRef.current, {
        fields: ["place_id", "geometry", "name", "url"],
      }),
    [autocompleteInputRef, placesLib]
  );

  const geocodingLib = useMapsLibrary("geocoding");
  const geocoder = useMemo(
    () => geocodingLib && new geocodingLib.Geocoder(),
    [geocodingLib]
  );

  useEffect(() => {
    return () => {
      document
        .querySelectorAll(".pac-container")
        .forEach((container) => container.remove());
    };
  }, []);

  useEffect(() => {
    if (
      !shouldPanToUserLocation.current ||
      userLocation.error ||
      userLocation.loading ||
      !map ||
      !userLocation.latitude ||
      !userLocation.longitude
    )
      return;

    const userPosition: google.maps.LatLngLiteral = {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    };

    geocoder!.geocode({ location: userPosition }).then((response) => {
      const firstResult = response.results[0];
 

      setSelectedLocation({
        coordinates: {
          latitude: userPosition.lat,
          longitude: userPosition.lng,
        },
        google: {
          address: firstResult.formatted_address,
          id: null,
          name: firstResult.formatted_address,
          url: buildGoogleUrl({
            latitude: userPosition.lat,
            longitude: userPosition.lng,
          }),
        },
      });
    });

    shouldPanToUserLocation.current = false;
    map.panTo(userPosition);
  }, [
    userLocation.latitude,
    userLocation.longitude,
    userLocation.error,
    userLocation.loading,
    map,
    geocoder,
  ]);

  useEffect(() => {
    if (!autocomplete || !map) return;

    const autocompleteListener = autocomplete.addListener(
      "place_changed",
      () => {
        const selectedPlace = autocomplete.getPlace();
        if (!selectedPlace?.geometry?.location) return;

        map.panTo(selectedPlace.geometry.location);
        setSelectedLocation({
          coordinates: {
            latitude: selectedPlace.geometry.location.lat(),
            longitude: selectedPlace.geometry.location.lng(),
          },
          google: {
            id: selectedPlace.place_id!,
            address: selectedPlace.formatted_address,
            name: selectedPlace.name,
            url: selectedPlace.url,
          },
        });
        autocompleteInputRef.current!.value = "";
        autocomplete.set("place", undefined);
      }
    );

    const centerChangeListener = map.addListener("center_changed", () => {
      const mapCenter = map.getCenter();
      if (!mapCenter) return;

      autocomplete.setBounds(map.getBounds());
    });

    return () => {
      autocompleteListener.remove();
      centerChangeListener.remove();
    };
  }, [autocomplete, map]);

  const handleMapClick = useCallback(
    async (e: MapMouseEvent) => {
      e.stop();

      if (!e.detail.placeId || !placesService) {
        const pos = e.detail.latLng!;
        geocoder!.geocode({ location: pos }).then((response) => {
          const firstResult = response.results[0];
          console.log(firstResult);

          setSelectedLocation({
            coordinates: {
              latitude: pos.lat,
              longitude: pos.lng,
            },
            google: {
              address: firstResult.formatted_address,
              id: null,
              name: firstResult.formatted_address,
              url: buildGoogleUrl({ latitude: pos.lat, longitude: pos.lng }),
            },
          });
        });
        return;
      }

      const placeLocation = await fetchPlaceLocation(e.detail.placeId);
      setSelectedLocation(placeLocation);
    },
    [placesService, geocoder]
  );

  const submitLocation = () => {
    location.value=(selectedLocation);
    isMapOpen.value=false
  };

  const fetchPlaceLocation = useCallback(
    (placeId: string): Promise<GeoLocation> => {
      if (!placesService) {
        return Promise.resolve(selectedLocation);
      }

      return new Promise((resolve) => {
        const request: google.maps.places.PlaceDetailsRequest = {
          placeId,
          fields: ["name", "url", "geometry", "formatted_address"],
        };

        placesService.getDetails(request, (placeResult, placeServiceStatus) => {
          if (
            !placeResult?.geometry?.location ||
            placeServiceStatus !== google.maps.places.PlacesServiceStatus.OK
          ) {
            return resolve(selectedLocation);
          }

          resolve({
            coordinates: {
              latitude: placeResult.geometry.location.lat(),
              longitude: placeResult.geometry.location.lng(),
            },
            google: {
              id: placeId,
              address: placeResult.formatted_address,
              name: placeResult.name,
              url: placeResult.url,
            },
          });
        });
      });
    },
    [placesService, selectedLocation]
  );

  return (
    <StyledPlacePicker >
      <div className="map-container">
        <div className="searchAndClose">
          <input
            ref={autocompleteInputRef}
            placeholder="Search for a location"
            className="searchBar"
          />
          <IoClose
            className="closeButton"
            onClick={() => isMapOpen.value=false}
          />
        </div>

        <Map
          className="map"
          mapId={mapId}
          defaultCenter={{
            lat: selectedLocation.coordinates.latitude,
            lng: selectedLocation.coordinates.longitude,
          }}
          defaultZoom={defaultZoom}
          renderingType="VECTOR"
          onClick={handleMapClick}
          gestureHandling="greedy"
          disableDefaultUI
          keyboardShortcuts={false}
        >
          <AdvancedMarker
            position={{
              lat: selectedLocation.coordinates.latitude,
              lng: selectedLocation.coordinates.longitude,
            }}
          >
            <Pin
              background={"#FFEE34"}
              borderColor={"#1f234e"}
              glyphColor={"#1f234e"}
              scale={1.2}
            />
          </AdvancedMarker>
        </Map>
      </div>
      <div className="position-name-container">
        <a href={selectedLocation.google?.url}>
          <Button className="view-in-maps-button">
            <SiGooglemaps className="pin"/>
          </Button>
        </a>
        {selectedLocation.google?.name && (
          <div className="place-name">{selectedLocation.google?.name}</div>
        )}
        {!selectedLocation.google?.name && (
          <div className="coordinates">
            <div className="coord">{selectedLocation.coordinates.latitude}</div>
            <div className="coord">
              {selectedLocation.coordinates.longitude}
            </div>
          </div>
        )}
      </div>
      <div className="buttons-container">
        <MyButton fontSize="16" onClick={submitLocation}>
          Select
        </MyButton>
      </div>
    </StyledPlacePicker>
  );
};

export default PlacePicker;
