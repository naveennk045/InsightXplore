import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const TimeSeriesComponent = ({ data, selectedSector }) => {
  const timeData = data.reduce((acc, item) => {
    const date = item.published ? new Date(item.published).getFullYear() : "Unknown";
    if (date !== "Unknown") {
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(timeData)
    .map((year) => ({
      year: parseInt(year),
      count: timeData[year],
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div>
      <h3>Insights Over Time {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#696cff" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default TimeSeriesComponent;