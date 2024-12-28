import React, { useContext } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/MainPage.css";
import { stateContext } from "../modal/state";
import { fetchLocation } from "../services/locationService";
import { filter } from "../modal/filter";
import { LocationList } from "../modal/location";

interface HeatmapProps {
  data: { lat: number; lng: number }[];
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
// console.log(MAPBOX_TOKEN);

const Heatmap: React.FC = () => {
  const stateData = useContext(stateContext);
  const [data, setData] = React.useState<LocationList[]>([{ lat: 0, lng: 0 }]);

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const locationList: LocationList[] | [] = (await fetchLocation(
        stateData.appState.filterData as filter,
        userInfo.token
      )) as LocationList[] | [];
      setData(locationList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [stateData.appState.filterData]);

  const geojsonData = {
    type: "FeatureCollection",
    features: data?.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.lng, point.lat],
      },
    })),
  };

  return (
    <div className="map-container">
      <Map
        initialViewState={{
          longitude: 80.27,
          latitude: 13.08,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
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
    </div>
  );
};

export default Heatmap;
