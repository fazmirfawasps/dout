import React from 'react'
import { Line } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import {Chart } from 'chart.js/auto'
function GraphChart({chartData}) {
  return (
    <Line 
    data={chartData} 
    />
  )
}

export default GraphChart