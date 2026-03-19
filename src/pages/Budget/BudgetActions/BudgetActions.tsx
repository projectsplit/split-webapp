import { StyledBudgetActions } from './BudgetActions.styled';
import { useNavigate } from 'react-router-dom';
import OptionButton from '@/pages/Home/SelectionButton/SelectionButton';
import { IoAddCircle } from 'react-icons/io5';
import { RiEdit2Fill } from 'react-icons/ri';
import { FaCalculator, FaChartPie } from 'react-icons/fa';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';


export const BudgetActions = () => {
  const navigate = useNavigate();


  return (
    <StyledBudgetActions>
      <TopBarWithBackButton
        header="Budget "
        onClick={() => {
          navigate(`/`);
        }}
      />

      <div className="buttons">
        <OptionButton
          onClick={() => navigate('/budget/create')}
          name="Create New Budget"
          description=""
          hasArrow={false}
        >
          <div className="buttonWrapper">
            <FaChartPie className="budgetIcon" />
            <IoAddCircle className="checkIcon" />
          </div>
        </OptionButton>

        <OptionButton
          onClick={() => navigate('/budget/manage')}
          name="Manage Budgets"
          description=""
          hasArrow={false}
        >
          <div className="buttonWrapper">
            <FaCalculator className="budgetIcon" />
            <RiEdit2Fill className="checkIcon" />
          </div>
        </OptionButton>
      </div>
    </StyledBudgetActions>
  );
};
