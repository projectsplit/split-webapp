export declare const useGetJoinCode: (code: string) => import("@tanstack/react-query").UseQueryResult<GetJoinCodeResponse, Error>;
type GetJoinCodeResponse = {
    isAlreadyMember: boolean;
    groupId: string;
    groupName: string;
    isExpired: boolean;
};
export {};
