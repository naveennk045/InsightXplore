import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4361ee", "#4895ef", "#4cc9f0", "#72efdd", "#ff9f1c"];

const DonutChartComponent = ({ data, selectedSector = "Energy" }) => {
  const filteredData = selectedSector === "All" ? data : data.filter(item => item.sector === selectedSector);
  const chartData = Object.entries(
    filteredData.reduce((acc, item) => {
      const topic = item.topic || "Unknown";
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '70%', height: '100%' }}>
        <h3>Insights by Topic {selectedSector !== "All" ? `for ${selectedSector}` : ""}</h3>
        <ResponsiveContainer width="100%" height={600}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={150}
              outerRadius={200}
              dataKey="value"
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '30%', paddingLeft: '20px' }}>
        <h4>Topics</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {chartData.map((entry, index) => (
            <li key={`item-${index}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index % COLORS.length], marginRight: '10px' }}></div>
              <span>{entry.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonutChartComponent;