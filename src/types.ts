export interface NavItem {
  label: string;
  id: string;
}

export interface ComparisonPoint {
  feature: string;
  btc: string;
  eth: string;
  opcat: string;
}

export const SimulationStep = {
  INITIAL: 'INITIAL',
  SELECTED: 'SELECTED',
  COMBINED: 'COMBINED'
} as const;

export type SimulationStep = (typeof SimulationStep)[keyof typeof SimulationStep];