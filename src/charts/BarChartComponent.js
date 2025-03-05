import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
    <div style={{ width: '100%', height: '100%' }}>
      <h3>Insights by Sector</h3>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={chartData} onClick={handleBarClick}>
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
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;