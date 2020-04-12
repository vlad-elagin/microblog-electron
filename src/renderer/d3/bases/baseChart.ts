import * as d3 from 'd3';

import { ChartMargins, ChartDimensions, BarChartDataItem } from '../../../types/charts';

export default abstract class BaseChart {
  canvas: d3.Selection<SVGGElement, unknown, null, undefined>;

  sizes: ChartDimensions;

  margins: ChartMargins;

  constructor(node: HTMLElement, sizes: ChartDimensions, margins: ChartMargins) {
    this.sizes = sizes;
    this.margins = margins;

    // create main svg group to be a canvas
    this.canvas = d3
      .select(node)
      .append('svg')
      .attr('preserveAspectRation', 'xMinYMin meet')
      .attr(
        'viewBox',
        `0 0 ${sizes.width + margins.left + margins.right} ${this.sizes.height +
          this.margins.top +
          this.margins.bottom}`
      )
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);
  }

  abstract initStaticElements(): void;

  abstract initScales(): void;

  abstract render(data: any): void;

  abstract exit(sel: d3.Selection<d3.BaseType, BarChartDataItem, SVGGElement, unknown>): void;

  abstract update(sel: d3.Selection<d3.BaseType, BarChartDataItem, SVGGElement, unknown>): void;

  abstract enter(sel: d3.Selection<d3.BaseType, BarChartDataItem, SVGGElement, unknown>): void;
}
