import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';
import LineChart from './LineChart';

const ChartsWrapper: React.FunctionComponent = () => {
  return (
    <div className="charts-wrapper">
      <Redirect from="/charts" exact to="/charts/basic-bar-chart" />
      <Route path="/charts/basic-bar-chart" component={BarChart} />
      <Route path="/charts/grouped-bar-chart" component={GroupedBarChart} />
      <Route path="/charts/line-chart" component={LineChart} />
    </div>
  );
};

export default ChartsWrapper;
