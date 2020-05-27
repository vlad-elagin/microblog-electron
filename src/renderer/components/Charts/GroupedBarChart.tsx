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
import { GroupedBarChartData, ChartDimensions, ChartMargins } from '../../../types/charts';
import { generateCompaniesData } from '../../../utils/chartData';

interface State {
  companies: string;
  data: GroupedBarChartData;
}

export default class GroupedBarChart extends React.Component<RouteComponentProps, State> {
  private wrapper: React.RefObject<HTMLDivElement>;

  private svg: GroupedBarChartSvg | null;

  constructor(props?: any) {
    super(props);
    this.wrapper = React.createRef();
    this.svg = null;

    this.state = {
      companies: '3',
      data: []
    };
  }

  componentDidMount() {
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
      this.svg = new GroupedBarChartSvg(this.wrapper.current, sizes, margins);
      this.svg.render(this.state.data);
    } else if (!isEqual(prevState.data, this.state.data) && this.svg && this.state.data) {
      // update existing chart with new data
      this.svg.render(this.state.data);
    }
  }

  generateData = () => {
    this.setState({ data: generateCompaniesData(parseInt(this.state.companies, 10)) });
  };

  render() {
    return (
      <div ref={this.wrapper}>
        <InputGroup className="mb-2">
          <InputGroupAddon addonType="prepend">How many companies?</InputGroupAddon>
          <Input
            type="number"
            value={this.state.companies}
            onChange={({ target: { value } }: { target: HTMLInputElement }) => {
              this.setState({ companies: value });
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
