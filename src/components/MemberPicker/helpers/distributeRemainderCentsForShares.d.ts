import { PickerMember } from '../../../types';
export declare function distributeRemainderCentsForShares(decimalDigits: number, totalAmount: number, synchronizedFormMembers: PickerMember[]): {
    adjustedToOriginalAmount: {
        id: string;
        amount: string;
    }[];
};
