import { createContext } from "react";
import { filter } from "./filter";
import { LocationList } from "./locationList";

export interface state {
  filterData: filter;
  data: { lat: number; lng: number }[] | [];
}

export const stateContext = createContext<{
  appState: state;
  setAppState: Function;
}>({
  appState: { filterData: { startDate: "", endDate: "" }, data: [] },
  setAppState: () => {},
});
