import { StyledGroupQuickActionsMenu } from "./GroupQuickActionsMenu.styled";
import { GroupQuickActionsMenuprops } from "../../../interfaces";
import { BiTransfer } from "react-icons/bi";

import { CiReceipt } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { FaUser } from "react-icons/fa";

export default function GroupQuickActionsMenu({
  menu,
}: GroupQuickActionsMenuprops) {
  return (
    <StyledGroupQuickActionsMenu>
      <div className="buttons">
        <div className="new" onClick={() => (menu.value = "newExpense")}>
          <div className="wrapper">
            <CiReceipt className="icon" />
            <GoPlusCircle
              className="plus"
              style={{ backgroundColor: "rgb(81, 131, 238)" }}
            />
            <div className="descr">Expense</div>
          </div>
        </div>
        <div className="new" onClick={() => (menu.value = "newTransfer")}>
          <div className="wrapper">
            <BiTransfer className="icon" />
            <GoPlusCircle className="plus" style={{ backgroundColor: "rgb(215, 146, 68)" }}/>
            <div className="descr">Transfer</div>
          </div>
        </div>
        <div className="new" onClick={() => (menu.value = "newUser")}>
          <div className="wrapper">
            <FaUser className="icon" />
            <GoPlusCircle className="plus" style={{ backgroundColor: "rgb(225, 81, 238)" }}/>
            <div className="descr">New User</div>
          </div>
        </div>
      </div>
      {/* <div className="closeButton">
        <SubmitButton backgroundColor="#272A33" color="#a3a3a3" onClick={()=>menu.value=null}>Close</SubmitButton>
      </div> */}
    </StyledGroupQuickActionsMenu>
  );
}
