import { IoClose, IoExit, IoPersonAdd, IoPersonRemove, IoQrCode } from "react-icons/io5";
import { StyledGroupOptions } from "./GroupOptions.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
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
import { useChangeGroupCurrency } from "../../../api/services/useChangeGroupCurrency";
import { useQueryClient } from "@tanstack/react-query";
import RemoveUserFromGroupMenu from "../../../components/Menus/RemoveUserFromGroupMenu/RemoveUserFromGroupMenu";
import { useEffect } from "react";
import AddNewUserAnimation from "../../../components/Menus/MenuAnimations/AddNewUserAnimation";

export default function GroupOptions({ group }: GroupOptionsProps) {
  const navigate = useNavigate();
  const { userInfo, openGroupOptionsMenu } = useOutletContext<{
    openGroupOptionsMenu: Signal<boolean>;
    userInfo: UserInfo;
  }>();
  const queryClient = useQueryClient();
  const refetchQueries = useSignal<boolean>(false);
  const groupCurrency = group?.currency || "";
  const groupName = group?.name;
  const currencyMenu = useSignal<string | null>(null);
  const archiveGroupMenu = useSignal<string | null>(null);
  const leaveGroupMenu = useSignal<string | null>(null);
  const newUserMenu = useSignal<string | null>(null);
  const renameMenu = useSignal<string | null>(null);
  const noGroupFoundError = useSignal<string>("");
  const allCurrencies = useSignal<Currency[]>(currencyData);
  const openRemoveUserMenu = useSignal<boolean>(false);
  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === groupCurrency
  );

  const members = group?.members;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
  const updateGroupCurrency = useChangeGroupCurrency(
    group?.id,
    noGroupFoundError,
    refetchQueries
  );

  const handldeCurrencyOptionsClick = (curr: string) => {
    currencyMenu.value = null;
    updateGroupCurrency.mutate(curr);
  };

  const handleClose = async () => {
    openGroupOptionsMenu.value = false;
    if (refetchQueries.value) {
      try {
        await queryClient.invalidateQueries({
          queryKey: [group?.id],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ["shared"],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ["mostRecentGroup"],
          exact: false,
        });
      } catch (error) {
        console.error("Error refetching queries:", error);
      }
    }
  };

  useEffect(() => {
    const handleBackNavigation = () => {
      if (openGroupOptionsMenu.value) {
        handleClose();
      }
    };
    window.addEventListener("popstate", handleBackNavigation);
    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [openGroupOptionsMenu]);

  return (
    <StyledGroupOptions>
      {" "}
      <div className="headerWrapper">
        <div className="header">
          <div className="gap"></div>
          <div className="title">{groupName}</div>

          <div className="closeButtonContainer" onClick={handleClose}>
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

        <div
          className="option"
          onClick={() => (renameMenu.value = "renameGroup")}
        >
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

        <div
          className="option"
          onClick={() => (newUserMenu.value = "newUser")}
        >
          <IoPersonAdd className="icon" />
          <div className="description">New User </div>
        </div>

        <div
          className="option"
          onClick={() => (openRemoveUserMenu.value = true)}
        >
          <IoPersonRemove className="icon" />
          <div className="description">Remove Member </div>
        </div>

        <div
          className="option"
          onClick={() => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("in", "true");
            navigate(
                `/shared/generatecode/${group?.id}?${searchParams.toString()}`,
              {
                replace: true,
              }
            );
          }}
        >
          <IoQrCode className="icon" />
          <div className="description">Share Group </div>
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
      <MenuAnimationBackground menu={newUserMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={groupCurrency}
      />
      <ConfirmArchiveGroupAnimation
        menu={archiveGroupMenu}
        groupId={group?.id}
        openGroupOptionsMenu={openGroupOptionsMenu}
        navigateToGroups={true}
      />
      <ConfirmLeaveGroupAnimation
        menu={leaveGroupMenu}
        groupId={group?.id}
        memberId={userMemberId}
        openGroupOptionsMenu={openGroupOptionsMenu}
      />
      <RenameGroupAnimationAnimation
        menu={renameMenu}
        groupId={group?.id}
        groupName={group?.name}
      />
      {openRemoveUserMenu.value && (
        <RemoveUserFromGroupMenu
          groupId={group?.id}
          openRemoveUserMenu={openRemoveUserMenu}
          userInfo={userInfo}
        />
      )}
      {group && <AddNewUserAnimation menu={newUserMenu} groupName={groupName} />}
    </StyledGroupOptions>
  );
}
