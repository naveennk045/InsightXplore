import React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

const TreemapComponent = ({ data, selectedSector }) => {
  const groupedData = data.reduce((acc, item) => {
    const region = item.region || "Unknown";
    const sector = item.sector || "Unknown";
    if (!acc[region]) acc[region] = {};
    acc[region][sector] = (acc[region][sector] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map((region) => ({
    name: region,
    children: Object.keys(groupedData[region]).map((sector) => ({
      name: sector,
      value: groupedData[region][sector],
    })),
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h3>Insights by Region and Sector {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <ResponsiveContainer width="100%" height={500}>
        <Treemap
          data={selectedSector ? chartData.filter(d => d.children.some(c => c.name === selectedSector)) : chartData}
          dataKey="value"
          ratio={4 / 3}
          stroke="#fff"
          fill="#696cff"
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default TreemapComponent;