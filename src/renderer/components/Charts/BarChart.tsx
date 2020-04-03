import React from 'react';
import faker from 'faker';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { isEqual } from 'underscore';

import BarChartSvg from '../../d3/barChart';
import { BarChartData } from '../../../types/charts';

interface State {
  peoples: string;
  data: BarChartData | null;
}

export default class BarChart extends React.Component<null, State> {
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
    // render initial svg
    if (this.wrapper.current && this.state.data && this.svg === null) {
      this.svg = new BarChartSvg(this.wrapper.current);
      this.svg.render(this.state.data);
    } else if (!isEqual(prevState.data, this.state.data) && this.svg && this.state.data) {
      this.svg.render(this.state.data);
    }
  }

  private generateData = () => {
    const data = new Array(parseInt(this.state.peoples, 10)).fill(null).map(() => {
      return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        age: faker.random.number(35)
      };
    });

    this.setState({ data });
  };

  render() {
    return (
      <div className="chart bar" ref={this.wrapper}>
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
