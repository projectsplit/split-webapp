import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { CreateBudgetRequest } from '../../../types';
export declare const useCreateBudget: (navigate: NavigateFunction, serverErrors: Signal<any[]>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, any, CreateBudgetRequest, unknown>;
