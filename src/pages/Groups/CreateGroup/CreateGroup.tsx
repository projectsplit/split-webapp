import React, { useState } from "react";
import { StyledCreateGroup } from "./CreateGroup.styled";
import { IoClose } from "react-icons/io5";
import { CreateGroupProps } from "../../../interfaces";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import Input from "../../../components/Input/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroupFn } from "../../../api/services/api";
import { GroupRequest } from "../../../types";

export default function CreateGroup({ menu }: CreateGroupProps) {
  const [groupName, setGroupName] = useState<string>("");
  const queryClient = useQueryClient();

  const createGroup = useMutation<any, any, GroupRequest>({
    mutationFn: (groupData) => createGroupFn(groupData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["groups", "active"] });
  
    },
  });

  const onClickHandler = ()=>{
    queryClient.invalidateQueries({ queryKey: ["groups", "active"] })
    createGroup.mutate({ name: groupName, currency: "EUR" })
    menu.value = null;
  }

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
        <Input
          placeholder="Group Name"
          backgroundcolor="#2d2d2d"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGroupName(e.target.value)
          }
        />
      </div>
      <div className="submitButton">
        <SubmitButton
          submitbuttonisactive={groupName.trim() === "" ? false : true}
          onClick={onClickHandler}
        >
          Create Group
        </SubmitButton>
      </div>
    </StyledCreateGroup>
  );
}
