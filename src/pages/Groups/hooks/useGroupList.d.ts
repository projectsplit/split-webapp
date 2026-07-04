import { Signal } from '@preact/signals-react';
export declare function useGroupsList(pageSize: number, debouncedKeyword: string, activeGroupCatAsState: Signal<string>): {
    filteredGroups: {
        details: import("../../../types").Details;
        id: string;
        name: string;
        currency: string;
        isArchived: boolean;
    }[];
    fetchNextPage: (options?: import("@tanstack/query-core").FetchNextPageOptions) => Promise<import("@tanstack/query-core").InfiniteQueryObserverResult<import("@tanstack/query-core").InfiniteData<import("../../../types").GroupsTotalAmountsResponse, unknown>, Error>>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isFetching: boolean;
    isLoading: boolean;
};
