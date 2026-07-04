import { AxiosResponse } from 'axios';
import { Mode, User } from '@/types';
type Users = {
    users: User[];
};
export declare const useGetNonGroupExpensesUsers: (mode: Mode) => import("@tanstack/react-query").UseQueryResult<AxiosResponse<Users, any>, Error>;
export {};
