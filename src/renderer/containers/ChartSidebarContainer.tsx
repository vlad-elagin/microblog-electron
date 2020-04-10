import React, { useMemo } from 'react';

import View from '../components/Sidebar/Sidebar';

const ChartSidebarContainer: React.FunctionComponent = () => {
  const chartsList = useMemo(() => {
    return [
      { hash: 'basic-bar-chart', title: 'Basic Bar Chart' },
      { hash: 'grouped-bar-chart', title: 'Grouped Bar Chart' },
      { hash: 'line-chart', title: 'Line Chart' }
    ];
  }, []);

  return <View chartsList={chartsList} />;
};

export default ChartSidebarContainer;
