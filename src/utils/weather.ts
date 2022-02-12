import { Coordinates } from "./settings-context";

const url = new URL("https://api.openweathermap.org/data/2.5/weather");

export function getWeatherData({ lat, lon }: Coordinates) {
  const apiKey = process.env.REACT_APP_OWM_API_KEY;
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lon.toString());
  url.searchParams.set("appid", apiKey || "");
  return new Promise((resolve: (values: Weather) => void, reject) => {
    if (!apiKey) reject("Nincs API kulcs!");
    fetch(url.toString())
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

export type Weather = {
  coord: Coordinates;
  weather?:
    | {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[]
    | null;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  rain?: {
    "1h": number;
    "3h": number;
  };
  snow?: {
    "1h": number;
    "3h": number;
  };
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
