import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <h3>Sector vs Region {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="sector" />
          <Tooltip content={({ payload }) => {
            if (payload && payload.length) {
              const { sector, ...regions } = payload[0].payload;
              return (
                <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                  <p><strong>Sector:</strong> {sector}</p>
                  {Object.keys(regions).map((region) => (
                    <p key={region}><strong>{region}:</strong> {regions[region]}</p>
                  ))}
                </div>
              );
            }
            return null;
          }} />
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
      </ResponsiveContainer>
      <div style={{ marginTop: '20px' }}>
        <h4>Regions</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {regions.map((region, index) => (
            <li key={region} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: ["#696cff", "#03c3ec", "#ffab00", "#8592ad"][index % 4], marginRight: '10px' }}></div>
              <span>{region}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeatmapComponent;