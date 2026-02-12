import { Details, GroupedTransaction, GroupsAllBalancesResponse, MostRecentGroupDetailsResponse, UserInfo } from "@/types";
import { StyledScrollableMenuButtons } from "./ScrollableMenuButtons.styled";
import { NavigateFunction } from "react-router-dom";
import MostRecentSection from "../MostRecentSection/MostRecentSection";
import TreeAdjustedContainer from "@/components/TreeAdjustedContainer/TreeAdjustedContainer";
import { TreeItemBuilderForHomeAndGroups } from "@/components/TreeItemBuilderForHomeAndGroups";
import { TiGroup } from "react-icons/ti";
import OptionButton from "../SelectionButton/SelectionButton";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";

export default function ScrollableMenuButtons({
  mostRecentGroupDataIsFetching,
  mostRecentGroupData,
  recentContextId,
  nonGroupGroupedTransactions,
  userInfo,
  navigate,
  isLoading,
  isFetching,
  groupsData,
  totalBalances
}: {
  mostRecentGroupDataIsFetching: boolean;
  mostRecentGroupData: MostRecentGroupDetailsResponse | undefined;
  recentContextId: string;
  nonGroupGroupedTransactions: GroupedTransaction[];
  userInfo: UserInfo;
  navigate: NavigateFunction;
  isLoading: boolean;
  isFetching: boolean;
  groupsData: GroupsAllBalancesResponse | undefined,
  totalBalances:Details
}) {
  return (
    <StyledScrollableMenuButtons>
      {/* {showAdvice && budgetData?.budgetSubmitted && (
                <>
                  {BudgetInfoMessage(theme, true, budgetData, () =>
                    setShowAdvice(false)
                  )}
                </>
              )} */}

      <MostRecentSection
        mostRecentGroupDataIsFetching={mostRecentGroupDataIsFetching}
        mostRecentGroupData={mostRecentGroupData}
        recentContextId={recentContextId}
        nonGroupGroupedTransactions={nonGroupGroupedTransactions}
        userInfo={userInfo}
        navigate={navigate}
      />

      {!isLoading && !isFetching &&
        groupsData?.groupCount === 0 ? (
        <OptionButton
          onClick={() => navigate("/shared")}
          name="Shared"
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
    </StyledScrollableMenuButtons >
  );
}