import { useNavigate } from "react-router-dom";
import { ConfirmLeaveGroupProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useRemoveMemberFromGroup } from "../../../api/services/useRemoveMemberFromGroup";
import { useSignal } from "@preact/signals-react";

export default function ConfirmLeaveGroup({
  menu,
  groupId,
  memberId,
}: ConfirmLeaveGroupProps) {
  const noGroupError = useSignal<string>("");
  const noMemberError = useSignal<string>("");
  const navigate = useNavigate();



  const handleConfirm = () => {
    
  };

  return (
    <Confirmation menu={menu} isLoading={false} onClick={handleConfirm}>
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
