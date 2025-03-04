import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const BubbleChartComponent = ({ data, selectedSector }) => {
  const chartData = data.map((item) => ({
    intensity: item.intensity || 0,
    likelihood: item.likelihood || 0,
    relevance: item.relevance || 0,
  }));

  return (
    <div>
      <h3>Intensity vs Likelihood vs Relevance {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <ScatterChart width={600} height={300}>
        <CartesianGrid />
        <XAxis type="number" dataKey="intensity" name="Intensity" />
        <YAxis type="number" dataKey="likelihood" name="Likelihood" />
        <ZAxis type="number" dataKey="relevance" range={[50, 400]} name="Relevance" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="Insights" data={chartData} fill="#696cff" />
      </ScatterChart>
    </div>
  );
};

export default BubbleChartComponent;