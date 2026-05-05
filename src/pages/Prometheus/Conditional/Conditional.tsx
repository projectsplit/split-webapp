import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { MdCalculate, MdAdd, MdArrowBack } from 'react-icons/md';
import { usePrometheusMode } from '../usePrometheusMode';
import { useGetRiskFactors } from '@/api/auth/QueryHooks/useGetRiskFactors';
import { useRunConditionalQuery } from '@/api/auth/CommandHooks/useRunConditionalQuery';
import { SimNav } from '../Simulation/components/SimNav/SimNav';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';
import { Condition, ConditionalQueryResponse } from './interfaces';
import { ResultHero } from './components/ResultHero/ResultHero';
import { NarrativePanel } from './components/NarrativePanel/NarrativePanel';
import { RiskSelector } from './components/RiskSelector/RiskSelector';
import { AddConditionDrawer } from './components/AddConditionDrawer/AddConditionDrawer';
import {
  PageRoot,
  Main,
  PageHeader,
  BackLink,
  PageTitle,
  ContentGrid,
  LeftColumn,
  RightColumn,
  FAB,
  Vignette,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  EmptyButton,
} from './Conditional.styled';

export const ConditionalProbability = () => {
  usePrometheusMode();
  const navigate = useNavigate();
  const { data: factors } = useGetRiskFactors();

  const serverErrors = useSignal<any[]>([]);
  const conditions = useSignal<Condition[]>([]);

  const { mutateAsync, isPending } = useRunConditionalQuery(serverErrors);
  const [response, setResponse] = useState<ConditionalQueryResponse | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRun = useCallback(async () => {
    if (isPending || conditions.value.length === 0) return;
    try {
      const result = await mutateAsync({ conditions: conditions.value });
      setResponse(result);
    } catch {
      /* captured by onError */
    }
  }, [isPending, conditions, mutateAsync]);

  return (
    <PageRoot>
      <SimulationWaveOverlay isActive={isPending} isResim={true} />
      <SimNav activeKey="condprob" />
      <Main>
        <PageHeader>
          <BackLink onClick={() => navigate('/prometheus/simulations')}>
            <MdArrowBack /> Back to Simulations
          </BackLink>
          <PageTitle>Conditional Probability</PageTitle>
        </PageHeader>

        {response ? (
          <ContentGrid>
            <LeftColumn>
              <ResultHero
                response={response}
                conditions={conditions.value}
              />
              <NarrativePanel narrative={response.narrative} />
            </LeftColumn>
            <RightColumn>
              <RiskSelector
                conditions={conditions}
                factors={factors}
                onAddClick={() => setDrawerOpen(true)}
                onRun={handleRun}
                isPending={isPending}
              />
            </RightColumn>
          </ContentGrid>
        ) : (
          <>
            <ContentGrid>
              <LeftColumn>
                <EmptyState>
                  <EmptyIcon>
                    <MdCalculate />
                  </EmptyIcon>
                  <EmptyTitle>Define Your Conditions</EmptyTitle>
                  <EmptyText>
                    Add risk factors and set thresholds to query conditional
                    probabilities of ruin across simulation paths.
                  </EmptyText>
                  <EmptyButton onClick={() => setDrawerOpen(true)}>
                    ADD FIRST CONDITION
                  </EmptyButton>
                </EmptyState>
              </LeftColumn>
              <RightColumn>
                <RiskSelector
                  conditions={conditions}
                  factors={factors}
                  onAddClick={() => setDrawerOpen(true)}
                  onRun={handleRun}
                  isPending={isPending}
                />
              </RightColumn>
            </ContentGrid>
          </>
        )}
      </Main>

      <FAB onClick={() => setDrawerOpen(true)}>
        <MdAdd /> ADD CONDITION
      </FAB>

      <AddConditionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        conditions={conditions}
        factors={factors}
      />

      <Vignette />
    </PageRoot>
  );
};
