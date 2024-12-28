import axios from "axios";
import { filter } from "../modal/filter";
import { Location, LocationList } from "../modal/location";

export const fetchLocation = async (filterInfo: filter, token: string) => {
  let body;

  if (
    filterInfo &&
    filterInfo.startDate &&
    filterInfo.startDate != "" &&
    filterInfo.endDate &&
    filterInfo.endDate != ""
  ) {
    body = { filter: filterInfo };
  } else {
    body = { filter: { startDate: null, endDate: null } };
  }
  try {
    const response = await axios.post(
      "http://localhost:8080/location/getLocations",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    const locationList: LocationList[] = response?.data?.locationList?.map(
      (locationData: Location) => ({
        lat: locationData.latitude,
        lng: locationData.longitude,
      })
    ); // Assuming latitude and longitude are present in the API response);

    if (locationList && locationList.length > 0) {
      return locationList;
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};
