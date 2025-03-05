import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#696cff", "#03c3ec", "#ffab00", "#8592ad", "#2a3042"];

const PieChartComponent = ({ data, selectedSector }) => {
  const chartData = Object.entries(
    data.reduce((acc, item) => {
      const pestle = item.pestle || "Unknown";
      acc[pestle] = (acc[pestle] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h3>PESTLE Distribution {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={200}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;