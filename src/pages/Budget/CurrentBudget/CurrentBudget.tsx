import React, { useEffect, useState } from "react";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BudgetInfoResponse, Frequency } from "../../../types";
import ProgressBar from "./../ProgressBar/ProgressBar";
import { useTheme } from "styled-components";
import "../../../styles/freakflags/freakflags.css";
import { StyledCurrentBudget } from "./CurrentBudget.styled";
// import useBudgetInfo from "../../../hooks/useBudgetInfo";

import MyButton from "../../../components/MyButton/MyButton";
import { BudgetInfoMessage } from "../../../components/BudgetMessages/BudgetInfoMessage";
import MenuAnimationBackground from "../../../components/Menus/MenuAnimations/MenuAnimationBackground";
import { useSignal } from "@preact/signals-react";
import DeleteBudgetConfirmationAnimation from "../../../components/Menus/MenuAnimations/BudgetAnimations/DeleteBudgetConfirmationAnimation";

import Spinner from "../../../components/Spinner/Spinner";
import ManageBudgetAnimation from "../../../components/Menus/MenuAnimations/BudgetAnimations/ManageBudgetAnimation";

export default function CurrentBudget() {
  const menu = useSignal<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryKey = ["budget"];
  const theme = useTheme();
  const nodeRef = React.useRef(null);

  // const { isFetching, data } = useBudgetInfo();

  const data:BudgetInfoResponse = {
      "budgetSubmitted": false,
      "totalAmountSpent": '123',
      "remainingDays": '5',
      "averageSpentPerDay": '10',
      "goal": '1300',
      "currency": 'USD',
      "budgetType": 1,
      "startDate": "0001-01-01T00:00:00",
      "endDate": "0001-01-01T00:00:00"
  }
  const isFetching=false

  useEffect(() => {
    //prevents user from landing on this component after budget is deleted using <- of browser
    if (!isFetching && !data?.budgetSubmitted) {
     //navigate("/budget/create");
      navigate("/");
    }
  }, []);

  // const deleteBudget = useMutation<any, any, any>({
  //   mutationKey: ["budget", "delete"],
  //   mutationFn: api.deleteBudget,
  //   onError: (error) => {
  //     // setSubmitBudgetErrors(error.response.data);
  //     console.log(error);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(queryKey);
  //   },
  // });

  const removeBudget = async () => {
    //deleteBudget.mutate({});
    menu.value=(null);
    queryClient.invalidateQueries({ queryKey:queryKey, exact: false });
    navigate("/budget/create");
  };

  const querydata = queryClient.getQueryData(queryKey) as BudgetInfoResponse;

  return (
    <StyledCurrentBudget>
      {isFetching && <Spinner />}

      {!isFetching && (
        <>
          <div className="topBar">
            <div className="backButtonContainer">
              <BiArrowBack
                className="backButton"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="descr">Budget</div>
          </div>

          {querydata && (
            <div className="spentInfo">
              {querydata.budgetSubmitted && (
                <>
                  <ProgressBar data={querydata} />
                  {BudgetInfoMessage(theme, false, querydata)}
                </>
              )}
            </div>
          )}

          <div className="submitButton">
            <MyButton onClick={() => (menu.value = "manageBudgetMenu")}  fontSize="16">
              Manage Budget
            </MyButton>
          </div>

          <MenuAnimationBackground menu={menu} />

          <DeleteBudgetConfirmationAnimation
            menu={menu}
            removeBudget={removeBudget}
          />

          <ManageBudgetAnimation menu={menu} />
        </>
      )}
    </StyledCurrentBudget>
  );
}
