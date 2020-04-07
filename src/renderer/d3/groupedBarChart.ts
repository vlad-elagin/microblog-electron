import * as d3 from 'd3';
import { flatten } from 'underscore';

import { BarChartData, BarChartDimensions, ChartMargins } from '../../types/charts';

class GroupedBarChartSvg {
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;

  private xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private margins: ChartMargins = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
  };

  private dimensions: BarChartDimensions = {
    width: 600 - this.margins.left - this.margins.right,
    height: 340 - this.margins.top - this.margins.bottom,
    barWidth: 50,
    barPadding: 0.4
  };

  constructor(node: HTMLElement) {
    this.svg = d3
      .select(node)
      .append('svg')
      .attr('preserveAspectRation', 'xMinYMin meet')
      .attr(
        'viewBox',
        `0 0 ${this.dimensions.width + this.margins.left + this.margins.right} ${this.dimensions
          .height +
          this.margins.top +
          this.margins.bottom}`
      )
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);

    this.xAxisGroup = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.dimensions.height})`);
    this.yAxisGroup = this.svg.append('g');

    this.svg
      .append('text')
      .attr('x', this.dimensions.width / 2)
      .attr('y', this.dimensions.height + this.margins.bottom * 0.85)
      .text('People')
      .attr('text-anchor', 'middle');

    this.svg
      .append('text')
      .attr('x', -(this.dimensions.height / 2))
      .attr('y', -(this.margins.left * 0.7))
      .attr('text-anchor', 'middle')
      .text('Age')
      .attr('transform', `rotate(${-90})`);

    return this;
  }

  render = (data: BarChartData[]) => {
    // create basic X scale. since there are multiple datasets we would need to
    // create another scale for them
    const basicX = d3
      .scaleBand()
      .rangeRound([0, this.dimensions.width])
      .padding(0.1);
    // create specific scale for particular bars
    const x = d3
      .scaleBand()
      .range([0, basicX.bandwidth()])
      .padding(0.05);

    const ages: number[] = flatten(data).map(d => d.age);
    const minAge: number = d3.min(ages) as number;
    const maxAge: number = d3.max(ages) as number;
    const y = d3
      .scaleLinear()
      .domain([minAge * 0.5, maxAge])
      .range([this.dimensions.height, 0]);

    // draw axis
    const xAxisCall = d3.axisBottom(x);
    const yAxisCall = d3.axisLeft(y);
    this.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);
    this.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);
  };
}

export default GroupedBarChartSvg;
