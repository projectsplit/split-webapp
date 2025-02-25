import { useOutletContext } from "react-router-dom";
import QRscanner from "../../../components/QRscanner/QRscanner";
import UserOptionsButton from "../../../components/UserOptionsButton/UserOptionsButton";
import { StyledLogoStripe } from "./LogoStripe.styled";
import { UserInfo } from "../../../types";
import { LogoStripeProps } from "../../../interfaces";

export default function LogoStripe({ menu }: LogoStripeProps) {
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  return (
    <StyledLogoStripe>
      <div className="mainContainer">
        <div className="QRandUserOptions">
          <UserOptionsButton
            username={userInfo?.username}
            onClick={() => (menu.value = "settings")}
          />
          <QRscanner />
        </div>
      </div>
    </StyledLogoStripe>
  );
}
