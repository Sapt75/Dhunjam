import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleCharts(props) {

  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['Custom', 'Category 1', 'Category 2', 'Category 3', 'Category 4'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: props.data ? props.data : [2,3,4,5,6],
        },
      ]}
      width={500}
      height={400}
    />
  );
}
