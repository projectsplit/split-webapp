import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledMapsInfoBox } from './MapsInfoBox.styled';
import { AdvancedMarker, APIProvider, Map, Pin, } from '@vis.gl/react-google-maps';
import InfoBox from '../InfoBox/InfoBox';
import config from '../../../config';
import { MdLocationOn, MdOutlineLocationOff } from 'react-icons/md';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
export default function MapsInfoBox({ location, googleMapsUrl, }) {
    const mapId = `${config.googleMapId}`;
    const defaultZoom = 14;
    const [hide, setHide] = useState(true);
    return (_jsx(APIProvider, { apiKey: config.googleMapsApiKey, children: _jsx(StyledMapsInfoBox, { children: location ? (_jsxs(InfoBox, { children: [_jsxs("div", { className: "topStripe", children: [_jsxs("div", { className: "locationAndPin", children: [_jsx(MdLocationOn, { className: "locationIcon" }), _jsxs("a", { href: googleMapsUrl, target: "_blank", rel: "noopener noreferrer", children: [_jsx("div", { className: "locationName", children: location.google?.name }), ' '] })] }), !hide ? _jsx("div", {}) : null, _jsx("div", { className: "hideDetalailsButton", onClick: () => setHide((hide) => !hide), children: hide ? _jsx(IoIosArrowDown, {}) : _jsx(IoIosArrowUp, {}) })] }), ' ', !hide && (_jsx(Map, { className: "map", mapId: mapId, defaultCenter: {
                            lat: location.coordinates.latitude,
                            lng: location.coordinates.longitude,
                        }, defaultZoom: defaultZoom, renderingType: "VECTOR", 
                        // onClick={handleMapClick}
                        gestureHandling: "greedy", disableDefaultUI: true, keyboardShortcuts: false, children: _jsx(AdvancedMarker, { position: {
                                lat: location.coordinates.latitude,
                                lng: location.coordinates.longitude,
                            }, children: _jsx(Pin, { background: '#FFEE34', borderColor: '#1f234e', glyphColor: '#1f234e', scale: 1.2 }) }) }))] })) : (_jsxs("div", { className: "noLocation", children: [_jsx(MdOutlineLocationOff, { className: "locationIcon" }), _jsx("span", { className: "noMapInfo", children: "No location set" }), _jsx("div", {})] })) }) }));
}
