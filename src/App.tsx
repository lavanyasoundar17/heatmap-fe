import React, { useState } from "react";
import FileUpload from "./components/FileUpload.tsx";
import Heatmap from "./components/Heatmap.tsx";

const App: React.FC = () => {
  const [data, setData] = useState<{ lat: number; lng: number }[]>([]);

  const handleFileUpload = (uploadedData: { lat: number; lng: number }[]) => {
    setData(uploadedData);
    console.log("Uploaded Data:", uploadedData);
  };

  return (
    <div>
      <h1>Heatmap Application</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {data.length > 0 && <Heatmap data={data} />}
    </div>
  );
};

export default App;
