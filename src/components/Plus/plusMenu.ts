import { signal } from '@preact/signals-react';

/**
 * Whether the Plus sheet is up. One signal for the whole app rather than a value on each page's
 * own menu signal, because the Plus mark appears in places that own different menus (the home
 * page, the analytics and budget pages, the search sheet, settings) and the explanation behind it
 * is the same everywhere. The sheet itself is mounted once, in Protected.
 */
export const plusMenu = signal<'plus' | null>(null);

export const openPlusInfo = () => {
  plusMenu.value = 'plus';
};

export const closePlusInfo = () => {
  plusMenu.value = null;
};
