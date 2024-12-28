import React, { useContext, useState } from "react";
import "../styles/DateRange.css";
import { stateContext } from "../modal/state";

const DateRangePicker: React.FC = () => {
  const stateData = useContext(stateContext);

  const [sDate, setSDate] = useState(stateData.appState.filterData.startDate);
  const [eDate, setEDate] = useState(stateData.appState.filterData.endDate);

  const startDateChange = (e) => {
    //if (e.target.value && new Date(e.target.value) <= endDate) {
    setSDate(new Date(e.target.value).toISOString().split("T")[0]);
    //}
    // else {
    //   setError("End date should be greater than or equal to start date");
    // }
  };

  const endDateChange = (e) => {
    setEDate(new Date(e.target.value).toISOString().split("T")[0]);
  };

  const handleSearch = (e) => {
    //getFilter(sDate, eDate);
    // appState.filter = { startDate: sDate, endDate: eDate };
    e.preventDefault();
    console.log("Search triggered");
    console.log("Search triggered", sDate, eDate);
    console.log("Search triggered", stateData.appState.filterData);
    stateData.setAppState({
      ...stateData.appState,
      filterData: { startDate: sDate, endDate: eDate },
    });
    console.log("Search triggered", stateData.appState.filterData);
  };

  return (
    <form className="dateRange">
      <fieldset className="date-picker-container">
        <label>Start Date:</label>
        <input
          id="startDate"
          type="date"
          value={sDate}
          onChange={startDateChange}
        />
        {/* {error && <p className="error">{error}</p>} */}
      </fieldset>
      <fieldset className="date-picker-container">
        <label>End Date:</label>
        <input type="date" value={eDate} onChange={endDateChange} />
      </fieldset>
      <fieldset className="filter-search-container">
        <button className="filter-search" onClick={handleSearch}>
          Search
        </button>
      </fieldset>
    </form>
  );
  //   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
  //     null,
  //     null,
  //   ]);

  //   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  //   const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  //   useEffect(() => {
  //     if (dateRange[0]) {
  //       setStartDate(dateRange[0]);
  //     } else {
  //       setStartDate(undefined);
  //     }

  //     if (dateRange[1]) {
  //       setEndDate(dateRange[1]);
  //     } else {
  //       setEndDate(undefined);
  //     }
  //   }, [dateRange]);

  //   return (
  //     <DatePicker
  //       selectsRange={true} // Date range selecting enabled
  //       startDate={startDate}
  //       endDate={endDate}
  //       onChange={(update) => {
  //         setDateRange(update);
  //       }}
  //       calendarStartDay={1} // Starts from Monday
  //     />
  //   );
};

export default DateRangePicker;
