import * as d3 from 'd3';
import { flatten } from 'underscore';

import {
  LineChartData,
  ChartDimensions,
  ChartMargins,
  LineChartDataItem
} from '../../types/charts';
import { wrapLabelText, drawPath, drawDot } from '../../utils/chartStuff';
import { getMedianQuartiles } from '../../utils/math';
import BaseChart from './bases/baseChart';

export default class LineChartSvg extends BaseChart {
  private xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private xIncomeAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private yIncomeAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  private chartLines: d3.Selection<SVGGElement, unknown, null, undefined>;

  private chartDots: d3.Selection<SVGGElement, unknown, null, undefined>;

  private data: LineChartData;

  private scaleYearsX: d3.ScaleLinear<number, number>;

  private scaleCompaniesY: d3.ScaleBand<string>;

  private scaleIncomeY: d3.ScaleLinear<number, number>;

  constructor(node: HTMLElement, sizes: ChartDimensions, margins: ChartMargins) {
    super(node, sizes, margins);
    this.initStaticElements();
    return this;
  }

  initStaticElements = () => {
    // axes containers
    this.xAxisGroup = this.canvas
      .append('g')
      .attr('transform', `translate(0, ${this.sizes.height})`);
    this.yAxisGroup = this.canvas.append('g').attr('transform', `translate(-10, 0)`);
    this.xIncomeAxisGroup = this.canvas.append('g');
    this.yIncomeAxisGroup = this.canvas.append('g');

    // add right y axis w/o labels
    this.canvas
      .append('line')
      .attr('x1', this.sizes.width)
      .attr('y1', 0)
      .attr('x2', this.sizes.width)
      .attr('y2', this.sizes.height)
      .style('stroke', 'black');

    // add chart dashed lines group
    this.chartLines = this.canvas.append('g');

    // add dots when path crosses axes
    this.chartDots = this.canvas.append('g');
  };

  initScales = (years: number[], income: number[]) => {
    // X years scale
    this.scaleYearsX = d3
      .scaleLinear()
      .domain(d3.extent(years) as [number, number])
      .rangeRound([0, this.sizes.width]);

    // y scale for companies
    this.scaleCompaniesY = d3
      .scaleBand()
      .domain(this.data.map(d => d.company))
      .rangeRound([0, this.sizes.height])
      .padding(1);

    // y scale with income
    this.scaleIncomeY = d3
      .scaleLinear()
      .domain(d3.extent(income) as number[])
      .rangeRound([15, this.sizes.height - 15]);
  };

  drawAxes = (years: number[], income: number[]) => {
    // x years axis
    this.xAxisGroup.call(d3.axisBottom(this.scaleYearsX).ticks(years.length, 'd'));

    // y labels axis with company
    this.yAxisGroup
      .selectAll('g.label')
      .data(this.data.map(d => d.company))
      .enter()
      .append('g')
      .attr('class', 'label')
      .attr('transform', d => `translate(-87, ${this.scaleCompaniesY(d)})`)
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

    // dashed y income axes
    this.yIncomeAxisGroup
      .selectAll('line')
      .data(years.slice(0, -1))
      .enter()
      .append('line')
      .style('stroke', 'lightgrey')
      .style('stroke-dasharray', 5)
      .style('stroke-width', 1)
      .attr('x1', d => this.scaleYearsX(d))
      .attr('y1', 0)
      .attr('x2', d => this.scaleYearsX(d))
      .attr('y2', this.sizes.height);

    // draw x axes
    this.xIncomeAxisGroup
      .selectAll('line')
      .data(getMedianQuartiles(income))
      .enter()
      .append('line')
      .style('stroke', 'lightgrey')
      .style('stroke-dasharray', 5)
      .style('stroke-width', 1)
      .attr('x1', 0)
      .attr('y1', d => this.scaleIncomeY(d))
      .attr('x2', this.sizes.width)
      .attr('y2', d => this.scaleIncomeY(d));
  };

  exit = (
    pathes: d3.Selection<d3.BaseType, LineChartDataItem, SVGGElement, unknown>,
    chartDots: d3.Selection<d3.BaseType, LineChartDataItem, SVGGElement, unknown>
  ) => {
    pathes
      .exit()
      .transition()
      .duration(500)
      .remove();
    chartDots
      .exit()
      .transition()
      .duration(500)
      .remove();
  };

  update = (
    line: d3.Line<[number, number]>,
    pathes: d3.Selection<d3.BaseType, LineChartDataItem, SVGGElement, unknown>,
    chartDots: d3.Selection<d3.BaseType, LineChartDataItem, SVGGElement, unknown>
  ) => {
    pathes
      // .transition()
      // .duration(500)
      .attr('d', d => line(d.data.map((dataRecord, i) => [d.data[i].year, d.data[i].income])));
    chartDots
      .selectAll('circle')
      .data(d => d.data)
      // .transition()
      // .duration(500)
      .attr('cy', d => this.scaleIncomeY(d.income));
  };

  enter = (
    line: d3.Line<[number, number]>,
    pathes: d3.Selection<d3.BaseType, LineChartDataItem, SVGGElement, unknown>,
    chartDots: d3.Selection<d3.BaseType, LineChartDataItem, SVGGElement, unknown>
  ) => {
    pathes
      .enter()
      .append('path')
      .style('fill', 'none')
      .style('stroke', (d, i) => d3.schemeDark2[i])
      .style('stroke-width', 1.5)
      .attr('d', d => line(d.data.map((dataRecord, i) => [d.data[i].year, d.data[i].income])))
      .each(drawPath);

    chartDots
      .enter()
      .append('g')
      .attr('class', (d, i) => d3.schemeDark2[i])
      .selectAll('circle')
      .data(d => d.data)
      .enter()
      .append('circle')
      .attr('fill', function(d, i) {
        return this.parentElement!.classList.toString();
      })
      .attr('r', 5)
      .attr('cx', d => this.scaleYearsX(d.year))
      .attr('cy', d => this.scaleIncomeY(d.income))
      .attr('opacity', 0)
      .each(drawDot);
  };

  render = (data: LineChartData) => {
    this.data = data;

    const years = data[0].data.map(i => i.year).reverse();
    const allIncomeValues = flatten(this.data.map(d => d.data.map(i => i.income)));

    this.initScales(years, allIncomeValues);
    this.drawAxes(years, allIncomeValues);

    // path line factory
    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(d => this.scaleYearsX(d[0]))
      .y(d => this.scaleIncomeY(d[1]));

    const pathes = this.chartLines.selectAll('path').data(data);
    const chartDots = this.chartDots.selectAll('g').data(data);

    this.exit(pathes, chartDots);
    this.update(line, pathes, chartDots);
    this.enter(line, pathes, chartDots);
  };
}
