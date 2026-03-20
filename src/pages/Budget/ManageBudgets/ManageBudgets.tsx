import MyButton from '@/components/MyButton/MyButton';
import { StyledManageBudgets } from './ManageBudgets.styled';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { useTheme } from 'styled-components';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import useGetInactiveBudgetInfo from '@/api/auth/QueryHooks/useGetInactiveBudgetInfo';
import { InactiveBudget } from '../InactiveBudget/InactiveBudget';

export const ManageBudgets = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: activeBudgetData, isFetching } = useBudgetInfo();
  const { data: inactiveBudgetsData, isFetching: inactiveBudgetsIsFetching } =
    useGetInactiveBudgetInfo();

  return (
    <StyledManageBudgets>
      <TopBarWithBackButton
        header="Manage Budgets"
        onClick={() => {
          navigate(`/budget/actions`);
        }}
      />
      {activeBudgetData && (
        <div className="messageContainer">
          {BudgetInfoMessage(theme, false, activeBudgetData)}
        </div>
      )}
      <div className="scrollContainer">
        {activeBudgetData && (
          <div className="activeInfo">
            <ProgressBar data={activeBudgetData} />
          </div>
        )}
        {inactiveBudgetsData && (
          <div className="inactiveInfo">
            {inactiveBudgetsData?.budgets.map((budget) => (
              <InactiveBudget key={budget.id} budget={budget} />
            ))}
          </div>
        )}
      </div>
      <div className="submitButton">
        <MyButton fontSize="16" onClick={() => navigate("/")} isLoading={false}>
          Done
        </MyButton>
      </div>
    </StyledManageBudgets>
  );
};
