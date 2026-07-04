import { GroupedTransaction, MostRecentGroupDetailsResponse, UserInfo } from '@/types';
import { NavigateFunction } from 'react-router-dom';
export default function MostRecentSection({ mostRecentGroupDataIsFetching, mostRecentGroupData, recentContextId, nonGroupGroupedTransactions, userInfo, navigate, }: {
    mostRecentGroupDataIsFetching: boolean;
    mostRecentGroupData: MostRecentGroupDetailsResponse | undefined;
    recentContextId: string;
    nonGroupGroupedTransactions: GroupedTransaction[];
    userInfo: UserInfo;
    navigate: NavigateFunction;
}): import("react/jsx-runtime").JSX.Element | null;
