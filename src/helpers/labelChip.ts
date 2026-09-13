import labelColors from '../labelColors';

const FALLBACK = '#e0e0e0';

export const resolveLabelColor = (color: string | undefined) =>
  labelColors[color ?? ''] ?? FALLBACK;

export const labelChipBackground = (color: string) =>
  `color-mix(in oklab, ${color} 22%, transparent)`;

export const labelChipInk = (color: string) =>
  `color-mix(in oklab, ${color} 62%, white)`;

export const labelChipMutedInk = (color: string) =>
  `color-mix(in oklab, ${color} 80%, white)`;
