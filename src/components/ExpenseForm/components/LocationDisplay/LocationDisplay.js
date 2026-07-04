import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoClose } from 'react-icons/io5';
import { StyledLocationDisplay } from './LocationDisplay.styled';
import { MdLocationOn } from 'react-icons/md';
export const LocationDisplay = ({ location, isMapOpen, setLocation, }) => {
    const locationName = location?.google?.name;
    const locationCoordinates = location?.coordinates;
    const clearLocation = () => {
        setLocation(undefined);
    };
    if (locationName) {
        return (_jsxs(StyledLocationDisplay, { children: [_jsx(MdLocationOn, { className: "locationIcon" }), _jsxs("div", { className: "locationAndClose", onClick: () => (isMapOpen.value = !isMapOpen.value), children: [locationName, _jsx("div", { className: "closeButtonWrapper", children: location !== undefined ? (_jsx(IoClose, { className: "closeButton", onClick: (e) => {
                                    e.stopPropagation();
                                    clearLocation();
                                } })) : null })] })] }));
    }
    if (locationCoordinates) {
        const { latitude, longitude } = locationCoordinates;
        return (_jsxs(StyledLocationDisplay, { children: [_jsx(MdLocationOn, { className: "locationIcon" }), _jsxs("div", { className: "locationAndClose", onClick: () => (isMapOpen.value = !isMapOpen.value), children: [_jsx("div", { className: "coord", children: latitude }), _jsx("div", { className: "coord", children: longitude }), _jsx("div", { className: "closeButtonWrapper", children: location !== undefined ? (_jsx(IoClose, { className: "closeButton", onClick: (e) => {
                                    e.stopPropagation();
                                    clearLocation();
                                } })) : null })] })] }));
    }
};
export default LocationDisplay;
