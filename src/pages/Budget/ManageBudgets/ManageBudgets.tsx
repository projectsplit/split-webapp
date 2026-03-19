import MyButton from '@/components/MyButton/MyButton';
import { StyledManageBudgets } from './ManageBudgets.styled';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { useTheme } from 'styled-components';

import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';

export const ManageBudgets = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: querydata, isFetching } = useBudgetInfo();
console.log(querydata)
  return (
    <StyledManageBudgets>
      <TopBarWithBackButton
        header="Manage Budgets"
        onClick={() => {
          navigate(`/budget/actions`);
        }}
      />
      <div className="spentInfo">
        <ProgressBar data={querydata} />
        {BudgetInfoMessage(theme, false, querydata)}
      </div>
      <div className="submitButton">
        <MyButton fontSize="16" onClick={() => {}} isLoading={false}>
          Done
        </MyButton>
      </div>
    </StyledManageBudgets>
  );
};
