import QRscanner from "../../../components/QRscanner/QRscanner";
import UserOptionsButton from "../../../components/UserOptionsButton/UserOptionsButton";
import { StyledLogoStripe } from "./LogoStripe.styled";

export default function LogoStripe() {
  return (
    <StyledLogoStripe>
      <div className="mainContainer">
        <div className="logo">α</div>
        <div className="QRandUserOptions">
          <QRscanner />
          <UserOptionsButton>{"sessionData.userNickname"}</UserOptionsButton>
        </div>
      </div>
    </StyledLogoStripe>
  );
}
