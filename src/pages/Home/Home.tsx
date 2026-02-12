import { useEffect, useMemo, useState } from "react";
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
  Details,
  ExpenseResponseItem,
  Group,
  Guest,
  Member,
  User,
  UserInfo,
} from "../../types";
import useBudgetInfo from "../../api/auth/QueryHooks/useBudgetInfo";

import { BudgetInfoMessage } from "../../components/BudgetMessages/BudgetInfoMessage";
import { useOutletContext } from "react-router-dom";
import { signal, Signal, useSignal } from "@preact/signals-react";
import SettingsMenuAnimation from "../../components/Animations/SettingsMenuAnimation";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import { TreeItemBuilderForHomeAndGroups } from "../../components/TreeItemBuilderForHomeAndGroups";
import Spinner from "../../components/Spinner/Spinner";
import { AiFillThunderbolt } from "react-icons/ai";
import HomeQuickActionsAnimation from "../../components/Animations/HomeQuickActionsAnimation";
import useGroup from "../../api/auth/QueryHooks/useGroup";
import CreateExpenseForm from "../../components/CreateExpenseForm/CreateExpenseForm";
import TransferForm from "../../components/TransferForm/TransferForm";
import NonGroupExpenseUsersAnimation from "../../components/Animations/NonGroupExpenseUsersAnimation";
import NonGroupTransferAnimation from "../../components/Animations/NonGroupTransferAnimation";
import { useGetMostRecentGroups } from "@/api/auth/QueryHooks/useGetMostRecentGroups";
import { useGetGroupsAllBalances } from "@/api/auth/QueryHooks/useGetGroupsAllBalances";
import { useFetchAndGroupNonGroupDebts } from "../Groups/hooks/useFetchAndGroupNonGroupDebts";
import { computeNetPerCurrency } from "@/helpers/computeNetPerCurrency";
import { useTotalUserBalance } from "./hooks/useTotalUserBalance";

export default function Home() {
  const navigate = useNavigate();
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const isPersonal = useSignal<boolean>(true);
  const isNonGroupExpense = useSignal<boolean>(false);
  const isNonGroupTransfer = useSignal<boolean>(true);
  const [showAdvice, setShowAdvice] = useState(true);
  const theme = useTheme();

  const nonGroupUsers = useSignal<User[]>([]);
  const nonGroupGroup = useSignal<Group | null>(null);
  const groupMembers = useSignal<(Guest | Member)[]>([]);
  const { userInfo, topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const menu = useSignal<string | null>(null);
  const nonGroupExpenseMenu = useSignal<string | null>(null);
  const nonGroupTransferMenu = useSignal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>({
    attribute: "",
    menu: null,
    senderId: "",
    senderName: "",
    receiverId: "",
    receiverName: "",
  });

  const quickActionsMenu = useSignal<string | null>(null);
  const recentGroupId = userInfo?.recentGroupId;

const {
    totalBalances,
    isLoading,
    isFetching,
    groupsData
  } = useTotalUserBalance(userInfo?.userId || "");

  const {
    data: mostRecentGroupData,
    isFetching: mostRecentGroupDataIsFetching,
  } = useGetMostRecentGroups(recentGroupId)


  useEffect(() => {
    topMenuTitle.value = "";
    const saved = localStorage.getItem("submittedFromHomePersistData");
    if (saved) {
      const {
        nonGroupUsers: u,
        nonGroupGroup: g,
        groupMembers: m,
      } = JSON.parse(saved);
      nonGroupUsers.value = u ?? [];
      nonGroupGroup.value = g ?? null;
      groupMembers.value = m ?? [];
      isPersonal.value = false;
      if (nonGroupGroup.value !== null) {
        isNonGroupExpense.value = false;
      }
    }
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
                      navigate(`/shared/${mostRecentGroupData.id}`);
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

              {!isLoading && !isFetching &&
                groupsData?.groupCount === 0 ? (
                <OptionButton
                  onClick={() => navigate("/shared")}
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
                  onClick={() => navigate("/shared")}
                  items={TreeItemBuilderForHomeAndGroups(totalBalances)}
                >
                  <div className="groups">
                    <div className="groupIconAndNumberOfGroups">
                      <TiGroup className="groupIcon" />
                      {/* <span className="groupCount">{data?.groupCount}</span> */}
                    </div>
                    <div className="groupName">Shared</div>
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
          groupId={nonGroupGroup.value?.id}
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
          nonGroupMenu={nonGroupExpenseMenu}
          nonGroupGroup={nonGroupGroup}
          fromHome={true}
        />
      )}
      {quickActionsMenu.value === "newTransfer" && (
        <TransferForm
          groupId={nonGroupGroup.value?.id}
          timeZoneId={userInfo.timeZone}
          menu={quickActionsMenu}
          isnonGroupTransfer={isNonGroupTransfer}
          groupMembers={groupMembers}
          currency={userInfo.currency}
          nonGroupUsers={nonGroupUsers}
          nonGroupGroup={nonGroupGroup}
          nonGroupMenu={nonGroupTransferMenu}
          fromHome={true}
        />
      )}

      <HomeQuickActionsAnimation
        quickActionsMenu={quickActionsMenu}
        isNonGroupExpense={isNonGroupExpense}
        nonGroupTransferMenu={nonGroupTransferMenu}
        userInfo={userInfo}
      />
      <NonGroupExpenseUsersAnimation
        menu={nonGroupExpenseMenu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={isPersonal}
        groupMembers={groupMembers}
        nonGroupGroup={nonGroupGroup}
        isNonGroupExpense={isNonGroupExpense}
        fromNonGroup={false}
      />
      <NonGroupTransferAnimation
        nonGroupTransferMenu={nonGroupTransferMenu}
        nonGroupGroup={nonGroupGroup}
        groupMembers={groupMembers}
        isNonGroupTransfer={isNonGroupTransfer}
      />
    </StyledHomepage>
  );
}
