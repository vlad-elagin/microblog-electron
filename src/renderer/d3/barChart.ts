import * as d3 from 'd3';

import { BarChartData, ChartDimensions, ChartMargins, BarChartDataItem } from '../../types/charts';
import BaseChart from './bases/baseChart';

class BarChartSvg extends BaseChart {
  private xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private data: BarChartData;

  private scaleX: d3.ScaleBand<string>;

  private scaleY: d3.ScaleLinear<number, number>;

  constructor(node: HTMLElement, sizes: ChartDimensions, margins: ChartMargins) {
    super(node, sizes, margins);
    this.initStaticElements();
    return this;
  }

  initStaticElements = () => {
    // Create and position axes svg groups
    this.xAxisGroup = this.canvas
      .append('g')
      .attr('transform', `translate(0, ${this.sizes.height})`);
    this.yAxisGroup = this.canvas.append('g');

    // Create static labels
    this.canvas
      .append('text')
      .attr('x', this.sizes.width / 2)
      .attr('y', this.sizes.height + this.margins.bottom * 0.85)
      .text('People')
      .attr('text-anchor', 'middle');
    this.canvas
      .append('text')
      .attr('x', -(this.sizes.height / 2))
      .attr('y', -(this.margins.left * 0.7))
      .attr('text-anchor', 'middle')
      .text('Age')
      .attr('transform', `rotate(${-90})`);
  };

  initScales = () => {
    // get x scale. calculates bar width and padding depending on data
    this.scaleX = d3
      .scaleBand()
      .domain(this.data!.map(d => d.name))
      .range([0, this.sizes.width])
      .padding(this.sizes.barPadding as number);

    // get y scale. height of bars depending on data
    const minAge: number = d3.min(this.data!, i => i.age) as number;
    const maxAge: number = d3.max(this.data!, i => i.age) as number;
    this.scaleY = d3
      .scaleLinear()
      .domain([minAge * 0.5, maxAge])
      .range([this.sizes.height, 0]);
  };

  drawAxes = () => {
    const xAxisCall = d3.axisBottom(this.scaleX!);
    const yAxisCall = d3.axisLeft(this.scaleY!);
    this.xAxisGroup!.transition()
      .duration(500)
      .call(xAxisCall);
    this.yAxisGroup!.transition()
      .duration(500)
      .call(yAxisCall);
  };

  exit = (sel: d3.Selection<d3.BaseType, BarChartDataItem, SVGGElement, unknown>) => {
    sel
      .exit()
      .transition()
      .duration(500)
      .remove();
  };

  update = (sel: d3.Selection<d3.BaseType, BarChartDataItem, SVGGElement, unknown>) => {
    sel
      .transition()
      .duration(500)
      .attr('x', (d: any) => this.scaleX!(d.name) as number)
      .attr('y', (d: any) => this.scaleY!(d.age))
      .attr('width', this.scaleX!.bandwidth())
      .attr('height', (d: any) => this.sizes.height - this.scaleY!(d.age));
  };

  enter = (sel: d3.Selection<d3.BaseType, BarChartDataItem, SVGGElement, unknown>) => {
    sel
      .enter()
      .append('rect')
      .attr('x', (d: any) => this.scaleX!(d.name) as number)
      .attr('width', this.scaleX!.bandwidth())
      .attr('fill', 'gray')
      .attr('y', this.sizes.height)
      .transition()
      .duration(500)
      .attr('y', (d: any) => this.scaleY!(d.age))
      .attr('height', (d: any) => this.sizes.height - this.scaleY!(d.age));
  };

  render = (data: BarChartData) => {
    this.data = data;
    this.initScales();
    this.drawAxes();

    const rects = this.canvas.selectAll('rect').data(data);

    this.exit(rects);
    this.update(rects);
    this.enter(rects);
  };
}

export default BarChartSvg;
