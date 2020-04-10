import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button, Row, Col } from 'reactstrap';
import { isEqual } from 'underscore';
import { RouteComponentProps } from 'react-router-dom';

import LineChartSvg from '../../d3/lineChart';
import { generateCompaniesIncomeByYearData } from '../../../utils/chartData';
import { LineChartData } from '../../../types/charts';

interface State {
  companies: string;
  data: LineChartData;
}

export default class LineChart extends React.Component<RouteComponentProps<any>, State> {
  private wrapper: React.RefObject<HTMLDivElement>;

  private svg: LineChartSvg | null;

  constructor(props?: any) {
    super(props);
    this.wrapper = React.createRef();
    this.svg = null;

    this.state = {
      companies: '5',
      data: []
    };
  }

  componentDidMount() {
    // get initial data
    this.generateData();
  }

  componentDidUpdate(_: any, prevState: State) {
    if (this.wrapper.current && this.state.data && this.svg === null) {
      // render initial svg
      this.svg = new LineChartSvg(this.wrapper.current);
      this.svg.render(this.state.data);
    } else if (!isEqual(prevState.data, this.state.data) && this.svg && this.state.data) {
      // update existing chart with new data
      this.svg.render(this.state.data);
    }
  }

  private generateData = () => {
    this.setState({
      data: generateCompaniesIncomeByYearData(parseInt(this.state.companies, 10))
    });
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
