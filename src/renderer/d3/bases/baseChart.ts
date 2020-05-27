import * as d3 from 'd3';

import { ChartMargins, ChartDimensions } from '../../../types/charts';

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

  abstract initScales(argA?: any, argB?: any): void;

  abstract drawAxes(argA?: any, argB?: any): void;

  /**
   * Render method initializes neccessary data-dependent properties
   * such as scales and axes and implements d3 update pattern:
   *
   * 1. Data join phase: tell d3 that there is new data to calculate things from
   * 2. Exit phase: see if we have elements that should be removed
   *    since there is no data for them now
   * 3. Update phase: see if there are elements that corresponds to updated data
   *    and thus should be updated
   * 4. Enter phase: See if we need to append new elements if there is new data
   *    source.
   */
  abstract render(data: any): void;

  abstract exit(...sel: any[]): void;

  abstract update(...sel: any[]): void;

  abstract enter(...sel: any[]): void;
}
