import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const ScatterPlotComponent = ({ data, selectedSector }) => {
  const chartData = data.map((item) => ({
    intensity: item.intensity || 0,
    likelihood: item.likelihood || 0,
  }));

  return (
    <div>
      <h3>Intensity vs Likelihood {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <ScatterChart width={600} height={300}>
        <CartesianGrid />
        <XAxis type="number" dataKey="intensity" name="Intensity" />
        <YAxis type="number" dataKey="likelihood" name="Likelihood" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="Insights" data={chartData} fill="#696cff" />
      </ScatterChart>
    </div>
  );
};

export default ScatterPlotComponent;