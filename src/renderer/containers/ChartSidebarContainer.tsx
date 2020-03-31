import React, { useMemo } from 'react';

import View from '../components/Sidebar/Sidebar';

const ChartSidebarContainer: React.FunctionComponent = () => {
  const chartsList = useMemo(() => {
    return [
      { hash: 'basic-bar-chart', title: 'Basic Bar Chart' },
      { hash: 'test', title: 'Test' }
    ];
  }, []);

  return <View chartsList={chartsList} />;
};

export default ChartSidebarContainer;
