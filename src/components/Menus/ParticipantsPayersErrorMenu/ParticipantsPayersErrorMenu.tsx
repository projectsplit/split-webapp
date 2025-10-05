import IonIcon from "@reacticons/ionicons";
import { ParticipantsPayersErrorMenuProps } from "../../../interfaces";
import Separator from "../../Separator/Separator";
import { StyledRemoveGuestWarning } from "./ParticipantsPayersErrorMenu.styled";

export default function ParticipantsPayersErrorMenu({
  menu,
  error,
}: ParticipantsPayersErrorMenuProps) {
  return (
    <StyledRemoveGuestWarning>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="warning-outline" className="infoLogo" />
          <span>Hmm... 🤔</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
        <div className="info">
          {error}
          <div />
        </div>
     
    </StyledRemoveGuestWarning>
  );
}
