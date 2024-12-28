import React, { useState } from "react";
import "../styles/MainPage.css";
import Heatmap from "../components/Heatmap";
import Filter from "../components/Filter";
import { state, stateContext } from "../modal/state";
import Header from "../components/Header";

const MainPage: React.FC = () => {
  const initialData: state = {
    filterData: { startDate: "", endDate: "" },
    data: [],
  };
  const [appState, setAppState] = useState<state>(initialData);
  const stateContextValue = { appState, setAppState };

  return (
    <section className="main-container">
      <Header />
      <stateContext.Provider value={stateContextValue}>
        <Filter />
        {/* <FileUpload onFileUpload={handleFileUpload} /> */}
        {<Heatmap />}
      </stateContext.Provider>
    </section>
  );
};

export default MainPage;
