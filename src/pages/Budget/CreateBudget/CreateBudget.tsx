import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  UserInfo,
} from '../../../types';
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
import MakeBudgetActiveMenuAnimation from '@/components/Animations/MakeBudgetActiveMenuAnimation';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import useGetInactiveBudgetInfo from '@/api/auth/QueryHooks/useGetInactiveBudgetInfo';
import { useEditBudget } from '@/api/auth/CommandHooks/useEditBudget';

export default function CreateBudget() {
  const data = useCreateBudgetData();
  const actions = useCreateBudgetActions();
  const menu = useSignal<string | null>(null);
  const makeBudgetActiveMenu = useSignal<string | null>(null);
  const scopeMenu = useSignal<string | null>(null);

  const { userInfo, timeZoneId } = useOutletContext<{
    userInfo: UserInfo;
    timeZoneId: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: activeBudgetData } = useBudgetInfo();
  const { data: inactiveBudgetsData } = useGetInactiveBudgetInfo();

  const { mutateAsync: createBudget, isPending: isCreatePending } = useCreateBudget(
    navigate,
    data.serverErrors,
    menu,
  );

  const { mutateAsync: updateBudget, isPending: isUpdatePending } = useEditBudget(
    navigate,
    data.serverErrors,
    menu,
  );

  const isPending = isCreatePending || isUpdatePending;
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editBudget && (!data.isEditMode || location.state.editBudget.id !== data.budgetId)) {
      actions.populateForm(location.state.editBudget, userInfo?.currency || '');
    } else if (!location.state?.editBudget && data.isEditMode) {
      actions.initForm(userInfo?.currency || '');
    } else if (!location.state?.editBudget && userInfo?.currency && !data.currencySymbol) {
      actions.setCurrencySymbol(userInfo.currency);
    }
  }, [location.state, userInfo, data.isEditMode, data.currencySymbol, data.budgetId]);

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
    if (
      !data.isEditMode &&
      (!!activeBudgetData ||
        (!!inactiveBudgetsData && inactiveBudgetsData?.budgets.length > 0))
    ) {
      makeBudgetActiveMenu.value = 'makeBudgetActive';
      return;
    }
    setAnimDirection('none');
    await actions.submitBudget({
      createBudgetMutation: createBudget,
      updateBudgetMutation: updateBudget,
      menu,
      step: data.currentStep,
      activate: !data.isEditMode ? true : undefined,
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
        header={data.isEditMode ? "Edit Budget" : "Create Budget"}
        onClick={() => {
          if (data.currentStep === 2) {
            handleBack();
          } else {
            actions.resetForm();
            if (data.isEditMode) {
              navigate('/budget/manage');
            } else {
              navigate('/budget/actions');
            }
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
          {data.currentStep === 1 ? 'Next' : data.isEditMode ? 'Update Budget' : 'Submit Budget'}
        </MyButton>
      </div>

      <MenuAnimationBackground menu={menu} />
      <MenuAnimationBackground menu={makeBudgetActiveMenu} />
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
      <MakeBudgetActiveMenuAnimation
        menu={makeBudgetActiveMenu}
        hasActiveBudgetData={!!activeBudgetData}
        hasInactiveBudgetData={
          !!inactiveBudgetsData && inactiveBudgetsData.budgets.length > 0
        }
        onConfirm={(activate: boolean) => {
          actions.submitBudget({
            createBudgetMutation: createBudget,
            updateBudgetMutation: updateBudget,
            menu: makeBudgetActiveMenu,
            step: data.currentStep,
            activate,
          });
        }}
      />
      <CurrencyOptionsAnimation
        currencyMenu={menu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={data.currencySymbol}
      />
    </StyledCreateBudget>
  );
}
