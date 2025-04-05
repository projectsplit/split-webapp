import { StyledConfirmation } from "./Confirmation.styled";
import IonIcon from "@reacticons/ionicons";
import Separator from "../../Separator/Separator";
import MyButton from "../../MyButton/MyButton";
import { ConfirmationProps } from "../../../interfaces";

export default function Confirmation({
  children,
  isLoading,
  onClick,
  menu,
}: ConfirmationProps) {
  return (
    <StyledConfirmation>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <span>Confirmation</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      <div className="info">
        {children}
        <div />
      </div>
      <div className="buttons">
        <MyButton isLoading={isLoading} onClick={onClick}>
          Confirm
        </MyButton>
        <MyButton variant="secondary" onClick={() => (menu.value = null)}>
          Cancel
        </MyButton>
      </div>
    </StyledConfirmation>
  );
}
