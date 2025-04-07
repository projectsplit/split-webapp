import React from "react";
import { StyledRenameGroupMenu } from "./RenameGroupMenu.styled";
import { RenameGroupMenuProps } from "../../../interfaces";
import MyButton from "../../MyButton/MyButton";
import Separator from "../../Separator/Separator";
import IonIcon from "@reacticons/ionicons";
import { MdEdit } from "react-icons/md";

export default function RenameGroupMenu({
  menu,
  groupId,
  groupName
}: RenameGroupMenuProps) {
  const isPending = false;

  const handleSubmitNewGroupName = () => {
    console.log("name changed");
  };

  return (
    <StyledRenameGroupMenu>
      {" "}
      <div className="headerSeparator">
        <div className="header">
          <MdEdit className="infoLogo" />

          <span>{groupName}</span>
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
    </StyledRenameGroupMenu>
  );
}
