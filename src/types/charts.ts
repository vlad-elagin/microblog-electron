export interface BarChartDataItem {
  name: string;
  age: number;
}

export type BarChartData = BarChartDataItem[];

export interface GroupedBarChartDataItem {
  company: string;
  income: number;
  expenses: number;
  [key: string]: string | number;
}

export type GroupedBarChartData = GroupedBarChartDataItem[];

export interface ChartDimensions {
  width: number;
  height: number;
  barWidth?: number;
  barPadding?: number;
}

export interface BarChartDimensions extends ChartDimensions {
  barWidth: number;
  barPadding: number;
}

export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
