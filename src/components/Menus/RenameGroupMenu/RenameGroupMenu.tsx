import React, { useState } from "react";
import { StyledRenameGroupMenu } from "./RenameGroupMenu.styled";
import { RenameGroupMenuProps } from "../../../interfaces";
import MyButton from "../../MyButton/MyButton";
import Separator from "../../Separator/Separator";
import IonIcon from "@reacticons/ionicons";
import { MdEdit } from "react-icons/md";
import { useUpdateGroupName } from "../../../api/services/useUpdateGroupName";
import { useSignal } from "@preact/signals-react";

export default function RenameGroupMenu({
  menu,
  groupId,
  groupName,
}: RenameGroupMenuProps) {
  const changeNameError = useSignal<string>("");
  const [newGroupName, setNewGroupName] = useState(groupName || "");

  const { mutate: updategroupName, isPending } = useUpdateGroupName(
    groupId,
    changeNameError,
    menu
  );
  const handleSubmitNewGroupName = () => {
    updategroupName(newGroupName);
  };

  return (
    <StyledRenameGroupMenu>
      {changeNameError.value !== "" ? (
        <div className="errorWrapper">
          <div className="errorMessage">
            <div className="closeButton" onClick={() => (menu.value = null)}>
              <IonIcon name="close-outline" className="close" />
            </div>
            <span className="exclamation">❗</span>
            <span>
              Something went wrong. Either the group doesn't exist anymore or
              your connection is unstable. Please refresh your browser/app and
              try again.
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="headerSeparator">
            <div className="header">
              <MdEdit className="infoLogo" />

              <input
                className="input"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                autoFocus={true}
              />
              <div className="closeButton" onClick={() => (menu.value = null)}>
                <IonIcon name="close-outline" className="close" />
              </div>
            </div>
            <div className="separator">
              <Separator />
            </div>
          </div>
          <div className="buttons">
            <MyButton isLoading={isPending} onClick={handleSubmitNewGroupName}>
              Confirm
            </MyButton>
            <MyButton variant="secondary" onClick={() => (menu.value = null)}>
              Cancel
            </MyButton>
          </div>
        </>
      )}
    </StyledRenameGroupMenu>
  );
}
