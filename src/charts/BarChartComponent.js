import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const BarChartComponent = ({ data, selectedSector, setSelectedSector }) => {
  const chartData = Object.entries(
    data.reduce((acc, item) => {
      const sector = item.sector || "Unknown";
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {})
  ).map(([sector, count]) => ({ sector, count }));

  const handleBarClick = (data) => {
    setSelectedSector(data.sector === selectedSector ? "" : data.sector);
  };

  return (
    <div>
      <h3>Insights by Sector</h3>
      <BarChart width={600} height={300} data={chartData} onClick={handleBarClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sector" angle={-45} textAnchor="end" height={70} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#696cff"
          opacity={(d) => (selectedSector && d.sector !== selectedSector ? 0.3 : 1)}
        />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;