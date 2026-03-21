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
import { useState } from 'react';
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';

export const ManageBudgets = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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
          navigate(`/budget/actions`);
        }}
      />

      <div className="messageContainer">
        {activeBudgetsIsFetching ? (
          <Shimmer height="62px" />
        ) : (
          <div
            style={{
              opacity: activeBudgetsIsFetching ? 0.6 : 1,
              transition: 'opacity 0.3s ease',
              pointerEvents: activeBudgetsIsFetching ? 'none' : 'auto',
            }}
          >
            {BudgetInfoMessage(theme, false, activeBudgetData)}
          </div>
        )}
      </div>
      <div className="scrollContainer">
        {activeBudgetsIsFetching && !activeBudgetData ? (
          <Shimmer height="173px" />
        ) : (
          activeBudgetData?.id && (
            <div
              className="activeInfo"
              style={{
                opacity: activeBudgetsIsFetching ? 0.6 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <ProgressBar
                data={activeBudgetData}
                isOn={activeToggleIsOn}
                setIsOn={setActiveToggleIsOn}
              />
            </div>
          )
        )}
        {inactiveBudgetsIsFetching && !inactiveBudgetsData ? (
          <div className="inactiveInfo">
            <Shimmer height="100px" />
            <Shimmer height="100px" />
          </div>
        ) : (
          inactiveBudgetsData && (
            <div
              className="inactiveInfo"
              style={{
                opacity: inactiveBudgetsIsFetching ? 0.6 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              {inactiveBudgetsData?.budgets.map((budget) => (
                <InactiveBudget
                  key={budget.id}
                  budget={budget}
                  onActivate={() => setActiveToggleIsOn(false)}
                />
              ))}
            </div>
          )
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
