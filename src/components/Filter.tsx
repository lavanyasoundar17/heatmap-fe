import React from "react";
import DateRangePicker from "./DateRangePicker";
import "../styles/filter.css";
import FileUpload from "./FileUpload";

const Filter: React.FC = () => {
  return (
    <div className="filter-container">
      <DateRangePicker />
      <FileUpload />
      {/* <button className="import-btn">import data</button> */}
    </div>
  );
};

export default Filter;
