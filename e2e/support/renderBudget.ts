import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, type Page, type TestInfo } from '@playwright/test';

const BASELINE_FILE = fileURLToPath(
  new URL('../render-baselines.json', import.meta.url)
);
const UPDATE_BASELINES = process.env.UPDATE_RENDER_BASELINES === '1';
const SETTLE_MS = 800;
const TRACKED_COMPONENTS = 30;

type ProbeRow = {
  name: string;
  renders: number;
  mounts: number;
  updates: number;
  parentDriven: number;
  updatesNoPropChange: number;
  selfTimeMs: number;
  props: Array<{ name: string; changed: number; sameValue: number }>;
};

export type ProbeReport = {
  scenario: string;
  durationMs: number;
  totalRenders: number;
  components: ProbeRow[];
};

type ProbeWindow = {
  __renderProbe: { reset(label: string): unknown; stop(): ProbeReport };
};

type Budget = {
  totalRenders: number;
  parentDriven: number;
  components: Record<string, number>;
};

const isAppComponent = (name: string) =>
  /^[A-Z]/.test(name) && !/^(Styled|Anonymous)/.test(name);

const summarize = (report: ProbeReport): Budget => {
  const rows = report.components.filter((row) => isAppComponent(row.name));
  return {
    totalRenders: rows.reduce((sum, row) => sum + row.renders, 0),
    parentDriven: rows.reduce((sum, row) => sum + row.parentDriven, 0),
    components: Object.fromEntries(
      rows
        .slice(0, TRACKED_COMPONENTS)
        .map((row) => [row.name, row.renders])
    ),
  };
};

const readBaselines = (): Record<string, Budget> =>
  fs.existsSync(BASELINE_FILE)
    ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'))
    : {};

const writeBaselines = (baselines: Record<string, Budget>) => {
  const sorted = Object.fromEntries(
    Object.keys(baselines)
      .sort()
      .map((key) => [key, baselines[key]])
  );
  fs.writeFileSync(BASELINE_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
};

const allowed = (baseline: number) =>
  baseline + Math.max(2, Math.ceil(baseline * 0.15));

export async function measureRenders(
  page: Page,
  scenario: string,
  action: () => Promise<void>
): Promise<ProbeReport> {
  await page.waitForFunction(() => '__renderProbe' in window);
  await page.evaluate(
    (label) => (window as unknown as ProbeWindow).__renderProbe.reset(label),
    scenario
  );
  await action();
  await page.waitForTimeout(SETTLE_MS);
  return page.evaluate(() =>
    (window as unknown as ProbeWindow).__renderProbe.stop()
  );
}

export async function expectWithinRenderBudget(
  report: ProbeReport,
  testInfo: TestInfo
) {
  await testInfo.attach(`renders-${report.scenario}.json`, {
    body: JSON.stringify(report, null, 2),
    contentType: 'application/json',
  });

  const actual = summarize(report);
  const baselines = readBaselines();
  const baseline = baselines[report.scenario];

  if (!baseline || UPDATE_BASELINES) {
    baselines[report.scenario] = actual;
    writeBaselines(baselines);
    testInfo.annotations.push({
      type: 'render baseline',
      description: `${baseline ? 'updated' : 'recorded'} for "${report.scenario}"`,
    });
    return;
  }

  const overBudget: string[] = [];
  if (actual.totalRenders > allowed(baseline.totalRenders)) {
    overBudget.push(
      `total renders ${actual.totalRenders} (baseline ${baseline.totalRenders})`
    );
  }
  if (actual.parentDriven > allowed(baseline.parentDriven)) {
    overBudget.push(
      `parent-driven renders ${actual.parentDriven} (baseline ${baseline.parentDriven})`
    );
  }
  for (const [name, renders] of Object.entries(actual.components)) {
    const expected = baseline.components[name] ?? 0;
    if (renders > allowed(expected)) {
      overBudget.push(`${name}: ${renders} renders (baseline ${expected})`);
    }
  }

  expect(
    overBudget,
    `Render budget exceeded for "${report.scenario}". If the increase is intended, rerun with UPDATE_RENDER_BASELINES=1.`
  ).toEqual([]);
}
