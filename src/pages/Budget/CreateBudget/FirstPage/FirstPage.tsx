import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import SetUpSpendingGoal from '../SetUpSpendingGoal/SetUpSpendingGoal';
import SpendingCycle from '../SpendingCycle/SpendingCycle';
import { useQueryClient } from '@tanstack/react-query';
import { Frequency, SpendingInfoResponse } from '@/types';
import { Signal } from '@preact/signals-react';

export const FirstPage = ({
  menu,
  data,
  handleInputChangeCallback,
  actions,
  timeZoneId,
}: FirstPageProps) => {
  const queryClient = useQueryClient();
  const spendingInfoQueryKey = [
    'spending',
    data.budgetFrequency.value,
    data.currencySymbol,
  ];

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

  const querydata = queryClient.getQueryData(
    spendingInfoQueryKey
  ) as SpendingInfoResponse;

  return (
    <>
      <div className="errorsWrapper">
        <SetUpSpendingGoal
          menu={menu}
          displayedAmount={data.displayedAmount}
          currency={data.currencySymbol}
          onChange={handleInputChangeCallback}
          $inputError={data.errors.showAmountError && !!data.errors.amountError}
        />
        <span className="errorMsg">
          {data.errors.showAmountError && data.errors.amountError
            ? data.errors.amountError
            : ''}
        </span>
      </div>

      <div className="errorsWrapper">
        <SpendingCycle
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
          {data.errors.showSpendingCycleError && data.errors.spendingCycleError
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
              this {data.budgetFrequency.value === 1 ? 'month' : 'week'}
            </div>
          </div>
        )
      )}
    </>
  );
};

interface FirstPageProps {
  menu: Signal<string | null>;
  data: {
    amount: string;
    description: string;
    currencySymbol: string;
    displayedAmount: Signal<string>;
    openCalendar: Signal<boolean>;
    openCustomDateCalendar: Signal<boolean>;
    startDate: Signal<string>;
    endDate: Signal<string>;
    pickingTarget: Signal<'start' | 'end' | null>;
    calendarDay: Signal<string>;
    budgetFrequency: Signal<Frequency>;
    hasSwitchedBudgetType: Signal<boolean>;
    scopeState: Signal<{
      none: boolean;
      personal: boolean;
      group: boolean;
      nonGroup: boolean;
    }>;
    errors: {
      amountError: string;
      descriptionError: string;
      spendingCycleError: string;
      scopeError: string;
      showAmountError: boolean;
      showDescriptionError: boolean;
      showSpendingCycleError: boolean;
      showScopeError: boolean;
      commencementDayError: string;
      showCommencementDayError: boolean;
    };
    serverErrors: Signal<any[]>;
    currentStep: number;
  };
  handleInputChangeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;

  timeZoneId: string;

  actions: {
    setError: (
      key:
        | 'amountError'
        | 'descriptionError'
        | 'spendingCycleError'
        | 'scopeError'
        | 'showAmountError'
        | 'showDescriptionError'
        | 'showSpendingCycleError'
        | 'showScopeError'
        | 'commencementDayError'
        | 'showCommencementDayError',
      value: string | boolean
    ) => void;
  };
}
