import { BudgetInfoResponse, Details, GroupedTransaction, GroupsAllBalancesResponse, MostRecentGroupDetailsResponse, UserInfo } from '@/types';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
export default function ScrollableMenuButtons({ mostRecentGroupDataIsFetching, mostRecentGroupData, recentContextId, nonGroupGroupedTransactions, userInfo, navigate, isLoading, isFetching, groupsData, totalBalances, topMenuTitle, activeBudgetData, showBudgetInfo, }: {
    mostRecentGroupDataIsFetching: boolean;
    mostRecentGroupData: MostRecentGroupDetailsResponse | undefined;
    recentContextId: string;
    nonGroupGroupedTransactions: GroupedTransaction[];
    userInfo: UserInfo;
    navigate: NavigateFunction;
    isLoading: boolean;
    isFetching: boolean;
    groupsData: GroupsAllBalancesResponse | undefined;
    totalBalances: Details;
    topMenuTitle: Signal<string>;
    activeBudgetData: BudgetInfoResponse | undefined;
    showBudgetInfo: boolean;
}): import("react/jsx-runtime").JSX.Element;
