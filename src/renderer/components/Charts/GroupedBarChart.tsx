import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  ButtonGroup,
  InputGroupText
} from 'reactstrap';
import { isEqual, times } from 'underscore';
import { RouteComponentProps } from 'react-router-dom';

import GroupedBarChartSvg from '../../d3/groupedBarChart';
import { BarChartData } from '../../../types/charts';
import { generateAgesData } from '../../../utils/chartData';

interface State {
  datasets: string;
  data: BarChartData[];
}

export default class GroupedBarChart extends React.Component<RouteComponentProps, State> {
  private wrapper: React.RefObject<HTMLDivElement>;

  private svg: GroupedBarChartSvg | null;

  constructor(props?: any) {
    super(props);
    this.wrapper = React.createRef();
    this.svg = null;

    this.state = {
      datasets: '2',
      data: []
    };
  }

  componentDidMount() {
    this.generateData();
  }

  componentDidUpdate(_: any, prevState: State) {
    if (this.wrapper.current && this.state.data && this.svg === null) {
      // render initial svg
      this.svg = new GroupedBarChartSvg(this.wrapper.current);
      this.svg.render(this.state.data);
    } else if (!isEqual(prevState.data, this.state.data) && this.svg && this.state.data) {
      // update existing chart with new data
      this.svg.render(this.state.data);
    }
  }

  generateData = () => {
    const datasets = parseInt(this.state.datasets, 10);
    const data = times(datasets, () => generateAgesData(5));

    this.setState({ data });
  };

  render() {
    return (
      <div className="chart bar" ref={this.wrapper}>
        <InputGroup className="mb-2">
          <InputGroupAddon addonType="prepend">How many datasets?</InputGroupAddon>
          <Input
            type="number"
            value={this.state.datasets}
            onChange={({ target: { value } }: { target: HTMLInputElement }) => {
              this.setState({ datasets: value });
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
