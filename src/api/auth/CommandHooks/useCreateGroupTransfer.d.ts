import { AxiosError } from 'axios';
import { CreateTransferRequest, Group } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
export declare const useCreateGroupTransfer: (menu: Signal<string | null>, groupId: string | undefined, navigate: NavigateFunction, isSubmitting: Signal<boolean>, fromHomeGroup?: Signal<Group | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, CreateTransferRequest, unknown>;
