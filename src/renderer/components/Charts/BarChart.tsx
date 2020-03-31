import React from 'react';
import faker from 'faker';

import BarChartSvg from '../../d3/barChart';
import { BarChartData } from '../../../types/charts';

export default class BarChart extends React.Component {
  private wrapper: React.RefObject<HTMLDivElement>;

  private data: BarChartData;

  constructor(props?: any) {
    super(props);
    this.wrapper = React.createRef();
    this.data = this.generateData();
  }

  componentDidMount() {
    if (this.wrapper.current) {
      new BarChartSvg(this.wrapper.current, this.data);
    }
  }

  private generateData = () => {
    const data = new Array(5).fill(null).map(() => {
      return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        age: faker.random.number(35)
      };
    });

    return data;
  };

  render() {
    return <div className="chart bar" ref={this.wrapper} />;
  }
}
