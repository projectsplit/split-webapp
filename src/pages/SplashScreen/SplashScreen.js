import { jsx as _jsx } from "react/jsx-runtime";
import { Logo, StyledSplashScreen } from './SplashScreen.styled';
import logo from '../../styles/logo/logoRounded.png';
export default function SplashScreen() {
    return (_jsx(StyledSplashScreen, { children: _jsx(Logo, { src: logo, alt: "B" }) }));
}
