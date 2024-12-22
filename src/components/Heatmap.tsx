import React from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface HeatmapProps {
  data: { lat: number; lng: number }[];
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGF2YW55YTE3IiwiYSI6ImNtNHNzaDBvZzA0ZjcybHNheWhiZXk3Y2wifQ.MYMu_q6uwRxHiayuY8eexQ";

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const geojsonData = {
    type: "FeatureCollection",
    features: data.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.lng, point.lat],
      },
    })),
  };

  return (
    <Map
      initialViewState={{
        longitude: 80.27,
        latitude: 13.08,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100%", height: "500px" }}
      dragPan={true}
      scrollZoom={true}
      dragRotate={false}
      keyboard={true}
      doubleClickZoom={true}
    >
      <Source id="my-data" type="geojson" data={geojsonData}>
        <Layer
          id="heatmap"
          type="heatmap"
          paint={{
            "heatmap-weight": 1,
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              22,
              3,
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              22,
              50,
            ],
            "heatmap-opacity": 0.6,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0, 0, 255, 0)",
              0.2,
              "royalblue",
              0.4,
              "cyan",
              0.6,
              "lime",
              0.8,
              "yellow",
              1,
              "red",
            ],
          }}
        />
      </Source>
    </Map>
  );
};

export default Heatmap;
