import { IoClose, IoExit, IoPersonRemove } from "react-icons/io5";
import { StyledGroupOptions } from "./GroupOptions.styled";
import { useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import Separator from "../../../components/Separator/Separator";
import MenuAnimationBackground from "../../../components/Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../../../components/Menus/MenuAnimations/CurrencyOptionsAnimation";
import { Currency, UserInfo } from "../../../types";
import { currencyData } from "../../../helpers/openExchangeRates";
import { GroupOptionsProps } from "../../../interfaces";
import { MdEdit } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import ConfirmArchiveGroupAnimation from "../../../components/Menus/MenuAnimations/ConfirmArchiveGroupAnimation";
import ConfirmLeaveGroupAnimation from "../../../components/Menus/MenuAnimations/ConfirmLeaveGroupAnimation";
import RenameGroupAnimationAnimation from "../../../components/Menus/MenuAnimations/RenameGroupAnimation";

export default function GroupOptions({ group }: GroupOptionsProps) {
  const { userInfo,openGroupOptionsMenu } = useOutletContext<{
    openGroupOptionsMenu: Signal<boolean>;
    userInfo: UserInfo;
  }>();

  const groupCurrency = group?.currency|| "";
  const groupName = group?.name;
  const currencyMenu = useSignal<string | null>(null);
  const archiveGroupMenu = useSignal<string | null>(null);
  const leaveGroupMenu = useSignal<string | null>(null);
  const renameMenu = useSignal<string|null>(null);
  const allCurrencies = useSignal<Currency[]>(currencyData);
  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === groupCurrency
  );

  const members = group?.members;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

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
          <div className="title">{groupName}</div>

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

        <div className="option" onClick={() => renameMenu.value="renameGroup"}>
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

        <div
          className="option-leave"
          onClick={() => (leaveGroupMenu.value = "leaveGroup")}
        >
          <IoExit className="icon-exit" />
          <div className="description">Leave Group </div>
        </div>
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <MenuAnimationBackground menu={archiveGroupMenu} />
      <MenuAnimationBackground menu={leaveGroupMenu} />
      <MenuAnimationBackground menu={renameMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={groupCurrency}
      />
      <ConfirmArchiveGroupAnimation menu={archiveGroupMenu} />
      <ConfirmLeaveGroupAnimation menu={leaveGroupMenu} groupId={group?.id} memberId={userMemberId}/>
      <RenameGroupAnimationAnimation menu={renameMenu} groupId={group?.id} groupName={group?.name}/>
    </StyledGroupOptions>
  );
}
