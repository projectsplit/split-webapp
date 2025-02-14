import { useState } from "react";
import { StyledHomepage } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import OptionButton from "./SelectionButton/SelectionButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createUserPendingTransactionsFromTotals } from "../../helpers/createUserPendingTransactionsFromTotals";
import { useTheme } from "styled-components";
import Spinner from "../../components/Spinner/Spinner";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import { GroupsTotalAmountsResponse, UserInfo } from "../../types";
import { getGroupsTotalAmounts } from "../../api/services/api";
import useBudgetInfo from "../../hooks/useBudgetInfo";
import { TreeItemBuilder } from "../../components/TreeItemBuilder";
import { BudgetInfoMessage } from "../../components/BudgetMessages/BudgetInfoMessage";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showAdvice, setShowAdvice] = useState(true);
  const theme = useTheme();
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const { data, isFetching, isLoading } = useQuery<GroupsTotalAmountsResponse>({
    queryKey: ["home"],
    queryFn: getGroupsTotalAmounts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  //const { data: budgetData, isFetching: budgetIsFetching } = useBudgetInfo();

  return (
    <StyledHomepage>
      {isFetching ? (
        // && budgetIsFetching ?
        <Spinner />
      ) : (
        <>
          <div className="fixedTop">
            <LogoStripe />
            <div className="welcomeStripe">
              Welcome, <strong>{userInfo?.username}</strong>
            </div>
          </div>
          <div className="scrollableContent">
            <div className="optionsStripe">
              {/* {showAdvice && budgetData?.budgetSubmitted && (
              <>
                {BudgetInfoMessage(theme, true, budgetData, () =>
                  setShowAdvice(false)
                )}
              </>
            )} */}
              <div className="mostRecent">
                <div className="mostRecentMsg">Most recent</div>
                <TreeAdjustedContainer
                  onClick={() => console.log("goto group")}
                  hasarrow={true}
                  items={[
                    <div className="groupsInfo" key="owed">
                      <strong>You</strong> are owed{" "}
                      <span className="owed">£56.00</span>
                    </div>,
                    <div className="groupsInfo" key="owe">
                      <strong>You</strong> owe{" "}
                      <span className="owe">$5.65</span>
                    </div>,
                  ]}
                >
                  <div className="groupName">Kythnos</div>
                </TreeAdjustedContainer>
              </div>
              {!isLoading && !isFetching && data?.groups?.length === 0 ? (
                <OptionButton
                  onClick={() => navigate("/groups/active")}
                  name="Groups"
                  description="Keep track of your shared finances"
                >
                  <TiGroup className="groupIcon" />
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
                    <div className="groupIconAndNumberOfGroups">
                      <TiGroup className="groupIcon" />
                      <span className="groupCount">{data?.groups?.length}</span>
                    </div>
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
          </div>
        </>
      )}
    </StyledHomepage>
  );
}
