export declare const useGetUsernameStatus: (username: string | undefined) => import("@tanstack/react-query").UseQueryResult<GetUsernameStatusResponse, Error>;
type GetUsernameStatusResponse = {
    isValid: boolean;
    errorMessage: string | null;
    isAvailable: boolean;
};
export {};
