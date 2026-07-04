import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePwaInstall } from '../../hooks/usePwaInstall';
import { Overlay, PromptContainer, Header, Title, Description, ButtonGroup, InstallButton, DismissButton, Icon } from './PwaInstallPrompt.styled';
import logo from '../../styles/logo/logoRounded.png';
export const PwaInstallPrompt = () => {
    const { isInstallable, isAppInstalled, promptInstall, clearPrompt } = usePwaInstall();
    if (!isInstallable || isAppInstalled) {
        return null;
    }
    return (_jsx(Overlay, { children: _jsxs(PromptContainer, { children: [_jsxs(Header, { children: [_jsx(Icon, { src: logo, alt: "Buqs Logo" }), _jsxs("div", { children: [_jsx(Title, { children: "Install Buqs App" }), _jsx(Description, { children: "Add to your home screen for a better and faster experience." })] })] }), _jsxs(ButtonGroup, { children: [_jsx(DismissButton, { onClick: clearPrompt, children: "Not Now" }), _jsx(InstallButton, { onClick: promptInstall, children: "Install" })] })] }) }));
};
