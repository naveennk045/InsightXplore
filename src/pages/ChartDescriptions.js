import React from 'react';
import '../styles/chartDescriptions.css';

const ChartDescriptions = () => {
  const charts = [
    {
      name: 'Bar Chart',
      description: 'A Bar Chart is used to represent data with rectangular bars. Each bar\'s height (or length) is proportional to the value it represents. In this dashboard, the Bar Chart shows the number of insights by sector, allowing users to compare the volume of insights across different sectors.',
      conclusion: 'Bar charts help in comparing the number of insights across different sectors, making it easy to identify which sectors have the most or least insights.'
    },
    {
      name: 'Pie Chart',
      description: 'A Pie Chart is a circular statistical graphic divided into slices to illustrate numerical proportions. In this dashboard, the Pie Chart shows the distribution of insights across different PESTLE categories (Political, Economic, Social, Technological, Legal, Environmental).',
      conclusion: 'Pie charts are useful for showing the proportion of insights across different PESTLE categories, helping users understand the distribution of insights in various contexts.'
    },
    {
      name: 'Donut Chart',
      description: 'A Donut Chart is similar to a pie chart, but with a hole in the center. It is used to show proportions of categorical data. In this dashboard, the Donut Chart shows the distribution of insights by topic, providing a clear visual representation of topic distribution.',
      conclusion: 'Donut charts are useful for showing the proportion of insights across different topics, helping users quickly grasp the distribution of insights by topic.'
    },
    {
      name: 'Scatter Plot',
      description: 'A Scatter Plot uses dots to represent values for two different numeric variables. In this dashboard, the Scatter Plot shows the relationship between the intensity and likelihood of insights, helping users identify correlations between these two variables.',
      conclusion: 'Scatter plots are useful for identifying relationships or correlations between intensity and likelihood, providing insights into how these two variables interact.'
    },
    {
      name: 'Bubble Chart',
      description: 'A Bubble Chart is a variation of a scatter plot in which a third dimension of the data is shown through the size of markers. In this dashboard, the Bubble Chart shows the relationship between intensity, likelihood, and relevance of insights.',
      conclusion: 'Bubble charts are useful for visualizing the relationship between three variables, offering a comprehensive view of how intensity, likelihood, and relevance interact.'
    },
    {
      name: 'Heatmap',
      description: 'A Heatmap is a data visualization technique that shows the magnitude of a phenomenon as color in two dimensions. In this dashboard, the Heatmap shows the distribution of insights by sector and region, making it easy to identify patterns and clusters.',
      conclusion: 'Heatmaps are useful for visualizing the intensity of insights across different sectors and regions, helping users identify patterns and clusters in the data.'
    },
    {
      name: 'Choropleth Map',
      description: 'A Choropleth Map is a thematic map in which areas are shaded or patterned in proportion to the measurement of the statistical variable being displayed on the map. In this dashboard, the Choropleth Map shows the intensity of insights by country.',
      conclusion: 'Choropleth maps are useful for visualizing how the intensity of insights varies across different countries, providing a geographic perspective on the data.'
    },
    {
      name: 'Time Series',
      description: 'A Time Series chart displays data points at successive time intervals. In this dashboard, the Time Series chart shows the number of insights over time, helping users analyze trends and patterns.',
      conclusion: 'Time series charts are useful for analyzing trends and patterns over time, helping users understand how the number of insights has changed over the years.'
    },
    {
      name: 'Area Chart',
      description: 'An Area Chart is similar to a line chart, but the area between the line and the axis is filled with color or shading. In this dashboard, the Area Chart shows the cumulative intensity of insights over time.',
      conclusion: 'Area charts are useful for showing cumulative totals over time, providing a clear visual representation of how the intensity of insights has accumulated.'
    },
    {
      name: 'Treemap',
      description: 'A Treemap is a visualization of hierarchical data using nested rectangles. In this dashboard, the Treemap shows the distribution of insights by region and sector, providing a clear hierarchical view of the data.',
      conclusion: 'Treemaps are useful for visualizing the distribution of insights across different regions and sectors, helping users understand the hierarchical structure of the data.'
    }
  ];

  return (
    <div className="chart-descriptions-container">
      <h1>Chart Descriptions</h1>
      {charts.map((chart, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{chart.name}</h2>
          <p>{chart.description}</p>
          <p><strong>Conclusion:</strong> {chart.conclusion}</p>
        </div>
      ))}
    </div>
  );
};

export default ChartDescriptions;