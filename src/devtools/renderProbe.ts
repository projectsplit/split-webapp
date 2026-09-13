import { scan } from 'react-scan';

type Render = {
  phase: number; // 1 mount, 2 update, 4 unmount
  componentName: string | null;
  time: number | null;
  count: number;
};

type PropStat = { changed: number; sameValue: number };

type ComponentStat = {
  name: string;
  mounts: number;
  updates: number;
  updatesNoPropChange: number;
  parentDriven: number;
  selfTimeMs: number;
  props: Record<string, PropStat>;
};

type ReportRow = {
  name: string;
  renders: number;
  mounts: number;
  updates: number;
  parentDriven: number;
  updatesNoPropChange: number;
  selfTimeMs: number;
  props: Array<{ name: string; changed: number; sameValue: number }>;
};

type Report = {
  scenario: string;
  durationMs: number;
  totalRenders: number;
  components: Array<ReportRow>;
};

const stats = new Map<string, ComponentStat>();
let scenario = 'unlabelled';
let startedAt = performance.now();
let collecting = false;

function statFor(name: string): ComponentStat {
  let s = stats.get(name);
  if (!s) {
    s = {
      name,
      mounts: 0,
      updates: 0,
      updatesNoPropChange: 0,
      parentDriven: 0,
      selfTimeMs: 0,
      props: {},
    };
    stats.set(name, s);
  }
  return s;
}

function displayName(fiber: any, render: Render): string {
  if (render.componentName) return render.componentName;
  const t = fiber?.type;
  if (typeof t === 'string') return t;
  const resolved =
    t?.displayName ?? t?.name ?? t?.render?.displayName ?? t?.render?.name;
  return typeof resolved === 'string' && resolved ? resolved : 'Anonymous';
}

function sameValue(a: unknown, b: unknown, depth = 0): boolean {
  if (Object.is(a, b)) return true;
  if (depth > 3) return false;
  if (typeof a === 'function' && typeof b === 'function') {
    const sa = a.toString();
    return sa.length < 4000 && sa === b.toString();
  }
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  )
    return false;

  const ea = a as Record<string, unknown>;
  const eb = b as Record<string, unknown>;

  if (ea.$$typeof || eb.$$typeof) {
    return (
      ea.$$typeof === eb.$$typeof &&
      ea.type === eb.type &&
      ea.key === eb.key &&
      sameValue(ea.props, eb.props, depth + 1)
    );
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length || a.length > 200) return false;
    return a.every((v, i) => sameValue(v, b[i], depth + 1));
  }

  const ka = Object.keys(ea);
  const kb = Object.keys(eb);
  if (ka.length !== kb.length || ka.length > 100) return false;
  return ka.every((k) => k in eb && sameValue(ea[k], eb[k], depth + 1));
}

function isEffectLike(v: unknown): boolean {
  return (
    !!v &&
    typeof v === 'object' &&
    ('create' in (v as object) || 'destroy' in (v as object))
  );
}

function hookStateChanged(fiber: any): boolean {
  if (typeof fiber?.type === 'string') return false;
  let a = fiber?.memoizedState;
  let b = fiber?.alternate?.memoizedState;
  let guard = 0;
  while (a && b && guard++ < 500) {
    const va = a.memoizedState;
    const vb = b.memoizedState;
    if (!Object.is(va, vb) && !isEffectLike(va) && !isEffectLike(vb))
      return true;
    a = a.next;
    b = b.next;
  }
  return false;
}

function recordProps(stat: ComponentStat, fiber: any): number {
  const next = (fiber?.memoizedProps ?? {}) as Record<string, unknown>;
  const prev = (fiber?.alternate?.memoizedProps ?? {}) as Record<
    string,
    unknown
  >;
  if (next === prev) return 0;

  const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);
  let changed = 0;

  for (const key of keys) {
    if (Object.is(prev[key], next[key])) continue;
    changed += 1;
    const p = (stat.props[key] ??= { changed: 0, sameValue: 0 });
    p.changed += 1;
    try {
      if (sameValue(prev[key], next[key])) p.sameValue += 1;
    } catch {}
  }
  return changed;
}

function record(fiber: any, renders: Array<Render>) {
  if (!collecting) return;

  for (const render of renders ?? []) {
    const stat = statFor(displayName(fiber, render));
    const count = render.count > 0 ? render.count : 1;
    if (typeof render.time === 'number') stat.selfTimeMs += render.time;

    if (render.phase !== 2 || !fiber?.alternate) {
      stat.mounts += count;
      continue;
    }

    stat.updates += count;
    try {
      const changed = recordProps(stat, fiber);
      if (changed === 0) {
        stat.updatesNoPropChange += count;
        if (!hookStateChanged(fiber)) stat.parentDriven += count;
      }
    } catch {}
  }
}

function buildReport(): Report {
  const components: Array<ReportRow> = [...stats.values()]
    .map((s) => ({
      name: s.name,
      renders: s.mounts + s.updates,
      mounts: s.mounts,
      updates: s.updates,
      parentDriven: s.parentDriven,
      updatesNoPropChange: s.updatesNoPropChange,
      selfTimeMs: Math.round(s.selfTimeMs * 100) / 100,
      props: Object.entries(s.props)
        .map(([name, v]) => ({
          name,
          changed: v.changed,
          sameValue: v.sameValue,
        }))
        .sort((a, b) => b.sameValue - a.sameValue || b.changed - a.changed),
    }))
    .sort((a, b) => b.renders - a.renders);

  return {
    scenario,
    durationMs: Math.round(performance.now() - startedAt),
    totalRenders: components.reduce((n, c) => n + c.renders, 0),
    components,
  };
}

const probe = {
  reset(label = 'unlabelled') {
    stats.clear();
    scenario = label;
    startedAt = performance.now();
    collecting = true;
    return { scenario, collecting };
  },
  stop(): Report {
    collecting = false;
    return buildReport();
  },
  report(minRenders = 1): Report {
    const full = buildReport();
    return {
      ...full,
      components: full.components.filter((c) => c.renders >= minRenders),
    };
  },
  json(minRenders = 1): string {
    return JSON.stringify(probe.report(minRenders));
  },
  suspects(): Array<ReportRow> {
    return probe
      .report()
      .components.filter(
        (c) => c.parentDriven > 0 || c.props.some((p) => p.sameValue > 0)
      )
      .map((c) => ({ ...c, props: c.props.filter((p) => p.sameValue > 0) }));
  },
};

declare global {
  interface Window {
    __renderProbe: typeof probe;
  }
}

window.__renderProbe = probe;

scan({
  enabled: true,
  log: false,
  showToolbar: false,
  animationSpeed: 'off',
  onRender: record as unknown as NonNullable<
    Parameters<typeof scan>[0]
  >['onRender'],
});

console.info(
  '[renderProbe] armed — window.__renderProbe.reset("label") to start a scenario'
);
