import { StyledHomeQuickActionsMenu } from "./HomeQuickActionsMenu.styled";
import { HomeQuickActionsMenuprops } from "../../../interfaces";
import { FaReceipt } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";

export default function HomeQuickActionsMenu({
  quickActionsMenu,
  isNonGroupExpense,
  nonGroupTransferMenu,
  userInfo
}: HomeQuickActionsMenuprops) {

  return (
    <StyledHomeQuickActionsMenu>
      <div className="buttons">
        <div
          className="new"
          onClick={() => {
            quickActionsMenu.value = "newTransfer";
            nonGroupTransferMenu.value = {
              attribute: "", 
              menu: null, 
              senderId: userInfo.userId, 
              senderName: "You",
              receiverId: "",
              receiverName: "",
            };
          }}
        >
          <div className="descr">Transfer</div>
          <div className="wrapper">
            <BiTransfer className="symbol" />
          </div>
        </div>
        <div
          className="new"
          onClick={() => {
            quickActionsMenu.value = "newExpense";
            isNonGroupExpense.value = true;
          }}
        >
          <div className="descr">Expense</div>
          <div className="wrapper">
            <FaReceipt className="symbol" />
          </div>
        </div>
      </div>
    </StyledHomeQuickActionsMenu>
  );
}
