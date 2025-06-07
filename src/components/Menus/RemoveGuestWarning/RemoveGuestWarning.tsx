import IonIcon from "@reacticons/ionicons";
import { RemoveGuestWarningProps } from "../../../interfaces";
import Separator from "../../Separator/Separator";
import { StyledRemoveGuestWarning } from "./RemoveGuestWarning.styled";

export default function RemoveGuestWarning({ menu }: RemoveGuestWarningProps) {
  return (
    <StyledRemoveGuestWarning>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <span>Info</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      <div className="info">
        <div className="info">
          This guest cannot be removed because they are involved in expenses or
          transfers. Removing them will disrupt the group's
          financial history.
          <div />
        </div>
      </div>
    </StyledRemoveGuestWarning>
  );
}
