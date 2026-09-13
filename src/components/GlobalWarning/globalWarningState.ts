import { signal } from '@preact/signals-react';
import axios, { AxiosError } from 'axios';

export const globalWarningMenu = signal<string | null>(null);
export const globalWarningMessage = signal<string>('');

export const showGlobalWarning = (message: string) => {
  globalWarningMessage.value = message;
  globalWarningMenu.value = 'generalWarning';
};

export const isSilentError = (error: unknown): boolean => {
  if (axios.isCancel(error)) return true;

  const axiosError = error as AxiosError;

  if (axiosError?.code === 'ERR_CANCELED') return true;
  if (axiosError?.response?.status === 401) return true;

  return false;
};

export const messageFromError = (error: unknown, fallback: string): string => {
  const data = (error as AxiosError)?.response?.data;

  return typeof data === 'string' && data.length > 0 ? data : fallback;
};
