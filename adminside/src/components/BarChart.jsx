import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart({chartData}) {
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    barThickness: 20, // Adjust the value to change the bar width
  };
  return (
    <Bar
     data={chartData}
     options={options}
     />
  )
}

export default BarChart