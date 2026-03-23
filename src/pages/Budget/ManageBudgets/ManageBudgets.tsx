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
import ManageBudgetAnimation from '@/components/Animations/BudgetAnimations/ManageBudgetAnimation';
import { useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import DeleteBudgetConfirmationAnimation from '@/components/Animations/BudgetAnimations/DeleteBudgetConfirmationAnimation';
import { useDeleteBudget } from '@/api/auth/CommandHooks/useDeleteBudget';

export const ManageBudgets = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const menu = useSignal<string | null>(null);

  const { data: activeBudgetData, isFetching: activeBudgetsIsFetching } =
    useBudgetInfo();
  const { data: inactiveBudgetsData, isFetching: inactiveBudgetsIsFetching } =
    useGetInactiveBudgetInfo();
  const errorMessage = useSignal<string>('');
  const {mutate: deleteBudget, isPending} = useDeleteBudget(menu, errorMessage);
  
  const [selectedBudget, setSelectedBudget] = useState<{
    id: string;
    descr: string;
  }>({ id: '', descr: '' });


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
          <div style={{ transition: 'opacity 0.8s ease' }}>
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
              <div
                className="activeInfo"
                onClick={() => {
                  setSelectedBudget({
                    id: activeBudgetData.id,
                    descr: activeBudgetData.description,
                  });
                }}
              >
                <ProgressBar
                  data={activeBudgetData}
                  isOn={activeToggleIsOn}
                  setIsOn={setActiveToggleIsOn}
                  menu={menu}
                />
              </div>
            )}

            {inactiveBudgetsData?.budgets && (
              <>
                {inactiveBudgetsData.budgets.map((budget) => (
                  <div
                    className="inactiveInfo"
                    key={budget.id}
                    onClick={() => {
                      setSelectedBudget({
                        id: budget.id,
                        descr: budget.description,
                      });
                    }}
                  >
                    <InactiveBudget
                      budget={budget}
                      onActivate={() => setActiveToggleIsOn(false)}
                      menu={menu}
                    />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      <div className="submitButton">
        <MyButton fontSize="16" onClick={() => navigate('/')} isLoading={false}>
          Done
        </MyButton>
      </div>

      <MenuAnimationBackground menu={menu} />
      <ManageBudgetAnimation menu={menu} />
      <DeleteBudgetConfirmationAnimation
        menu={menu}
        deleteBudget={deleteBudget}
        selectedBudget={selectedBudget}
        isLoading={isPending}
      />
    </StyledManageBudgets>
  );
};
