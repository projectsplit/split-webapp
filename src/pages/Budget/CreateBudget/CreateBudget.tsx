import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '../../../types';
import '../../../styles/freakflags/freakflags.css';
import { StyledCreateBudget } from './CreateBudget.styled';
import { useSignal } from '@preact/signals-react';
import MyButton from '../../../components/MyButton/MyButton';
import TopBarWithBackButton from '../../../components/TopBarWithBackButton/TopBarWithBackButton';
import CurrencyOptionsAnimation from '../../../components/Animations/CurrencyOptionsAnimation';
import { useCreateBudget } from '../../../api/auth/CommandHooks/useCreateBudget';
import MenuAnimationBackground from '../../../components/Animations/MenuAnimationBackground';
import InfoBoxAnimation from '../../../components/Animations/InfoBoxAnimation';
import CreateBudgetConfirmationAnimation from '../../../components/Animations/BudgetAnimations/CreateBudgetConfirmationAnimation';
import { handleInputChange } from '../../../helpers/handleInputChange';
import { ScopeSelectionMenu } from '@/components/Menus/ScopeSelectionMenu/ScopeSelectionMenu';
import {
  useCreateBudgetActions,
  useCreateBudgetData,
} from './hooks/useCreateBudgetActions';
import { SecondPage } from './SecondPage/SecondPage';
import { BackAndForthAnimation } from '@/components/Animations/BackAndForthAnimation/BackAndForthAnimation';
import { FirstPage } from './FirstPage/FirstPage';
import SpendingCycleInfo from '../SpendingCycleInfo/SpendingCycleInfo';

export default function CreateBudget() {
  const data = useCreateBudgetData();
  const actions = useCreateBudgetActions();
  const menu = useSignal<string | null>(null);
  const scopeMenu = useSignal<string | null>(null);

  const { userInfo, timeZoneId } = useOutletContext<{
    userInfo: UserInfo;
    timeZoneId: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createBudget, isPending } = useCreateBudget(
    navigate,
    data.serverErrors
  );

  useEffect(() => {
    if (userInfo?.currency) {
      actions.setCurrencySymbol(userInfo.currency);
    }
  }, [userInfo]);

  const handleInputChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(
        e,
        data.currencySymbol,
        data.displayedAmount,
        actions.setAmount
      );
      actions.setError('amountError', '');
      actions.setError('showAmountError', false);
    },
    [data.currencySymbol, data.displayedAmount, actions.setAmount]
  );

  const submitBudget = async () => {
    setAnimDirection('none');
    await actions.submitBudget({
      createBudgetMutation: createBudget,
      menu,
      step: data.currentStep,
    });
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    actions.setCurrencySymbol(curr);
    queryClient.invalidateQueries({
      queryKey: ['spending', data.budgetFrequency, curr],
      exact: false,
    });
    queryClient.getQueryData(['spending', data.budgetFrequency, curr]);
    menu.value = null;
  };

  const [animDirection, setAnimDirection] = useState<
    'forward' | 'back' | 'none'
  >('forward');

  const handleNext = () => {
    const { errors } = actions.validateForm(data.currentStep);
    const hasStep1Errors =
      !!errors.amountError ||
      !!errors.spendingCycleError ||
      !!errors.commencementDayError;

    if (!hasStep1Errors) {
      setAnimDirection('forward');
      actions.setStep(2);
    }
  };

  const handleBack = () => {
    setAnimDirection('back');
    actions.setStep(1);
  };

  return (
    <StyledCreateBudget>
      <TopBarWithBackButton
        header="Create Budget"
        onClick={() => {
          if (data.currentStep === 2) {
            handleBack();
          } else {
            navigate(`/`);
          }
        }}
      />
      <BackAndForthAnimation
        firstChild={
          <FirstPage
            data={data}
            actions={actions}
            menu={menu}
            handleInputChangeCallback={handleInputChangeCallback}
            timeZoneId={timeZoneId}
          />
        }
        secondChild={
          <SecondPage data={data} actions={actions} scopeMenu={scopeMenu} />
        }
        currentStep={data.currentStep}
        animDirection={animDirection}
      ></BackAndForthAnimation>
      <div className="submitButton">
        <MyButton
          fontSize="16"
          onClick={data.currentStep === 1 ? handleNext : submitBudget}
          isLoading={isPending}
        >
          {data.currentStep === 1 ? 'Next' : 'Submit Budget'}
        </MyButton>
      </div>

      <MenuAnimationBackground menu={menu} />
      {scopeMenu.value === 'scopeSelector' && (
        <ScopeSelectionMenu
          menu={scopeMenu}
          scopeState={data.scopeState}
          targetGroupIds={data.targetGroupIds}
          allGroupsSelected={data.allGroupsSelected}
        />
      )}
      <CreateBudgetConfirmationAnimation
        menu={menu}
        submitBudget={async () => {
          await submitBudget();
        }}
      />
      <InfoBoxAnimation menu={menu}>
        <SpendingCycleInfo menu={menu} />
      </InfoBoxAnimation>
      <CurrencyOptionsAnimation
        currencyMenu={menu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={data.currencySymbol}
      />
    </StyledCreateBudget>
  );
}
