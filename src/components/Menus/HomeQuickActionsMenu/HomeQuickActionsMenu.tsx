import { StyledHomeQuickActionsMenu } from "./HomeQuickActionsMenu.styled";
import { HomeQuickActionsMenuprops } from "../../../interfaces";
import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import { FaReceipt } from "react-icons/fa";

export default function HomeQuickActionsMenu({
  menu,
  isPersonal,
}: HomeQuickActionsMenuprops) {
  return (
    <StyledHomeQuickActionsMenu>
      <div className="buttons">
        <div
          className="new"
          onClick={() => {
            isPersonal.value = false;
            menu.value = "nongroupusers";
          }}
        >
          <div className="descr">Shared expense</div>
          <div className="wrapper">
            <HiOutlineUserGroup className="person" />
            <FaReceipt className="receipt" />
          </div>
        </div>

        <div
          className="new"
          onClick={() => {
            isPersonal.value = true;
            menu.value = "newExpense";
          }}
        >
          <div className="descr">Personal expense</div>
          <div className="wrapper">
            <HiOutlineUser className="person" />
            <FaReceipt className="receipt" />
          </div>
        </div>
      </div>
    </StyledHomeQuickActionsMenu>
  );
}
