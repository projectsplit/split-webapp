import IonIcon from "@reacticons/ionicons";
import Separator from "../../Separator/Separator";
import { StyledRemoveWarning } from "./RemoveWarning.styled";
import { RemoveWarningProps } from "../../../interfaces";
import MyButton from "../../MyButton/MyButton";

export default function RemoveWarning({
  header,
  menu,
  message,
  onConfirm,
  isLoading,
  }: RemoveWarningProps) {
  return (
    <StyledRemoveWarning>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <span>{header}</span>
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
          {message}
          <div />
        </div>
      </div>
      {onConfirm  && (
        <div className="buttons">
          <MyButton isLoading={isLoading} onClick={onConfirm}>
            Confirm
          </MyButton>
          <MyButton variant="secondary" onClick={() => (menu.value = null)}>
            Cancel
          </MyButton>
        </div>
      )}
    </StyledRemoveWarning>
  );
}
