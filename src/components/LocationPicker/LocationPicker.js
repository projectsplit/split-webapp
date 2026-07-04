import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { APIProvider } from '@vis.gl/react-google-maps';
import config from '../../config';
import { StyledLocationPicker } from './LocationPicker.styled';
import PlacePicker from '../PlacePicker/PlacePicker';
import { MdLocationOn } from 'react-icons/md';
const LocationPicker = ({ location, isMapOpen, timeZoneCoordinates, setLocation, isCreateExpense, setDescriptionError, }) => {
    return (_jsx(APIProvider, { apiKey: config.googleMapsApiKey, children: _jsxs(StyledLocationPicker, { location: location, children: [isMapOpen.value && (_jsx(PlacePicker, { location: location, isMapOpen: isMapOpen, defaultCoordinates: timeZoneCoordinates, setLocation: setLocation, isCreateExpense: isCreateExpense, setDescriptionError: setDescriptionError })), _jsx("div", { className: "main", children: _jsx(MdLocationOn, { className: "locationIcon", onClick: () => (isMapOpen.value = !isMapOpen.value) }) })] }) }));
};
export default LocationPicker;
