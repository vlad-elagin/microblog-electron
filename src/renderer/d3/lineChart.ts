import * as d3 from 'd3';
import { flatten } from 'underscore';

import {
  LineChartData,
  BarChartDimensions,
  ChartMargins,
  LineChartDataItem
} from '../../types/charts';
import { wrapLabelText } from '../../utils/chartStuff';
import { getMedianQuartiles } from '../../utils/math';

export default class LineChartSvg {
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;

  private xAxisGroups: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yAxisGroups: d3.Selection<SVGGElement, unknown, null, undefined>;

  private xIncomeAxisGroups: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yIncomeAxisGroups: d3.Selection<SVGGElement, unknown, null, undefined>;

  private chartLines: d3.Selection<SVGGElement, unknown, null, undefined>;

  public margins: ChartMargins = {
    top: 10,
    right: 15,
    bottom: 50,
    left: 100
  };

  public dimensions: BarChartDimensions = {
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

    // axis
    this.xAxisGroups = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.dimensions.height})`);
    this.yAxisGroups = this.svg.append('g').attr('transform', `translate(-10, 0)`);
    this.xIncomeAxisGroups = this.svg.append('g');
    this.yIncomeAxisGroups = this.svg.append('g');

    // bottom label
    this.svg
      .append('text')
      .attr('x', this.dimensions.width / 2)
      .attr('y', this.dimensions.height + this.margins.bottom * 0.85)
      .text('Income')
      .attr('text-anchor', 'middle');

    // add finish y axis w/o labels
    this.svg
      .append('line')
      .attr('x1', this.dimensions.width)
      .attr('y1', 0)
      .attr('x2', this.dimensions.width)
      .attr('y2', this.dimensions.height)
      .style('stroke', 'black');

    // add chart lines group
    this.chartLines = this.svg.append('g');

    return this;
  }

  render = (data: LineChartData) => {
    // get years from companies data. those are the same in all items
    const years = data[0].data.map(i => i.year).reverse();

    // x scale for company names
    const x = d3
      .scaleLinear()
      .domain(d3.extent(years) as [number, number])
      .rangeRound([0, this.dimensions.width]);

    // x axis
    const xAxisCall = d3.axisBottom(x).ticks(years.length, 'd');
    this.xAxisGroups.call(xAxisCall);

    // y scale for companies
    const companies = data.map(d => d.company);
    const y: d3.ScaleBand<string> = d3
      .scaleBand()
      .domain(companies)
      .rangeRound([0, this.dimensions.height])
      .padding(1);

    // draw y axis with company labels
    this.yAxisGroups
      .selectAll('g.label')
      .data(companies)
      .enter()
      .append('g')
      .attr('class', 'label')
      .attr('transform', d => `translate(-87, ${y(d)})`)
      .append('text')
      .style('font-size', 14)
      .text(d => d)
      .attr('transform', 'translate(13, 0)')
      .each(wrapLabelText.bind(this))
      .select(function getParentNode() {
        return this.parentElement;
      })
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', (d, i) => d3.schemeDark2[i])
      .attr('transform', 'translate(0, -10)');

    // add y scale with income
    const allIncomeValues = flatten(data.map(d => d.data.map(i => i.income)));
    const incomeY = d3
      .scaleLinear()
      .domain(d3.extent(allIncomeValues) as number[])
      .rangeRound([15, this.dimensions.height - 15]);

    // draw y axes with income values
    this.yIncomeAxisGroups
      .selectAll('line')
      .data(years.slice(1, -1))
      .enter()
      .append('line')
      .style('stroke', 'lightgrey')
      .style('stroke-dasharray', 5)
      .style('stroke-width', 1)
      .attr('x1', d => x(d))
      .attr('y1', 0)
      .attr('x2', d => x(d))
      .attr('y2', this.dimensions.height);

    // draw x axes
    this.xIncomeAxisGroups
      .selectAll('line')
      .data(getMedianQuartiles(allIncomeValues))
      .enter()
      .append('line')
      .style('stroke', 'lightgrey')
      .style('stroke-dasharray', 5)
      .style('stroke-width', 1)
      .attr('x1', 0)
      .attr('y1', d => incomeY(d))
      .attr('x2', this.dimensions.width)
      .attr('y2', d => incomeY(d));

    // draw line
    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(d => x(d[0]))
      .y(d => incomeY(d[1]));

    this.chartLines
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (d, i) => d3.schemeDark2[i])
      .attr('stroke-width', 1.5)
      .attr('d', (d, index) =>
        line(d.data.map((dataRecord, i) => [d.data[i].year, d.data[i].income]))
      );
  };
}
