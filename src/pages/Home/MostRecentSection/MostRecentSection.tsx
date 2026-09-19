import IonIcon from '@reacticons/ionicons';
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import ItemCard from '@/components/ListForms/ItemCard';
import BalanceMeta from '@/components/BalanceMeta/BalanceMeta';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency';
import {
  Details,
  GroupedTransaction,
  MostRecentGroupDetailsResponse,
  UserInfo,
} from '@/types';
import { NavigateFunction } from 'react-router-dom';
import { StyledMostRecentSection } from './MostRecentSection.styled';

export default function MostRecentSection({
  mostRecentGroupDataIsFetching,
  mostRecentGroupData,
  recentContextId,
  nonGroupGroupedTransactions,
  userInfo,
  navigate,
}: {
  mostRecentGroupDataIsFetching: boolean;
  mostRecentGroupData: MostRecentGroupDetailsResponse | undefined;
  recentContextId: string;
  nonGroupGroupedTransactions: GroupedTransaction[];
  userInfo: UserInfo;
  navigate: NavigateFunction;
}) {
  const section = (name: string, details: Details, onClick: () => void) => (
    <StyledMostRecentSection>
      <SectionLabel title="Most recent" />
      <ItemCard onClick={onClick}>
        <div className="recentBody">
          <div className="groupName">{name}</div>
          <BalanceMeta details={details} />
        </div>
        <IonIcon
          name="chevron-forward-outline"
          className="recentChevron"
        />
      </ItemCard>
    </StyledMostRecentSection>
  );

  if (mostRecentGroupDataIsFetching) {
    return (
      <StyledMostRecentSection>
        <Shimmer width="70px" height="12px" borderRadius="4px" />
        <Shimmer width="100%" height="60px" borderRadius="14px" />
      </StyledMostRecentSection>
    );
  }

  if (mostRecentGroupData) {
    return section(mostRecentGroupData.name, mostRecentGroupData.details, () =>
      navigate(`/shared/${mostRecentGroupData.id}`)
    );
  }

  if (recentContextId === 'NON_GROUP') {
    return section(
      'Non Group Transactions',
      computeNetPerCurrency(nonGroupGroupedTransactions, userInfo.userId || ''),
      () => navigate('/shared/nongroup/expenses')
    );
  }

  return null;
}
