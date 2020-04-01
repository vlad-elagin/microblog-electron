import * as d3 from 'd3';
import { BarChartData, BarChartDimensions, ChartMargins } from '../../types/charts';

class BarChartSvg {
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;

  private data: BarChartData;

  private x: d3.ScaleBand<string>;

  private y: d3.ScaleLinear<number, number>;

  private xAxis: any;

  private yAxis: any;

  private margins: ChartMargins = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
  };

  private dimensions: BarChartDimensions = {
    width: 500 - this.margins.left - this.margins.right,
    height: 230 - this.margins.top - this.margins.bottom,
    barWidth: 50,
    barPadding: 0.4
  };

  constructor(node: HTMLElement, data: BarChartData) {
    // Create svg wrapper for chart
    this.svg = d3
      .select(node)
      .append('svg')
      .attr('width', this.dimensions.width + this.margins.left + this.margins.right)
      .attr('height', this.dimensions.height + this.margins.top + this.margins.bottom)
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);

    this.data = data;

    this.y = this.getYScale();
    this.x = this.getXScale();
    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y);

    this.drawBars();
    this.drawAxis();
    this.drawLabels();
  }

  /**
   * Create X axis scale.
   * Calculates bars position depending on their width and margins
   */
  private getXScale = () => {
    return (
      d3
        .scaleBand()
        .domain(this.data.map(d => d.name))
        .range([0, this.dimensions.width])
        // barPadding isn't strictly required to make dimensions interface
        // compatible to another types of charts
        .padding(this.dimensions.barPadding as number)
    );
  };

  /**
   * Create Y axis scale.
   * Calculates height of bars depending on data
   */
  private getYScale = () => {
    const minAge: number = d3.min(this.data, i => i.age) as number;
    const maxAge: number = d3.max(this.data, i => i.age) as number;
    return d3
      .scaleLinear()
      .domain([minAge * 0.5, maxAge])
      .range([this.dimensions.height, minAge]);
  };

  private drawBars = () => {
    this.svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      // type definitions seem to think that band scale can return number OR undefined
      // add 'as number' to prevent compilation errors
      .attr('x', d => this.x(d.name) as number)
      .attr('y', d => this.y(d.age))
      .attr('width', this.x.bandwidth)
      .attr('height', d => this.dimensions.height - this.y(d.age))
      .attr('fill', 'grey');
  };

  private drawAxis = () => {
    this.svg
      .append('g')
      // move axis to bottom
      .attr('transform', `translate(0, ${this.dimensions.height})`)
      .call(this.xAxis);

    this.svg.append('g').call(this.yAxis);
  };

  private drawLabels = () => {
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
  };
}

export default BarChartSvg;
