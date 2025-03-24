import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

const IncidentChart = ({ data, chartType }) => {
  return (
    <div>
      {chartType === 'bar' ? (
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <Line
          data={data}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default IncidentChart;