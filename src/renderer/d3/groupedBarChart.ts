import * as d3 from 'd3';
import { flatten, without } from 'underscore';

import {
  GroupedBarChartData,
  BarChartDimensions,
  ChartMargins,
  GroupedBarChartDataItem
} from '../../types/charts';

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
      .text('Age and height')
      .attr('transform', `rotate(${-90})`);

    return this;
  }

  render = (data: GroupedBarChartData) => {
    console.log(data);
    // create basic X scale. since there are multiple datasets we would need to
    // create another scale for them
    const basicX = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, this.dimensions.width])
      .padding(0.4);
    // create specific scale for particular bars
    const x = d3
      .scaleBand()
      .domain(['age', 'height'])
      .range([0, basicX.bandwidth()])
      .padding(0.05);

    const values: number[] = flatten(data.map(d => [d.age, d.height]));
    const minValue: number = d3.min(values) as number;
    const maxValue: number = d3.max(values) as number;
    const y = d3
      .scaleLinear()
      .domain([minValue * 0.5, maxValue])
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

    /**
     * Update pattern
     */
    // data join. each pair of bars for one data entry should belong to its individual group
    const nameGroups = this.svg
      .selectAll('.name_group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'name_group')
      .attr('transform', d => `translate(${basicX(d.name)}, 0)`);

    // exit phase
    nameGroups
      .exit()
      .transition()
      .duration(500)
      .remove();

    // get data for drawing bars in a loop
    const fieldsToDraw = without(Object.keys(data[0]), 'name');
    const colors = ['green', 'blue'];

    // update phase
    fieldsToDraw.forEach((field: string, i: number) => {
      console.log(nameGroups.selectAll(`.${field}`));
      nameGroups
        .selectAll(`.${field}`)
        .data(d => [d])
        .transition()
        .duration(500)
        .attr('x', () => x(field) as number)
        .attr('y', d => y(d[field] as number))
        .attr('height', d => this.dimensions.height - y(d[field] as number));
    });

    // enter phase
    fieldsToDraw.forEach((field: string, i: number) => {
      nameGroups
        .selectAll(`.${field}`)
        .data(d => [d])
        .enter()
        .append('rect')
        .attr('class', field)
        .style('fill', colors[i])
        .attr('x', () => x(field) as number)
        .attr('width', x.bandwidth())
        .attr('y', this.dimensions.height)
        .transition()
        .duration(500)
        .attr('y', d => y(d[field] as number))
        .attr('height', d => this.dimensions.height - y(d[field] as number));
    });
  };
}

export default GroupedBarChartSvg;
