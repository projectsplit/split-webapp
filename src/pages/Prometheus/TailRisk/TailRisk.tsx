import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { MdSmartDisplay, MdArrowBack, MdSettings, MdPlayArrow } from 'react-icons/md';
import { usePrometheusMode } from '../usePrometheusMode';
import { usePrometheusSetup, useSimulationResponse } from '../PrometheusProvider';
import { useGetCalculatedWealth } from '@/api/auth/QueryHooks/useGetCalculatedWealth';
import { useRunTailDrivers } from '@/api/auth/CommandHooks/useRunTailDrivers';
import { SimNav } from '../Simulation/components/SimNav/SimNav';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';
import {
  TailDriversResponse,
  TailDriversRequest,
  DEFAULT_TAIL_REQUEST,
} from './interfaces';
import { HeadlineBanner } from './components/HeadlineBanner/HeadlineBanner';
import { SimulationNarrative } from './components/SimulationNarrative/SimulationNarrative';
import { ZScoreTornado } from './components/ZScoreTornado/ZScoreTornado';
import { CombinationRisks } from './components/CombinationRisks/CombinationRisks';
import { PathwaysToRuin } from './components/PathwaysToRuin/PathwaysToRuin';
import { ConcentrationGuide } from './components/ConcentrationGuide/ConcentrationGuide';
import { EngineSettings } from './components/EngineSettings/EngineSettings';
import { FAB } from './components/EngineSettings/EngineSettings.styled';
import {
  PageRoot,
  Main,
  PageHeader,
  TopRow,
  BackLink,
  PageTitle,
  Subtitle,
  SplitGrid,
  Vignette,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  EmptyButton,
} from './TailRisk.styled';

export const TailRisk = () => {
  usePrometheusMode();
  const navigate = useNavigate();
  const setup = usePrometheusSetup();
  const bondTenor = setup.value.financials.bond_tenor;
  const simulationResponse = useSimulationResponse();
  const { data: fetchedWealth } = useGetCalculatedWealth();
  const simResult = simulationResponse.value ?? fetchedWealth ?? null;
  const currency = simResult?.economy?.requested?.toUpperCase() ?? 'USD';

  const serverErrors = useSignal<any[]>([]);
  const { mutateAsync, isPending } = useRunTailDrivers(serverErrors);

  const [request, setRequest] = useState<Required<TailDriversRequest>>({
    ...DEFAULT_TAIL_REQUEST,
  });
  const [response, setResponse] = useState<TailDriversResponse | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleRun = useCallback(async () => {
    if (isPending) return;
    try {
      const result = await mutateAsync(request);
      setResponse(result);
      setSettingsOpen(false);
    } catch {
      /* captured by onError */
    }
  }, [isPending, mutateAsync, request]);

  return (
    <PageRoot>
      <SimulationWaveOverlay isActive={isPending} isResim={true} />
      <SimNav activeKey="tail" />

      <Main>
        <PageHeader>
          <TopRow>
            <BackLink onClick={() => navigate('/prometheus/simulations')}>
              <MdArrowBack /> Back to Simulations
            </BackLink>
            <PageTitle>Tail Risk Analysis</PageTitle>
            <Subtitle>Drivers & pathways behind ruin scenarios</Subtitle>
          </TopRow>
          {response && (
            <HeadlineBanner
              tailLabel={response.tail_label}
              archetype={response.archetype}
              baselinePBust={response.baseline_p_bust}
              headline={response.narrative?.headline}
            />
          )}
        </PageHeader>

        {response ? (
          <>
            {response.narrative && (
              <SimulationNarrative narrative={response.narrative} />
            )}

            <SplitGrid>
              <ZScoreTornado
                rows={response.zscores}
                bondTenor={bondTenor}
                currency={currency}
              />
              <CombinationRisks
                pairs={response.pairs}
                bondTenor={bondTenor}
                maxPairs={5}
              />
            </SplitGrid>

            <PathwaysToRuin
              pathways={response.pathways}
              bondTenor={bondTenor}
              currency={currency}
            />

            <ConcentrationGuide />
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <MdSmartDisplay />
            </EmptyIcon>
            <EmptyTitle>Decompose the Tail</EmptyTitle>
            <EmptyText>
              Run a multi-factor analysis on the worst paths from your
              simulation. Identify which factors concentrate in the tail, where
              they interact, and the specific scenarios that drive ruin.
            </EmptyText>
            <EmptyButton onClick={handleRun} disabled={isPending}>
              <MdPlayArrow />
              {isPending ? 'RUNNING...' : 'RUN TAIL ANALYSIS'}
            </EmptyButton>
          </EmptyState>
        )}
      </Main>

      {response && (
        <FAB onClick={() => setSettingsOpen(true)} type="button">
          <MdSettings />
        </FAB>
      )}

      <EngineSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        request={request}
        onChange={setRequest}
        onRun={handleRun}
        isPending={isPending}
      />

      <Vignette />
    </PageRoot>
  );
};
