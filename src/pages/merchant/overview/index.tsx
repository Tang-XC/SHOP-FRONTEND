import React from 'react';
import { Box } from '@mui/material';
import EChartsReact from 'echarts-for-react';

const GradientStackedAreaChart = () => {
  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        areaStyle: { color: 'rgba(255, 159, 64, 0.3)' },
        emphasis: { focus: 'series' },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'Total',
        areaStyle: { color: 'rgba(255, 99, 132, 0.3)' },
        emphasis: { focus: 'series' },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      // ... 更多系列
    ],
  });

  return (
    <Box sx={{ m: 4 }}>
      <EChartsReact
        option={getOption()}
        style={{ height: '350px', width: '100%' }}
      />
    </Box>
  );
};

export default GradientStackedAreaChart;
