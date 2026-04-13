import {
  GroupedTransaction,
  MostRecentGroupDetailsResponse,
  UserInfo,
} from '@/types';
import { NavigateFunction } from 'react-router-dom';
import { TreeItemBuilderForHomeAndGroups } from '@/components/TreeItemBuilderForHomeAndGroups';
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency';
import {
  RecentSectionWrapper,
  SectionHeader,
  RecentCard,
  RecentGroupName,
  RecentBalanceInfo,
} from './RecentSection.styled';

interface RecentSectionProps {
  mostRecentGroupDataIsFetching: boolean;
  mostRecentGroupData: MostRecentGroupDetailsResponse | undefined;
  recentContextId: string;
  nonGroupGroupedTransactions: GroupedTransaction[];
  userInfo: UserInfo;
  navigate: NavigateFunction;
}

export const RecentSection = ({
  mostRecentGroupDataIsFetching,
  mostRecentGroupData,
  recentContextId,
  nonGroupGroupedTransactions,
  userInfo,
  navigate,
}: RecentSectionProps) => {
  if (mostRecentGroupDataIsFetching) return null;

  if (mostRecentGroupData) {
    const items = TreeItemBuilderForHomeAndGroups(mostRecentGroupData.details);
    return (
      <RecentSectionWrapper>
        <SectionHeader>
          <h4>Most Recent</h4>
        </SectionHeader>
        <RecentCard
          onClick={() => navigate(`/shared/${mostRecentGroupData.id}`)}
        >
          <RecentGroupName>{mostRecentGroupData.name}</RecentGroupName>
          {items.map((item, i) => (
            <RecentBalanceInfo key={i}>{item}</RecentBalanceInfo>
          ))}
        </RecentCard>
      </RecentSectionWrapper>
    );
  }

  if (recentContextId === 'NON_GROUP') {
    const balances = computeNetPerCurrency(
      nonGroupGroupedTransactions,
      userInfo.userId || ''
    );
    const items = TreeItemBuilderForHomeAndGroups(balances);
    return (
      <RecentSectionWrapper>
        <SectionHeader>
          <h4>Most Recent</h4>
        </SectionHeader>
        <RecentCard onClick={() => navigate('/shared/nongroup/expenses')}>
          <RecentGroupName>Non Group Transactions</RecentGroupName>
          {items.map((item, i) => (
            <RecentBalanceInfo key={i}>{item}</RecentBalanceInfo>
          ))}
        </RecentCard>
      </RecentSectionWrapper>
    );
  }

  return null;
};
