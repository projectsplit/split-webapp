import { CSSTransition } from "react-transition-group";
import { CurrencyOptionsAnimationProps } from "../../../interfaces";
import CurrencyOptions from "../CurrencyOptions/CurrencyOptions";
import "../../../styles/freakflags/freakflags.css";

export default function CurrencyOptionsAnimation({
  currencyMenu,
  clickHandler,
  selectedCurrency,
}: CurrencyOptionsAnimationProps) {
  return (
    <CSSTransition
      in={currencyMenu.value === "currencyOptions"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <CurrencyOptions
        clickHandler={clickHandler}
        selectedCurrency={selectedCurrency}
      />
    </CSSTransition>
  );
}
