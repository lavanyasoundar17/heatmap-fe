import React, { useContext } from "react";
import "../styles/Filter.css";
import { Location } from "../modal/location";
import { User } from "../modal/user";
import axios from "axios";
import { stateContext } from "../modal/state";

// interface FileUploadProps {
//   onFileUpload: (data: { lat: number; lng: number }[]) => void;
// }

const FileUpload: React.FC = () => {
  const userInfo: User | null = JSON.parse(localStorage.getItem("user"));
  const stateData = useContext(stateContext);

  const selectFile = () => document.getElementById("fileUpload")?.click();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      alert("No files selected.");
      return;
    }

    const allPoints: Location[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result;

          if (typeof content !== "string") {
            throw new Error("File content is not a valid string.");
          }

          const parsedData = JSON.parse(content);

          if (!Array.isArray(parsedData.timelineObjects)) {
            throw new Error(
              "The uploaded file does not contain valid timelineObjects."
            );
          }

          // Extract lat/lng data from `timelineObjects`
          const points = parsedData.timelineObjects
            .map((object: any) => {
              const placeVisit = object.placeVisit;
              if (placeVisit && placeVisit.location) {
                const { latitudeE7, longitudeE7 } = placeVisit.location;
                const timestramp = placeVisit?.duration?.endTimestamp;
                if (
                  typeof latitudeE7 === "number" &&
                  typeof longitudeE7 === "number"
                ) {
                  //1e7 is the scientific notation for 10,000,000 (or 10 million).
                  //Dividing the latitudeE7 and longitudeE7 values by 1e7 effectively converts them back to the standard decimal degree format.
                  return {
                    latitude: latitudeE7 / 1e7, // Scale down from E7 format
                    longitude: longitudeE7 / 1e7,
                    date: timestramp.split("T")[0],
                    fileName, // Convert milliseconds to ISO string
                  };
                }
              }
              return null;
            })
            .filter((point: any) => point !== null);

          if (points.length === 0) {
            throw new Error(
              "No valid latitude/longitude data found in the file."
            );
          }

          // Accumulate points from this file
          allPoints.push(...points);

          if (i === files.length - 1) {
            console.log(allPoints);
            saveLocationData(allPoints);
            // setError(null);
          }
        } catch (err: any) {
          console.error("Error parsing file:", err.message);
          alert("Error parsing file: " + err.message);
        }
      };

      reader.onerror = () => {
        alert("An error occurred while reading the file.");
      };

      reader.readAsText(file);
    }
  };

  const saveLocationData = async (data: Location[]) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/location/saveLocations",
        {
          data: data,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log("location save successfull", response);
      alert(
        "Location data uploaded successfully, continue to see the updated map."
      );
      stateData.setAppState({
        ...stateData.appState,
        filterData: { startDate: "", endDate: "" },
      });
    } catch (err: any) {
      console.error("Error saving location data:", err.message);
      alert("Error saving location data: " + err.message);
    }
  };

  return (
    <div>
      <button className="import-btn" onClick={selectFile}>
        import data
      </button>
      <input
        id="fileUpload"
        className="fileInput"
        type="file"
        accept=".json"
        multiple
        onChange={handleFileUpload}
      />
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
};

export default FileUpload;
