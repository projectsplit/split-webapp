import { AxiosError } from 'axios';
import { UserInfo } from '../../../types';
export declare const useSetShowBudgetInfo: () => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, boolean, {
    previousUserInfo: UserInfo | undefined;
}>;
