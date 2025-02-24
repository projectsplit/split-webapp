import { useOutletContext } from "react-router-dom";
import QRscanner from "../../../components/QRscanner/QRscanner";
import UserOptionsButton from "../../../components/UserOptionsButton/UserOptionsButton";
import { StyledLogoStripe } from "./LogoStripe.styled";
import { UserInfo } from "../../../types";

export default function LogoStripe() {
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  return (
    <StyledLogoStripe>
      <div className="mainContainer">
        <div className="QRandUserOptions">
          <UserOptionsButton username={userInfo?.username} />
          <QRscanner />
        </div>
      </div>
    </StyledLogoStripe>
  );
}
