import {
  GroupedTransaction,
  MostRecentGroupDetailsResponse,
  UserInfo,
} from '@/types';
import { NavigateFunction } from 'react-router-dom';
import MostRecentSection from '../Home/MostRecentSection/MostRecentSection';
import { RecentSectionWrapper, SectionHeader } from './RecentSection.styled';

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
  const hasContent =
    mostRecentGroupDataIsFetching ||
    mostRecentGroupData ||
    recentContextId === 'NON_GROUP';

  if (!hasContent) return null;

  return (
    <RecentSectionWrapper>
      <SectionHeader>
        <h4>Most Recent</h4>
      </SectionHeader>
      <MostRecentSection
        mostRecentGroupDataIsFetching={mostRecentGroupDataIsFetching}
        mostRecentGroupData={mostRecentGroupData}
        recentContextId={recentContextId}
        nonGroupGroupedTransactions={nonGroupGroupedTransactions}
        userInfo={userInfo}
        navigate={navigate}
      />
    </RecentSectionWrapper>
  );
};
