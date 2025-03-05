import React from "react";
import { NavLink } from "react-router-dom";
import {
  Dashboard as DashboardIcon, TableChart, BarChart, PieChart, ScatterPlot, GridOn, Map, Timeline,
  DonutLarge, StackedLineChart, BubbleChart, AccountTree, CloudUpload, Description
} from "@mui/icons-material";
import "../styles/sidebar.css";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const sections = [
    { path: "/upload", label: "Upload", icon: <CloudUpload /> },
    { path: "/", label: "Overview", icon: <DashboardIcon /> },
    { path: "/chart-descriptions", label: "Chart Descriptions", icon: <Description /> },
    { path: "/table", label: "Data Table", icon: <TableChart /> },
    { path: "/bar", label: "Bar Chart", icon: <BarChart /> },
    { path: "/pie", label: "Pie Chart", icon: <PieChart /> },
    { path: "/scatter", label: "Scatter Plot", icon: <ScatterPlot /> },
    { path: "/heatmap", label: "Heatmap", icon: <GridOn /> },
    { path: "/choropleth", label: "Choropleth Map", icon: <Map /> },
    { path: "/timeseries", label: "Time Series", icon: <Timeline /> },
    { path: "/donut", label: "Donut Chart", icon: <DonutLarge /> },
    { path: "/area", label: "Area Chart", icon: <StackedLineChart /> }, // Replaced AreaChart with StackedLineChart
    { path: "/bubble", label: "Bubble Chart", icon: <BubbleChart /> },
    { path: "/treemap", label: "Treemap", icon: <AccountTree /> },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>{isCollapsed ? "IX" : "InsightXplorer"}</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.path}>
              <NavLink
                to={section.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="icon">{section.icon}</span>
                <span className="label">{section.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;