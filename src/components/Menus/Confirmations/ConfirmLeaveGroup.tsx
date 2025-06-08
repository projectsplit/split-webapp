import { useNavigate } from "react-router-dom";
import { ConfirmLeaveGroupProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useSignal } from "@preact/signals-react";
import { useLeaveGroup } from "../../../api/services/useLeaveGroup";
import { useMostRecentGroup } from "../../../api/services/useMostRecentGroup";

export default function ConfirmLeaveGroup({
  menu,
  groupId,
  openGroupOptionsMenu,
}: ConfirmLeaveGroupProps) {
  const groupError = useSignal<string>("");
  const noMemberError = useSignal<string>("");
  const navigate = useNavigate();
  const { mutate: leaveGroupMutation, isPending } = useLeaveGroup(
    menu,
    groupId,
    groupError,
    navigate,
    openGroupOptionsMenu
  );

 useMostRecentGroup();

  const handleConfirm = () => {
    if (groupError.value === "") {
      leaveGroupMutation();
    } else {
      openGroupOptionsMenu.value = false;
    }
  };

  return (
    <Confirmation
      menu={menu}
      isLoading={isPending}
      onClick={handleConfirm}
      header={groupError.value === "" ? "Confirmation" : "Info"}
    >
      <div className="leaveGroupText">
        {groupError.value === "" && noMemberError.value === "" ? (
          <span>
            Are you sure you want to leave this group?{" "}
            <span style={{ fontSize: "20px" }}>🤔</span>
          </span>
        ) : groupError.value !== "" ? (
          <span>{groupError.value}</span>
        ) : (
          <span>Something went wrong. Please try again.</span>
        )}
      </div>
    </Confirmation>
  );
}
