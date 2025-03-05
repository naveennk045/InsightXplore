import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ChoroplethMapComponent = ({ data, selectedSector }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
      .then((response) => response.json())
      .then(setGeoData);
  }, []);

  const countryIntensity = data.reduce((acc, item) => {
    const country = item.country || "Unknown";
    if (country !== "Unknown") {
      acc[country] = (acc[country] || 0) + (item.intensity || 0);
    }
    return acc;
  }, {});

  const chartData = Object.keys(countryIntensity).map((key) => ({
    country: key,
    intensity: countryIntensity[key],
  }));

  const getColor = (intensity) => {
    return intensity > 100 ? "#696cff" :
           intensity > 50  ? "#03c3ec" :
           intensity > 20  ? "#ffab00" :
           intensity > 10  ? "#8592ad" :
           intensity > 5   ? "#2a3042" :
           intensity > 0   ? "#f5f5f9" :
                             "#fff";
  };

  const style = (feature) => {
    const countryData = chartData.find((d) => d.country === feature.properties.ADMIN);
    const intensity = countryData ? countryData.intensity : 0;
    return {
      fillColor: getColor(intensity),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const countryData = chartData.find((d) => d.country === feature.properties.ADMIN);
    const intensity = countryData ? countryData.intensity : 0;
    layer.bindPopup(`Country: ${feature.properties.ADMIN}<br>Intensity: ${intensity}`);
    layer.on({
      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.9 }),
      mouseout: (e) => e.target.setStyle({ fillOpacity: 0.7 }),
    });
  };

  return (
    <div>
      <h3>Intensity by Country {selectedSector ? `for ${selectedSector}` : ""}</h3>
      {geoData && (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "600px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
        </MapContainer>
      )}
    </div>
  );
};

export default ChoroplethMapComponent;