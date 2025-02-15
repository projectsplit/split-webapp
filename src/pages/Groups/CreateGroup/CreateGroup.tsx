import React, { useState } from "react";
import { StyledCreateGroup } from "./CreateGroup.styled";
import { IoClose } from "react-icons/io5";
import { CreateGroupProps } from "../../../interfaces";

import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import Input from "../../../components/Input/Input";


export default function CreateGroup({ menu }: CreateGroupProps) {
const [groupName, setGroupName] = useState<string>("")

  return (
    <StyledCreateGroup>
      <div className="header">
        <div
          className="closeButtonContainer"
          onClick={() => (menu.value = null)}
        >
          <IoClose className="closeButton" />
        </div>
        <div className="title">Create New Group</div>
        <div className="gap"></div>
      </div>
      <div className="input">
        <Input placeholder="Group Name" backgroundColor="#2d2d2d" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroupName(e.target.value)}/>
      </div>
      <div className="submitButton">
        <SubmitButton
        submitButtonIsActive ={groupName.trim()===""?false:true}
          onClick={(e: React.FormEvent<HTMLButtonElement>) =>
            console.log(groupName)
          }
        >
          Create Group
        </SubmitButton>
      </div>
    </StyledCreateGroup>
  );
}
