import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StyledPill } from './Pill.styled';
import { IoClose } from 'react-icons/io5';
export default function Pill({ title, color, closeButton, onClick, onClose, fontSize, $textColor, $border, $closeButtonColor, children, }) {
    return (_jsx(StyledPill, { color: color, fontSize: fontSize, "$textColor": $textColor, "$border": $border, children: _jsxs("div", { className: "titleAndCloseButton", onClick: onClick, children: [_jsxs("div", { className: "childrenAndTitle", children: [_jsx("div", { className: "children", style: { color: $textColor }, children: children }), _jsx("div", { className: "title", children: title })] }), closeButton ? (_jsx("div", { className: "closeSign", onClick: (e) => {
                        e.stopPropagation();
                        if (onClose) {
                            onClose(e);
                        }
                    }, children: _jsx(IoClose, { fontSize: fontSize, color: $closeButtonColor ? $closeButtonColor : 'black' }) })) : (_jsx(_Fragment, {}))] }) }));
}
