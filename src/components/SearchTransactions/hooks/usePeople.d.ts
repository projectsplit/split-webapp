import { EnhancedPeopleWithProps, FetchedPeople, Group, UserInfo } from '../../../types';
export declare const usePeople: (group: Group | null, userInfo: UserInfo | undefined, isPersonal?: boolean) => {
    fetchedPeople: FetchedPeople;
    enhancedPeopleWithProps: EnhancedPeopleWithProps;
    allUsers: import("../../../types").User[];
};
