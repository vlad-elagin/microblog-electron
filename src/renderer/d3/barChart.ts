import * as d3 from 'd3';
import { BarChartData, BarChartDimensions, ChartMargins } from '../../types/charts';

class BarChartSvg {
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
    // Create svg wrapper for chart
    this.svg = d3
      .select(node)
      .append('svg')
      .attr('width', this.dimensions.width + this.margins.left + this.margins.right)
      .attr('height', this.dimensions.height + this.margins.top + this.margins.bottom)
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);

    // Create and position axis svg groups
    this.xAxisGroup = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.dimensions.height})`);
    this.yAxisGroup = this.svg.append('g');

    // Create labels
    // they would stay at one position, no need to re-render them
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

  render = (data: BarChartData) => {
    // get x scale. calculates bar width and padding depending on data
    const x: d3.ScaleBand<string> = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, this.dimensions.width])
      // barPadding isn't strictly required to make dimensions interface
      // compatible to another types of charts
      .padding(this.dimensions.barPadding as number);

    const minAge: number = d3.min(data, i => i.age) as number;
    const maxAge: number = d3.max(data, i => i.age) as number;
    // get y scale. height of bars depending on data
    const y: d3.ScaleLinear<number, number> = d3
      .scaleLinear()
      .domain([minAge * 0.5, maxAge])
      .range([this.dimensions.height, minAge]);

    // draw axis depending on data
    const xAxisCall = d3.axisBottom(x);
    const yAxisCall = d3.axisLeft(y);
    this.xAxisGroup.call(xAxisCall);
    this.yAxisGroup.call(yAxisCall);

    /**
     * Implementing d3 update pattern
     * 1. Data join phase: tell d3 that there is new data to calculate things from
     */
    const rects = this.svg.selectAll('rect').data(data);

    /**
     * 2. Exit phase: see if we have elements that should be removed
     *    since there is no data for them now
     */
    rects.exit().remove();

    /**
     * 3. Update phase: see if there are elements that corresponds to updated data
     *    and thus should be updated. TODO: do strict typing of iterator functions
     */
    rects
      .attr('x', (d: any) => x(d.name) as number)
      .attr('y', (d: any) => y(d.age))
      .attr('width', x.bandwidth)
      .attr('height', (d: any) => this.dimensions.height - y(d.age));

    /**
     * 4. Enter phase: See if we need to append new elements if there is new data
     *    source.
     */
    rects
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.name) as number)
      .attr('y', (d: any) => y(d.age))
      .attr('width', x.bandwidth)
      .attr('height', (d: any) => this.dimensions.height - y(d.age))
      .attr('fill', 'gray');
  };
}

export default BarChartSvg;
