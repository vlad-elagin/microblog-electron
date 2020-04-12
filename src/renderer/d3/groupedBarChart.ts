import * as d3 from 'd3';
import { flatten } from 'underscore';

import {
  GroupedBarChartData,
  ChartDimensions,
  ChartMargins,
  GroupedBarChartDataItem,
  D3LifecycleSelection
} from '../../types/charts';
import BaseChart from './bases/baseChart';

export default class GroupedBarChartSvg extends BaseChart {
  private xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private data: GroupedBarChartData;

  private scaleNamesX: d3.ScaleBand<string>;

  private scaleBarsX: d3.ScaleBand<string>;

  private scaleY: d3.ScaleLinear<number, number>;

  constructor(node: HTMLElement, sizes: ChartDimensions, margins: ChartMargins) {
    super(node, sizes, margins);
    this.initStaticElements();
    return this;
  }

  initStaticElements = () => {
    this.xAxisGroup = this.canvas
      .append('g')
      .attr('transform', `translate(0, ${this.sizes.height})`);
    this.yAxisGroup = this.canvas.append('g');

    this.canvas
      .append('text')
      .attr('x', this.sizes.width / 2)
      .attr('y', this.sizes.height + this.margins.bottom * 0.85)
      .text('Companies')
      .attr('text-anchor', 'middle');

    this.canvas
      .append('text')
      .attr('x', -(this.sizes.height / 2))
      .attr('y', -(this.margins.left * 0.7))
      .attr('text-anchor', 'middle')
      .text('Financial data')
      .attr('transform', `rotate(${-90})`);
  };

  initScales = () => {
    // create X scale for company names
    this.scaleNamesX = d3
      .scaleBand()
      .domain(this.data!.map(d => d.company))
      .rangeRound([0, this.sizes.width])
      .padding(0.4);

    // create X scale for bars set of single company
    this.scaleBarsX = d3
      .scaleBand()
      .domain(['income', 'expenses'])
      .rangeRound([0, this.scaleNamesX.bandwidth()])
      .padding(0.05);

    // create Y axis
    const values: number[] = flatten(this.data.map(d => [d.income, d.expenses]));
    const minValue: number = d3.min(values) as number;
    const maxValue: number = d3.max(values) as number;
    this.scaleY = d3
      .scaleLinear()
      .domain([minValue * 0.5, maxValue + 20])
      .range([this.sizes.height, 0]);
  };

  drawAxes = () => {
    this.xAxisGroup
      .transition()
      .duration(500)
      .call(d3.axisBottom(this.scaleNamesX));
    this.yAxisGroup
      .transition()
      .duration(500)
      .call(d3.axisLeft(this.scaleY));
  };

  exit = (sel: d3.Selection<d3.BaseType, GroupedBarChartDataItem, SVGGElement, unknown>) => {
    sel
      .exit()
      .selectAll('rect')
      .transition()
      .duration(500)
      .attr('height', 0)
      .attr('y', this.sizes.height);

    sel
      .exit()
      .transition()
      .duration(500)
      .remove();
  };

  update = (sel: d3.Selection<d3.BaseType, GroupedBarChartDataItem, SVGGElement, unknown>) => {
    sel
      .transition()
      .duration(500)
      .attr('transform', d => `translate(${this.scaleNamesX(d.company)}, 0)`)
      .attr('width', this.scaleNamesX.bandwidth());

    sel
      .selectAll('rect')
      .data(d => [d.income, d.expenses])
      .transition()
      .duration(500)
      .attr('x', (d, i) => this.scaleBarsX(i === 0 ? 'income' : 'expenses') as number)
      .attr('y', d => this.scaleY(d))
      .attr('width', this.scaleBarsX.bandwidth())
      .attr('height', d => this.sizes.height - this.scaleY(d));
  };

  enter = (sel: d3.Selection<d3.BaseType, GroupedBarChartDataItem, SVGGElement, unknown>) => {
    sel
      .enter()
      .append('g')
      .attr('class', 'company_group')
      .attr('width', this.scaleNamesX.bandwidth())
      .attr('transform', d => `translate(${this.scaleNamesX(d.company)}, 0)`)
      .selectAll('rect')
      .data(d => [d.income, d.expenses])
      .enter()
      .append('rect')
      .style('fill', (d, i) => d3.schemeDark2[i])
      .attr('x', (d, i) => this.scaleBarsX(i === 0 ? 'income' : 'expenses') as number)
      .attr('y', this.sizes.height)
      .attr('width', this.scaleBarsX.bandwidth())
      .transition()
      .duration(500)
      .attr('y', d => this.scaleY(d))
      .attr('height', d => this.sizes.height - this.scaleY(d));
  };

  render = (data: GroupedBarChartData) => {
    this.data = data;
    this.initScales();
    this.drawAxes();

    const companyGroups = this.canvas.selectAll('.company_group').data(data);

    this.exit(companyGroups);
    this.update(companyGroups);
    this.enter(companyGroups);
  };
}
