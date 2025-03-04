import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import DataTable from "../components/DataTable";
import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";
import ScatterPlotComponent from "../charts/ScatterPlotComponent";
import HeatmapComponent from "../charts/HeatmapComponent";
import ChoroplethMapComponent from "../charts/ChoroplethMapComponent";
import TimeSeriesComponent from "../charts/TimeSeriesComponent";
import DonutChartComponent from "../charts/DonutChartComponent";
import AreaChartComponent from "../charts/AreaChartComponent";
import BubbleChartComponent from "../charts/BubbleChartComponent";
import TreemapComponent from "../charts/TreemapComponent";
import "../styles/dashboard.css";

const Dashboard = ({ section }) => {
  const [data, setData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/data")
      .then((response) => {
        console.log("Data length:", response.data.length);
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = selectedSector
    ? data.filter((item) => item.sector === selectedSector)
    : data;

  // Overview Widgets
  const totalInsights = data.length;
  const avgIntensity = (data.reduce((sum, item) => sum + (item.intensity || 0), 0) / totalInsights).toFixed(2);
  const topSector = Object.entries(
    data.reduce((acc, item) => {
      const sector = item.sector || "Unknown";
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const topRegion = Object.entries(
    data.reduce((acc, item) => {
      const region = item.region || "Unknown";
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const renderOverview = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card sx={{ backgroundColor: "#696cff", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Total Insights</Typography>
                <Typography variant="h4">{totalInsights}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card sx={{ backgroundColor: "#03c3ec", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Average Intensity</Typography>
                <Typography variant="h4">{avgIntensity}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card sx={{ backgroundColor: "#ffab00", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Top Sector</Typography>
                <Typography variant="h4">{topSector}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card sx={{ backgroundColor: "#8592ad", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Top Region</Typography>
                <Typography variant="h4">{topRegion}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <BarChartComponent
                data={data}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <PieChartComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TimeSeriesComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSection = () => {
    switch (section) {
      case "overview":
        return renderOverview();
      case "table":
        return (
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>Data Table</Typography>
              <DataTable data={filteredData} />
            </CardContent>
          </Card>
        );
      case "bar":
        return (
          <Card>
            <CardContent>
              <BarChartComponent
                data={data}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
              />
            </CardContent>
          </Card>
        );
      case "pie":
        return (
          <Card>
            <CardContent>
              <PieChartComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "scatter":
        return (
          <Card>
            <CardContent>
              <ScatterPlotComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "heatmap":
        return (
          <Card>
            <CardContent>
              <HeatmapComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "choropleth":
        return (
          <Card>
            <CardContent>
              <ChoroplethMapComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "timeseries":
        return (
          <Card>
            <CardContent>
              <TimeSeriesComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "donut":
        return (
          <Card>
            <CardContent>
              <DonutChartComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "area":
        return (
          <Card>
            <CardContent>
              <AreaChartComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "bubble":
        return (
          <Card>
            <CardContent>
              <BubbleChartComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      case "treemap":
        return (
          <Card>
            <CardContent>
              <TreemapComponent data={filteredData} selectedSector={selectedSector} />
            </CardContent>
          </Card>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Typography variant="h1">InsightXplorer Dashboard</Typography>
        <div className="filter-section">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sector</InputLabel>
            <Select
              value={selectedSector || ""}
              onChange={(e) => setSelectedSector(e.target.value || "")}
              label="Sector"
            >
              <MenuItem value="">All Sectors</MenuItem>
              {[...new Set(data.map((item) => item.sector).filter(Boolean))].map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default Dashboard;