import { AlertApiResponse, ApiResponse } from "./types";
import { Coordinates } from "./settings-context";
const baseUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/api";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export function getDepartures({ lat, lon }: Coordinates, radius: number) {
  return makeApiCall<ApiResponse>({ lat, lon }, radius, baseUrl);
}

export function getAlerts({ lat, lon }: Coordinates, radius: number) {
  return makeApiCall<AlertApiResponse>(
    { lat, lon },
    radius,
    baseUrl + "/alerts"
  );
}

function makeApiCall<T>(
  { lat, lon }: Coordinates,
  radius: number,
  url: string
) {
  return new Promise((resolve: (value: T) => void, reject) => {
    fetch(url, {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        lat: lat,
        lon: lon,
        radius: radius,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) return response.json();
        reject(await response.text());
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
