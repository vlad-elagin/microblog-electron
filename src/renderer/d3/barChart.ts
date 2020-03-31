import * as d3 from 'd3';
import { BarChartData } from '../../types/charts';

class BarChartSvg {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;

  private data: BarChartData;

  private dimensions: { width: number; height: number; barWidth: number; barMargin: number } = {
    width: 500,
    height: 300,
    barWidth: 50,
    barMargin: 30
  };

  constructor(node: HTMLElement, data: BarChartData) {
    this.svg = d3
      .select(node)
      .append('svg')
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height);
    this.data = data;

    this.drawBars();
  }

  private drawBars = () => {
    this.svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * this.dimensions.barWidth + i * this.dimensions.barMargin)
      .attr('y', d => this.dimensions.height - d.age)
      .attr('width', this.dimensions.barWidth)
      .attr('height', d => d.age)
      .attr('fill', 'grey');
  };
}

export default BarChartSvg;
