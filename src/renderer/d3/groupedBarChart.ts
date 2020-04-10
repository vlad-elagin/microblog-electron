import * as d3 from 'd3';
import { flatten, without } from 'underscore';

import { GroupedBarChartData, BarChartDimensions, ChartMargins } from '../../types/charts';

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
      .text('Companies')
      .attr('text-anchor', 'middle');

    this.svg
      .append('text')
      .attr('x', -(this.dimensions.height / 2))
      .attr('y', -(this.margins.left * 0.7))
      .attr('text-anchor', 'middle')
      .text('Financial data')
      .attr('transform', `rotate(${-90})`);

    return this;
  }

  render = (data: GroupedBarChartData) => {
    // create basic X scale. since there are multiple datasets we would need to
    // create another scale for them
    const basicX = d3
      .scaleBand()
      .domain(data.map(d => d.company))
      .rangeRound([0, this.dimensions.width])
      .padding(0.4);
    // create specific scale for particular bars
    const x = d3
      .scaleBand()
      .domain(['income', 'expenses'])
      .rangeRound([0, basicX.bandwidth()])
      .padding(0.05);

    const values: number[] = flatten(data.map(d => [d.income, d.expenses]));
    const minValue: number = d3.min(values) as number;
    const maxValue: number = d3.max(values) as number;
    const y = d3
      .scaleLinear()
      .domain([minValue * 0.5, maxValue + 20])
      .range([this.dimensions.height, 0]);

    // draw axis
    const xAxisCall = d3.axisBottom(basicX);
    const yAxisCall = d3.axisLeft(y);
    this.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);
    this.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);

    // data join phase
    const companyGroups = this.svg.selectAll('.company_group').data(data);
    const colors = ['blue', 'green'];

    // exit phase
    companyGroups
      .exit()
      .selectAll('rect')
      .transition()
      .duration(500)
      .attr('height', 0)
      .attr('y', this.dimensions.height);

    companyGroups
      .exit()
      .transition()
      .duration(500)
      .remove();

    // update phase
    companyGroups
      .transition()
      .duration(500)
      .attr('transform', d => `translate(${basicX(d.company)}, 0)`)
      .attr('width', basicX.bandwidth());

    companyGroups
      .selectAll('rect')
      .data(d => [d.income, d.expenses])
      .transition()
      .duration(500)
      .attr('x', (d, i) => x(i === 0 ? 'income' : 'expenses') as number)
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => this.dimensions.height - y(d));

    // enter phase
    companyGroups
      .enter()
      .append('g')
      .attr('class', 'company_group')
      .attr('width', basicX.bandwidth())
      .attr('transform', d => `translate(${basicX(d.company)}, 0)`)
      .selectAll('rect')
      .data(d => [d.income, d.expenses])
      .enter()
      .append('rect')
      .style('fill', (d, i) => colors[i])
      .attr('x', (d, i) => x(i === 0 ? 'income' : 'expenses') as number)
      .attr('y', this.dimensions.height)
      .attr('width', x.bandwidth())
      .transition()
      .duration(500)
      .attr('y', d => y(d))
      .attr('height', d => this.dimensions.height - y(d));
  };
}

export default GroupedBarChartSvg;
