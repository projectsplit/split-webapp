import React from 'react';
import { Signal } from '@preact/signals-react';
interface UseCategorySwipeParams {
    categories: Record<string, string | undefined>;
    activeCat: string;
    navLinkUse: boolean;
    activeCatAsState?: Signal<string>;
}
export declare const useCategorySwipe: ({ categories, activeCat, navLinkUse, activeCatAsState, }: UseCategorySwipeParams) => {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
};
export {};
