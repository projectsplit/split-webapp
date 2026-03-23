import { StyledManageBudgetMenu } from './ManageBudgetMenu.styled';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { ManageBudgetMenuProps } from '../../../interfaces';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../components/MyButton/MyButton';

export default function ManageBudgetMenu({ menu, selectedBudget }: ManageBudgetMenuProps) {
  const navigate = useNavigate();
  return (
    <StyledManageBudgetMenu>
      <div className="header">
        {' '}
        <strong>Manage Budget</strong>
      </div>

      <MyButton 
        onClick={() => {
          navigate('/budget/create', { state: { editBudget: selectedBudget } });
          menu.value = null;
        }} 
        fontSize="16"
      >
        <div className="iconAndTextContainer">
          <AiFillEdit className="icon" />
          <div className="text">Edit Budget</div>
        </div>
      </MyButton>

      <MyButton
        fontSize="16"
        onClick={() => (menu.value = 'deleteBudgetConfirmation')}
      >
        <div className="iconAndTextContainer">
          <AiFillDelete className="icon" />
          <div className="text">Delete Budget</div>
        </div>
      </MyButton>
    </StyledManageBudgetMenu>
  );
}
