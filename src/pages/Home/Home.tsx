import { useEffect, useState } from "react";
import { StyledHomepage } from "./Home.Styled";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import OptionButton from "./SelectionButton/SelectionButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "styled-components";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import {
  ExpenseResponseItem,
  Group,
  GroupsAllBalancesResponse,
  Guest,
  Member,
  MostRecentGroupDetailsResponse,
  User,
  UserInfo,
} from "../../types";
import {
  getGroupsAllBalances,
  getMostRecentGroup,
} from "../../api/services/api";
import useBudgetInfo from "../../api/services/useBudgetInfo";

import { BudgetInfoMessage } from "../../components/BudgetMessages/BudgetInfoMessage";
import { useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import SettingsMenuAnimation from "../../components/Menus/MenuAnimations/SettingsMenuAnimation";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import { TreeItemBuilderForHomeAndGroups } from "../../components/TreeItemBuilderForHomeAndGroups";
import Spinner from "../../components/Spinner/Spinner";
import { AiFillThunderbolt } from "react-icons/ai";
import HomeQuickActionsAnimation from "../../components/Menus/MenuAnimations/HomeQuickActionsAnimation";
import useGroup from "../../api/services/useGroup";
import NewExpenseAnimation from "../../components/Menus/MenuAnimations/NewExpenseAnimation";
import NonGroupUsersAnimation from "../../components/Menus/MenuAnimations/NonGroupUsersAnimation";
import CreateExpenseForm from "../../components/CreateExpenseForm/CreateExpenseForm";

export default function Home() {
  const navigate = useNavigate();
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const isPersonal = useSignal<boolean>(true);
  const isNonGroupExpense = useSignal<boolean>(false);
  const [showAdvice, setShowAdvice] = useState(true);
  const theme = useTheme();
  const nonGroupUsers = useSignal<User[]>([]);
  const nonGroupGroups = useSignal<Group[]>([])

  const groupMembers = useSignal<(Guest | Member)[]>([]);
  const { userInfo, topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const menu = useSignal<string | null>(null);
  const nonGroupMenu = useSignal<string | null>(null);
  const quickActionsMenu = useSignal<string | null>(null);
  const recentGroupId = userInfo?.recentGroupId;

  const {
    data,
    isFetching,
    isLoading: isLoadingAllBalancesResponse,
  } = useQuery<GroupsAllBalancesResponse>({
    queryKey: ["home"],
    queryFn: getGroupsAllBalances,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const {
    data: mostRecentGroupData,
    isFetching: mostRecentGroupDataIsFetching,
  } = useQuery<MostRecentGroupDetailsResponse>({
    queryKey: ["mostRecentGroup", recentGroupId],
    queryFn: () => getMostRecentGroup(recentGroupId),
    enabled: recentGroupId !== undefined && recentGroupId !== null,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    topMenuTitle.value = "";
  }, []);

  const isGlowing = quickActionsMenu.value === "quickActions";

  return (
    <StyledHomepage>
      {isFetching || !userInfo?.username ? (
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
                    onClick={() => {
                      navigate(`/groups/${mostRecentGroupData.id}`);
                    }}
                    hasOption={true}
                    optionname="chevron-forward-outline"
                    items={TreeItemBuilderForHomeAndGroups(
                      mostRecentGroupData?.details
                    )}
                  >
                    <div className="groupName">{mostRecentGroupData?.name}</div>
                  </TreeAdjustedContainer>
                </div>
              ) : null}

              {!isLoadingAllBalancesResponse &&
              !isFetching &&
              data?.groupCount === 0 ? (
                <OptionButton
                  onClick={() => navigate("/groups")}
                  name="Groups"
                  description="Keep track of your shared finances"
                  hasArrow={false}
                >
                  <TiGroup className="groupIcon" />
                </OptionButton>
              ) : (
                <TreeAdjustedContainer
                  hasOption={false}
                  optionname="chevron-forward-outline"
                  onClick={() => navigate("/groups")}
                  items={TreeItemBuilderForHomeAndGroups(data?.balances)}
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
                hasArrow={false}
              >
                <BsFillPersonFill className="personalIcon" />
              </OptionButton>
              <OptionButton
                name="Analytics"
                description="View your spending trends"
                onClick={() => navigate("/analytics")}
                hasArrow={false}
              >
                <BsBarChartFill className="analyticsIcon" />
              </OptionButton>
              <OptionButton
                name="Budget"
                description="Set up a spending cap or goal"
                onClick={() => navigate("/budget")}
                hasArrow={false}
              >
                <BsFillPiggyBankFill className="budgetIcon" />
              </OptionButton>
            </div>
          </div>
          <div
            className={`actions ${isGlowing ? "glow" : ""}`}
            onClick={() =>
              (quickActionsMenu.value =
                quickActionsMenu.value === "quickActions"
                  ? null
                  : "quickActions")
            }
          >
            <AiFillThunderbolt className="thunder" />
          </div>
        </>
      )}
      <MenuAnimationBackground menu={quickActionsMenu} />

      {quickActionsMenu.value === "newExpense" && (
        <CreateExpenseForm
          expense={null}
          timeZoneId={userInfo.timeZone}
          menu={quickActionsMenu}
          timeZoneCoordinates={userInfo.timeZoneCoordinates}
          header="Create New Expense"
          isCreateExpense={true}
          isPersonal={isPersonal}
          isnonGroupExpense={isNonGroupExpense}
          groupMembers={groupMembers}
          currency={userInfo.currency}
          nonGroupUsers={nonGroupUsers}
          nonGroupMenu={nonGroupMenu}
          nonGroupGroups={nonGroupGroups}
        />
      )}

      <HomeQuickActionsAnimation
        menu={quickActionsMenu}
        isNonGroupExpense={isNonGroupExpense}
      />
      <NonGroupUsersAnimation
        menu={nonGroupMenu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={isPersonal}
        groupMembers={groupMembers}
        nonGroupGroups={nonGroupGroups}
      />
    </StyledHomepage>
  );
}
