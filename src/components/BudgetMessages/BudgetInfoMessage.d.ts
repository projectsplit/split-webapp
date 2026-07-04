import { BudgetInfoResponse } from '../../types';
import { DefaultTheme } from 'styled-components';
export declare const BudgetInfoMessage: (theme: DefaultTheme | undefined, closeButton: boolean, data: BudgetInfoResponse | undefined, noSubmissions?: boolean, onclick?: (event: React.MouseEvent<HTMLDivElement>) => void, style?: React.CSSProperties) => JSX.Element;
