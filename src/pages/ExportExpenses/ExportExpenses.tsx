import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { DateTime } from 'luxon';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import MyButton from '@/components/MyButton/MyButton';
import { ScopeSelector } from '@/pages/Budget/CreateBudget/ScopeSelector/ScopeSelector';
import { ScopeSelectionMenu } from '@/components/Menus/ScopeSelectionMenu/ScopeSelectionMenu';
import { scopeBuilder } from '@/pages/Budget/CreateBudget/helpers/scopeBuilder';
import { useGetExpensesForExport } from '@/api/auth/QueryHooks/useGetExpensesForExport';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import routes from '@/routes';
import { ExpensesExportRequest, UserInfo } from '@/types';
import { StyledExportExpenses } from './ExportExpenses.styled';
import { PeriodSection } from './PeriodSection/PeriodSection';
import { DateSheet } from './DateSheet/DateSheet';
import { FormatSection } from './FormatSection/FormatSection';
import { PreviewCard } from './PreviewCard/PreviewCard';
import { PeriodPreset, presetRange } from './helpers/period';
import { describeScope } from './helpers/describeScope';
import { ExportFormat } from './export/exportModel';
import { runExport } from './export/runExport';

/**
 * Period, scope, format, in that order, then one button. The scope is the same control a budget
 * is scoped with, so "which of my expenses" means the same thing in both places.
 */
export default function ExportExpenses() {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo | undefined }>();
  const timeZone = userInfo?.timeZone ?? DateTime.local().zoneName;

  const preset = useSignal<PeriodPreset>('thisMonth');
  const [initialRange] = useState(() => presetRange('thisMonth', timeZone));
  const startDate = useSignal<string>(initialRange.startDate);
  const endDate = useSignal<string>(initialRange.endDate);
  const dateSheet = useSignal<'start' | 'end' | null>(null);

  const scopeState = useSignal({
    none: false,
    personal: true,
    group: true,
    nonGroup: true,
  });
  const targetGroupIds = useSignal<string[]>([]);
  const allGroupsSelected = useSignal<boolean>(true);
  const scopeMenu = useSignal<string | null>(null);

  const format = useSignal<ExportFormat>('pdf');
  const [status, setStatus] = useState<'idle' | 'working' | 'failed'>('idle');

  useCloseOnBack(scopeMenu.value === 'scopeSelector', () => {
    scopeMenu.value = null;
  });
  useCloseOnBack(dateSheet.value !== null, () => {
    dateSheet.value = null;
  });

  const { flags } = scopeBuilder(scopeState, allGroupsSelected, targetGroupIds);
  const hasScope = flags !== 0;
  const scopeText = describeScope(
    scopeState.value,
    allGroupsSelected.value,
    targetGroupIds.value.length
  );

  const request = useMemo<ExpensesExportRequest | null>(
    () =>
      hasScope
        ? {
            startDate: startDate.value,
            endDate: endDate.value,
            scope: flags,
            targetGroupIds: allGroupsSelected.value ? [] : targetGroupIds.value,
          }
        : null,
    [
      hasScope,
      startDate.value,
      endDate.value,
      flags,
      allGroupsSelected.value,
      targetGroupIds.value,
    ]
  );

  const query = useGetExpensesForExport(request);
  // The previous answer is kept while a new one loads, which is wanted between periods but not
  // once there is nothing to ask for: the button must not export what the last scope said.
  const data = hasScope ? query.data : undefined;
  const { isFetching, isError, refetch } = query;
  const count = data?.expenses.length ?? 0;

  const applyPreset = (next: PeriodPreset) => {
    preset.value = next;
    if (next === 'custom') return;

    const range = presetRange(next, timeZone);
    startDate.value = range.startDate;
    endDate.value = range.endDate;
  };

  // A day on the wrong side of the other one drags it along rather than raising an error: the
  // person has said which day they meant, and the fix is obvious.
  const pickDay = (target: 'start' | 'end', day: string) => {
    preset.value = 'custom';
    if (target === 'start') {
      startDate.value = day;
      if (day > endDate.value) endDate.value = day;
    } else {
      endDate.value = day;
      if (day < startDate.value) startDate.value = day;
    }
  };

  const handleExport = async () => {
    if (!data || count === 0 || status === 'working') return;

    setStatus('working');
    try {
      await runExport(format.value, data, {
        startDate: startDate.value,
        endDate: endDate.value,
        scope: scopeText,
        timeZone,
      });
      setStatus('idle');
    } catch (error) {
      console.error('Export failed:', error);
      setStatus('failed');
    }
  };

  return (
    <StyledExportExpenses>
      <TopBarWithBackButton
        header="Export expenses"
        onClick={() => navigate(routes.ROOT)}
      />

      <div className="stepScroll">
        <PeriodSection
          preset={preset.value}
          startDate={startDate.value}
          endDate={endDate.value}
          timeZone={timeZone}
          onPreset={applyPreset}
          onPick={(target) => (dateSheet.value = target)}
        />

        <div className="section">
          <ScopeSelector
            onClick={() => (scopeMenu.value = 'scopeSelector')}
            scopeState={scopeState}
            targetGroupIds={targetGroupIds}
            allGroupsSelected={allGroupsSelected}
            $inputError={!hasScope}
            infoText="Choose which kinds of expense go in the file: your personal ones, quick splits, and any or all of your groups."
          />
          <div className={`sectionNote${hasScope ? '' : ' warning'}`}>
            {hasScope
              ? 'Which of your expenses to include.'
              : 'Choose at least one kind of expense.'}
          </div>
        </div>

        <FormatSection
          value={format.value}
          onChange={(next) => (format.value = next)}
        />

        <PreviewCard
          data={data}
          isFetching={isFetching}
          isError={isError}
          hasScope={hasScope}
          onRetry={() => refetch()}
        />
      </div>

      <div className="submitButton">
        <MyButton
          fontSize="16"
          onClick={handleExport}
          isLoading={status === 'working'}
          disabled={!data || count === 0 || isFetching}
        >
          {format.value === 'pdf' ? 'Export PDF' : 'Export Excel'}
        </MyButton>
        {status === 'failed' && (
          <div className="errorMsg">
            Something went wrong while making the file. Please try again.
          </div>
        )}
      </div>

      {scopeMenu.value === 'scopeSelector' && (
        <ScopeSelectionMenu
          menu={scopeMenu}
          scopeState={scopeState}
          targetGroupIds={targetGroupIds}
          allGroupsSelected={allGroupsSelected}
          hint="Pick which of your expenses go in the file."
        />
      )}

      {dateSheet.value && (
        <DateSheet
          target={dateSheet.value}
          day={dateSheet.value === 'start' ? startDate.value : endDate.value}
          timeZone={timeZone}
          onPick={(day) => {
            pickDay(dateSheet.value!, day);
            dateSheet.value = null;
          }}
          onClose={() => (dateSheet.value = null)}
        />
      )}
    </StyledExportExpenses>
  );
}
