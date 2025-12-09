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

export enum SimulationStep {
  INITIAL = 'INITIAL',
  SELECTED = 'SELECTED',
  COMBINED = 'COMBINED'
}