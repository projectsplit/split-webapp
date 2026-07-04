import { GroupRequest } from '@/types';
type GroupResponse = {
    groupId: string;
};
export declare const useCreateGroup: () => import("@tanstack/react-query").UseMutationResult<GroupResponse, any, GroupRequest, unknown>;
export {};
