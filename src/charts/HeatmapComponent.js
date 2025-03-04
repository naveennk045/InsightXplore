import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const HeatmapComponent = ({ data, selectedSector }) => {
  const groupedData = data.reduce((acc, item) => {
    const sector = item.sector || "Unknown";
    const region = item.region || "Unknown";
    if (!acc[sector]) acc[sector] = {};
    acc[sector][region] = (acc[sector][region] || 0) + 1;
    return acc;
  }, {});

  const regions = [...new Set(data.map((item) => item.region || "Unknown"))];
  const chartData = Object.keys(groupedData).map((sector) => {
    const entry = { sector };
    regions.forEach((region) => {
      entry[region] = groupedData[sector][region] || 0;
    });
    return entry;
  });

  return (
    <div>
      <h3>Sector vs Region {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sector" angle={-45} textAnchor="end" height={70} />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartData.length > 0 &&
          Object.keys(chartData[0])
            .filter((key) => key !== "sector")
            .map((region, index) => (
              <Bar
                key={region}
                dataKey={region}
                stackId="a"
                fill={["#696cff", "#03c3ec", "#ffab00", "#8592ad"][index % 4]}
              />
            ))}
      </BarChart>
    </div>
  );
};

export default HeatmapComponent;