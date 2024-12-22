// import React, { useState } from "react";

// interface FileUploadProps {
//   onFileUpload: (data: { lat: number; lng: number }[]) => void;
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
//   const [error, setError] = useState<string | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       setError("No file selected.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = (event) => {
//       try {
//         const content = event.target?.result;

//         if (typeof content !== "string") {
//           throw new Error("File content is not a valid string.");
//         }

//         const parsedData = JSON.parse(content);

//         // Validate that `timelineObjects` exists
//         if (!Array.isArray(parsedData.timelineObjects)) {
//           throw new Error(
//             "The uploaded file does not contain valid timelineObjects."
//           );
//         }

//         // Extract lat/lng data from `timelineObjects`
//         const points = parsedData.timelineObjects
//           .map((object: any) => {
//             const placeVisit = object.placeVisit;
//             if (placeVisit && placeVisit.location) {
//               const { latitudeE7, longitudeE7 } = placeVisit.location;

//               if (
//                 typeof latitudeE7 === "number" &&
//                 typeof longitudeE7 === "number"
//               ) {
//                 //1e7 is the scientific notation for 10,000,000 (or 10 million).
//                 //Dividing the latitudeE7 and longitudeE7 values by 1e7 effectively converts them back to the standard decimal degree format.
//                 return {
//                   lat: latitudeE7 / 1e7, // Scale down from E7 format
//                   lng: longitudeE7 / 1e7,
//                 };
//               }
//             }
//             return null;
//           })
//           .filter((point: any) => point !== null); // Filter out invalid entries

//         if (points.length === 0) {
//           throw new Error(
//             "No valid latitude/longitude data found in the file."
//           );
//         }

//         // Pass the validated data to the parent component
//         onFileUpload(points);
//         setError(null);
//       } catch (err: any) {
//         console.error("Error parsing file:", err.message);
//         setError("Error parsing file: " + err.message);
//       }
//     };

//     reader.onerror = () => {
//       setError("An error occurred while reading the file.");
//     };

//     reader.readAsText(file);
//   };

//   return (
//     <div>
//       <input type="file" accept=".json" onChange={handleFileUpload} />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from "react";

interface FileUploadProps {
  onFileUpload: (data: { lat: number; lng: number }[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      setError("No files selected.");
      return;
    }

    const allPoints: { lat: number; lng: number }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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

                if (
                  typeof latitudeE7 === "number" &&
                  typeof longitudeE7 === "number"
                ) {
                  //1e7 is the scientific notation for 10,000,000 (or 10 million).
                  //Dividing the latitudeE7 and longitudeE7 values by 1e7 effectively converts them back to the standard decimal degree format.
                  return {
                    lat: latitudeE7 / 1e7, // Scale down from E7 format
                    lng: longitudeE7 / 1e7,
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
            onFileUpload(allPoints);
            setError(null);
          }
        } catch (err: any) {
          console.error("Error parsing file:", err.message);
          setError("Error parsing file: " + err.message);
        }
      };

      reader.onerror = () => {
        setError("An error occurred while reading the file.");
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" multiple onChange={handleFileUpload} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
