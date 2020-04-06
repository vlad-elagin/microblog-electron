import React from 'react';
import faker from 'faker';
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

import BarChartSvg from '../../d3/barChart';
import { BarChartData } from '../../../types/charts';

interface State {
  data: BarChartData[][];
}

export default class GroupedBarChart extends React.Component<RouteComponentProps, State> {
  private wrapper: React.RefObject<HTMLDivElement>;

  private svg: BarChartSvg | null;

  constructor(props?: any) {
    super(props);
    this.wrapper = React.createRef();
    this.svg = null;

    this.state = {
      data: []
    };
  }

  onDatasetAmountChange = (increase = true) => {
    // if increase - add new sub-array with generated data of initial length
    // if decrease - remove last subarray from list
  };

  onSingleDatasetLengthChange = (index: number) => {
    // regenerate single subarray with provided length
  };

  generateData = (amount: number) => {
    // generate data for single dataset of provided length
  };

  render() {
    return (
      <div className="chart bar" ref={this.wrapper}>
        <div className="d-flex justify-content-between">
          <h3>Manage datasets</h3>
          <ButtonGroup className="mb-4">
            <Button
              onClick={() => this.onDatasetAmountChange(false)}
              disabled={this.state.data.length === 1}
              color="info">
              -
            </Button>
            <Button color="primary">Regenerate all {this.state.data.length} datasets.</Button>
            <Button
              onClick={() => this.onDatasetAmountChange()}
              disabled={this.state.data.length === 4}
              color="info">
              +
            </Button>
          </ButtonGroup>
        </div>

        {times(this.state.data.length, index => (
          <InputGroup className="mb-2" key={index}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>How many people in dataset {index}?</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              />
            <InputGroupAddon addonType="append">
              <Button color="primary">Generate new data for dataset {index}</Button>
            </InputGroupAddon>
          </InputGroup>
        ))}
      </div>
    );
  }
}
