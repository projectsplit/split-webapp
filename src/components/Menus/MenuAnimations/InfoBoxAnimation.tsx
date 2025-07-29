
import { CSSTransition } from "react-transition-group";
import { InfoBoxAnimationProps } from "../../../interfaces";
import SpendingCycleInfo from "../../../pages/Budget/SpendingCycleInfo/SpendingCycleInfo";


export default function InfoBoxAnimation({ menu }: InfoBoxAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "infoBox"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
    >
      <SpendingCycleInfo menu={menu} />
    </CSSTransition>
  );
}
