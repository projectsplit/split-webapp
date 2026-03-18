import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Frequency, SpendingInfoResponse, UserInfo } from '../../../types';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import '../../../styles/freakflags/freakflags.css';
import { StyledCreateBudget } from './CreateBudget.styled';
import SetUpSpendingGoal from './SetUpSpendingGoal/SetUpSpendingGoal';
import SpendingCycle from './SpendingCycle/SpendingCycle';
import { useSignal } from '@preact/signals-react';
import MyButton from '../../../components/MyButton/MyButton';
import TopBarWithBackButton from '../../../components/TopBarWithBackButton/TopBarWithBackButton';
import CurrencyOptionsAnimation from '../../../components/Animations/CurrencyOptionsAnimation';
import { useCreateBudget } from '../../../api/auth/CommandHooks/useCreateBudget';
import { useSpendingInfo } from '../../../api/auth/QueryHooks/useSpengindInfo';
import MenuAnimationBackground from '../../../components/Animations/MenuAnimationBackground';
import InfoBoxAnimation from '../../../components/Animations/InfoBoxAnimation';
import CreateBudgetConfirmationAnimation from '../../../components/Animations/BudgetAnimations/CreateBudgetConfirmationAnimation';
import { handleInputChange } from '../../../helpers/handleInputChange';
import { ScopeSelector } from './ScopeSelector/ScopeSelector';
import { ScopeSelectionMenu } from '@/components/Menus/ScopeSelectionMenu/ScopeSelectionMenu';
import {
  useCreateBudgetActions,
  useCreateBudgetData,
} from './hooks/useCreateBudgetActions';
import FormInput from '@/components/FormInput/FormInput';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ANIMATION_DURATION = 300;

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
  const spendingInfoQueryKey = [
    'spending',
    data.budgetFrequency.value,
    data.currencySymbol,
  ];

  const { mutateAsync: createBudget, isPending } = useCreateBudget(
    navigate,
    data.serverErrors
  );

  useEffect(() => {
    if (userInfo?.currency) {
      actions.setCurrencySymbol(userInfo.currency);
    }
  }, [userInfo]);

  // const { data, isFetching, isStale } = useSpendingInfo(
  //   budgetFrequency.value,
  //   currencySymbol
  // );

  const info = {
    budgetSubmitted: false,
    totalAmountSpent: '0',
    currency: 'USD',
  };
  const isFetching = false;
  const isStale = false;

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

  const querydata = queryClient.getQueryData(
    spendingInfoQueryKey
  ) as SpendingInfoResponse;

  const handleBackButtonClick = () => {
    if (info && info.budgetSubmitted) {
      navigate(`/budget/current`);
    } else {
      navigate(`/`);
    }
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    //setCurrency(currency);
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
    // Only care about Step 1 errors: amount and spending cycle
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
            handleBackButtonClick();
          }
        }}
      />

      <TransitionGroup
        component="div"
        className="transition-group"
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames:
              animDirection === 'forward'
                ? 'fade'
                : animDirection === 'back'
                  ? 'fade-back'
                  : 'none',
            enter: animDirection !== 'none',
            exit: animDirection !== 'none',
          })
        }
      >
        <CSSTransition
          key={data.currentStep}
          timeout={animDirection === 'none' ? 0 : ANIMATION_DURATION}
          classNames={
            animDirection === 'forward'
              ? 'fade'
              : animDirection === 'back'
                ? 'fade-back'
                : 'none'
          }
          enter={animDirection !== 'none'}
          exit={animDirection !== 'none'}
          unmountOnExit
        >
          <div className="step-container">
            {data.currentStep === 1 ? (
              <>
                <div className="errorsWrapper">
                  <SetUpSpendingGoal
                    menu={menu}
                    displayedAmount={data.displayedAmount}
                    currency={data.currencySymbol}
                    onChange={handleInputChangeCallback}
                    $inputError={
                      data.errors.showAmountError && !!data.errors.amountError
                    }
                  />
                  <span className="errorMsg">
                    {data.errors.showAmountError && data.errors.amountError
                      ? data.errors.amountError
                      : ''}
                  </span>
                </div>

                <div className="errorsWrapper">
                  <SpendingCycle
                    submitBudgetErrors={data.serverErrors}
                    calendarDay={data.calendarDay}
                    budgetFrequency={data.budgetFrequency}
                    menu={menu}
                    isStale={isStale}
                    openCalendar={data.openCalendar}
                    openCustomDateCalendar={data.openCustomDateCalendar}
                    hasSwitchedBudgetType={data.hasSwitchedBudgetType}
                    timeZoneId={timeZoneId}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    pickingTarget={data.pickingTarget}
                    setError={actions.setError}
                    $inputError={
                      (data.errors.showSpendingCycleError &&
                        !!data.errors.spendingCycleError) ||
                      (data.errors.showCommencementDayError &&
                        !!data.errors.commencementDayError)
                    }
                  />
                  <span className="errorMsg">
                    {data.errors.showSpendingCycleError &&
                    data.errors.spendingCycleError
                      ? data.errors.spendingCycleError
                      : ''}
                    {data.errors.showCommencementDayError &&
                    data.errors.commencementDayError
                      ? data.errors.commencementDayError
                      : ''}
                  </span>
                </div>

                {isFetching ? (
                  <></>
                ) : (
                  querydata && (
                    <div className="spentInfo">
                      <div>
                        You have spent{' '}
                        {displayCurrencyAndAmount(
                          info?.totalAmountSpent,
                          querydata?.currency
                        )}{' '}
                        this{' '}
                        {data.budgetFrequency.value === 1 ? 'month' : 'week'}
                      </div>
                    </div>
                  )
                )}
              </>
            ) : (
              <>
                <div className="errorsWrapper">
                  <FormInput
                    description=""
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => {
                      actions.setDescription(e.target.value);
                      actions.setError('descriptionError', '');
                      actions.setError('showDescriptionError', false);
                    }}
                    error={
                      data.errors.showDescriptionError
                        ? data.errors.descriptionError
                        : ''
                    }
                  />
                </div>

                <div className="errorsWrapper">
                  <ScopeSelector
                    onClick={() => {
                      scopeMenu.value = 'scopeSelector';
                      actions.setError('scopeError', '');
                      actions.setError('showScopeError', false);
                    }}
                    scopeState={data.scopeState}
                    targetGroupIds={data.targetGroupIds}
                    allGroupsSelected={data.allGroupsSelected}
                    $inputError={
                      data.errors.showScopeError && !!data.errors.scopeError
                    }
                  />
                  <span className="errorMsg">
                    {data.errors.showScopeError && data.errors.scopeError
                      ? data.errors.scopeError
                      : ''}
                  </span>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>

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
      <InfoBoxAnimation menu={menu} />
      <CurrencyOptionsAnimation
        currencyMenu={menu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={data.currencySymbol}
      />
    </StyledCreateBudget>
  );
}
