import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { isEqual } from 'underscore';
import { RouteComponentProps } from 'react-router-dom';

import BarChartSvg from '../../d3/barChart';
import { BarChartData, ChartDimensions, ChartMargins } from '../../../types/charts';
import { generateAgesData } from '../../../utils/chartData';

interface State {
  peoples: string;
  data: BarChartData | null;
}

export default class BarChart extends React.Component<RouteComponentProps<any>, State> {
  private wrapper: React.RefObject<HTMLDivElement>;

  private svg: BarChartSvg | null;

  constructor(props?: any) {
    super(props);
    this.wrapper = React.createRef();
    this.svg = null;

    this.state = {
      peoples: '5',
      data: null
    };
  }

  componentDidMount() {
    // get initial data
    this.generateData();
  }

  componentDidUpdate(_: any, prevState: State) {
    if (this.wrapper.current && this.state.data && this.svg === null) {
      const margins: ChartMargins = {
        top: 10,
        right: 10,
        bottom: 50,
        left: 50
      };
      const sizes: ChartDimensions = {
        width: 600 - margins.left - margins.right,
        height: 340 - margins.top - margins.bottom,
        barWidth: 50,
        barPadding: 0.4
      };

      // render initial svg
      this.svg = new BarChartSvg(this.wrapper.current, sizes, margins);
      this.svg.render(this.state.data);
    } else if (!isEqual(prevState.data, this.state.data) && this.svg && this.state.data) {
      // update existing chart with new data
      this.svg.render(this.state.data);
    }
  }

  private generateData = () => {
    this.setState({ data: generateAgesData(parseInt(this.state.peoples, 10)) });
  };

  render() {
    return (
      <div ref={this.wrapper}>
        <InputGroup className="mb-2">
          <InputGroupAddon addonType="prepend">How many people?</InputGroupAddon>
          <Input
            type="number"
            value={this.state.peoples}
            onChange={({ target: { value } }: { target: HTMLInputElement }) => {
              this.setState({ peoples: value });
            }}
            />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={this.generateData}>
              Generate new data
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
