export interface CellTone {
  background: string;
  border: string;
  text: string;
}

const NEUTRAL: CellTone = {
  background: 'rgba(53, 53, 53, 0.45)',
  border: 'rgba(77, 67, 84, 0.2)',
  text: '#cfc2d6',
};

const GREEN_LIGHT: CellTone = {
  background: '#003915',
  border: 'rgba(74, 225, 118, 0.2)',
  text: 'rgba(74, 225, 118, 0.9)',
};

const GREEN_MID: CellTone = {
  background: '#004d20',
  border: 'rgba(74, 225, 118, 0.4)',
  text: '#4ae176',
};

const GREEN_STRONG: CellTone = {
  background: '#008c3d',
  border: 'rgba(74, 225, 118, 0.6)',
  text: '#e2fce9',
};

const RED_LIGHT: CellTone = {
  background: '#4a1a1e',
  border: 'rgba(255, 180, 171, 0.25)',
  text: '#ffb4ab',
};

const RED_STRONG: CellTone = {
  background: '#690005',
  border: 'rgba(255, 180, 171, 0.5)',
  text: '#ffdad6',
};

export const toneForValue = (value: number): CellTone => {
  const abs = Math.abs(value);
  if (abs < 0.15) return NEUTRAL;
  if (value > 0) {
    if (abs > 0.6) return GREEN_STRONG;
    if (abs > 0.3) return GREEN_MID;
    return GREEN_LIGHT;
  }
  if (abs > 0.3) return RED_STRONG;
  return RED_LIGHT;
};

export const formatCorrelation = (value: number): string => {
  const rounded = Math.round(value * 100) / 100;
  const sign = rounded < 0 ? '-' : '+';
  return `${sign}${Math.abs(rounded).toFixed(2)}`;
};

export const splitCorrelation = (
  value: number
): { sign: string; magnitude: string } => {
  const rounded = Math.round(value * 100) / 100;
  return {
    sign: rounded < 0 ? '−' : '+',
    magnitude: Math.abs(rounded).toFixed(2),
  };
};
