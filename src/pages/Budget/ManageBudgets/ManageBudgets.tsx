import MyButton from '@/components/MyButton/MyButton';
import { StyledManageBudgets } from './ManageBudgets.styled';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import useGetInactiveBudgetInfo from '@/api/auth/QueryHooks/useGetInactiveBudgetInfo';
import Spinner from '@/components/Spinner/Spinner';
import ManageBudgetAnimation from '@/components/Animations/BudgetAnimations/ManageBudgetAnimation';
import { useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import DeleteBudgetConfirmationAnimation from '@/components/Animations/BudgetAnimations/DeleteBudgetConfirmationAnimation';
import { useDeleteBudget } from '@/api/auth/CommandHooks/useDeleteBudget';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { BudgetScope, UserInfo } from '@/types';
import { BudgetCard } from './BudgetCard';

type BudgetRow = {
  id: string;
  name: string;
  scope: BudgetScope;
  targetGroupIds?: string[];
  startDate: string;
  endDate: string;
  spent: number;
  goal: number;
  currency: string;
  isActive: boolean;
  showAsActive: boolean;
  raw: any;
};

export const ManageBudgets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = useSignal<string | null>(null);
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const timeZoneId = userInfo?.timeZone;

  const { data: activeBudgetData, isFetching: activeBudgetsIsFetching } =
    useBudgetInfo();
  const { data: inactiveBudgetsData, isFetching: inactiveBudgetsIsFetching } =
    useGetInactiveBudgetInfo();
  const errorMessage = useSignal<string>('');
  const { mutate: deleteBudget, isPending } = useDeleteBudget(
    menu,
    errorMessage
  );
  const { mutate: toggleBudget } = useToggleBudget();

  const inactiveBudgets = inactiveBudgetsData?.budgets ?? [];

  const liveModel: BudgetRow[] = [];
  if (activeBudgetData?.id) {
    liveModel.push({
      id: activeBudgetData.id,
      name: activeBudgetData.description || 'Budget',
      scope: activeBudgetData.scope,
      targetGroupIds: activeBudgetData.targetGroupIds,
      startDate: activeBudgetData.startDate,
      endDate: activeBudgetData.endDate,
      spent: parseFloat(activeBudgetData.totalAmountSpent ?? '0'),
      goal: parseFloat(activeBudgetData.goal ?? '0'),
      currency: activeBudgetData.currency,
      isActive: true,
      showAsActive: true,
      raw: activeBudgetData,
    });
  }
  inactiveBudgets.forEach((budget) => {
    liveModel.push({
      id: budget.id,
      name: budget.description || 'Budget',
      scope: budget.scope,
      targetGroupIds: budget.targetGroupIds,
      startDate: budget.startDate,
      endDate: budget.endDate,
      spent: 0,
      goal: parseFloat(budget.amount ?? '0'),
      currency: budget.currency,
      isActive: false,
      showAsActive: false,
      raw: budget,
    });
  });

  const loadedOnce = useRef(false);
  if (activeBudgetData !== undefined || inactiveBudgetsData !== undefined) {
    loadedOnce.current = true;
  }
  const firstLoad =
    !loadedOnce.current &&
    (activeBudgetsIsFetching || inactiveBudgetsIsFetching);

  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [pendingToggleId, setPendingToggleId] = useState<string | null>(null);
  const [optimistic, setOptimistic] = useState<BudgetRow[] | null>(null);

  const toggle = (budgetId: string) => {
    if (pendingToggleId) return;
    const base = optimistic ?? committed.current;
    const target = base.find((b) => b.id === budgetId);
    if (!target) return;
    const turningOn = !target.isActive;

    setOptimistic(
      base.map((b) => {
        if (b.id === budgetId) {
          return { ...b, isActive: turningOn, showAsActive: false };
        }
        if (turningOn && b.isActive) {
          return { ...b, isActive: false, showAsActive: false };
        }
        return b;
      })
    );
    setPendingToggleId(budgetId);
    toggleBudget({ budgetId }, { onSettled: () => setPendingToggleId(null) });
  };

  const committed = useRef<BudgetRow[]>(liveModel);
  const settled =
    !pendingToggleId && !activeBudgetsIsFetching && !inactiveBudgetsIsFetching;
  if (settled) committed.current = liveModel;
  const model = settled ? committed.current : (optimistic ?? committed.current);

  const openMenuFor = (budget: any) => {
    setSelectedBudget(budget);
    menu.value = 'manageBudgetMenu';
  };

  const activeRows = model.filter((b) => b.isActive);
  const inactiveRows = model.filter((b) => !b.isActive);

  const rows: { id: string; node: ReactNode }[] = [];
  const pushCard = (budget: BudgetRow) =>
    rows.push({
      id: budget.id,
      node: (
        <BudgetCard
          name={budget.name}
          scope={budget.scope}
          targetGroupIds={budget.targetGroupIds}
          startDate={budget.startDate}
          endDate={budget.endDate}
          spent={budget.spent}
          goal={budget.goal}
          currency={budget.currency}
          timeZoneId={timeZoneId}
          isActive={budget.isActive}
          pending={budget.isActive && !budget.showAsActive}
          isOn={budget.isActive}
          onToggle={() => toggle(budget.id)}
          onClick={() => openMenuFor(budget.raw)}
        />
      ),
    });

  if (activeRows.length > 0) {
    rows.push({ id: 'label-active', node: <SectionLabel title="Active" /> });
    activeRows.forEach(pushCard);
  }
  if (inactiveRows.length > 0) {
    rows.push({
      id: 'label-inactive',
      node: <SectionLabel title="Inactive" />,
    });
    inactiveRows.forEach(pushCard);
  }

  const rowOrder = rows.map((r) => r.id).join('|');

  const listRef = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const nodes = [...el.querySelectorAll<HTMLElement>('[data-flip-id]')];

    nodes.forEach((node) => {
      node.style.transition = 'none';
      node.style.transform = '';
    });

    const base = el.getBoundingClientRect().top - el.scrollTop;
    const next = new Map<string, number>();
    const moved: { node: HTMLElement; delta: number }[] = [];

    nodes.forEach((node) => {
      const id = node.dataset.flipId as string;
      const top = node.getBoundingClientRect().top - base;
      next.set(id, top);
      const previous = positions.current.get(id);
      if (previous === undefined || Math.abs(previous - top) < 1) return;
      moved.push({ node, delta: previous - top });
    });

    positions.current = next;
    if (moved.length === 0) return;

    moved.forEach(({ node, delta }) => {
      node.style.transform = `translateY(${delta}px)`;
    });
    void el.offsetHeight;

    moved.forEach(({ node }) => {
      node.style.transition = 'transform 280ms cubic-bezier(0.2, 0, 0, 1)';
    });
    void el.offsetHeight;

    moved.forEach(({ node }) => {
      node.style.transform = '';
    });
  }, [rowOrder]);

  return (
    <StyledManageBudgets>
      <TopBarWithBackButton
        header="Manage Budgets"
        onClick={() => {
          if (location.state?.fromHome) {
            navigate('/');
          } else {
            navigate('/budget');
          }
        }}
      />

      <div className="scrollContainer" ref={listRef}>
        {firstLoad ? (
          <div className="spinnerContainer">
            <Spinner />
          </div>
        ) : (
          rows.map((row) => (
            <div className="flipRow" key={row.id} data-flip-id={row.id}>
              {row.node}
            </div>
          ))
        )}
      </div>

      <div className="submitButton">
        <MyButton
          fontSize="16"
          onClick={() => navigate('/budget/create')}
          isLoading={false}
        >
          Create new budget
        </MyButton>
      </div>

      <MenuAnimationBackground menu={menu} />
      <ManageBudgetAnimation menu={menu} selectedBudget={selectedBudget} />
      <DeleteBudgetConfirmationAnimation
        menu={menu}
        deleteBudget={deleteBudget}
        selectedBudget={{
          id: selectedBudget?.id || '',
          descr: selectedBudget?.description || '',
        }}
        isLoading={isPending}
      />
    </StyledManageBudgets>
  );
};
