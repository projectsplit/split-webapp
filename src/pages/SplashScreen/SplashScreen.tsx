import { Logo, StyledSplashScreen } from "./SplashScreen.styled";
import logo from '../../styles/logo/logo.png'

export default function SplashScreen() {
  return (
    <StyledSplashScreen>
      <Logo src={logo} alt="Company Logo" />
    </StyledSplashScreen>
  );
}