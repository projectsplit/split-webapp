import IonIcon from "@reacticons/ionicons";
import { GeneralWarningMenuProps } from "../../../interfaces";
import Separator from "../../Separator/Separator";
import MyButton from "../../MyButton/MyButton";
import { StyledGeneralWarningMenu } from "./GeneralWarningMenu.styled";


export default function GeneralWarningMenu({
  menu,
  message,
}: GeneralWarningMenuProps) {
  return (
    <StyledGeneralWarningMenu>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="warning-outline" className="infoLogo" />
          <span>Warning</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      <div className="info">
        {message}
      </div>
      <div className="confirmButton">
        <MyButton onClick={() => (menu.value = null)} fontSize="16">
          Confirm
        </MyButton>
      </div>
    </StyledGeneralWarningMenu>
  );
}
