import { AxiosError } from 'axios';
import { UserInfo } from '../../../types';
export declare const useSetPushNotificationsEnabled: () => import("@tanstack/react-query").UseMutationResult<void, AxiosError<unknown, any>, boolean, {
    previousUserInfo: UserInfo | undefined;
}>;
