import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import Separator from '../../Separator/Separator';
import { StyledRemoveGuestWarning } from './ParticipantsPayersErrorMenu.styled';
export default function ParticipantsPayersErrorMenu({ menu, error, }) {
    return (_jsxs(StyledRemoveGuestWarning, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx(IonIcon, { name: "warning-outline", className: "infoLogo" }), _jsx("span", { children: "Hmm... \uD83E\uDD14" }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsxs("div", { className: "info", children: [error, _jsx("div", {})] })] }));
}
