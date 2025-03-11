import { Logo, StyledWelcomeHeader } from "./WelcomeHeader.styled";
import logo from "../../../styles/logo/logo2.png";

export default function WelcomeHeader() {
  return (
    <StyledWelcomeHeader>
      <div className="appName">
          <Logo src={logo} alt="Company Logo" />
          <strong className="uqs">uqs</strong>
      </div>
    </StyledWelcomeHeader>
  );
}
