import IonIcon from "@reacticons/ionicons";
import { ErrorMenuProps } from "../../../interfaces";
import { StyledErrorMenu } from "./ErrorMenu.styled";
import Separator from "../../Separator/Separator";

export default function ErrorMenu({ menu, children }: ErrorMenuProps) {
  return (
    <StyledErrorMenu>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <span>Error</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      <div className="info">
        Expense not found. Possibly already deleted by another user.
      </div>
    </StyledErrorMenu>
  );
}
