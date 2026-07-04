import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Slider, ToggleLabel } from './ToggleSwitch.styled';
const ToggleSwitch = ({ isOn, onToggle }) => {
    return (_jsxs(ToggleLabel, { children: [_jsx(Checkbox, { checked: isOn, onChange: onToggle }), _jsx(Slider, {})] }));
};
export default ToggleSwitch;
