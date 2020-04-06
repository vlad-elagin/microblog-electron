import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';

const ChartsWrapper: React.FunctionComponent = () => {
  return (
    <div className="charts-wrapper">
      <Redirect from="/charts" exact to="/charts/basic-bar-chart" />
      <Route path="/charts/basic-bar-chart" component={BarChart} />
      <Route path="/charts/grouped-bar-chart" component={GroupedBarChart} />
    </div>
  );
};

export default ChartsWrapper;
