import { BudgetInfoResponse } from '@/types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
export declare const BudgetCarousel: ({ activeBudgetData, setShowBudgetInfo, setShowButton, onClick, }: BudgetCarouselProps) => import("react/jsx-runtime").JSX.Element;
interface BudgetCarouselProps {
    activeBudgetData: BudgetInfoResponse | undefined;
    setShowBudgetInfo: UseMutateAsyncFunction<any, AxiosError<unknown, any>, boolean, unknown>;
    setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}
export {};
