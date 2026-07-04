import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledOptionsContainer } from './OptionsContainer.styled';
import IonIcon from '@reacticons/ionicons';
export default function OptionsContainer({ children, onClick, hasOption, optionname, $optionColor, iconfontsize, right, onIconClick, }) {
    return (_jsxs(StyledOptionsContainer, { onClick: onClick, hasOption: hasOption, iconfontsize: iconfontsize, right: right, children: [children, hasOption && (_jsx(IonIcon, { name: optionname, className: "arrow", onClick: onIconClick, style: { color: $optionColor } }))] }));
}
