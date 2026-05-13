import { lazy } from 'react';

const loaders = {
  Group: () => import('@/pages/TransactionsWrappers/Group'),
  NonGroup: () => import('@/pages/TransactionsWrappers/NonGroup'),
  Expenses: () => import('@/pages/Expenses/Expenses'),
  Transfers: () => import('@/pages/Transfers/Transfers'),
  Members: () => import('@/pages/Members/Members'),
  Analytics: () => import('@/pages/Analytics/Analytics'),
  Budget: () => import('@/pages/Budget/Budget'),
  CreateBudget: () => import('@/pages/Budget/CreateBudget/CreateBudget'),
  Shared: () => import('@/pages/Groups/Shared'),
  GenerateInvitationCode: () =>
    import('@/pages/GenerateInvitationCode/GenerateInvitationCode'),
  Personal: () =>
    import('@/pages/Personal/Personal').then((m) => ({ default: m.Personal })),
  BudgetActions: () =>
    import('@/pages/Budget/BudgetActions/BudgetActions').then((m) => ({
      default: m.BudgetActions,
    })),
  ManageBudgets: () =>
    import('@/pages/Budget/ManageBudgets/ManageBudgets').then((m) => ({
      default: m.ManageBudgets,
    })),
};

export const Group = lazy(loaders.Group);
export const NonGroup = lazy(loaders.NonGroup);
export const Expenses = lazy(loaders.Expenses);
export const Transfers = lazy(loaders.Transfers);
export const Members = lazy(loaders.Members);
export const Analytics = lazy(loaders.Analytics);
export const Budget = lazy(loaders.Budget);
export const CreateBudget = lazy(loaders.CreateBudget);
export const Shared = lazy(loaders.Shared);
export const GenerateInvitationCode = lazy(loaders.GenerateInvitationCode);
export const Personal = lazy(loaders.Personal);
export const BudgetActions = lazy(loaders.BudgetActions);
export const ManageBudgets = lazy(loaders.ManageBudgets);

let prewarmStarted = false;

export const prewarmRoutes = () => {
  if (prewarmStarted) return;
  prewarmStarted = true;

  const run = () => {
    Object.values(loaders).forEach((load) => {
      load().catch(() => {
        prewarmStarted = false;
      });
    });
  };

  if (typeof window === 'undefined') return;
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1500);
  }
};
