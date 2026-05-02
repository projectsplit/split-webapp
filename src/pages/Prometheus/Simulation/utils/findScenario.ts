import { SimulationScenario } from '../interfaces';

export const findScenario = (
  scenarios: SimulationScenario[],
  percentile: number,
): SimulationScenario | undefined =>
  scenarios.find((s) => s.percentile === percentile);
