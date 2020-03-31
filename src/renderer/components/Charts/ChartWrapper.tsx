import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import BarChart from './BarChart';

const ChartsWrapper: React.FunctionComponent = () => {
  return (
    <div className="charts-wrapper">
      <Redirect from="/charts" exact to="/charts/basic-bar-chart" />
      <Route path="/charts/basic-bar-chart" component={BarChart} />
    </div>
  );
};

export default ChartsWrapper;
