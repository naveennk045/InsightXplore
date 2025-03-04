import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const AreaChartComponent = ({ data, selectedSector }) => {
  const timeData = data.reduce((acc, item) => {
    const year = item.published ? new Date(item.published).getFullYear() : "Unknown";
    if (year !== "Unknown") {
      acc[year] = (acc[year] || 0) + (item.intensity || 0);
    }
    return acc;
  }, {});

  let cumulative = 0;
  const chartData = Object.keys(timeData)
    .map((year) => {
      cumulative += timeData[year];
      return {
        year: parseInt(year),
        intensity: cumulative,
      };
    })
    .sort((a, b) => a.year - b.year);

  return (
    <div>
      <h3>Cumulative Intensity Over Time {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <AreaChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="intensity" stroke="#696cff" fill="#696cff" fillOpacity={0.3} />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;