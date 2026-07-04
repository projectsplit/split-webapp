import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { EditBudgetRequest } from '../../../types';
export declare const useEditBudget: (navigate: NavigateFunction, serverErrors: Signal<any[]>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, any, EditBudgetRequest, unknown>;
