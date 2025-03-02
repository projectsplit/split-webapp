import React from "react";
import { StyledGroupQuickActionsMenu } from "./GroupQuickActionsMenu.styled";
import { GroupQuickActionsMenuprops } from "../../interfaces";
import { BsCreditCard2Front } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import SubmitButton from "../SubmitButton/SubmitButton";

import { CiReceipt } from "react-icons/ci";

export default function GroupQuickActionsMenu({
  menu,
}: GroupQuickActionsMenuprops) {
  return (
    <StyledGroupQuickActionsMenu>
      <div className="buttons">
        <div className="new" onClick={() => (menu.value = "newExpense")}>
          <div className="wrapper">
            <CiReceipt className="icon" />
            <div className="descr">New Expense</div>
          </div>
        </div>
        <div className="new" onClick={() => (menu.value = "newTransfer")}>
          <div className="wrapper">
            <BiTransfer className="icon" />
            <div className="descr">New Transfer</div>
          </div>
        </div>
        <div className="new" onClick={() => (menu.value = "newUser")}>
          <div className="wrapper">
            <IoPersonAddOutline className="icon" />
            <div className="descr">Add New User</div>
          </div>
        </div>
      </div>
      {/* <div className="closeButton">
        <SubmitButton backgroundColor="#272A33" color="#a3a3a3" onClick={()=>menu.value=null}>Close</SubmitButton>
      </div> */}
    </StyledGroupQuickActionsMenu>
  );
}
