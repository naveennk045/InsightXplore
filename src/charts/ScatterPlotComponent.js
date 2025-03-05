import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ScatterPlotComponent = ({ data, selectedSector }) => {
  const chartData = data.map((item) => ({
    intensity: item.intensity || 0,
    likelihood: item.likelihood || 0,
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h3>Intensity vs Likelihood {selectedSector ? `for ${selectedSector}` : ""}</h3>
      <ResponsiveContainer width="100%" height={600}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="intensity" name="Intensity" />
          <YAxis type="number" dataKey="likelihood" name="Likelihood" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Insights" data={chartData} fill="#696cff" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlotComponent;