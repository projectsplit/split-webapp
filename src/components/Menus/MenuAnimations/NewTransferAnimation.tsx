import { CSSTransition } from "react-transition-group";
import { NewTransferAnimationProps } from "../../../interfaces";
import TransferForm from "../../TransferForm/TransferForm";


export default function NewTransferAnimation({
  group,
  timeZoneId,
  menu,
}: NewTransferAnimationProps) {
  return (
    <CSSTransition in={menu.value === "newTransfer"} timeout={0} unmountOnExit>
      <TransferForm
        group={group}
        timeZoneId={timeZoneId}
        menu={menu}
      />
    </CSSTransition>
  );
}
