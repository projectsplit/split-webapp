import { Mode, User } from '../../../types';
export declare const useGetAllNonGroupUsers: (mode: Mode) => {
    allUsers: User[];
    isLoading: boolean;
    isError: boolean;
};
