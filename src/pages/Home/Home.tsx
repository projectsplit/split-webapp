import { useEffect, useState } from "react";
import { StyledHomepage } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import OptionButton from "./SelectionButton/SelectionButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "styled-components";
import Spinner from "../../components/Spinner/Spinner";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import {
  GroupsAllBalancesResponse,
  MostRecentGroupDetailsResponse,
  UserInfo,
} from "../../types";
import {
  getGroupsAllBalances,
  getMostRecentGroup,
} from "../../api/services/api";
import useBudgetInfo from "../../hooks/useBudgetInfo";
import { TreeItemBuilder } from "../../components/TreeItemBuilder";
import { BudgetInfoMessage } from "../../components/BudgetMessages/BudgetInfoMessage";
import { useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import SettingsMenuAnimation from "../../components/MenuAnimations/SettingsMenuAnimation";
import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";

export default function Home() {
  const navigate = useNavigate();
  const mostRecentGroupId = useSignal<string>(
    localStorage.getItem("mostRecentGroup") || ""
  );
  const [showAdvice, setShowAdvice] = useState(true);
  const theme = useTheme();
  const { userInfo,topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();
  const menu = useSignal<string | null>(null);

  const { data, isFetching, isLoading } = useQuery<GroupsAllBalancesResponse>({
    queryKey: ["home"],
    queryFn: getGroupsAllBalances,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    data: mostRecentGroupData,
    isFetching: mostRecentGroupDataIsFetching,
  } = useQuery<MostRecentGroupDetailsResponse>({
    queryKey: ["mostRecentGroup", mostRecentGroupId.value],
    queryFn: () => getMostRecentGroup(mostRecentGroupId.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(()=>{
    topMenuTitle.value = ""
  },[])

  // isFetching:mostRecentGroupDataIsFetching, isLoading:mostRecentGroupDataIsLoading
  // const { data: budgetData, isFetching: budgetIsFetching } = useBudgetInfo();

  return (
    <StyledHomepage>
      {isFetching ? (
        // && budgetIsFetching ?
        <Spinner />
      ) : (
        <>
          <div className="fixedTop">
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

              {mostRecentGroupDataIsFetching ? (
                <Spinner />
              ) : mostRecentGroupData ? (
                <div className="mostRecent">
                  <div className="mostRecentMsg">Most recent</div>
                  <TreeAdjustedContainer
                    onClick={() =>
                      navigate(
                        `/groups/active/${mostRecentGroupData.id}/expenses`
                      )
                    }
                    hasarrow={true}
                    items={TreeItemBuilder(mostRecentGroupData?.details)}
                  >
                    <div className="groupName">{mostRecentGroupData?.name}</div>
                  </TreeAdjustedContainer>
                </div>
              ) : null}

              {!isLoading && !isFetching && data?.groupCount === 0 ? (
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
                  items={TreeItemBuilder(data?.balances)}
                >
                  <div className="groups">
                    <div className="groupIconAndNumberOfGroups">
                      <TiGroup className="groupIcon" />
                      <span className="groupCount">{data?.groupCount}</span>
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
      {/* <MenuAnimationBackground menu={menu} />
      <SettingsMenuAnimation menu={menu}  /> */}
    </StyledHomepage>
  );
}
