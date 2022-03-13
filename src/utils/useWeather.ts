import { Coordinates, useSettingsContext } from "./settings-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";

export function useWeather() {
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { getLocation, radius } = useSettingsContext();
  const update = () => {
    setLoading(true);
    getLocation()
      .then((coords) => {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        const apiKey = process.env.REACT_APP_OWM_API_KEY;
        url.searchParams.set("lat", coords.lat.toString());
        url.searchParams.set("lon", coords.lon.toString());
        url.searchParams.set("appid", apiKey || "");
        axios
          .get<Weather>(url.toString())
          .then((res) => {
            setWeather(res.data);
            setError(undefined);
          })
          .catch(() => {
            setError("Lekérés hiba.");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Lokáció hiba.");
      });
  };

  useEffect(update, [getLocation, radius]);
  useInterval(update, 10000);

  return { weather, loading, error, update };
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
