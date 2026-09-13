import { StyledActionsMenu } from './ActionsMenu.styled';
import { ActionsMenuprops } from '../../../interfaces';
import { FaReceipt } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { MdGroupAdd } from 'react-icons/md';

export default function ActionsMenu({
  onClickExpense,
  onClickTransfer,
  onClickGroup,
  bottom,
}: ActionsMenuprops) {
  return (
    <StyledActionsMenu $bottom={bottom}>
      <div className="buttons">
        {onClickGroup ? (
          <div className="new" onClick={onClickGroup}>
            <div className="descr">Group</div>
            <div className="wrapper">
              <MdGroupAdd className="symbol" />
            </div>
          </div>
        ) : null}
        <div className="new" onClick={onClickTransfer}>
          <div className="descr">Transfer</div>
          <div className="wrapper">
            <BiTransfer className="symbol" />
          </div>
        </div>
        <div className="new" onClick={onClickExpense}>
          <div className="descr">Expense</div>
          <div className="wrapper">
            <FaReceipt className="symbol" />
          </div>
        </div>
      </div>
    </StyledActionsMenu>
   );
}
