import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import ChartDescriptions from "./pages/ChartDescriptions";
import "./styles/global.css";

const theme = createTheme({
  palette: {
    primary: { main: "#696cff" },
    secondary: { main: "#8592ad" },
    background: { default: "#f5f5f9", paper: "#fff" },
    text: { primary: "#2a3042", secondary: "#8592ad" },
    accent: { teal: "#03c3ec", orange: "#ffab00" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "1.8rem", fontWeight: 600 },
    h3: { fontSize: "1.2rem", fontWeight: 500 },
  },
});

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app-container">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <div className={`content ${isCollapsed ? "collapsed" : ""}`}>
            <Routes>
              <Route path="/" element={<Dashboard section="overview" />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/chart-descriptions" element={<ChartDescriptions />} />
              <Route path="/table" element={<Dashboard section="table" />} />
              <Route path="/bar" element={<Dashboard section="bar" />} />
              <Route path="/pie" element={<Dashboard section="pie" />} />
              <Route path="/scatter" element={<Dashboard section="scatter" />} />
              <Route path="/heatmap" element={<Dashboard section="heatmap" />} />
              <Route path="/choropleth" element={<Dashboard section="choropleth" />} />
              <Route path="/timeseries" element={<Dashboard section="timeseries" />} />
              <Route path="/donut" element={<Dashboard section="donut" />} />
              <Route path="/area" element={<Dashboard section="area" />} />
              <Route path="/bubble" element={<Dashboard section="bubble" />} />
              <Route path="/treemap" element={<Dashboard section="treemap" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;