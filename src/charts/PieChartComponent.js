import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
    <div>
      <h3>PESTLE Distribution {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;