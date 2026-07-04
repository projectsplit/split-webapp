import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
export declare const useCreatePersonalExpense: (menu: Signal<string | null>, navigate: NavigateFunction, setIsSubmitting: (value: boolean) => void, makePersonalClicked?: boolean) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, import("../../../types").BaseExpenseRequest, unknown>;
