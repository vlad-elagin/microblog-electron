import * as d3 from 'd3';
import LineChartSvg from '../renderer/d3/lineChart';

const LINE_ENTER_DURATION = 1000;

export function wrapLabelText(
  this: LineChartSvg,
  d: unknown,
  i: number,
  nodes: d3.BaseType[] | ArrayLike<d3.BaseType>
) {
  const { left: width } = this.margins;

  const domNode = nodes[i] as SVGTextElement;
  const d3Node = d3.select(domNode);
  let textLength = domNode.getComputedTextLength();
  let text = d3Node.text();
  const padding = 10;
  while (textLength > width - 2 * padding && text.length > 0) {
    text = text.slice(0, -1);
    if (text[text.length - 1] === ' ') {
      text = text.slice(0, -1);
    }
    d3Node.text(`${text}...`);
    textLength = domNode.getComputedTextLength();
  }
}

export function drawPath(this: SVGPathElement) {
  const pathLength = this.getTotalLength();
  d3.select(this)
    .attr('stroke-dasharray', `${pathLength} ${pathLength}`)
    .attr('stroke-dashoffset', -pathLength)
    .transition()
    .duration(LINE_ENTER_DURATION)
    .attr('stroke-dashoffset', 0);

  return this;
}

export function resetPathOffset(this: d3.BaseType) {
  const path = this as SVGPathElement;

  d3.select(path).attr('stroke-dasharray', 0);

  return this;
}

export function drawDot(this: SVGCircleElement) {
  const dot = d3.select(this);

  dot
    .transition()
    .duration(300)
    .delay(LINE_ENTER_DURATION)
    .attr('opacity', 1);

  return this;
}
