import { signal } from '@preact/signals-react';

/**
 * Whether the Plus sheet is up. One signal for the whole app rather than a value on each page's
 * own menu signal, because the sheet opens from places that own different menus (the home page's
 * Plus marks, settings, the support sheet) and the explanation behind it is the same everywhere.
 * The sheet itself is mounted once, in Protected.
 */
export const plusMenu = signal<'plus' | null>(null);

export const openPlusInfo = () => {
  plusMenu.value = 'plus';
};

export const closePlusInfo = () => {
  plusMenu.value = null;
};
