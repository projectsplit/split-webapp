import { useState } from "react";
import { StyledHomepage } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import OptionButton from "./SelectionButton/SelectionButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createUserPendingTransactionsFromTotals } from "../../helpers/createUserPendingTransactionsFromTotals";
import { useTheme } from "styled-components";
import Spinner from "../../components/Spinner/Spinner";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import { GroupsTotalAmountsResponse } from "../../types";
import { getGroupsTotalAmounts } from "../../api/services/api";
import useBudgetInfo from "../../hooks/useBudgetInfo";
import { TreeItemBuilder } from "../../components/TreeItemBuilder";
import { BudgetInfoMessage } from "../../components/BudgetMessages/BudgetInfoMessage";

export default function Home() {
  const navigate = useNavigate();
  const [showAdvice, setShowAdvice] = useState(true);
  const theme = useTheme();

  const { data, isFetching, isLoading } = useQuery<GroupsTotalAmountsResponse>({
    queryKey: ["home"],
    queryFn: getGroupsTotalAmounts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: budgetData, isFetching: budgetIsFetching } = useBudgetInfo();

  return (

      <StyledHomepage>
        <LogoStripe />
        <div className="welcomeStripe">
          Welcome {"sessionData.userNickname"}
        </div>
        {isFetching && budgetIsFetching ? (
          <Spinner />
        ) : (
          <div className="optionsStripe">
            {showAdvice && budgetData?.budgetSubmitted && (
              <>
                {BudgetInfoMessage(theme, true, budgetData, () =>
                  setShowAdvice(false)
                )}
              </>
            )}

            <div className="mostRecent">
              <div className="mostRecentMsg">Most recent</div>

              <TreeAdjustedContainer
                onClick={() => console.log("goto group")}
                hasarrow={true}
                items={[
                  <div className="groupsInfo">
                    <strong>You</strong> are owed{" "}
                    <span className="owed">£56.00</span>
                  </div>,
                  <div className="groupsInfo">
                    <strong>You</strong> owe <span className="owe">$5.65</span>
                  </div>,
                ]}
              >
                <div className="groupName">Kythnos</div>
              </TreeAdjustedContainer>
            </div>
            {!isLoading && !isFetching && data?.numberOfGroups === 0 ? (
              <OptionButton
                name="Groups"
                description="Keep track of your shared finances "
              >
                <i className="group icon" />
              </OptionButton>
            ) : (
              <TreeAdjustedContainer
                hasarrow={true}
                onClick={() => navigate("/groups/active")}
                items={TreeItemBuilder(
                  createUserPendingTransactionsFromTotals(data)
                )}
              >
                <div className="groups">
                  <i className="group icon">
                    <span className="groupCount">{data?.numberOfGroups}</span>
                  </i>
                  <div className="groupName">Groups</div>
                </div>
              </TreeAdjustedContainer>
            )}
            <OptionButton
              name="Personal"
              description="Your personal expense tracker"
            >
              <BsFillPersonFill className="personalIcon" />
            </OptionButton>

            <OptionButton
              name="Analytics"
              description="View your spending trends"
              onClick={() => navigate("/analytics")}
            >
              <BsBarChartFill className="analyticsIcon" />
            </OptionButton>

            <OptionButton
              name="Budget"
              description="Set up a spending cap or goal"
              onClick={() => navigate("/budget")}
            >
              <BsFillPiggyBankFill className="budgetIcon" />
            </OptionButton>
          </div>
        )}
      </StyledHomepage>
  
  );
}
