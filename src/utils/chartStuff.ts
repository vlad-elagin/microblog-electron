import * as d3 from 'd3';
import LineChartSvg from '../renderer/d3/lineChart';

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
  const padding = 16;
  while (textLength > width - 2 * padding && text.length > 0) {
    text = text.slice(0, -1);
    if (text[text.length - 1] === ' ') {
      text = text.slice(0, -1);
    }
    d3Node.text(`${text}...`);
    textLength = domNode.getComputedTextLength();
  }
}
