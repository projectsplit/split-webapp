import { useNavigate } from "react-router-dom";
import { ConfirmLeaveGroupProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useSignal } from "@preact/signals-react";
import { useLeaveGroup } from "../../../api/services/useLeaveGroup";
import { useMostRecentGroup } from "../../../api/services/useMostRecentGroup";

export default function ConfirmLeaveGroup({
  menu,
  groupId,
   openGroupOptionsMenu
}: ConfirmLeaveGroupProps) {
  const noGroupError = useSignal<string>("");
  const noMemberError = useSignal<string>("");
  const navigate = useNavigate();

  const { mutate: leaveGroupMutation, isPending } = useLeaveGroup(
    menu,
    groupId,
    noGroupError,
    navigate
  );

 const updateMostRecentGroupId = useMostRecentGroup();

  const handleConfirm = () => {
    //TODO: mutation to update mostRecentGroupId for user info
   // updateMostRecentGroupId.mutate("")
    leaveGroupMutation();
    openGroupOptionsMenu.value=false
  };

  return (
    <Confirmation menu={menu} isLoading={isPending} onClick={handleConfirm} header={"Confirmation"}>
      <div className="leaveGroupText">
        {noGroupError.value === "" && noMemberError.value === "" ? (
          <span>
            Are you sure you want to leave this group?{" "}
            <span style={{ fontSize: "20px" }}>🤔</span>
          </span>
        ) : noGroupError.value !== "" ? (
          <span>Could not find your group. Please try again.</span>
        ) : (
          <span>Something went wrong. Please try again.</span>
        )}
      </div>
    </Confirmation>
  );
}
