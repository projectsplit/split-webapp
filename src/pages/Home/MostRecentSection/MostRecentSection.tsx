import Spinner from '@/components/Spinner/Spinner'
import TreeAdjustedContainer from '@/components/TreeAdjustedContainer/TreeAdjustedContainer'
import { TreeItemBuilderForHomeAndGroups } from '@/components/TreeItemBuilderForHomeAndGroups'
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency'
import { GroupedTransaction, MostRecentGroupDetailsResponse, UserInfo } from '@/types'
import { NavigateFunction } from 'react-router-dom'
import { StyledMostRecentSection } from './MostRecentSection.styled'

export default function MostRecentSection({
  mostRecentGroupDataIsFetching,
  mostRecentGroupData,
  recentContextId,
  nonGroupGroupedTransactions,
  userInfo,
  navigate
}: {
  mostRecentGroupDataIsFetching: boolean;
  mostRecentGroupData: MostRecentGroupDetailsResponse |undefined;
  recentContextId: string;
  nonGroupGroupedTransactions: GroupedTransaction[];
  userInfo: UserInfo;
  navigate: NavigateFunction;
}) {

  if (mostRecentGroupDataIsFetching) {
    return <Spinner />;
  }

  if (mostRecentGroupData) {
    return (
      <StyledMostRecentSection>
        <div className="mostRecentMsg">Most recent</div>
        <TreeAdjustedContainer
          onClick={() => navigate(`/shared/${mostRecentGroupData.id}`)}
          hasOption={true}
          optionname="chevron-forward-outline"
          items={TreeItemBuilderForHomeAndGroups(mostRecentGroupData?.details)}
        >
          <div className="groupName">{mostRecentGroupData?.name}</div>
        </TreeAdjustedContainer>
      </StyledMostRecentSection>
    );
  }

  if (recentContextId === 'NON_GROUP') {
    return (
      <StyledMostRecentSection>
        <div className="mostRecentMsg">Most recent</div>
        <TreeAdjustedContainer
          onClick={() => navigate('/shared/nonGroup/expenses')}
          hasOption={true}
          optionname="chevron-forward-outline"
          items={TreeItemBuilderForHomeAndGroups(
            computeNetPerCurrency(nonGroupGroupedTransactions, userInfo.userId || '')
          )}
        >
          <div className="groupName">Non Group Transactions</div>
        </TreeAdjustedContainer>
      </StyledMostRecentSection>
    );
  }

  return null;
}