import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Frequency,
  SpendingInfoResponse,
  UserInfo,
} from "../../../types";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import "../../../styles/freakflags/freakflags.css";
import { StyledCreateBudget } from "./CreateBudget.styled";
import SetUpSpendingGoal from "./SetUpSpendingGoal/SetUpSpendingGoal";
import SpendingCycle from "./SpendingCycle/SpendingCycle";
import { useSignal } from "@preact/signals-react";
import MyButton from "../../../components/MyButton/MyButton";
import TopBarWithBackButton from "../../../components/TopBarWithBackButton/TopBarWithBackButton";
import CurrencyOptionsAnimation from "../../../components/Animations/CurrencyOptionsAnimation";
import { useCreateBudget } from "../../../api/auth/CommandHooks/useCreateBudget";
import { useSpendingInfo } from "../../../api/auth/QueryHooks/useSpengindInfo";
import MenuAnimationBackground from "../../../components/Animations/MenuAnimationBackground";
import InfoBoxAnimation from "../../../components/Animations/InfoBoxAnimation";
import CreateBudgetConfirmationAnimation from "../../../components/Animations/BudgetAnimations/CreateBudgetConfirmationAnimation";
import { handleInputChange } from "../../../helpers/handleInputChange";

export default function CreateBudget() {

  const [amount, setAmount] = useState<string>("");
  const displayedAmount = useSignal<string>("");
  const openCalendar = useSignal<boolean>(false);
  const calendarDay = useSignal<string>("");
  const budgettype = useSignal<Frequency>(Frequency.Monthly);
  const hasSwitchedBudgetType = useSignal<boolean>(false);
  const submitBudgetErrors = useSignal<any[]>([]);
  const menu = useSignal<string | null>(null);
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const [currencySymbol, setCurrencySymbol] = useState<string>('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const budgetInfoQueryKey = ["budget"];
  const spendingInfoQueryKey = ["spending", budgettype.value, currencySymbol];

  const createBudget = useCreateBudget(navigate, submitBudgetErrors)

  useEffect(() => {
    if (userInfo?.currency) {
      setCurrencySymbol(userInfo.currency);
    }
  }, [userInfo]);

  // const { data, isFetching, isStale } = useSpendingInfo(
  //   budgettype.value,
  //   currencySymbol
  // );

  const data = {
    "budgetSubmitted": false,
    "totalAmountSpent": "0",
    "currency": "USD"
  }
  const isFetching = false;
  const isStale = false;


  const handleInputChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e, currencySymbol, displayedAmount, setAmount);

    },
    [currencySymbol, displayedAmount, setAmount]
  );

  const getDayNumber = (day: string): string | null => {
    const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
    if (index !== -1) return (index + 1).toString();
    return null;
  };

  const submitBudget = async () => {
    if (budgettype.value === Frequency.Monthly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype.value,
        currency: currencySymbol,
        day: calendarDay.value.toString(),
      });
    }
    if (budgettype.value === Frequency.Weekly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype.value,
        currency: currencySymbol,
        day: getDayNumber(calendarDay.value),
      });
    }

    submitBudgetErrors.value = [];
    openCalendar.value = false;
    queryClient.invalidateQueries({ queryKey: budgetInfoQueryKey, exact: false });
    hasSwitchedBudgetType.value = false;
    displayedAmount.value = "";
    menu.value = null;
    setAmount("");
  };

  const querydata = queryClient.getQueryData(
    spendingInfoQueryKey
  ) as SpendingInfoResponse;

  const handleBackButtonClick = () => {
    if (data && data.budgetSubmitted) {
      navigate(`/budget/current`);
    } else {
      navigate(`/`);
    }
  };


  const handldeCurrencyOptionsClick = (curr: string) => {
    //setCurrency(currency);
    setCurrencySymbol(curr);
    queryClient.invalidateQueries({ queryKey: ["spending", budgettype, curr], exact: false });
    queryClient.getQueryData(["spending", budgettype, curr]);
    menu.value = null;
  };

  return (
    <StyledCreateBudget>
      <TopBarWithBackButton
        header="Budget"
        onClick={() => handleBackButtonClick()}
      />

      <SetUpSpendingGoal
        menu={menu}
        displayedAmount={displayedAmount}
        currency={currencySymbol}
        submitBudgetErrors={submitBudgetErrors}
        onChange={handleInputChangeCallback}
      />

      <SpendingCycle
        submitBudgetErrors={submitBudgetErrors}
        calendarDay={calendarDay}
        budgettype={budgettype}
        menu={menu}
        isStale={isStale}
        openCalendar={openCalendar}
        hasSwitchedBudgetType={hasSwitchedBudgetType}
      />

      {isFetching ? (
        <></>
      ) : (
        querydata && (
          <div className="spentInfo">
            <div>
              You have spent{" "}
              {displayCurrencyAndAmount(
                data?.totalAmountSpent,
                querydata?.currency
              )}{" "}
              this {budgettype.value === 1 ? "month" : "week"}
            </div>
          </div>
        )
      )}

      <div className="submitButton">
        <MyButton
          fontSize="16"
          onClick={() => {
            if (querydata.budgetSubmitted) {
              menu.value = "createBudgetConfirmation";
            } else {
              submitBudget();
            }
          }}
        >
          Submit Budget
        </MyButton>
      </div>

      <MenuAnimationBackground menu={menu} />

      <CreateBudgetConfirmationAnimation
        menu={menu}
        submitBudget={submitBudget}
      />

      <InfoBoxAnimation menu={menu} />

      <CurrencyOptionsAnimation
        currencyMenu={menu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />

    </StyledCreateBudget>
  );
}
