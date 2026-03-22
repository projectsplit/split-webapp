import MyButton from '@/components/MyButton/MyButton';
import { StyledManageBudgets } from './ManageBudgets.styled';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { useTheme } from 'styled-components';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import { InactiveBudget } from '../InactiveBudget/InactiveBudget';
import { useState } from 'react';
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import useGetInactiveBudgetInfo from '@/api/auth/QueryHooks/useGetInactiveBudgetInfo';
import Spinner from '@/components/Spinner/Spinner';

export const ManageBudgets = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  const { data: activeBudgetData, isFetching: activeBudgetsIsFetching } =
    useBudgetInfo();
  const { data: inactiveBudgetsData, isFetching: inactiveBudgetsIsFetching } =
    useGetInactiveBudgetInfo();

  const [activeToggleIsOn, setActiveToggleIsOn] = useState(true);
  const [lastActiveId, setLastActiveId] = useState(activeBudgetData?.id);

  if (activeBudgetData?.id) {
    if (activeBudgetData.id !== lastActiveId) {
      setLastActiveId(activeBudgetData.id);
      setActiveToggleIsOn(true);
    }
  } else if (lastActiveId !== undefined) {
    setLastActiveId(undefined);
  }

  return (
    <StyledManageBudgets>
      <TopBarWithBackButton
        header="Manage Budgets"
        onClick={() => {
          if (location.state?.fromHome) {
            navigate('/');
          } else {
            navigate(`/budget/actions`);
          }
        }}
      />

      <div className="messageContainer">
        {activeBudgetsIsFetching ? (
          <Shimmer height="70px" />
        ) : (
          <div
            style={{
              transition: 'opacity 0.8s ease',
            }}
          >
            {BudgetInfoMessage(theme, false, activeBudgetData)}
          </div>
        )}
      </div>
      <div className="scrollContainer">
        {activeBudgetsIsFetching || inactiveBudgetsIsFetching ? (
          <div className="spinnerContainer">
            <Spinner />
          </div>
        ) : (
          <>
            {activeBudgetData?.id && (
              <div className="activeInfo">
                <ProgressBar
                  data={activeBudgetData}
                  isOn={activeToggleIsOn}
                  setIsOn={setActiveToggleIsOn}
                />
              </div>
            )}
            {inactiveBudgetsData && (
              <div className="inactiveInfo">
                {inactiveBudgetsData?.budgets.map((budget) => (
                  <InactiveBudget
                    key={budget.id}
                    budget={budget}
                    onActivate={() => setActiveToggleIsOn(false)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="submitButton">
        <MyButton fontSize="16" onClick={() => navigate('/')} isLoading={false}>
          Done
        </MyButton>
      </div>
    </StyledManageBudgets>
  );
};
