import { StyledGroupQuickActionsMenu } from "./GroupQuickActionsMenu.styled";
import { GroupQuickActionsMenuprops } from "../../interfaces";
import { BiTransfer } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";

import { CiReceipt } from "react-icons/ci";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import routes from "../../routes";

export default function GroupQuickActionsMenu({
  menu,
}: GroupQuickActionsMenuprops) {
  const navigate = useNavigate()
  
  const { groupid } = useParams<{ groupid: string }>();
  const params = useParams();
  console.log(params)
  
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
        <div className="new" onClick={() => navigate(generatePath(routes.GROUP_INVITE, { groupid: groupid }))}>
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
