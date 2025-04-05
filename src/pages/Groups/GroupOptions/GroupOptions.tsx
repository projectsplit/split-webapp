import { IoClose, IoExit, IoPersonRemove } from "react-icons/io5";
import { StyledGroupOptions } from "./GroupOptions.styled";
import { useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import Separator from "../../../components/Separator/Separator";
import MenuAnimationBackground from "../../../components/Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../../../components/Menus/MenuAnimations/CurrencyOptionsAnimation";
import { Currency } from "../../../types";
import { currencyData } from "../../../helpers/openExchangeRates";
import { GroupOptionsProps } from "../../../interfaces";
import { MdEdit } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import ConfirmArchiveGroupAnimation from "../../../components/Menus/MenuAnimations/ConfirmArchiveGroupAnimation";

export default function GroupOptions({ group }: GroupOptionsProps) {
  const { openGroupOptionsMenu } = useOutletContext<{
    openGroupOptionsMenu: Signal<boolean>;
  }>();

  const currencyMenu = useSignal<string | null>(null);
  const archiveGroupMenu = useSignal<string | null>(null);
  const leaveGroupMenu = useSignal<string | null>(null);
  const allCurrencies = useSignal<Currency[]>(currencyData);
  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === group?.currency
  );

  const handldeCurrencyOptionsClick = (curr: string) => {
    //updateGroupCurrency.mutate(curr);
    currencyMenu.value = null;
  };

  return (
    <StyledGroupOptions>
      {" "}
      <div className="headerWrapper">
        <div className="header">
          <div className="gap"></div>
          <div className="title">{group?.name}</div>

          <div
            className="closeButtonContainer"
            onClick={() => (openGroupOptionsMenu.value = false)}
          >
            <IoClose className="closeButton" />
          </div>
        </div>
        <Separator />
      </div>
      <div className="optionsContainer">
        <div
          className="option"
          onClick={() => (currencyMenu.value = "currencyOptions")}
        >
          <div className={selectedCurrency?.flagClass} />
          <div className="description">Group Base Currency</div>
        </div>

        <div className="option" onClick={() => console.log("edit name")}>
          <MdEdit className="icon" />
          <div className="description">Edit Group Name </div>
        </div>

        <div
          className="option"
          onClick={() => (archiveGroupMenu.value = "archiveGroup")}
        >
          <FaArchive className="icon" />
          <div className="description">Archive Group </div>
        </div>

        <div className="option">
          <IoPersonRemove
            className="icon"
            onClick={() => console.log("remove user from group")}
          />
          <div className="description">Remove User </div>
        </div>

        <div className="option-leave">
          <IoExit
            className="icon-exit"
            onClick={() => console.log("leave group")}
          />
          <div className="description">Leave Group </div>
        </div>
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <MenuAnimationBackground menu={archiveGroupMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={group?.currency}
      />
      <ConfirmArchiveGroupAnimation menu={archiveGroupMenu} />
    </StyledGroupOptions>
  );
}
